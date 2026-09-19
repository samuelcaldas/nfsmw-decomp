#!/usr/bin/env bash
# Ralph loop decompilation runner for Need for Speed: Most Wanted.
# Supports clean/concise logging, infinite iterations, and multi-agent parallel workers.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
SCRIPT_PATH="$REPO_ROOT/scripts/ralph-decomp.sh"

MAX_ITERATIONS=50
INFINITE=false
TARGET_UNIT=""
TARGET_UNITS=""
DELAY_SECONDS=2
PROMPT_FILE="prompts/decomp-loop.md"
WORKERS=1
WORKER_ID=0
WORKTREE_MODE=false
VERBOSE=false
QUIET=false
LOG_DIR="logs/ralph"
ITERATION=0
WORKER_PIDS=()
TMP_DIR="$(mktemp -d -t ralph-decomp-XXXXXX)"

log_prefix() {
    if [[ "$WORKERS" -gt 1 || "$WORKTREE_MODE" == "true" ]]; then
        echo "[Worker $WORKER_ID] "
    else
        echo ""
    fi
}

log_info() {
    if [[ "$QUIET" != "true" ]]; then
        echo -e "$(log_prefix)$*"
    fi
}

log_success() {
    echo -e "$(log_prefix)\033[32m$*\033[0m"
}

log_warn() {
    echo -e "$(log_prefix)\033[33m$*\033[0m"
}

log_error() {
    echo -e "$(log_prefix)\033[31m$*\033[0m" >&2
}

cleanup() {
    # If master running parallel workers, terminate workers and clean worktrees
    if [[ "$WORKERS" -gt 1 && ${#WORKER_PIDS[@]} -gt 0 ]]; then
        echo ""
        log_info "Shutting down ${#WORKER_PIDS[@]} parallel worker(s)..."
        for pid in "${WORKER_PIDS[@]}"; do
            kill -TERM "$pid" 2>/dev/null || true
        done
        sleep 1
        for pid in "${WORKER_PIDS[@]}"; do
            kill -9 "$pid" 2>/dev/null || true
        done
        for ((i=0; i<WORKERS; i++)); do
            local wt_dir="$REPO_ROOT/.worktrees/ralph-worker-$i"
            local wt_branch="ralph-worker-$i"
            if [[ -d "$wt_dir" ]]; then
                git -C "$REPO_ROOT" worktree remove --force "$wt_dir" 2>/dev/null || rm -rf "$wt_dir"
            fi
            git -C "$REPO_ROOT" branch -D "$wt_branch" 2>/dev/null || true
        done
    fi

    rm -rf "$TMP_DIR"
    if [[ "$ITERATION" -gt 0 ]]; then
        echo ""
        log_info "Ralph loop stopped at iteration $ITERATION."
    fi
}
trap cleanup EXIT INT TERM

show_help() {
    cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Options:
  -n, --max-iterations <N>  Maximum loop iterations per worker (default: 50; 0 = infinite)
  -i, --infinite            Run infinitely until stopped or 100% complete
  -w, --workers <N>         Number of parallel workers (default: 1)
  -u, --target-unit <NAME>  Scope candidate selection to a specific unit (e.g. zFe, zEcstasy)
  --units <LIST>            Comma-separated units to distribute across workers (e.g. zEcstasy,zAI,zFe)
  --worktree                Run worker inside an isolated git worktree
  --worker-id <ID>          Worker identifier (internal / advanced use)
  -d, --delay <SECONDS>     Delay in seconds between iterations (default: 2)
  -p, --prompt <FILE>       Path to prompt markdown file (default: prompts/decomp-loop.md)
  -v, --verbose             Print raw Claude & build output to console (default: clean/concise)
  -q, --quiet               Suppress step details, only log commits and errors
  --log-dir <DIR>           Directory for execution logs (default: logs/ralph)
  -h, --help                Show this help message and exit

Examples:
  # Concise single-worker infinite run:
  $(basename "$0") --infinite --delay 3

  # Multi-agent parallel decompilation with 4 workers:
  $(basename "$0") --workers 4 --infinite

  # Multi-agent parallel decompilation scoped to specific units:
  $(basename "$0") --workers 3 --units zEcstasy,zAI,zFe --infinite
EOF
    exit 0
}

parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -n|--max-iterations)
                MAX_ITERATIONS="$2"
                if [[ "$MAX_ITERATIONS" -le 0 ]]; then
                    INFINITE=true
                    MAX_ITERATIONS=0
                fi
                shift 2
                ;;
            -i|--infinite)
                INFINITE=true
                MAX_ITERATIONS=0
                shift
                ;;
            -w|--workers)
                WORKERS="$2"
                shift 2
                ;;
            --worker-id)
                WORKER_ID="$2"
                shift 2
                ;;
            --worktree)
                WORKTREE_MODE=true
                shift
                ;;
            -u|--target-unit)
                TARGET_UNIT="$2"
                shift 2
                ;;
            --units)
                TARGET_UNITS="$2"
                shift 2
                ;;
            -d|--delay)
                DELAY_SECONDS="$2"
                shift 2
                ;;
            -p|--prompt)
                PROMPT_FILE="$2"
                shift 2
                ;;
            -v|--verbose)
                VERBOSE=true
                shift
                ;;
            -q|--quiet)
                QUIET=true
                shift
                ;;
            --log-dir)
                LOG_DIR="$2"
                shift 2
                ;;
            -h|--help)
                show_help
                ;;
            *)
                echo "Error: Unknown argument '$1'" >&2
                show_help
                ;;
        esac
    done
}

