#!/usr/bin/env bash
# Ralph loop decompilation runner for Need for Speed: Most Wanted.
# Continuously executes iterative decompilation until full match or max iterations.

set -euo pipefail

MAX_ITERATIONS=50
TARGET_UNIT=""
DELAY_SECONDS=2
PROMPT_FILE="prompts/decomp-loop.md"
ITERATION=0
TMP_DIR="$(mktemp -d -t ralph-decomp-XXXXXX)"

cleanup() {
    rm -rf "$TMP_DIR"
    if [[ $ITERATION -gt 0 ]]; then
        echo ""
        echo "Ralph loop stopped at iteration $ITERATION."
    fi
}
trap cleanup EXIT INT TERM

show_help() {
    cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Options:
  -n, --max-iterations <N>  Maximum loop iterations (default: 50)
  -u, --target-unit <NAME>  Scope candidate selection to specific unit
  -d, --delay <SECONDS>     Delay in seconds between iterations (default: 2)
  -p, --prompt <FILE>       Path to prompt markdown file (default: prompts/decomp-loop.md)
  -h, --help                Show this help message and exit

Examples:
  $(basename "$0") --max-iterations 20
  $(basename "$0") --target-unit zFe --max-iterations 10
EOF
    exit 0
}

parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -n|--max-iterations)
                MAX_ITERATIONS="$2"
                shift 2
                ;;
            -u|--target-unit)
                TARGET_UNIT="$2"
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
        echo "Error: 'claude' CLI binary not found in PATH." >&2
        exit 1
    fi
    if [[ ! -f "$PROMPT_FILE" ]]; then
        echo "Error: Prompt file '$PROMPT_FILE' does not exist." >&2
        exit 1
    fi
    if [[ ! -f "scripts/next-decomp-candidate.py" ]]; then
        echo "Error: 'scripts/next-decomp-candidate.py' not found." >&2
        exit 1
    fi
}

check_git_clean() {
    if [[ -n "$(git status --porcelain)" ]]; then
        echo "Warning: Working directory is not clean. Untracked/modified files exist."
        git status --short
    fi
}

prepare_prompt() {
    local out_file="$1"
    if [[ -n "$TARGET_UNIT" ]]; then
        cat <<EOF > "$out_file"
**Target Scope Filter:** Please focus candidate selection strictly on unit: \`$TARGET_UNIT\`.
Run: \`python3 scripts/next-decomp-candidate.py --unit $TARGET_UNIT --limit 1\`

---

EOF
        cat "$PROMPT_FILE" >> "$out_file"
        return
    fi
    cp "$PROMPT_FILE" "$out_file"
}

check_completion_promise() {
    local log_file="$1"
    if grep -Fq "<promise>FULL DECOMPILATION COMPLETE</promise>" "$log_file"; then
        echo ""
        echo "=================================================================="
        echo "🎉 Ralph loop detected: FULL DECOMPILATION COMPLETE!"
        echo "=================================================================="
        return 0
    fi
    return 1
}

execute_claude_turn() {
    local prompt_file="$1"
    local log_file="$2"
    echo "Executing Claude iteration $ITERATION..."
    claude --continue < "$prompt_file" 2>&1 | tee "$log_file"
}

print_iteration_header() {
    echo ""
    echo "=================================================================="
    echo "🔄 Ralph Loop Iteration $ITERATION of $MAX_ITERATIONS"
    if [[ -n "$TARGET_UNIT" ]]; then
        echo "🎯 Target Unit: $TARGET_UNIT"
    fi
    echo "=================================================================="
}

run_loop() {
    while [[ $ITERATION -lt $MAX_ITERATIONS ]]; do
        ITERATION=$((ITERATION + 1))
        print_iteration_header

        local iter_prompt="$TMP_DIR/prompt_$ITERATION.md"
        local iter_log="$TMP_DIR/iter_$ITERATION.log"

        prepare_prompt "$iter_prompt"
        execute_claude_turn "$iter_prompt" "$iter_log"

        if check_completion_promise "$iter_log"; then
            break
        fi

        if [[ $ITERATION -lt $MAX_ITERATIONS && $DELAY_SECONDS -gt 0 ]]; then
            echo "Waiting ${DELAY_SECONDS}s before next iteration..."
            sleep "$DELAY_SECONDS"
        fi
    done
}

print_final_summary() {
    echo ""
    echo "=================================================================="
    echo "📊 Ralph Loop Session Complete"
    echo "Total iterations run: $ITERATION / $MAX_ITERATIONS"
    if [[ -f "configure.py" ]]; then
        echo ""
        python3 configure.py progress || true
    fi
    echo "=================================================================="
}

main() {
    parse_args "$@"
    check_prerequisites
    check_git_clean
    run_loop
    print_final_summary
}

main "$@"
