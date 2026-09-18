# Ralph Loop Decompilation Automation Plan

## Context
The goal of this project is a 100% matching decompilation of Need for Speed: Most Wanted (primary target: GameCube `GOWE69`). 
Currently, the codebase stands at ~38.3% code match and ~43.7% fuzzy match across 18,432 functions.
Manual matching is repetitive and iterative:
1. Identify a candidate non-matching function.
2. Inspect assembly, DWARF symbols, and line numbers.
3. Edit C++ source code.
4. Compile with `ninja` (SN Systems ProDG 3.9.3 under `wibo`).
5. Compare assembly with `objdiff-cli` / `decomp-diff.py`.
6. Verify no regressions with `ninja changes`.
7. Commit matched code.

The **Ralph Wiggum technique** (repeating the same prompt in a loop, allowing the model to inspect previous progress in git history and disk state) is ideal for automating this workflow until full decompilation or milestone completion is achieved.

---

## Deliverables

1. **`scripts/next-decomp-candidate.py`**:
   - A deterministic candidate selector that inspects `build/GOWE69/report.json` and ranks functions by easiest/highest match percentage or smallest instruction count.
   - Outputs the target unit, symbol name, current match percentage, and ready-to-run context commands.
   - Allows scoping by library or subsystem (e.g., `--category libs` or `--unit <unit_name>`).

2. **`prompts/decomp-loop.md`**:
   - The self-contained prompt fed to Claude on each iteration of the Ralph loop.
   - Defines the precise state machine:
     - Check current progress with `python3 configure.py progress`.
     - Detect completion condition: if 100% code match is achieved, output `<promise>FULL DECOMPILATION COMPLETE</promise>` and stop.
     - Execute `python3 scripts/next-decomp-candidate.py` to pick the next function.
     - Extract context with `python3 tools/decomp-context.py -u <unit> -f <function> --no-ghidra`.
     - Refine C++ code in `src/Speed/Indep/Src/...`.
     - Build with `ninja` and diff with `python3 tools/decomp-diff.py -u <unit> -d <function>`.
     - Verify regression status with `ninja changes`.
     - If regression occurs or compilation fails, revert changes with `git restore`.
     - If 100% match achieved, commit the change: `git commit -m "match: <function_name> in <unit>"`.
     - If all functions in a unit match, update `configure.py` (`NonMatching` -> `Matching`).

3. **`scripts/ralph-decomp.sh`**:
   - A standalone bash runner script for terminal or headless environments executing:
     ```bash
     while :; do
       cat prompts/decomp-loop.md | claude --continue
     done
     ```
   - Features safety controls: maximum iteration count, git status sanity checks, and automatic halt upon detecting `<promise>FULL DECOMPILATION COMPLETE</promise>`.

4. **In-Session Command Integration**:
   - Document how to launch the loop inside an interactive Claude Code session via the `/ralph-loop` plugin:
     ```sh
     /ralph-loop "$(cat prompts/decomp-loop.md)" --completion-promise "FULL DECOMPILATION COMPLETE" --max-iterations 50
     ```

---

## Implementation Steps

### Step 1: Create `scripts/next-decomp-candidate.py`
- Parse `build/GOWE69/report.json`.
- Extract all functions with `match_percent < 100.0` or missing in decompilation.
- Support sorting strategies:
  - `--strategy highest-fuzzy`: Functions closest to 100% (e.g. 60%–99% match) for rapid completion.
  - `--strategy smallest`: Functions with fewest instructions / bytes.
- Output formatting:
  - Prints unit path, mangled symbol, demangled name, size, match percentage.
  - Outputs the exact `tools/decomp-context.py` command to run next.

### Step 2: Create `prompts/decomp-loop.md`
- Craft the Ralph prompt with clear guardrails:
  - Rule 1: Always check `ninja progress` first.
  - Rule 2: Pick one function per iteration to keep commits atomic and clean.
  - Rule 3: Use existing tools (`tools/decomp-context.py`, `tools/decomp-diff.py`, `tools/line_lookup.py`).
  - Rule 4: Zero regressions allowed (`ninja changes` must pass cleanly).
  - Rule 5: Commit matching functions immediately.
  - Rule 6: Emit `<promise>FULL DECOMPILATION COMPLETE</promise>` when 100% progress is reached.

### Step 3: Create `scripts/ralph-decomp.sh`
- Write the shell harness with CLI flags:
  - `--max-iterations <N>` (default: 50)
  - `--target-unit <name>` (optional scope filter)
  - `--delay <seconds>` (sleep between iterations if desired)
- Include graceful exit on `SIGINT` (Ctrl+C).

### Step 4: Verification & Testing
- Test `scripts/next-decomp-candidate.py` on the current `report.json` to verify it correctly identifies real candidates (e.g. `SNDAEMSI_timerupdate` in `saemstimupdt`).
- Perform a single dry run of the decompilation iteration workflow to confirm the candidate selection, context gathering, compilation, diffing, and regression testing steps work smoothly together.
