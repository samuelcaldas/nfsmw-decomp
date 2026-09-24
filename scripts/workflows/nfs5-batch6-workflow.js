export const meta = {
  name: 'nfsmw-parallel-decomp-batch6-nfs5',
  description: 'Batch 6 decompilation for nfs5 (6 agents): zPhysicsBehaviors & zEcstasy candidate optimization with TDD and worktree isolation',
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
    demangled: '__InitMatrices()',
    symbol: '__InitMatrices__Fv',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEcstasy.o',
    size: 508,
    match: 97.95,
    source_file: 'src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp',
    virtual_address: '0x800a4cb0',
    signature: 'void __InitMatrices(void)',
    extra_instructions:
      'Inspect __InitMatrices in src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp (lines 680-696).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEcstasy -d __InitMatrices__Fv\n' +
      'Currently at 98.0% match. Minor float temporary order during PSMTXScale matrix calculations.\n' +
      'Reorder intermediate float variables to eliminate all diffs and reach 100.0% match.',
  },
  {
    demangled: 'eStreamPackLoader::InternalLoadStreamingEntry',
    symbol: 'InternalLoadStreamingEntry__17eStreamPackLoaderP23eStreamingPackLoadTableP14eStreamingPackP15eStreamingEntry',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEcstasy.o',
    size: 440,
    match: 95.41,
    source_file: 'src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp',
    virtual_address: '0x800a2978',
    signature: 'void eStreamPackLoader::InternalLoadStreamingEntry(eStreamingPackLoadTable *loading_table, eStreamingPack *streaming_pack, eStreamingEntry *streaming_entry)',
    extra_instructions:
      'Inspect InternalLoadStreamingEntry in src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp (lines 336-392).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEcstasy -d InternalLoadStreamingEntry__17eStreamPackLoaderP23eStreamingPackLoadTableP14eStreamingPackP15eStreamingEntry\n' +
      'Currently at 95.41% match. Register allocation swap between r28 and r29 (parameters pack vs table/entry).\n' +
      'Reorder local variable usage and parameters in calls to match original register allocation and reach 100.0% match.',
  },
  {
    demangled: 'eStreamPackLoader::InternalLoadingHeaderPhase2Callback',
    symbol: 'InternalLoadingHeaderPhase2Callback__17eStreamPackLoaderPviT1',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEcstasy.o',
    size: 308,
    match: 94.19,
    source_file: 'src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp',
    virtual_address: '0x800a3738',
    signature: 'void eStreamPackLoader::InternalLoadingHeaderPhase2Callback(void *callback_param, int error_status, void *callback_param2)',
    extra_instructions:
      'Inspect InternalLoadingHeaderPhase2Callback in src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp (lines 803-840).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEcstasy -d InternalLoadingHeaderPhase2Callback__17eStreamPackLoaderPviT1\n' +
      'Currently at 94.19% match. Field copy ordering at lines 817-821 (r0, r7, r9, r10, r11).\n' +
      'Adjust struct member reads/writes order to match the target assembly and reach 100.0% match.',
  },
  {
    demangled: 'eStreamPackLoader::CreateStreamingPack',
    symbol: 'CreateStreamingPack__17eStreamPackLoaderPCcPFPv_vPvi',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEcstasy.o',
    size: 372,
    match: 92.31,
    source_file: 'src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp',
    virtual_address: '0x800a35c4',
    signature: 'eStreamingPack *eStreamPackLoader::CreateStreamingPack(const char *filename, void (*callback_function)(void *), void *callback_param, int memory_pool_num)',
    extra_instructions:
      'Inspect CreateStreamingPack in src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp (lines 711-754).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEcstasy -d CreateStreamingPack__17eStreamPackLoaderPCcPFPv_vPvi\n' +
      'Currently at 92.31% match. Minor register swaps (r29/r30, r27/r28) and allocation size temporary ordering.\n' +
      'Reorder local variable declarations and assignments to match original register allocation and reach 100.0% match.',
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
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/orig orig\n' +
    '  mkdir -p build\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n' +
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

log('Starting Batch 6 for nfs5: Spawning 6 agents inside workflow per round across zPhysicsBehaviors and zEcstasy')

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
    '   git commit -m "docs: record Batch 6 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"',
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
