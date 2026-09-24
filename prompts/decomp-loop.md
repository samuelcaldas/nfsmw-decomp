spawn subagents
ultracode
/mattpocock-skills:tdd
/commit-commands:commit
do not remove tests, but update it, ensuring full tdd spec.
/commit-commands:commit
!git pull
!git push

# Autonomous Multi-Agent Decompilation Loop (Target: GameCube `GOWE69`)

You are an automated decompilation orchestration and execution agent for **Need for Speed: Most Wanted** (primary target: GameCube `GOWE69`, built with SN Systems ProDG 3.9.3 for game code and CodeWarrior for Dolphin SDK).

---

## 1. Main Goal & Termination Condition

- **Ultimate Goal:** Full 100% matching decompilation of all game code and modules in `GOWE69` using coordinated, parallel agents.
- **Scope:** All decompilable game code and modules present in the current target repository and game binaries (`orig/GOWE69/NFSMWRELEASE.ELF`).
- **Decompilation Assumptions:** Assume there is **NO** relevant decompiled code from other editions (such as PS3, Xbox 360, or PC). All implementations must be derived directly from the GOWE69 ELF/DWARF debug symbols, assembly diffs, headers, and reverse engineering tools in this repository.
- **Completion Condition:** The task ends **ONLY** when every identified code chunk is either:
  1. Fully decompiled, verified with zero regressions, documented in live `docs/*.md`, and merged into `main`; OR
  2. Explicitly recorded as `[blocked]` in `docs/decompilation_status_ledger.md` with the precise missing dependency, type, or architectural context stated.
- **Deterministic Signal:** Emit `<promise>FULL DECOMPILATION COMPLETE</promise>` only when Game Code reaches 100.00% matching parity across all units.

---

## 2. Multi-Agent Orchestration & Workflow Architecture

Parallelization is driven strictly via deterministic workflow scripts activated by the `ultracode` keyword.
**Workflows are mandatory** because they enforce idempotency across concurrent decompilation batches: guaranteeing deterministic phase execution, structured result schemas, reproducible worktree isolation, and atomic commits.
All workflow implementations must follow and reuse the standardized template:
- `scripts/workflows/standard-workflow.js` (canonical template)
- Reference existing batch implementations in `scripts/workflows/nfs*.js`

You may start multiple workflows, each workflow orchestrating its respective agents, to maximize parallel throughput.

### 2.1 Spawning 6 Agents Inside Workflow Per Round
Each workflow iteration must **spawn 6 agents inside the workflow per round** (partitioned into parallel execution phases or concurrent worker batches) to maximize parallel throughput without exceeding system stability:
- **Round Sizing:** Select 6 distinct, non-overlapping candidate functions per workflow round.
- **Batching Pattern:** Group into concurrent pairs or triplets (e.g., `Phase 1: Candidates 1-3`, `Phase 2: Candidates 4-6`, or a 6-worker `parallel()` pool).
- **Continuous Pipeline Replenishment:** Whenever an agent finishes its chunk, start another agent in its place immediately. Never leave execution slots idle while unassigned candidate chunks remain.

### 2.2 Specialized Agent Roles
Decompilation tasks should utilize specialized roles (or an agent fulfilling multiple roles):
1. **Chunk Selection & Planning:** Identifies candidates from `scripts/next-decomp-candidate.py`, verifies unassigned status, partitions across compilation units (`zFe`, `zEAXSound2`, `zPhysicsBehaviors`, `zWorld`, `zAI`, `zCamera`, etc.) to minimize overlap risk.
2. **Decompilation & Implementation:** Analyzes DWARF types, reconstructs function logic, adjusts local variables, scoping, register allocation, and instruction scheduling to achieve 100.0% matching parity against ProDG GCC output.
3. **Validation & Testing:** Executes `ninja` compilation, runs `ninja changes` regression analysis, and verifies symbol match percentage.
4. **Docs & Integration:** Inserts standard Doxygen docstrings, updates `docs/decompiled_functions.md`, records status in `docs/decompilation_status_ledger.md`, and performs serialized rebase and merge into `main`.

