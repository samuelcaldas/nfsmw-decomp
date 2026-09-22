# Parallel Decompilation via Ultracode Workflow

## Context

NFSMW decompilation is at **56.67% matched** (61.12% game code) with **7,071 remaining candidate functions** across 392 compilation units. The machine has **16 CPU cores**. No worktrees currently exist. The goal is to parallelize decompilation work across multiple agents in isolated worktrees, each following the `prompts/decomp-loop.md` iterative state machine.

## Approach

Launch a single **Ultracode Workflow** that fans out **5 parallel agents**, each in an isolated git worktree (`isolation: 'worktree'`), each scoped to a disjoint set of compilation units. Each agent follows the decomp-loop prompt: select candidate → extract context/assembly → refine C++ → compile → diff → verify regressions → commit. Each agent iterates up to **3 functions** per run (conservative to avoid context exhaustion).

After the workflow completes, merge each worktree branch into `main` sequentially, verify zero regressions, and clean up.

## Pre-Workflow Setup

1. **Clean working tree**: Commit or stash the modified `EFadeScreenNoLoadingBarOn.hpp`.
2. **Sync with remote**: `git fetch origin && git rebase origin/main`.
3. **Ensure build is current**: `python3 configure.py && ninja`.
4. **Create custom agent type**: Write `.claude/agents/decomp-worker.md` with `model: gemini-3.8-flash-high` in frontmatter so workflow agents use the preferred model via `agentType: 'decomp-worker'`.

## Workflow Script Design

### Worker Groups (partitioned by unit, balanced by top-100 candidate count)

| Worker | Units | Candidates (top-100) |
|--------|-------|---------------------|
| 1 — Frontend | `zFe2`, `zFe`, `zFEng` | 31 |
| 2 — Overlay | `zFeOverlay`, `zTrack` | 20 |
| 3 — World | `zWorld`, `zWorld2`, `zMain` | 17 |
| 4 — Physics | `zEcstasy`, `zPhysicsBehaviors`, `zAnim` | 12 |
| 5 — Audio/AI | `zEAXSound2`, `zEAXSound`, `zBWare`, `zAI`, `zSim`, `zCamera` | 20 |

Units are disjoint — each compiles separate `.cpp` source files, so no file conflicts between workers.

### Script Structure

```
Phase 1: "Setup"       — log worker assignments
Phase 2: "Decompile"   — 5 parallel agents, each in a worktree
```

Each agent prompt includes:
1. **Worktree build setup**: create `build/` dir, symlink shared tools (`build/compilers`, `build/tools`, `build/ppc_binutils`) from `../../build/`, run `python3 configure.py && ninja`
2. **Scoped decomp-loop**: the full `prompts/decomp-loop.md` content with `--unit <unit>` flags for candidate selection
3. **Iteration cap**: "Repeat steps 2-7 up to 3 times, then stop and report results"
4. **Commit convention**: `match: <demangled_name> in <unit>`

The `agent()` calls use:
- `isolation: 'worktree'` for git isolation
- `agentType: 'decomp-worker'` to use `gemini-3.8-flash-high`
- `phase: 'Decompile'` to avoid phase-state races
- `label: 'worker-N-frontend'` etc. for progress display
- `schema` with a results object (functions attempted, matched, failed)

### Results Schema

```json
{
  "type": "object",
  "properties": {
    "functions_attempted": {"type": "number"},
    "functions_matched": {"type": "number"},
    "matched_symbols": {
      "type": "array",
      "items": {"type": "string"}
    },
    "failed_symbols": {
      "type": "array",
      "items": {"type": "string"}
    },
    "notes": {"type": "string"}
  },
  "required": ["functions_attempted", "functions_matched", "matched_symbols", "failed_symbols"]
}
```

## Post-Workflow Merge

After all agents complete:

1. **List worktree branches**: `git worktree list` and `git branch`
2. **For each branch** (sequentially):
   ```bash
   git fetch . <branch>:refs/heads/<branch>
   git merge --no-ff <branch>
   ```
3. **Verify**: `ninja && ninja changes` — must show zero regressions
4. **Progress**: `python3 configure.py progress`
5. **Cleanup**: `git worktree remove <path> && git branch -d <branch>`

## Critical Files

- `prompts/decomp-loop.md` — base prompt (steps 1-7, guardrails)
- `scripts/next-decomp-candidate.py` — candidate selector (`--unit <name> --limit 1`)
- `tools/decomp-context.py` — context/assembly extractor (`-u <unit> -f <symbol>`)
- `tools/decomp-diff.py` — assembly diff tool (`-u <unit> -d <symbol>`)
- `configure.py` — build config generator
- `scripts/ralph-decomp.sh:443-463` — reference for worktree setup (symlinks, configure)

## Model Override — Resolved

Create `.claude/agents/decomp-worker.md` with frontmatter:
```yaml
---
model: gemini-3.8-flash-high
---
```
Then pass `agentType: 'decomp-worker'` in each `agent()` call.

## Verification

1. Each agent runs `ninja changes` before every commit (built into decomp-loop guardrails)
2. Post-merge: `ninja && ninja changes` on main branch
3. Final: `python3 configure.py progress` to measure improvement
4. Expected outcome: 10-15 newly matched functions per workflow run (3 per worker x 5 workers, minus failures)

## Re-running

The workflow is designed to be re-run. Each run picks the next-best candidates via `next-decomp-candidate.py` (sorted by highest fuzzy match). Re-run until progress plateaus or all easy candidates are exhausted.
