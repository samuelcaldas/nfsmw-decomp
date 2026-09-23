export const meta = {
  name: 'nfsmw-parallel-decomp-batch17',
  description: 'Batch 17 decompilation: AssignClosestOffsets, UpdateOccludedPosition, DetermineStreamingSections, Render',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: AssignClosestOffsets (zAI) & UpdateOccludedPosition (zWorld2)' },
    { title: 'Decomp-2', detail: 'Pair 2: DetermineStreamingSections (zTrack) & Render (zEcstasy)' },
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
    demangled: 'AIPursuit::AssignClosestOffsets',
    symbol: 'AssignClosestOffsets__9AIPursuitRQ33UTL3Stdt6vector2ZQ25UMath7Vector3Z19_type_AIVector3ListRQ33UTL3Stdt6vector2ZP10IPursuitAIZ16_type_AIPursuersRQ33UTL3Stdt6vector2ZQ29AIPursuit15FormationTargetZ27_type_AIFormationTargetListb',
    unit: 'main/Speed/Indep/SourceLists/zAI',
    size: 1684,
    match: 99.67,
    source_file: 'src/Speed/Indep/Src/AI/Common/AIPursuit.cpp',
    virtual_address: '0x80031760',
    signature: 'void AIPursuit::AssignClosestOffsets(UTL::Std::vector<UMath::Vector3, _type_AIVector3List> &offsets, UTL::Std::vector<IPursuitAI *, _type_AIPursuers> &pursuers, UTL::Std::vector<AIPursuit::FormationTarget, _type_AIFormationTargetList> &targets, bool flag)',
    hint: 'Around line 1103 in AIPursuit.cpp. 99.7% match. Differences consist of register swap between r28 and r29 for float constants and loop index (subi r29, r9, 1 vs subi r28, r9, 1 around lines 1134-1140). Adjust local variable declaration order.',
  },
  {
    demangled: 'WRoadNav::UpdateOccludedPosition',
    symbol: 'UpdateOccludedPosition__8WRoadNavb',
    unit: 'main/Speed/Indep/SourceLists/zWorld2',
    size: 4368,
    match: 98.12,
    source_file: 'src/Speed/Indep/Src/World/Common/WRoadNetwork.cpp',
    virtual_address: '0x802FF654',
    signature: 'void WRoadNav::UpdateOccludedPosition(bool occluded)',
    hint: 'Around line 1921 in WRoadNetwork.cpp. Stack frame is already exact (-0xa50). 98.1% match. Minor differences are register allocation for boolean flags (r7 vs r8, r5 vs r3) and float constant loads around lines 1950 and 1999.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'TrackStreamer::DetermineStreamingSections',
    symbol: 'DetermineStreamingSections__13TrackStreamer',
    unit: 'main/Speed/Indep/SourceLists/zTrack',
    size: 420,
    match: 76.45,
    source_file: 'src/Speed/Indep/Src/World/TrackStreamer.cpp',
    virtual_address: '0x802BADCC',
    signature: 'void TrackStreamer::DetermineStreamingSections()',
    hint: 'Around line 1585 in TrackStreamer.cpp. Stack frame is -0x328 in target vs -0x320 compiled. Target uses stmw r24 (saving 8 registers r24-r31 = 32 bytes) while compiled uses stmw r26 (saving 6 registers = 24 bytes). Notice sections_to_load[0..2] is stored with indexed sthu/sthx halfword stores. Using 2 more non-volatile local variables or adjusting KeepSectionTable type to unsigned short aligns register allocation to stmw r24 and frame -0x328.',
  },
  {
    demangled: 'EmitterSystem::Render',
    symbol: 'Render__13EmitterSystemP5eView',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    size: 696,
    match: 93.21,
    source_file: 'src/Speed/Indep/Src/Ecstasy/EmitterSystem.cpp',
    virtual_address: '0x8011290C',
    signature: 'void EmitterSystem::Render(eView *view)',
    hint: 'Around line 1184 in EmitterSystem.cpp. Target stack frame is -0x128 vs compiled -0x120 (8 byte difference). Notice target spills and restores an extra 8 bytes at 0xc8(r1) and uses r25/r14 instead of r24/r14. Adjust local variables declarations.',
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
    '  Primary source: ' + c.source_file + '\n' +
    '  Virtual Address: ' + (c.virtual_address || 'unknown') + '\n' +
    '  Signature: ' + (c.signature || 'unknown') + '\n' +
    '  Hint: ' + (c.hint || 'None') + '\n\n' +
    'WORKTREE SETUP & EXECUTION RULES:\n\n' +
    '## Step 0 — Setup environment\n' +
    'Run immediately in your worktree root:\n' +
    '  rm -rf orig\n' +
    '  cp -r /home/samuelcaldas/repos/nfsmw/orig orig\n' +
    '  mkdir -p build\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n' +
    '  python3 configure.py\n' +
    '  ninja  (quick build check to ensure build works)\n\n' +
    '## Step 1 — Context inspection\n' +
    'Inspect function context and initial diff:\n' +
    '  python3 tools/decomp-context.py -u "' + c.unit + '" -f "' + c.symbol + '" --no-ghidra\n' +
    '  python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n\n' +
    '## Step 2 — Read implementation\n' +
    'Read ' + c.source_file + ' around ' + c.demangled + '.\n\n' +
    '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
    'Iterate on matching:\n' +
    'a. Study differences in python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'b. Apply hints and adjust register allocation, local variable ordering, types, loop bounds.\n' +
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
    '  git commit -m "match: ' + c.demangled + '\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
    '## Step 7 — Structured report\n' +
    'Query branch: git rev-parse --abbrev-ref HEAD\n' +
    'Return structured result with all required schema fields.'
  )
}

log('Starting Batch 17: AssignClosestOffsets, UpdateOccludedPosition, DetermineStreamingSections, Render')

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
    '   - **Source**: ...\n' +
    '   - **Address**: `0x...`\n' +
    '   - **Size**: N bytes\n' +
    '   - **Match**: X.X%\n' +
    '   - **Status**: Matched\n' +
    '   - **Description**: ...\n\n' +
    '3. Read docs/decompilation_status_ledger.md\n' +
    '4. Under [Completed & Merged], add rows or update existing rows for these functions.\n' +
    '5. Update progress statistics in both files.\n' +
    '6. Commit the docs:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: document Batch 17 decompiled functions (@nfs1)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n' +
    '7. Return completion status.',
    {
      phase: 'Docs',
      label: 'docs:update',
    }
  )
}

return {
  total_candidates: 4,
  succeeded: succeeded.length,
  merged: mergedFunctions.length,
  merged_functions: mergedFunctions,
}