### 2.3 Strict Subagent Model Selection: `gemini-3.5-flash-lite`
- **Mandatory Model:** All subagents and workflow workers must strictly use `gemini-3.5-flash-lite` via `agentType: 'decomp-worker'` (or `model: gemini-3.5-flash-lite`).
- **Rationale:** `gemini-3.5-flash-lite` is exceptionally fast, lightweight, and cost-efficient. Its rapid response latency and high token budget efficiency make it the required choice for iterative assembly diffing, compiler option permutations, and parallel worktree matching.
- **No Heavy Model Drift:** Do not switch to larger or slower models for iterative decompilation loops unless explicitly requested by the user.

---

## 3. Peer Agent Discovery & Multi-Session Coordination

Multiple interactive and automated Claude sessions operate concurrently on this repository across a dedicated peer pool:
- `@nfs1`: Unit focus (e.g., `zFe`, Frontend UI)
- `@nfs2`: Unit focus (e.g., `zEAXSound2`, Audio subsystems)
- `@nfs3`: Unit focus (e.g., `zWorld`, World and Collision)
- `@nfs4`: Unit focus (e.g., `zGameplay`, Game rules and Vault)
- `@nfs5`: Unit focus (e.g., `zPhysics`, Vehicle dynamics and Math)
- Orchestrator session (`@nfs6` / `main`): Upstream integration, conflict resolution, global synchronization.

Always discover whatever sessions are currently present via `ListAgents`.

### 3.1 Coordination Rules
- **Discover Running Peers:** Run `ListAgents` at the start of planning to detect all currently active peer sessions and background agents on the machine.
- **Prevent Overlap & Collision:**
  - Before claiming a function or module, cross-check git log, active worktrees (`git worktree list`), and active workflow scripts in `scripts/workflows/`.
  - Interact with other running agents (`@nfs1`, `@nfs2`, `@nfs3`, `@nfs4`, `@nfs5`) via `SendMessage` to avoid overlap, rework, and to confirm specific units/chunks actively being executed.
  - Coordinate before taking a chunk and before executing a merge onto `main`.
- **Periodic Git Sync & Rebase:**
  - Regularly run `git fetch origin && git rebase origin/main` inside worktrees to absorb peer commits.
  - Never push or merge without syncing against the latest upstream `origin/main`.
- **Conflict Arbitration:** If peer agents disagree or a collision occurs, defer strictly to:
  1. The latest validated evidence (`ninja changes`, commit history on `main`).
  2. Recorded ownership and status in `docs/decompilation_status_ledger.md`.
- **Merge Coordination:** Coordinate merges to prevent simultaneous rebases on `main`.

---

## 4. Worktree Isolation & Serialized Merge Protocol

Every decompilation agent **must** work in its own isolated git worktree. Never edit source code directly on `main`.

### 4.1 Worktree Setup
When launching a subagent or worker in a worktree (`.claude/worktrees/<name>` or `.worktrees/<name>`):
```bash
# Set up required symlinks and build configuration inside worktree root:
ln -sfn /home/samuelcaldas/source/repos/nfsmw/orig orig
mkdir -p build
ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/tools build/tools
ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/compilers build/compilers
ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/ppc_binutils build/ppc_binutils
mkdir -p build/GOWE69 && cp /home/samuelcaldas/source/repos/nfsmw/build/GOWE69/baseline.json build/GOWE69/baseline.json 2>/dev/null || true
python3 configure.py
ninja  # Verify clean baseline compilation
```

### 4.2 Serialized Merge to `main`
Merges into `main` must be strictly serialized:
1. **Clean Worktree Check:** `git status` must be clean; all changes committed to the feature branch.
2. **Fetch and Rebase:**
   ```bash
   git fetch origin
   git checkout main
   git pull --rebase origin main
   ```
3. **Merge Feature Branch:**
   ```bash
   git merge --no-ff <branch_name>
   ```
4. **Conflict Resolution:** If a merge or rebase conflict occurs, resolve it immediately in favor of validated decompiled code, stage changes (`git add -A`), and commit (`git commit --no-edit`).
5. **Compilation & Regression Verification:**
   ```bash
   ninja
   ninja changes
   ```
   `ninja changes` **MUST** report 0 regressions against the baseline.
6. **Failure Recovery:** If regressions are introduced that cannot be resolved:
   ```bash
   git reset --hard HEAD^
   ```
   Do not leave `main` in a regressed or unbuildable state.
7. **Cleanup:** Delete the feature branch and prune worktrees (`git worktree prune`).

---

## 5. Decompilation State Machine & Iterative Refinement

For each assigned chunk, the agent must iterate through the following deterministic cycle:

