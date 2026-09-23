export const meta = {
  name: 'nfsmw-parallel-decomp-batch15',
  description: 'Batch 15 decompilation: FindFaceInCInst, UpdateParticles, __InitMatrices, BuildHoleMovements',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: FindFaceInCInst (zWorld2) & UpdateParticles (zEcstasy)' },
    { title: 'Decomp-2', detail: 'Pair 2: __InitMatrices (zEcstasy) & BuildHoleMovements (zTrack)' },
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
    demangled: 'WCollisionMgr::FindFaceInCInst',
    symbol: 'FindFaceInCInst__13WCollisionMgrRCQ25UMath7Matrix4RCQ25UMath7Vector3RC18WCollisionInstanceR13WCollisionTriRf',
    unit: 'main/Speed/Indep/SourceLists/zWorld2',
    size: 1436,
    match: 99.92,
    source_file: 'src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp',
    virtual_address: '0x802F0818',
    signature: 'bool WCollisionMgr::FindFaceInCInst(const UMath::Matrix4 &vectorMat, const UMath::Vector3 &endPt, const WCollisionInstance &cInst, WCollisionTri &retFace, float &retDist)',
    hint: 'Around lines 275-290 in WCollisionMgr.cpp. Almost 100% assembly match (359 instructions). Study decomp-diff: small register permutation (r26, r27, r28) in local matrix array offsets around line 161/265.',
  },
  {
    demangled: 'EmitterSystem::UpdateParticles',
    symbol: 'UpdateParticles__13EmitterSystemf',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    size: 1820,
    match: 99.08,
    source_file: 'src/Speed/Indep/Src/Ecstasy/EmitterSystem.cpp',
    virtual_address: '0x80111BA0',
    signature: 'void EmitterSystem::UpdateParticles(float dt)',
    hint: 'Around line 975 in EmitterSystem.cpp. Stack frame is already exact (-0x160). Study decomp-diff for minor register swaps (r21 vs r20 for this pointer, f26 vs f25 for ed_drag). Declare and order local variables to match register allocator.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: '__InitMatrices',
    symbol: '__InitMatrices__Fv',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    size: 508,
    match: 97.95,
    source_file: 'src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp',
    virtual_address: '0x801026D0',
    signature: 'void __InitMatrices(void)',
    hint: 'Around line 680 in EcstasyE.cpp. Stack frame is exact (-0x70). Look at aspect ratio float expressions (448.f / 378.f) and (1.0f / 448.0f) in lines 688-690: adjust parentheses / temporary float variables to match instruction sequence and float register allocation (f9, f10, f11).',
  },
  {
    demangled: 'TrackStreamer::BuildHoleMovements',
    symbol: 'BuildHoleMovements__13TrackStreamerP12HoleMovementiiiPii',
    unit: 'main/Speed/Indep/SourceLists/zTrack',
    size: 1992,
    match: 89.82,
    source_file: 'src/Speed/Indep/Src/World/TrackStreamer.cpp',
    virtual_address: '0x802B9E98',
    signature: 'int TrackStreamer::BuildHoleMovements(HoleMovement *hole_movements, int max_movements, int filler_method, int largest_free, int *pamount_moved, int max_amount_to_move)',
    hint: 'Around line 1086 in TrackStreamer.cpp. Notice stack frame is -0x128 in target vs -0x120 in compiled. Check register saves (stmw r14 at 0xe0 vs 0xd8) and parameter spills into stack slots. Align local variable order.',
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

log('Starting Batch 15: FindFaceInCInst, UpdateParticles, __InitMatrices, BuildHoleMovements')

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
    '   git commit -m "docs: document Batch 15 decompiled functions (@nfs1)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n' +
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