check_prerequisites() {
    if ! command -v claude >/dev/null 2>&1; then
        log_error "Error: 'claude' CLI binary not found in PATH."
        exit 1
    fi
    if [[ ! -f "$PROMPT_FILE" ]]; then
        log_error "Error: Prompt file '$PROMPT_FILE' does not exist."
        exit 1
    fi
    if [[ ! -f "$REPO_ROOT/scripts/next-decomp-candidate.py" ]]; then
        log_error "Error: 'scripts/next-decomp-candidate.py' not found."
        exit 1
    fi
}

check_git_clean() {
    if [[ -n "$(git status --porcelain)" ]]; then
        log_warn "Warning: Working directory is not clean. Untracked/modified files exist."
        git status --short
    fi
}

get_next_candidate_json() {
    local cmd=(python3 "$REPO_ROOT/scripts/next-decomp-candidate.py" --limit 1 --json)
    if [[ -n "$TARGET_UNIT" ]]; then
        cmd+=(--unit "$TARGET_UNIT")
    elif [[ "$WORKERS" -gt 1 || "$WORKER_ID" -gt 0 ]]; then
        cmd+=(--offset "$WORKER_ID")
    fi
    "${cmd[@]}" 2>/dev/null || echo "[]"
}

prepare_prompt() {
    local out_file="$1"
    local cand_json="$2"

    cat <<EOF > "$out_file"
<!-- Ralph Worker Session Context -->
**Worker ID:** $WORKER_ID
EOF

    if [[ -n "$TARGET_UNIT" ]]; then
        cat <<EOF >> "$out_file"
**Target Scope Filter:** Please focus candidate selection strictly on unit: \`$TARGET_UNIT\`.
Run: \`python3 scripts/next-decomp-candidate.py --unit $TARGET_UNIT --limit 1\`

EOF
    elif [[ "$WORKERS" -gt 1 || "$WORKER_ID" -gt 0 ]]; then
        cat <<EOF >> "$out_file"
**Target Scope Filter:** Worker offset $WORKER_ID.
Run: \`python3 scripts/next-decomp-candidate.py --offset $WORKER_ID --limit 1\`

EOF
    fi

    if [[ "$cand_json" != "[]" ]]; then
        local demangled symbol unit size match
        demangled=$(echo "$cand_json" | jq -r '.[0].demangled_name // ""' 2>/dev/null || true)
        symbol=$(echo "$cand_json" | jq -r '.[0].symbol // ""' 2>/dev/null || true)
        unit=$(echo "$cand_json" | jq -r '.[0].unit_name // ""' 2>/dev/null || true)
        size=$(echo "$cand_json" | jq -r '.[0].size_bytes // 0' 2>/dev/null || true)
        match=$(echo "$cand_json" | jq -r '.[0].fuzzy_match_percent // 0.0' 2>/dev/null || true)
        if [[ -n "$symbol" ]]; then
            cat <<EOF >> "$out_file"
**Recommended Candidate:** \`$demangled\` (\`$symbol\`)
- Unit: \`$unit\`
- Size: $size bytes | Fuzzy Match: ${match}%
- Context: \`python3 tools/decomp-context.py -u $unit -f $symbol --no-ghidra\`
- Diff: \`python3 tools/decomp-diff.py -u $unit -d $symbol\`

EOF
        fi
    fi

    cat <<EOF >> "$out_file"
---

EOF
    cat "$PROMPT_FILE" >> "$out_file"
}

check_completion_promise() {
    local log_file="$1"
    if grep -Fq "<promise>FULL DECOMPILATION COMPLETE</promise>" "$log_file"; then
        echo ""
        log_success "=================================================================="
        log_success "🎉 Ralph loop detected: FULL DECOMPILATION COMPLETE!"
        log_success "=================================================================="
        return 0
    fi
    return 1
}

sync_worktree_commit_to_main() {
    local commit_hash="$1"
    local lock_file="$REPO_ROOT/.git/ralph-merge.lock"
    touch "$lock_file"

    log_info "🔄 Syncing match $commit_hash into main branch..."
    (
        flock -x 200
        # Merge commit into main in repository root
        (
            cd "$REPO_ROOT"
            git merge --no-ff "ralph-worker-$WORKER_ID" -m "merge(worker-$WORKER_ID): $(git log -1 --pretty=%s "$commit_hash")" 2>&1 || {
                log_warn "Notice: merge had conflicts, rolling back merge attempt."
                git merge --abort 2>/dev/null || true
            }
        )
        # Fetch updated main and rebase worktree onto it
        git fetch "$REPO_ROOT" main:refs/remotes/origin/main 2>/dev/null || true
        git rebase "$REPO_ROOT/main" 2>/dev/null || git rebase --abort 2>/dev/null || true
    ) 200>"$lock_file"
}

execute_claude_turn() {
    local prompt_file="$1"
    local iter_log="$2"
    local session_id
    session_id=$(uuidgen 2>/dev/null || python3 -c "import uuid; print(uuid.uuid4())")

    local prev_head
    prev_head=$(git rev-parse HEAD 2>/dev/null || echo "")

    mkdir -p "$LOG_DIR"
    local worker_log="$LOG_DIR/worker_${WORKER_ID}.log"

    log_info "⚙️  Executing Claude (session: ${session_id:0:8})..."

    if [[ "$VERBOSE" == "true" ]]; then
        claude -p --session-id "$session_id" --permission-mode bypassPermissions < "$prompt_file" 2>&1 | tee -a "$worker_log" > "$iter_log"
    else
        claude -p --session-id "$session_id" --permission-mode bypassPermissions < "$prompt_file" > "$iter_log" 2>&1 || true
        cat "$iter_log" >> "$worker_log"
    fi

    local new_head
    new_head=$(git rev-parse HEAD 2>/dev/null || echo "")

    if [[ -n "$new_head" && "$new_head" != "$prev_head" ]]; then
        local commit_summary
        commit_summary=$(git log -1 --pretty="%h %s" "$new_head")
        log_success "✅ Matched: $commit_summary"
        if [[ "$WORKTREE_MODE" == "true" ]]; then
            sync_worktree_commit_to_main "$new_head"
        fi
    elif grep -Eq "status: 429|RESOURCE_EXHAUSTED|cooling down|Individual quota reached" "$iter_log"; then
        log_warn "⚠️  API quota/cooldown (429) detected. Backing off 60s..."
        # Do not consume iteration count for API cooldowns
        ITERATION=$((ITERATION - 1))
        sleep 60
    else
        log_warn "⚠️  No commit created this iteration. Reverting partial working tree changes."
        git restore . 2>/dev/null || true
        git clean -fd 2>/dev/null || true
    fi
}

print_iteration_header() {
    local cand_desc="$1"
    local iter_label="$ITERATION"
    if [[ "$INFINITE" == "true" || "$MAX_ITERATIONS" -eq 0 ]]; then
        iter_label="$ITERATION (Infinite)"
    else
        iter_label="$ITERATION of $MAX_ITERATIONS"
    fi

    echo ""
    log_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    log_info "🔄 Ralph Loop Iteration $iter_label"
    if [[ -n "$TARGET_UNIT" ]]; then
        log_info "🎯 Target Unit: $TARGET_UNIT"
    fi
    if [[ -n "$cand_desc" ]]; then
        log_info "📌 Candidate: $cand_desc"
    fi
    log_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

run_loop() {
    while [[ "$MAX_ITERATIONS" -eq 0 || "$ITERATION" -lt "$MAX_ITERATIONS" ]]; do
        ITERATION=$((ITERATION + 1))

        local cand_json
        cand_json=$(get_next_candidate_json)

        local cand_desc=""
        if [[ "$cand_json" != "[]" ]]; then
            local demangled match unit
            demangled=$(echo "$cand_json" | jq -r '.[0].demangled_name // ""' 2>/dev/null || true)
            unit=$(echo "$cand_json" | jq -r '.[0].unit_name // ""' 2>/dev/null || true)
            match=$(echo "$cand_json" | jq -r '.[0].fuzzy_match_percent // 0' 2>/dev/null || true)
            if [[ -n "$demangled" ]]; then
                cand_desc="$demangled ($unit, ${match}%)"
            fi
        fi

        print_iteration_header "$cand_desc"

        local iter_prompt="$TMP_DIR/prompt_$ITERATION.md"
        local iter_log="$TMP_DIR/iter_$ITERATION.log"

        prepare_prompt "$iter_prompt" "$cand_json"
        execute_claude_turn "$iter_prompt" "$iter_log"

        if check_completion_promise "$iter_log"; then
            break
        fi

        if [[ ("$MAX_ITERATIONS" -eq 0 || "$ITERATION" -lt "$MAX_ITERATIONS") && "$DELAY_SECONDS" -gt 0 ]]; then
            log_info "Waiting ${DELAY_SECONDS}s before next iteration..."
            sleep "$DELAY_SECONDS"
        fi
    done
}

spawn_parallel_workers() {
    mkdir -p "$LOG_DIR"
    mkdir -p "$REPO_ROOT/.worktrees"

    log_info "=================================================================="
    log_info "🚀 Spawning $WORKERS parallel Ralph decompilation workers"
    if [[ "$INFINITE" == "true" || "$MAX_ITERATIONS" -eq 0 ]]; then
        log_info "🔁 Mode: Infinite Iterations"
    else
        log_info "🔁 Mode: $MAX_ITERATIONS Iteration(s) per worker"
    fi
    log_info "📁 Logs: $LOG_DIR/worker_<ID>.log"
    log_info "=================================================================="

    local unit_array=()
    if [[ -n "$TARGET_UNITS" ]]; then
        IFS=',' read -ra unit_array <<< "$TARGET_UNITS"
    fi

    for ((i=0; i<WORKERS; i++)); do
        local worker_unit=""
        if [[ ${#unit_array[@]} -gt 0 ]]; then
            worker_unit="${unit_array[$((i % ${#unit_array[@]}))]}"
        fi

        local wt_dir="$REPO_ROOT/.worktrees/ralph-worker-$i"
        local wt_branch="ralph-worker-$i"

        if [[ -d "$wt_dir" ]]; then
            git -C "$REPO_ROOT" worktree remove --force "$wt_dir" 2>/dev/null || rm -rf "$wt_dir"
        fi
        git -C "$REPO_ROOT" branch -D "$wt_branch" 2>/dev/null || true

        log_info "📁 Initializing worktree for worker $i (unit: ${worker_unit:-auto-offset})..."
        git -C "$REPO_ROOT" worktree add "$wt_dir" -b "$wt_branch" >/dev/null 2>&1

        # Link required build dependencies into worktree
        rm -rf "$wt_dir/orig"
        ln -s "$REPO_ROOT/orig" "$wt_dir/orig"
        mkdir -p "$wt_dir/build"
        ln -s "$REPO_ROOT/build/compilers" "$wt_dir/build/compilers"
        ln -s "$REPO_ROOT/build/tools" "$wt_dir/build/tools"
        ln -s "$REPO_ROOT/build/ppc_binutils" "$wt_dir/build/ppc_binutils"

        # Generate build configuration in worktree
        (cd "$wt_dir" && python3 configure.py >/dev/null 2>&1)

        local worker_args=(
            "$SCRIPT_PATH"
            --worker-id "$i"
            --workers 1
            --worktree
            --max-iterations "$MAX_ITERATIONS"
            --delay "$DELAY_SECONDS"
            --prompt "$REPO_ROOT/$PROMPT_FILE"
            --log-dir "$REPO_ROOT/$LOG_DIR"
        )
        if [[ "$INFINITE" == "true" ]]; then
            worker_args+=(--infinite)
        fi
        if [[ -n "$worker_unit" ]]; then
            worker_args+=(--target-unit "$worker_unit")
        fi
        if [[ "$VERBOSE" == "true" ]]; then
            worker_args+=(--verbose)
        fi
        if [[ "$QUIET" == "true" ]]; then
            worker_args+=(--quiet)
        fi

        (
            cd "$wt_dir" && exec "${worker_args[@]}"
        ) > "$REPO_ROOT/$LOG_DIR/worker_${i}_console.log" 2>&1 &
        local pid=$!
        WORKER_PIDS+=("$pid")
        log_info "  └─ Worker $i started (PID: $pid, log: $LOG_DIR/worker_${i}_console.log)"
    done

    echo ""
    log_info "All $WORKERS worker(s) running. (Press Ctrl+C to stop)"
    echo ""

    while true; do
        local running_count=0
        for pid in "${WORKER_PIDS[@]}"; do
            if kill -0 "$pid" 2>/dev/null; then
                running_count=$((running_count + 1))
            fi
        done
        if [[ "$running_count" -eq 0 ]]; then
            log_info "All parallel workers have finished."
            break
        fi
        sleep 5
    done
}

print_final_summary() {
    echo ""
    log_info "=================================================================="
    log_info "📊 Ralph Loop Session Complete"
    log_info "Total iterations run: $ITERATION"
    if [[ -f "$REPO_ROOT/configure.py" ]]; then
        echo ""
        python3 "$REPO_ROOT/configure.py" progress || true
    fi
    log_info "=================================================================="
}

main() {
    parse_args "$@"
    check_prerequisites
    check_git_clean

    if [[ "$WORKERS" -gt 1 ]]; then
        spawn_parallel_workers
    else
        run_loop
        print_final_summary
    fi
}

main "$@"
