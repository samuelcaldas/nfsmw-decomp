export const meta = {
  name: 'nfsmw-parallel-decomp-batch7-nfs5',
  description: 'Batch 7 parallel decompilation for nfs5 (6 agents): zPhysicsBehaviors & zFEng targets with TDD and worktree isolation',
  phases: [
    { title: 'Decomp-Pool', detail: '6 concurrent worker agents on distinct candidate functions' },
    { title: 'Merge', detail: 'Sequential merge to main with regression verification' },
    { title: 'Docs', detail: 'Update documentation and status ledger' },
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

const CANDIDATES = [
  {
    demangled: 'SuspensionTraffic::Tire::UpdateLoaded',
    symbol: 'UpdateLoaded__Q217SuspensionTraffic4Tireffff',
    unit: 'main/Speed/Indep/SourceLists/zPhysicsBehaviors',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zPhysicsBehaviors.o',
    size: 856,
    match: 97.21,
    source_file: 'src/Speed/Indep/Src/Physics/Behaviors/SuspensionTraffic.cpp',
    virtual_address: '0x8024B310',
    signature: 'void SuspensionTraffic::Tire::UpdateLoaded(float lat_vel, float fwd_vel, float load, float dT)',
    extra_instructions:
      'Inspect SuspensionTraffic::Tire::UpdateLoaded in src/Speed/Indep/Src/Physics/Behaviors/SuspensionTraffic.cpp (lines 270-334).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zPhysicsBehaviors -d UpdateLoaded__Q217SuspensionTraffic4Tireffff\n' +
      'Currently at 97.21% match. Frame size is 0x30, stmw r30, 0x10(r1). The original binary preserves r30 across VU0_Atan2, holding constant lbl_803FB6B8 (1.0f).\n' +
      'Fine-tune local variable declarations and expressions to achieve 100.0% match parity with 0 regressions in ninja changes.',
  },
  {
    demangled: 'SuspensionSimple::Tire::UpdateLoaded',
    symbol: 'UpdateLoaded__Q216SuspensionSimple4Tireffffff',
    unit: 'main/Speed/Indep/SourceLists/zPhysicsBehaviors',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zPhysicsBehaviors.o',
    size: 1972,
    match: 98.90,
    source_file: 'src/Speed/Indep/Src/Physics/Behaviors/SuspensionSimple.cpp',
    virtual_address: '0x802462e0',
    signature: 'float SuspensionSimple::Tire::UpdateLoaded(float lat_vel, float fwd_vel, float body_speed, float load, float dT, float drag_reduction)',
    extra_instructions:
      'Inspect SuspensionSimple::Tire::UpdateLoaded in src/Speed/Indep/Src/Physics/Behaviors/SuspensionSimple.cpp (lines 402-524).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zPhysicsBehaviors -d UpdateLoaded__Q216SuspensionSimple4Tireffffff\n' +
      'Currently at 98.90% match. Minor float scheduling differences and register allocations in tire load, friction, and traction calculations.\n' +
      'Refine local float variables and expression order to reach 100.0% match parity.',
  },
  {
    demangled: 'FEPackageReader::ReadObjectChunk',
    symbol: 'ReadObjectChunk__15FEPackageReader',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 964,
    match: 96.67,
    source_file: 'src/Speed/Indep/Src/FEng/FEPackageReader.cpp',
    virtual_address: '0x8018C1B0',
    signature: 'bool FEPackageReader::ReadObjectChunk()',
    extra_instructions:
      'Inspect FEPackageReader::ReadObjectChunk in src/Speed/Indep/Src/FEng/FEPackageReader.cpp (lines 249-342).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d ReadObjectChunk__15FEPackageReader\n' +
      'Currently at 96.67% match. Register allocation differences (r30, r31 vs r8, r10, r11) for constants 0xea624f46 and 0x6e747542, and loop boundary checks.\n' +
      'Refine local variable declarations and scoping to reach 100.0% match.',
  },
  {
    demangled: 'FEngine::ProcessResponses',
    symbol: 'ProcessResponses__7FEngineP17FEMessageResponseP8FEObjectP9FEPackageUl',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 1172,
    match: 96.58,
    source_file: 'src/Speed/Indep/Src/FEng/FEngine.cpp',
    virtual_address: '0x80187FE4',
    signature: 'void FEngine::ProcessResponses(FEMessageResponse *pRespList, FEObject *pObj, FEPackage *pPack, u32 ControlMask)',
    extra_instructions:
      'Inspect FEngine::ProcessResponses in src/Speed/Indep/Src/FEng/FEngine.cpp (lines 1123-1255).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d ProcessResponses__7FEngineP17FEMessageResponseP8FEObjectP9FEPackageUl\n' +
      'Currently at 96.58% match. Register allocations (r25/r26 swap for pPack and ControlMask), switch jump table comparison order.\n' +
      'Adjust variable usage and switch case ordering to achieve 100.0% match parity.',
  },
  {
    demangled: 'FEListBox::ScrollSelection',
    symbol: 'ScrollSelection__9FEListBoxll',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 1104,
    match: 96.50,
    source_file: 'src/Speed/Indep/Src/FEng/FEListBox.cpp',
    virtual_address: '0x80184188',
    signature: 'void FEListBox::ScrollSelection(i32 lColumnNum, i32 lRowNum)',
    extra_instructions:
      'Inspect FEListBox::ScrollSelection in src/Speed/Indep/Src/FEng/FEListBox.cpp (lines 160-324).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d ScrollSelection__9FEListBoxll\n' +
      'Currently at 96.50% match. Register allocation in column/row arithmetic and index calculation.\n' +
      'Fine-tune local variable declarations to eliminate differences and achieve 100.0% match.',
  },
  {
    demangled: 'FEPackage::UpdateObject',
    symbol: 'UpdateObject__9FEPackageP8FEObjectl',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 1204,
    match: 94.07,
    source_file: 'src/Speed/Indep/Src/FEng/FEPackage.cpp',
    virtual_address: '0x8018A5CC',
    signature: 'void FEPackage::UpdateObject(FEObject *pObject, const i32 tDeltaTicks)',
    extra_instructions:
      'Inspect FEPackage::UpdateObject in src/Speed/Indep/Src/FEng/FEPackage.cpp (lines 282-418).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d UpdateObject__9FEPackageP8FEObjectl\n' +
      'Currently at 94.07% match. Register swap between r28 and r29 for pObject and local script pointers.\n' +
      'Reorder local variable declarations and assignments to match original register allocation.',
  },
]

function makePrompt(c) {
  return (
    'You are a GOWE69 decompilation specialist working in an isolated worktree following TDD principles.\n\n' +
    'ASSIGNED TARGET:\n' +
    '  Demangled: ' + c.demangled + '\n' +
    '  Symbol (mangled): ' + c.symbol + '\n' +
    '  Unit: ' + c.unit + '\n' +
    '  Unit Object: ' + c.unit_obj + '\n' +
    '  Initial match: ' + c.match + '%\n' +
    '  Size: ' + c.size + ' bytes\n' +
    '  Virtual address: ' + (c.virtual_address || 'unknown') + '\n' +
    '  Primary source: ' + c.source_file + '\n' +
    '  Signature: ' + (c.signature || '') + '\n' +
    (c.extra_instructions ? '  Guidance: ' + c.extra_instructions + '\n\n' : '\n') +
    'WORKTREE SETUP & EXECUTION RULES:\n\n' +
    '## Step 0 — Setup environment symlinks\n' +
    'Run immediately in your worktree root:\n' +
    '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/orig orig\n' +
    '  mkdir -p build\n' +
    '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/tools build/tools\n' +
    '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/compilers build/compilers\n' +
    '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n' +
    '  python3 configure.py\n' +
    '  ninja ' + c.unit_obj + '  (quick build check to ensure unit compiles)\n\n' +
    '## Step 1 — Context inspection & TDD Failing Verification\n' +
    'Check diff: python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'Confirm where the mismatches exist before making edits.\n\n' +
    '## Step 2 — Read implementation\n' +
    'Read ' + c.source_file + ' around ' + c.demangled + '.\n\n' +
    '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
    'Iterate on matching:\n' +
    'a. Study differences in python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'b. Adjust register allocation, local variable ordering, types, loop bounds, condition checks.\n' +
    'c. Compile unit: ninja ' + c.unit_obj + '\n' +
    'd. Re-check diff and percentage: python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
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
    '  git commit -m "match: ' + c.demangled + '\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
    '## Step 7 — Structured report\n' +
    'Query branch: git rev-parse --abbrev-ref HEAD\n' +
    'Return structured result with all required schema fields:\n' +
    '- success: boolean (true if committed improvement without regressions)\n' +
    '- function_name: demangled function name\n' +
    '- unit: unit name\n' +
    '- branch_name: current branch name\n' +
    '- match_percentage: final match percentage achieved\n' +
    '- source_file: source file path\n' +
    '- virtual_address: virtual address\n' +
    '- size_bytes: function size in bytes\n' +
    '- signature: function signature\n' +
    '- description: brief summary of work\n' +
    '- notes: additional details'
  )
}

log('Starting Batch 7 for nfs5: Spawning 6 agents inside workflow per round across zPhysicsBehaviors and zFEng')

phase('Decomp-Pool')
const results = await parallel(CANDIDATES.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-Pool',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

const succeeded = results.filter(Boolean).filter(r => r.success)
const failed = results.filter(Boolean).filter(r => !r.success)
log('Decomp pool finished: ' + succeeded.length + ' succeeded, ' + failed.length + ' failed')

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
    '4. Commit documentation changes:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: record Batch 7 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"',
    {
      phase: 'Docs',
      label: 'docs:update',
    }
  )
}

return {
  total_candidates: CANDIDATES.length,
  succeeded: succeeded.length,
  failed: failed.length,
  merged: mergedFunctions.length,
  functions: mergedFunctions,
}
