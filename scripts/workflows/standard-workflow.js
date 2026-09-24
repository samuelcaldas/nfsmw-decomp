/**
 * @file standard-workflow.js
 * @brief Standardized Reusable Ultracode Decompilation Workflow Template for NFSMW.
 *
 * This workflow is activated via the `ultracode` keyword and strictly uses
 * `gemini-3.5-flash-lite` via the `decomp-worker` agent type for fast,
 * high-throughput, and cost-effective matching decompilation.
 *
 * Usage:
 * 1. Define your candidate functions in the `BATCH_PHASE_1` (and optional `BATCH_PHASE_2`) arrays.
 * 2. Run with Claude Workflow or Ultracode runner.
 * 3. Each worker operates in an isolated worktree, tests assembly matching,
 *    verifies zero regressions, and commits atomic matching improvements.
 */

export const meta = {
  name: 'standard-decomp-batch',
  description: 'Standardized parallel matching decompilation workflow strictly using gemini-3.5-flash-lite',
  phases: [
    { title: 'Decomp-P1', detail: 'Phase 1: Parallel decompilation batch in isolated worktrees' },
    { title: 'Decomp-P2', detail: 'Phase 2: Secondary decompilation batch in isolated worktrees' },
  ],
}

const DECOMP_SCHEMA = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    function_name: { type: 'string' },
    unit: { type: 'string' },
    branch_name: { type: 'string' },
    match_percentage: { type: 'number' },
    source_file: { type: 'string' },
    virtual_address: { type: 'string' },
    size_bytes: { type: 'number' },
    signature: { type: 'string' },
    description: { type: 'string' },
    notes: { type: 'string' },
  },
  required: ['success', 'function_name', 'unit', 'branch_name'],
}

/**
 * Configure target candidates for Phase 1.
 * Replace or populate with targets from `python3 scripts/next-decomp-candidate.py`.
 */
const BATCH_PHASE_1 = [
  // Example candidate entry structure:
  // {
  //   demangled: 'Namespace::FunctionName',
  //   symbol: 'MangledSymbolName',
  //   unit: 'main/Speed/Indep/SourceLists/zUnit',
  //   size: 128,
  //   match: 95.0,
  //   source_file: 'src/Speed/Indep/Src/.../File.cpp',
  //   virtual_address: '0x80XXXXXX',
  //   signature: 'void Namespace::FunctionName(...)',
  //   hint: 'Specific register allocation or loop scheduling instructions...',
  // },
]

/**
 * Configure target candidates for Phase 2 (optional).
 */
const BATCH_PHASE_2 = []

/**
 * Generates the standardized decompilation prompt for gemini-3.5-flash-lite workers.
 *
 * @param {object} cand Candidate descriptor object
 * @returns {string} Fully specified worker prompt
 */
function makeDecompPrompt(cand) {
  return `You are an expert GameCube PowerPC C++ matching decompilation engineer.
Decompile and achieve 100.0% binary matching for function '${cand.demangled}' in unit '${cand.unit}'.

Target Details:
- Function Name: ${cand.demangled}
- Mangled Symbol: ${cand.symbol}
- Unit: ${cand.unit}
- Source File: ${cand.source_file}
- Virtual Address: ${cand.virtual_address}
- Size: ${cand.size} bytes
- Signature: ${cand.signature}
- Initial Match: ${cand.match || 0.0}%
- Specific Matching Hint: ${cand.hint || 'Inspect diff and match register allocation / stack layout.'}

Operating Rules:
1. You are running in an isolated git worktree with your own branch.
2. Initialize worktree symlinks and baseline if missing:
   ln -sfn /home/samuelcaldas/source/repos/nfsmw/orig orig
   mkdir -p build && ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/tools build/tools
   ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/compilers build/compilers
   ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/ppc_binutils build/ppc_binutils
   mkdir -p build/GOWE69 && cp /home/samuelcaldas/source/repos/nfsmw/build/GOWE69/baseline.json build/GOWE69/baseline.json 2>/dev/null || true
   python3 configure.py
3. Read the source file around ${cand.demangled} and examine the current implementation.
4. Check the objdiff diff using:
   python3 tools/decomp-diff.py -u ${cand.unit} -d ${cand.symbol}
5. Apply the hint and iteratively refine the code in ${cand.source_file}.
6. **Anti-Slop Guardrails Check**:
   - Ensure 100.0% match parity is achieved strictly via correct control flow, types, and compiler idioms.
   - Prohibit shortcut anti-patterns: no forced register hacks, no pointer offset arithmetic bypassing DWARF struct definitions (`*(type*)((char*)p + offset)`), no arbitrary renaming, no redundant redeclarations or unnecessary casts.
7. Compile and verify using:
   ninja build/GOWE69/${cand.unit}.o
   python3 tools/decomp-diff.py -u ${cand.unit} -d ${cand.symbol}
8. Ensure the entire build passes without regression:
   ninja
   ninja changes
9. Ensure clean Doxygen docstrings (@brief, @param, @return).
10. If matched or improved, commit your changes in this worktree:
   git add ${cand.source_file} && git commit -m "match(${cand.unit.split('/').pop()}): decompile ${cand.demangled}"
11. Return the structured output with your final match percentage and branch name.`
}

// ---------------------------------------------------------------------------
// Execution Pipeline
// ---------------------------------------------------------------------------

if (BATCH_PHASE_1.length > 0) {
  phase('Decomp-P1')
  log(`Starting Phase 1 decompilation (${BATCH_PHASE_1.length} candidates) using gemini-3.5-flash-lite workers...`)
  const p1_results = await parallel(
    BATCH_PHASE_1.map((cand) => () =>
      agent(makeDecompPrompt(cand), {
        label: `decomp:${cand.demangled.split('::').pop()}`,
        phase: 'Decomp-P1',
        isolation: 'worktree',
        agentType: 'decomp-worker', // Strictly gemini-3.5-flash-lite
        schema: DECOMP_SCHEMA,
      })
    )
  )
  log(`Phase 1 complete. Results: ${JSON.stringify(p1_results)}`)
}

if (BATCH_PHASE_2.length > 0) {
  phase('Decomp-P2')
  log(`Starting Phase 2 decompilation (${BATCH_PHASE_2.length} candidates) using gemini-3.5-flash-lite workers...`)
  const p2_results = await parallel(
    BATCH_PHASE_2.map((cand) => () =>
      agent(makeDecompPrompt(cand), {
        label: `decomp:${cand.demangled.split('::').pop()}`,
        phase: 'Decomp-P2',
        isolation: 'worktree',
        agentType: 'decomp-worker', // Strictly gemini-3.5-flash-lite
        schema: DECOMP_SCHEMA,
      })
    )
  )
  log(`Phase 2 complete. Results: ${JSON.stringify(p2_results)}`)
}
