export const meta = {
  name: 'nfsmw-parallel-decomp-batch15-nfs3',
  description: 'Batch 15 decompilation for nfs3: SuspensionSimple::Tire::UpdateLoaded (zPhysicsBehaviors), WorldMap::SnapCursor (zFe), CARSFX_PreColWoosh::MsgBarrier (zEAXSound2), GinsuSynthData::BindToData (zEAXSound2)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: SuspensionSimple::Tire::UpdateLoaded (zPhysicsBehaviors) & WorldMap::SnapCursor (zFe)' },
    { title: 'Decomp-2', detail: 'Pair 2: CARSFX_PreColWoosh::MsgBarrier (zEAXSound2) & GinsuSynthData::BindToData (zEAXSound2)' },
    { title: 'Merge', detail: 'Sequential merge to main' },
    { title: 'Docs', detail: 'Update docs/decompiled_functions.md and status ledger' },
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

const MERGE_SCHEMA = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    function_name: { type: 'string' },
    merge_commit: { type: 'string' },
    notes: { type: 'string' },
  },
  required: ['success', 'function_name'],
}

const CANDIDATES_PAIR1 = [
  {
    demangled: 'SuspensionSimple::Tire::UpdateLoaded',
    symbol: 'UpdateLoaded__Q216SuspensionSimple4Tireffffff',
    unit: 'main/Speed/Indep/SourceLists/zPhysicsBehaviors',
    size: 1972,
    match: 98.9,
    source_file: 'src/Speed/Indep/Src/Physics/Behaviors/SuspensionSimple.cpp',
    virtual_address: '0x8024d320',
    extra_instructions: 'In SuspensionSimple.cpp around line 465-475: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zPhysicsBehaviors -d UpdateLoaded__Q216SuspensionSimple4Tireffffff. Align intermediate float expressions and temporary variables around normal load calculations and slip angle clamping to eliminate the remaining register mismatches and achieve 100.0% match parity with 0 regressions in ninja changes.',
  },
  {
    demangled: 'WorldMap::SnapCursor',
    symbol: 'SnapCursor__8WorldMap',
    unit: 'main/Speed/Indep/SourceLists/zFe',
    size: 436,
    match: 95.7,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/InGame/uiWorldMap.cpp',
    virtual_address: '0x8012bde0',
    extra_instructions: 'In uiWorldMap.cpp around line 787-805: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe -d SnapCursor__8WorldMap. Examine the if (snap_to != nullptr) block and SelectedItem checks. Align branching conditions and return value register setup (r3) to eliminate the branch and instruction ordering differences and reach 100.0% match parity with 0 regressions.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'CARSFX_PreColWoosh::MsgBarrier',
    symbol: 'MsgBarrier__18CARSFX_PreColWooshRC16MAudioReflection',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    size: 140,
    match: 94.3,
    source_file: 'src/Speed/Indep/Src/EAXSound/CARSFX/CARSFX_PreColWoosh.cpp',
    virtual_address: '0x800dc378',
    extra_instructions: 'In CARSFX_PreColWoosh.cpp around lines 48-59: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEAXSound2 -d MsgBarrier__18CARSFX_PreColWooshRC16MAudioReflection. Notice that in the original binary, li r4, 1 is loaded before stfs f13, 0x34(r10) (mDurationActive = 0.0f). Reorder parameter evaluation or local variables in this->WooshFadeOut.Initialize(1.0f, 1.0f, 1, LINEAR) to achieve 100.0% binary matching parity with 0 regressions.',
  },
  {
    demangled: 'GinsuSynthData::BindToData',
    symbol: 'BindToData__14GinsuSynthDataPv',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    size: 340,
    match: 96.8,
    source_file: 'src/Speed/Indep/Src/EAXSound/Ginsu/ginsudata.cpp',
    virtual_address: '0x800eae74',
    extra_instructions: 'In ginsudata.cpp around line 123-187: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEAXSound2 -d BindToData__14GinsuSynthDataPv. Match register allocations for base pointer offsets, loop index r5, and comparison values in the layout parsing loops to reach 100.0% match with 0 regressions.',
  },
]

function makePrompt(c) {
  return (
    'You are a GOWE69 decompilation specialist working in an isolated worktree.\n\n' +
    'ASSIGNED TARGET:\n' +
    '  Demangled: ' + c.demangled + '\n' +
    '  Symbol (mangled): ' + c.symbol + '\n' +
    '  Unit: ' + c.unit + '\n' +
    '  Initial match: ' + c.match + '%\n' +
    '  Size: ' + c.size + ' bytes\n' +
    '  Virtual address: ' + (c.virtual_address || 'unknown') + '\n' +
    '  Primary source: ' + c.source_file + '\n' +
    (c.extra_instructions ? '  Guidance: ' + c.extra_instructions + '\n\n' : '\n') +
    'WORKTREE SETUP & EXECUTION RULES:\n\n' +
    '## Step 0 — Setup environment symlinks\n' +
    'Run immediately in your worktree root:\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/orig orig\n' +
    '  mkdir -p build\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n' +
    '  python3 configure.py\n' +
    '  ninja  (quick build check to ensure build works)\n\n' +
    '## Step 1 — Context inspection\n' +
    'Inspect function context and initial diff:\n' +
    '  python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n\n' +
    '## Step 2 — Read implementation\n' +
    'Read ' + c.source_file + ' around ' + c.demangled + '.\n\n' +
    '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
    'Iterate on matching:\n' +
    'a. Study differences in python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'b. Adjust register allocation, local variable ordering, types, loop bounds, condition checks.\n' +
    'c. Compile with ninja.\n' +
    'd. Re-check diff and percentage.\n' +
    'Stop when 100.0% match is reached or highest possible match is achieved without regressions.\n\n' +
    '## Step 4 — Docstring\n' +
    'Ensure concise Doxygen docstring precedes the function:\n' +
    '  /**\n' +
    '   * @brief <summary>.\n' +
    '   */\n\n' +
    '## Step 5 — Regression verification\n' +
    '  ninja changes\n' +
    'MUST report 0 regressions (or only improvements to your unit).\n' +
    'If any regression occurs, revert problematic edits.\n\n' +
    '## Step 6 — Commit on branch\n' +
    '  git add -u\n' +
    '  git commit -m "match: ' + c.demangled + '\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"\n\n' +
    '## Step 7 — Structured report\n' +
    'Query branch: git rev-parse --abbrev-ref HEAD\n' +
    'Return structured result with all required schema fields.'
  )
}