### Step 1: Chunk Selection & Ownership Registration
- Run `python3 scripts/next-decomp-candidate.py --limit 6` to inspect top candidate functions.
- Prioritize unassigned code by highest project need, highest initial match percentage, and lowest overlap risk across compilation units.
- Select chunks small enough to completely refine and validate within one agent cycle.

### Step 2: Context Extraction & DWARF Discovery
- Never guess types or function signatures. Extract exact DWARF signatures and disassembly:
  ```bash
  python3 tools/decomp-context.py -u <unit> -f <symbol> --no-ghidra
  ```
- Lookup detailed type definitions and source line mapping:
  ```bash
  python3 tools/lookup.py symbols/Dwarf function "<demangled_name>"
  python3 tools/lookup.py symbols/Dwarf struct <StructName>
  python3 tools/line_lookup.py symbols/debug_lines.txt <address>
  ```
- If required context is missing (unresolved struct layout, missing header declaration), perform systematic discovery. If fundamentally blocked by missing dependencies, explicitly record the chunk as `[blocked]` in `docs/decompilation_status_ledger.md` with the exact missing element.

### Step 3: Implementation & Diff Refinement Loop
- Locate source file under `src/Speed/Indep/Src/...`.
- Inspect assembly differences:
  ```bash
  python3 tools/decomp-diff.py -u <unit> -d <symbol>
  ```
- Iterate on C++ implementation (up to 8 refinement rounds):
  - Order of local variable declarations (stack frame layout and register assignment).
  - Register assignment ordering for member stores (e.g., `stw r31, 4(r30)`, `8(r30)`).
  - Callee-saved register usage (`r30`, `r31`) across function calls.
  - Correct signed/unsigned types (`uint32`, `int16`, `unsigned char`).
  - Loop construct patterns (`for`, `while`, `do-while`).
  - Compiler intrinsics, branch structures, early returns.
  - Compile with `ninja` and verify progress with `python3 tools/decomp-diff.py`.
- Aim for 100.0% match parity or the highest verifiable match without regressions.

### Step 4: Docstring Insertion
Add a concise Doxygen docstring to every newly decompiled or materially modified function using the repository's convention:
```cpp
/**
 * @brief <summary of function operation>.
 */
```

### Step 5: Regression Verification
```bash
ninja changes
```
- **Expected Standards:** The chunk builds cleanly, passes all repository checks, matches the required decomp target, and causes **0 regressions**.
- If any regression occurs in touched or surrounding code, revert problematic edits immediately.

### Step 6: Atomic Commit
```bash
git add -u
git commit -m "match: <demangled_name> in <unit>

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

### Step 7: Live Documentation Update
Whenever code is merged into `main`, update documentation in `docs/*.md`:
1. **`docs/decompiled_functions.md`:** Add a detailed technical entry under the corresponding subsystem section:
   ```markdown
   ### `FunctionName`
   - **Unit**: <unit_name>
   - **Source File**: <source_path>
   - **Virtual Address**: <hex_address>
   - **Size**: <size> bytes
   - **Matching State**: <percentage>% match
   - **Signature**:
     ```cpp
     <function_signature>
     ```
   - **Description**: <concise technical description>
   ---
   ```
2. **`docs/decompilation_status_ledger.md`:**
   - Add the function as `[Completed & Merged]` under its subsystem in Section 1.
   - If blocked, record under Section 2 as `[blocked]` with the specific dependency or context needed.
3. Commit documentation updates:
   ```bash
   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md
   git commit -m "docs: record decompiled functions in ledger and documentation

   Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
   ```

---

## 6. Guardrails & Non-Negotiable Rules

1. **Continuous Execution:** Do not stop early to save agent or tool calls. Prefer concise, information-dense execution and proceed automatically until all candidate chunks are either merged or marked `[blocked]`.
2. **Zero Regressions:** `ninja changes` must report clean (0 regressions) before any merge.
3. **Dirty Worktree Rule:** Never merge with uncommitted changes. Commit or stash first.
4. **Clean Restores on Failure:** If an iteration fails to match or introduces regressions that cannot be resolved, run `git restore .` before concluding or switching tasks.
5. **Code Style Parity:** Follow `.clang-format` (C++03, column limit 150, indent 4, `SortIncludes: Never`) and `.clang-tidy`. Never reorder includes in unity builds.
