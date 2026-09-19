# Ralph Loop Decompilation Automation

This document describes the Ralph loop automated decompilation workflow for Need for Speed: Most Wanted (target: `GOWE69`).

## Overview

The Ralph Wiggum technique runs a persistent, iterative state machine loop that guides Claude Code through matching decompilation tasks one function at a time. Each iteration inspects git and build artifacts, refines C++ source, checks for compiler warnings and regressions, and commits cleanly.

```
       ┌─────────────────────────────┐
       │   python3 configure.py      │
       │         progress            │
       └──────────────┬──────────────┘
                      │ (If 100% matched -> STOP)
                      ▼
       ┌─────────────────────────────┐
       │  scripts/next-decomp-       │
       │       candidate.py          │
       └──────────────┬──────────────┘
                      │
                      ▼
       ┌─────────────────────────────┐
       │  tools/decomp-context.py    │
       │    & tools/decomp-diff.py   │
       └──────────────┬──────────────┘
                      │
                      ▼
       ┌─────────────────────────────┐
       │     Refine C++ Source       │
       │       under src/...         │
       └──────────────┬──────────────┘
                      │
                      ▼
       ┌─────────────────────────────┐
       │    ninja && ninja changes   │
       │     (Zero regressions)      │
       └──────────────┬──────────────┘
                      │
                      ▼
       ┌─────────────────────────────┐
       │  git commit (Atomic match)  │
       │   & update configure.py     │
       └─────────────────────────────┘
```

---

## 1. Candidate Selector: `scripts/next-decomp-candidate.py`

Identifies and ranks candidate functions from `build/GOWE69/report.json`:

```bash
# Display top 5 functions closest to 100% match
python3 scripts/next-decomp-candidate.py

# Sort by smallest function size (fewest bytes)
python3 scripts/next-decomp-candidate.py --strategy smallest

# Scope to a specific compilation unit (e.g. zFe)
python3 scripts/next-decomp-candidate.py --unit zFe

# Scope to a specific library or category (e.g. libs, game, sdk)
python3 scripts/next-decomp-candidate.py --category libs

# Output machine-readable JSON
python3 scripts/next-decomp-candidate.py --json --limit 10

# Print only the context & diff shell commands for the top candidate
python3 scripts/next-decomp-candidate.py --commands-only
```

---

## 2. Running in an Interactive Claude Code Session (`/ralph-loop`)

If working inside an interactive Claude Code CLI session with the `/ralph-loop` plugin loaded:

```bash
/ralph-loop "$(cat prompts/decomp-loop.md)" --completion-promise "FULL DECOMPILATION COMPLETE" --max-iterations 50
```

To scope to a specific compilation unit:

```bash
/ralph-loop "Target Unit: zFe. Follow prompts/decomp-loop.md and run scripts/next-decomp-candidate.py --unit zFe" --completion-promise "FULL DECOMPILATION COMPLETE" --max-iterations 25
```

---

## 3. Running in Headless / Terminal Mode: `scripts/ralph-decomp.sh`

For long-running headless or background runs outside of an interactive prompt:

```bash
# Run infinitely with clean/concise logging and 3s delay
./scripts/ralph-decomp.sh --infinite --delay 3

# Multi-agent parallel decompilation across 4 workers
./scripts/ralph-decomp.sh --workers 4 --infinite

# Multi-agent parallel decompilation distributed across specific units
./scripts/ralph-decomp.sh --workers 3 --units zEcstasy,zAI,zFe --infinite

# Run 50 iterations targeting a specific unit
./scripts/ralph-decomp.sh --target-unit zFe --max-iterations 50

# Enable full verbose output
./scripts/ralph-decomp.sh --infinite --verbose

# Display all available options
./scripts/ralph-decomp.sh --help
```

### Multi-Agent Worktree Architecture
When `--workers <N>` (with `N > 1`) is specified:
- **Isolated Git Worktrees:** Each worker executes in an isolated worktree under `.worktrees/ralph-worker-<ID>` on branch `ralph-worker-<ID>`, preventing file modification races.
- **Candidate Partitioning:** Candidates are distributed across workers either by `--units` list or deterministic offset indexing (`--offset <worker_id>`).
- **Thread-Safe Synchronization:** When a worker achieves a 100% match commit, it acquires a mutual exclusion lock (`.git/ralph-merge.lock`) via `flock` to integrate the commit safely into the main branch and rebase the worker.
- **Dedicated Sessions:** Each iteration generates a unique session UUID (`uuidgen`), preventing session collisions across concurrent Claude processes.

### Safety & Guardrails
- **Zero Regressions:** Every iteration runs `ninja changes` to ensure matched code does not regress other symbols.
- **Atomic Commits:** Exactly one function is committed per iteration.
- **Fail-Fast Restore:** If a function cannot be matched without regressions, `git restore .` resets the working tree so the next iteration starts clean.
- **Completion Detection:** When `All` or `Game Code` reaches 100.00%, the runner detects `<promise>FULL DECOMPILATION COMPLETE</promise>` and terminates immediately.
