export const meta = {
  name: 'nfsmw-parallel-decomp-batch20',
  description: 'Batch 20 parallel decompilation: AIPursuit::AssignClosestOffsets (zAI), GinsuSynthesis::HandlePacketRelease (zEAXSound2), CarPartCuller::CullParts (zWorld), EmitterSystem::UpdateParticles (zEcstasy), IJoyHelper::EmulateMemoryCardLibrary (zFe), SFXCTL_Physics::UpdateMixerOutputs (zEAXSound)',
  phases: [
    { title: 'Decomp-P1', detail: 'Trio 1: AssignClosestOffsets (zAI), HandlePacketRelease (zEAXSound2), CullParts (zWorld)' },
    { title: 'Decomp-P2', detail: 'Trio 2: UpdateParticles (zEcstasy), EmulateMemoryCardLibrary (zFe), UpdateMixerOutputs (zEAXSound)' },
    { title: 'Merge', detail: 'Sequential merge of verified branches to main' },
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

const TRIO_1 = [
  {
    demangled: 'AIPursuit::AssignClosestOffsets',
    symbol: 'AssignClosestOffsets__9AIPursuitRQ33UTL3Stdt6vector2ZQ25UMath7Vector3Z19_type_AIVector3ListRQ33UTL3Stdt6vector2ZP10IPursuitAIZ16_type_AIPursuersRQ33UTL3Stdt6vector2ZQ29AIPursuit15FormationTargetZ27_type_AIFormationTargetListb',
    unit: 'main/Speed/Indep/SourceLists/zAI',
    size: 1684,
    match: 99.67,
    source_file: 'src/Speed/Indep/Src/AI/Common/AIPursuit.cpp',
    virtual_address: '0x80031760',
    signature: 'void AIPursuit::AssignClosestOffsets(Vector3List &copRelativePositions, Pursuers &assignCopList, FormationTargetList &formationOffsets, bool information)',
    hint: 'Around line 1102 in src/Speed/Indep/Src/AI/Common/AIPursuit.cpp. Initial match is 99.67%. Look at lines 1134-1140: target uses r28 for float constant and r29 for copsToAssignOffsets loop decrement, whereas decomp has r28 and r29 swapped (subi r28, r9, 1 vs subi r29, r9, 1 and lfs f12 from LC1467). Adjust local declaration and initialization order to align register allocations to 100.0%.',
  },
  {
    demangled: 'GinsuSynthesis::HandlePacketRelease',
    symbol: 'HandlePacketRelease__14GinsuSynthesisPs',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    size: 1936,
    match: 99.12,
    source_file: 'src/Speed/Indep/Src/EAXSound/Ginsu/ginsusynth.cpp',
    virtual_address: '0x8008BF30',
    signature: 'void GinsuSynthesis::HandlePacketRelease(short *samples)',
    hint: 'Around line 25 in src/Speed/Indep/Src/EAXSound/Ginsu/ginsusynth.cpp. Initial match is 99.12%. Around line 96-108, differences are register swap between r8 and r10 for sample index and 0x4330 float constant, plus float addition scheduling (fadds f12, f12, f9). Align variable ordering and loop indexing.',
  },
  {
    demangled: 'CarPartCuller::CullParts',
    symbol: 'CullParts__13CarPartCullerP8bVector3Us',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    size: 836,
    match: 99.35,
    source_file: 'src/Speed/Indep/Src/World/CarRender.cpp',
    virtual_address: '0x802524E4',
    signature: 'void CarPartCuller::CullParts(bVector3 *camera_eye, bAngle stang)',
    hint: 'Around line 269 in src/Speed/Indep/Src/World/CarRender.cpp. Initial match is 99.35%. Around line 281 and line 306: register swap between r17 and r18 for 0x4330 and culldiv constant, and test of lwz 8(r30) into r0 vs r9. Align the local variable declaration order.',
  },
]

const TRIO_2 = [
  {
    demangled: 'EmitterSystem::UpdateParticles',
    symbol: 'UpdateParticles__13EmitterSystemf',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    size: 1820,
    match: 99.08,
    source_file: 'src/Speed/Indep/Src/Ecstasy/EmitterSystem.cpp',
    virtual_address: '0x8010E868',
    signature: 'void EmitterSystem::UpdateParticles(float dt)',
    hint: 'Around line 975 in src/Speed/Indep/Src/Ecstasy/EmitterSystem.cpp. Initial match is 99.08%. In outer loop and particle update loop (lines 1024-1081): register swaps between r20/r21 (this pointer vs 0x4330 constant), f25/f26, and temporary float arithmetic ordering around UV animation. Refine local variable order to match.',
  },
  {
    demangled: 'IJoyHelper::EmulateMemoryCardLibrary',
    symbol: 'EmulateMemoryCardLibrary__10IJoyHelperi',
    unit: 'main/Speed/Indep/SourceLists/zFe',
    size: 732,
    match: 98.79,
    source_file: 'src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp',
    virtual_address: '0x801D3828',
    signature: 'void IJoyHelper::EmulateMemoryCardLibrary(int aJoyOp)',
    hint: 'Around line 585 in src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp. Initial match is 98.79%. In switch statement dispatch around line 597: comparison sequence of cases (1, 2, 3...) and branch targets. Align case order or if/else if structure to match target compiler jump pattern.',
  },
  {
    demangled: 'SFXCTL_Physics::UpdateMixerOutputs',
    symbol: 'UpdateMixerOutputs__14SFXCTL_Physics',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound',
    size: 1212,
    match: 98.22,
    source_file: 'src/Speed/Indep/Src/EAXSound/sfxctl/SFXCTL_Physics.cpp',
    virtual_address: '0x800762E4',
    signature: 'void SFXCTL_Physics::UpdateMixerOutputs()',
    hint: 'Around line 147 in src/Speed/Indep/Src/EAXSound/sfxctl/SFXCTL_Physics.cpp. Initial match is 98.22%. Differences stem from repeated inline sqrt/reciprocal sqrt calculations around lines 152, 158, 164, 170: constant register reuse (r7/r9 for float constant LC838) across the vector normalization steps.',
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

log('Starting Batch 20 (6 candidates across 6 units)')

phase('Decomp-P1')
const resultsP1 = await parallel(TRIO_1.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-P1',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

phase('Decomp-P2')
const resultsP2 = await parallel(TRIO_2.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-P2',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

const allResults = [...resultsP1, ...resultsP2]
const succeeded = allResults.filter(Boolean).filter(r => r.success)
const failed = allResults.filter(Boolean).filter(r => !r.success)
log('Decomp phases finished: ' + succeeded.length + ' succeeded, ' + failed.length + ' failed')

phase('Merge')
const mergedFunctions = []
for (const result of succeeded) {
  log('Sequentially merging: ' + result.function_name + ' from ' + result.branch_name)
  const mr = await agent(
    'Merge a completed decompilation branch into main. Follow serialized protocol strictly.\n\n' +
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
    '   - **Signature**:\n' +
    '     ```cpp\n' +
    '     ...\n' +
    '     ```\n' +
    '   - **Description**: ...\n\n' +
    '3. Read docs/decompilation_status_ledger.md\n' +
    '4. Add/update the status of each function to **[Completed & Merged]** under its subsystem.\n' +
    '5. Update header summary in docs/decompilation_status_ledger.md to mention Batch 20.\n' +
    '6. Commit the docs:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: document Batch 20 decompiled functions (@nfs1)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
    'Return string summary of updated documentation files.'
  )
}

return {
  total_candidates: 6,
  succeeded: succeeded.length,
  merged: mergedFunctions.length,
  merged_functions: mergedFunctions,
}
