export const meta = {
  name: 'nfs2-batch20-decomp',
  description: 'Batch 20 decompilation for @nfs2 units: CarLoader::SetMemoryPoolSize (zWorld), UIWidgetMenu::Scroll (zFe2), WCollisionMgr::FindFaceInCInst (zWorld2), SFXCTL_Physics::UpdateMixerOutputs (zEAXSound), GinsuSynthesis::HandlePacketRelease (zEAXSound2), GinsuSynthData::BindToData (zEAXSound2)',
  phases: [
    { title: 'Decomp', detail: 'Parallel decompilation workers in isolated worktrees' },
    { title: 'Merge', detail: 'Sequential merge of completed branches into main' },
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

const CANDIDATES = [
  {
    demangled: 'CarLoader::SetMemoryPoolSize(int)',
    symbol: 'SetMemoryPoolSize__9CarLoaderi',
    diff_filter: 'SetMemoryPoolSize',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld.o',
    size: 304,
    match: 97.4,
    source_file: 'src/Speed/Indep/Src/World/CarLoader.cpp',
    virtual_address: '0x802dd360',
    signature: 'void CarLoader::SetMemoryPoolSize(int size)',
    description: 'Sets the memory pool size for the car loader, flushing hibernating track sections and allocating sponge buffers.',
    hint: 'Currently 97.4% match (304 bytes, 77 instructions). Only 2 instructions difference around CarLoaderMemoryPoolNumber store ordering in CarLoader.cpp lines 543-547.',
  },
  {
    demangled: 'UIWidgetMenu::Scroll(eScrollDir)',
    symbol: 'Scroll__12UIWidgetMenu10eScrollDir',
    diff_filter: 'Scroll',
    unit: 'main/Speed/Indep/SourceLists/zFe2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFe2.o',
    size: 536,
    match: 97.0,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/Common/feUIWidgetMenu.cpp',
    virtual_address: '0x80175198',
    signature: 'void UIWidgetMenu::Scroll(eScrollDir dir)',
    description: 'Scrolls the UI widget menu up/down, handling disabled options, wrapping, scrollbar updates, and button focus.',
    hint: 'Currently 97.0% match (536 bytes, 135 instructions). Minor register allocation (r29 vs r28) and branch structure in feUIWidgetMenu.cpp lines 150-165.',
  },
  {
    demangled: 'WCollisionMgr::FindFaceInCInst(UMath::Matrix4 const &, UMath::Vector3 const &, WCollisionInstance const &, WCollisionTri &, float &)',
    symbol: 'FindFaceInCInst__13WCollisionMgrRCQ25UMath7Matrix4RCQ25UMath7Vector3RC18WCollisionInstanceR13WCollisionTriRf',
    diff_filter: 'FindFaceInCInst',
    unit: 'main/Speed/Indep/SourceLists/zWorld2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld2.o',
    size: 1436,
    match: 99.9,
    source_file: 'src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp',
    virtual_address: '0x802f0818',
    signature: 'bool WCollisionMgr::FindFaceInCInst(const UMath::Matrix4 &vectorMat, const UMath::Vector3 &endPt, const WCollisionInstance &cInst, WCollisionTri &retFace, float &retDist)',
    description: 'Finds the collision face in a collision instance using strip sphere bounding checks and tri-strip intersection.',
    hint: 'Currently 99.9% match (1436 bytes, 359 instructions). Minor stack local temporary ordering (r26, r27, r28) in WCollisionMgr.cpp lines 276-290.',
  },
  {
    demangled: 'SFXCTL_Physics::UpdateMixerOutputs()',
    symbol: 'UpdateMixerOutputs__14SFXCTL_Physics',
    diff_filter: 'UpdateMixerOutputs',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound.o',
    size: 1212,
    match: 98.2,
    source_file: 'src/Speed/Indep/Src/EAXSound/sfxctl/SFXCTL_Physics.cpp',
    virtual_address: '0x800bffc8',
    signature: 'void SFXCTL_Physics::UpdateMixerOutputs()',
    description: 'Updates physics mixer outputs for EAX sound based on vehicle speed, RPM, wheels on ground, and POV.',
    hint: 'Currently 98.2% match (1212 bytes, 306 instructions). Minor constant loading register allocation (r7 vs r9) for vector normalization in SFXCTL_Physics.cpp lines 147-203.',
  },
  {
    demangled: 'GinsuSynthesis::HandlePacketRelease(short *)',
    symbol: 'HandlePacketRelease__14GinsuSynthesisPs',
    diff_filter: 'HandlePacketRelease',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound2.o',
    size: 1936,
    match: 99.1,
    source_file: 'src/Speed/Indep/Src/EAXSound/ginsu/GinsuSynthesis.cpp',
    virtual_address: '0x800e8bf4',
    signature: 'void GinsuSynthesis::HandlePacketRelease(short *packet)',
    description: 'Releases audio packets, performing sample fetching, cross-fading, and volume envelope updates.',
    hint: 'Currently 99.1% match (1936 bytes, 486 instructions). Minor integer-to-float conversion and local register allocation (r8 vs r10) in GinsuSynthesis.cpp lines 98-105.',
  },
  {
    demangled: 'GinsuSynthData::BindToData(void *)',
    symbol: 'BindToData__14GinsuSynthDataPv',
    diff_filter: 'BindToData',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound2.o',
    size: 340,
    match: 96.2,
    source_file: 'src/Speed/Indep/Src/EAXSound/ginsu/GinsuSynthData.cpp',
    virtual_address: '0x800e8078',
    signature: 'bool GinsuSynthData::BindToData(void *data)',
    description: 'Binds synthesis structures to raw sound data chunks, endian-swapping headers and setting up grain pointers.',
    hint: 'Currently 96.2% match (340 bytes, 86 instructions). Loop counter register allocation and temporary pointer indexing in GinsuSynthData.cpp lines 150-185.',
  },
]

log('Starting Batch 20 parallel decomp for ' + CANDIDATES.length + ' candidates across @nfs2 units')

const decompResults = await parallel(
  CANDIDATES.map((cand, idx) => () => {
    const branchName = 'worktree-nfs2-b20-' + idx
    const worktreePath = '.claude/worktrees/nfs2-b20-' + idx

    const prompt =
      'You are a specialized decompilation agent working on Need for Speed: Most Wanted (GC GOWE69).\n\n' +
      'Candidate: ' + cand.demangled + '\n' +
      'Mangled symbol: ' + cand.symbol + '\n' +
      'Unit: ' + cand.unit + '\n' +
      'Source file: ' + cand.source_file + '\n' +
      'Expected size: ' + cand.size + ' bytes\n' +
      'Initial match: ' + cand.match + '%\n' +
      'Signature: ' + cand.signature + '\n' +
      'Description: ' + cand.description + '\n' +
      'Hint: ' + cand.hint + '\n\n' +
      'INSTRUCTIONS:\n' +
      '1. Work in your current git worktree (' + worktreePath + ') on branch ' + branchName + '.\n' +
      '2. Inspect diff with:\n' +
      '   python3 tools/decomp-diff.py -u ' + cand.unit + ' -d ' + cand.diff_filter + '\n' +
      '3. Read the relevant section of ' + cand.source_file + '.\n' +
      '4. Refine the C++ implementation to maximize match percentage without regressions.\n' +
      '5. Add a Doxygen docstring to the function.\n' +
      '6. Verify with ninja and decomp-diff:\n' +
      '   ninja\n' +
      '   python3 tools/decomp-diff.py -u ' + cand.unit + ' -d ' + cand.diff_filter + '\n' +
      '   ninja changes\n' +
      '7. Commit your changes:\n' +
      '   git add -u\n' +
      '   git commit -m "match: ' + cand.demangled + ' (' + cand.unit + ')\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"\n' +
      '8. Return JSON matching schema.'

    return agent(prompt, {
      phase: 'Decomp',
      label: 'decomp:' + cand.symbol.slice(0, 15),
      schema: DECOMP_SCHEMA,
      isolation: 'worktree',
    })
  })
)

const succeeded = decompResults.filter(r => r && r.success)
const failed = decompResults.filter(r => !r || !r.success)

log('Decomp phase complete: ' + succeeded.length + ' succeeded, ' + failed.length + ' failed')

const mergedFunctions = []
for (const res of succeeded) {
  const mergePrompt =
    'Serialize merge of decompiled branch ' + res.branch_name + ' (' + res.function_name + ') into main.\n\n' +
    'Steps:\n' +
    '1. git fetch origin\n' +
    '2. git checkout main\n' +
    '3. git pull --rebase origin main\n' +
    '4. git merge --no-ff ' + res.branch_name + '\n' +
    '5. ninja\n' +
    '6. ninja changes\n' +
    '7. git push origin main\n' +
    '8. Delete branch and clean worktree: git branch -d ' + res.branch_name + '\n' +
    'Return JSON with success: true and merge_commit hash.'

  const mergeRes = await agent(mergePrompt, {
    phase: 'Merge',
    label: 'merge:' + res.branch_name,
    schema: MERGE_SCHEMA,
  })

  if (mergeRes && mergeRes.success) {
    mergedFunctions.push(res)
  }
}

if (mergedFunctions.length > 0) {
  const docPrompt =
    'Update documentation for ' + mergedFunctions.length + ' newly decompiled functions in Batch 20 (@nfs2):\n\n' +
    JSON.stringify(mergedFunctions, null, 2) + '\n\n' +
    'Steps:\n' +
    '1. For each function, add entry to docs/decompiled_functions.md under appropriate subsystem:\n' +
    '   ### `FunctionName`\n' +
    '   - **Unit**: <unit>\n' +
    '   - **Source File**: <source_file>\n' +
    '   - **Virtual Address**: <virtual_address>\n' +
    '   - **Size**: <size_bytes> bytes\n' +
    '   - **Matching State**: <match_percentage>% match\n' +
    '   - **Signature**:\n' +
    '     ```cpp\n' +
    '     <signature>\n' +
    '     ```\n' +
    '   - **Description**: <description>\n' +
    '   ---\n\n' +
    '2. Update docs/decompilation_status_ledger.md:\n' +
    '   Record each function as [Completed & Merged] under Section 1.\n\n' +
    '3. Commit and push:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: document Batch 20 decompiled functions (@nfs2)\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"\n' +
    '   git pull --rebase origin main\n' +
    '   git push origin main'

  await agent(docPrompt, {
    phase: 'Docs',
    label: 'docs:update',
  })
}

return {
  batch_candidates: CANDIDATES.length,
  succeeded: succeeded.length,
  failed: failed.length,
  merged: mergedFunctions.length,
  functions: mergedFunctions.map(r => r.function_name),
}
