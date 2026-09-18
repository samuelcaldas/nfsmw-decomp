# Ralph Loop Decompilation Prompt

You are an automated decompilation agent working iteratively to achieve a 100% matching decompilation of Need for Speed: Most Wanted (primary target: GameCube `GOWE69`).

Your goal in this iteration is to pick **one** candidate function, decompile or refine it until it reaches a **100% match**, verify zero regressions, and commit the result.

---

## State Machine Workflow

### Step 1: Check Progress & Completion Condition
Run the progress command:
```bash
python3 configure.py progress
```
- Inspect the output for `Game Code` or overall `All` code match percentage.
- **Completion Check:** If Game Code is 100.00% matched (or your target unit is 100% matched with 0 remaining functions), output:
  ```
  <promise>FULL DECOMPILATION COMPLETE</promise>
  ```
  and finish immediately.

---

### Step 2: Select Next Candidate Function
Run the deterministic candidate selector:
```bash
python3 scripts/next-decomp-candidate.py --limit 1
```
*(Note: If working on a specific subsystem or unit, append `--unit <unit_name>` or `--category libs`.)*

Extract:
- **Unit**: e.g., `main/Speed/Indep/SourceLists/zFe`
- **Symbol**: e.g., `CheckUnplugged__13cFEngJoyInput`
- **Demangled**: e.g., `cFEngJoyInput::CheckUnplugged`
- **Current Match**: e.g., `99.99%`

---

### Step 3: Extract Context & Assembly
Gather source location, DWARF signatures, and disassembly:
```bash
python3 tools/decomp-context.py -u <unit> -f <symbol> --no-ghidra
```

If additional symbol or type information is needed:
- DWARF lookup: `python3 tools/lookup.py symbols/Dwarf function "<demangled_name>"`
- Struct/Type lookup: `python3 tools/lookup.py symbols/Dwarf struct <StructName>`
- Original address to source line: `python3 tools/line_lookup.py symbols/debug_lines.txt <address>`

---

### Step 4: Refine C++ Implementation
1. Locate the source file printed in the context step (under `src/Speed/Indep/Src/...`).
2. Read the function implementation and surrounding context.
3. Inspect assembly differences using:
   ```bash
   python3 tools/decomp-diff.py -u <unit> -d <symbol>
   ```
4. Adjust the C++ code to resolve assembly differences:
   - Match local variable declaration order and scoping (affects stack frame layout).
   - Check signed vs unsigned types (`int`, `unsigned int`, `short`, `unsigned char`).
   - Check loop constructs (`for`, `while`, `do-while`).
   - Check ternary operators vs `if-else` or early returns.
   - Check pointer vs reference parameters, `const` qualifiers.
   - Check inline method calls, compiler intrinsics, or macros.

---

### Step 5: Compile & Diff
1. Recompile with ninja:
   ```bash
   ninja
   ```
2. If compilation fails:
   - Inspect compiler error messages.
   - Fix syntax or typing issues.
   - If unable to fix, run `git restore .` to leave working tree clean.
3. Compare compiled assembly against target binary:
   ```bash
   python3 tools/decomp-diff.py -u <unit> -d <symbol>
   ```
4. Iterate on Step 4 & 5 until 100.0% match is achieved.

---

### Step 6: Verify Regressions
Before committing, ensure no other functions were inadvertently affected:
```bash
ninja changes
```
- Verify that no regressions occurred.
- If regressions were introduced, revert changes with `git restore .` and analyze what caused the mismatch.

---

### Step 7: Commit Matched Function
Once verified with 100.0% match and clean `ninja changes`:
1. Commit the matched function:
   ```bash
   git add -u
   git commit -m "match: <demangled_name> in <unit>

   Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
   ```
2. **Check Unit Completion:** If all functions in this unit are now 100% matched:
   - Check `configure.py` for this unit.
   - Switch `Object(NonMatching, ...)` to `Object(Matching, ...)`.
   - Run `python3 configure.py && ninja`.
   - Commit the unit status update:
     ```bash
     git add configure.py
     git commit -m "feat(decomp): mark <unit> as Matching in configure.py

     Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
     ```

---

## Guardrails & Non-Negotiable Rules

1. **Atomic Commits**: Exactly one function or one unit milestone per iteration.
2. **Zero Regressions**: `ninja changes` must report clean/no regressions before committing.
3. **Fail-Fast Restoration**: Never leave a broken build or partially modified state. If an iteration fails to match, run `git restore .` to reset.
4. **Code Quality**:
   - Adhere to the repository's `.clang-format` and `.clang-tidy`.
   - Do not delete meaningful comments.
   - Do not introduce compiler warnings.
5. **Deterministic Signal**: Only emit `<promise>FULL DECOMPILATION COMPLETE</promise>` when 100% match is reached.