log('Starting Batch 15 for nfs3: SuspensionSimple::Tire::UpdateLoaded, WorldMap::SnapCursor, CARSFX_PreColWoosh::MsgBarrier, GinsuSynthData::BindToData')

phase('Decomp-1')
const resultsPair1 = await parallel(CANDIDATES_PAIR1.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-1',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

phase('Decomp-2')
const resultsPair2 = await parallel(CANDIDATES_PAIR2.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-2',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

const allResults = [...resultsPair1, ...resultsPair2]
const succeeded = allResults.filter(Boolean).filter(r => r.success)
const failed = allResults.filter(Boolean).filter(r => !r.success)
log('Decomp phases finished: ' + succeeded.length + ' succeeded, ' + failed.length + ' failed')

phase('Merge')
const mergedFunctions = []
for (const result of succeeded) {
  log('Sequentially merging: ' + result.function_name + ' from ' + result.branch_name)
  const mr = await agent(
    'Merge a completed decompilation branch into main. Follow serialized protocol strictly.\n\n' +
    'Branch: ' + result.branch_name + '\n' +
    'Function: ' + result.function_name + '\n' +
    'Unit: ' + result.unit + '\n\n' +
    'Protocol:\n' +
    '1. git fetch origin\n' +
    '2. git checkout main\n' +
    '3. git pull --rebase origin main\n' +
    '4. git merge --no-ff ' + result.branch_name + '\n' +
    '   (If conflict: resolve cleanly in favor of decompiled code, git add -A, and git commit --no-edit)\n' +
    '5. ninja  (ensure compilation succeeds)\n' +
    '6. ninja changes  (ensure NO regressions against baseline)\n' +
    '7. If ninja changes is clean:\n' +
    '   - git branch -d ' + result.branch_name + ' (best effort cleanup)\n' +
    '   - Report success with merge commit: git rev-parse HEAD\n' +
    '8. If regressions found:\n' +
    '   - git reset --hard HEAD^\n' +
    '   - Report failure with explanation\n\n' +
    'Return structured output with success, function_name, merge_commit, notes.',
    {
      phase: 'Merge',
      label: 'merge:' + result.function_name.replace(/.*::/, '').slice(0, 20),
      schema: MERGE_SCHEMA,
    }
  )
  if (mr && mr.success) {
    mergedFunctions.push({ ...result, merge_commit: mr.merge_commit })
    log('  Successfully merged: ' + result.function_name + ' (' + mr.merge_commit + ')')
  } else {
    log('  Merge skipped/failed: ' + result.function_name + ' — ' + (mr ? mr.notes : 'null'))
  }
}

log('Total merged this batch: ' + mergedFunctions.length)

phase('Docs')
if (mergedFunctions.length > 0) {
  const fnList = mergedFunctions.map(r =>
    '- Function: ' + r.function_name + '\n' +
    '  Unit: ' + r.unit + '\n' +
    '  Source: ' + (r.source_file || 'unknown') + '\n' +
    '  Address: ' + (r.virtual_address || 'unknown') + '\n' +
    '  Size: ' + (r.size_bytes || 'unknown') + ' bytes\n' +
    '  Match: ' + (r.match_percentage || 'unknown') + '%\n' +
    '  Signature: ' + (r.signature || 'unknown') + '\n' +
    '  Description: ' + (r.description || 'unknown')
  ).join('\n')

  await agent(
    'Update decompilation documentation and ledger for newly merged functions.\n\n' +
    'Merged functions:\n' + fnList + '\n\n' +
    'Tasks:\n' +
    '1. Read docs/decompiled_functions.md\n' +
    '2. Add an entry for each function in the corresponding subsystem section.\n' +
    '   Use the exact markdown formatting of existing entries:\n' +
    '   ### `FunctionName`\n' +
    '   - **Unit**: ...\n' +
    '   - **Source File**: ...\n' +
    '   - **Virtual Address**: ...\n' +
    '   - **Size**: ... bytes\n' +
    '   - **Matching State**: ...% match\n' +
    '   - **Signature**:\n' +
    '     ```cpp\n' +
    '     ...\n' +
    '     ```\n' +
    '   - **Description**: ...\n' +
    '   ---\n\n' +
    '3. Read docs/decompilation_status_ledger.md and add each function as [Completed & Merged] under its subsystem in Section 1.\n' +
    '4. Commit and push documentation changes:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: record Batch 15 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"\n' +
    '   git push origin main',
    {
      phase: 'Docs',
      label: 'docs:update',
    }
  )
}

return {
  total_candidates: 4,
  succeeded: succeeded.length,
  failed: failed.length,
  merged: mergedFunctions.length,
  functions: mergedFunctions,
}
