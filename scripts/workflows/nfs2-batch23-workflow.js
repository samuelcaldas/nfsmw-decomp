export const meta = {
  name: 'nfs2-batch23-decomp',
  description: 'Batch 23 decompilation for @nfs2 units: CARSFX_PreColWoosh::MsgBarrier (zEAXSound2), EAXCommon::Play (zEAXSound), SFXCTL_Physics::UpdateMixerOutputs (zEAXSound), GinsuSynthesis::HandlePacketRelease (zEAXSound2), CARSFX_RoadNoise::Play (zEAXSound2), CARSFX_RoadNoise::GenerateRoadNoise (zEAXSound2)',
  phases: [
    { title: 'Decomp', detail: 'Parallel decompilation workers in isolated worktrees using gemini-3.5-flash-lite' },
    { title: 'Merge', detail: 'Sequential merge of completed branches into main with regression check' },
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
    demangled: 'CARSFX_PreColWoosh::MsgBarrier(MAudioReflection const &)',
    symbol: 'MsgBarrier__18CARSFX_PreColWooshRC16MAudioReflection',
    diff_filter: 'MsgBarrier__18CARSFX_PreColWooshRC16MAudioReflection',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound2.o',
    size: 140,
    match: 94.29,
    source_file: 'src/Speed/Indep/Src/EAXSound/CARSFX/CARSFX_PreColWoosh.cpp',
    virtual_address: '0x800D61B0',
    signature: 'void CARSFX_PreColWoosh::MsgBarrier(const MAudioReflection &message)',
    description: 'Handles the barrier message for pre-collision woosh sound effects.',
    hint: 'Currently 94.29% match (140 bytes, 36 instructions). In CARSFX_PreColWoosh.cpp lines 53-58: align li r4, 1 before stfs f13 (this->mDurationActive = 0.0f) by checking ordering of WooshFadeOut.Initialize arguments or assigning local temporary.',
  },
  {
    demangled: 'EAXCommon::Play(eMenuSoundTriggers)',
    symbol: 'Play__9EAXCommon18eMenuSoundTriggers',
    diff_filter: 'Play__9EAXCommon18eMenuSoundTriggers',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound.o',
    size: 492,
    match: 96.83,
    source_file: 'src/Speed/Indep/Src/EAXSound/EAXFrontEnd.cpp',
    virtual_address: '0x800BFDE4',
    signature: 'int EAXCommon::Play(eMenuSoundTriggers etrigger)',
    description: 'Plays common menu sound triggers for UI sound effects.',
    hint: 'Currently 96.83% match (492 bytes, 124 instructions). In EAXFrontEnd.cpp lines 192-201: cache this->m_pSFXOBJ_FEHUD in a local variable SFXOBJ_FEHUD *psfx, and call psfx->GetOutputBlockPtr() and psfx->GetDMixOutput to keep the pointer in r3 and avoid redundant mr r3, r9.',
  },
  {
    demangled: 'SFXCTL_Physics::UpdateMixerOutputs',
    symbol: 'UpdateMixerOutputs__14SFXCTL_Physics',
    diff_filter: 'UpdateMixerOutputs__14SFXCTL_Physics',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound.o',
    size: 1212,
    match: 98.65,
    source_file: 'src/Speed/Indep/Src/EAXSound/sfxctl/SFXCTL_Physics.cpp',
    virtual_address: '0x800CA488',
    signature: 'void SFXCTL_Physics::UpdateMixerOutputs()',
    description: 'Updates physics mixer outputs for EAX sound based on vehicle speed, RPM, wheels on ground, and POV.',
    hint: 'Currently 98.65% match (1212 bytes, 304 instructions). In SFXCTL_Physics.cpp around lines 157-178: adjust MixerSqrt / MixerVelocityMagnitudeMPH so zero value is loaded as float constant 0.0f from rodata rather than via pointer to MixerSqrtZero.',
  },
  {
    demangled: 'GinsuSynthesis::HandlePacketRelease(short *)',
    symbol: 'HandlePacketRelease__14GinsuSynthesisPs',
    diff_filter: 'HandlePacketRelease__14GinsuSynthesisPs',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound2.o',
    size: 1936,
    match: 99.54,
    source_file: 'src/Speed/Indep/Src/EAXSound/Ginsu/ginsusynth.cpp',
    virtual_address: '0x800DFE30',
    signature: 'void GinsuSynthesis::HandlePacketRelease(short *samples)',
    description: 'Handles Ginsu granular synthesis packet release and crossfade blending across overlap buffers.',
    hint: 'Currently 99.54% match (1936 bytes, 485 instructions). In ginsusynth.cpp lines 92-96: swap initialization of float blend = 0.0f; and float blendstep = 1.0f / static_cast<float>(this->mOverlapSize); and check for loop counter initialization ordering to align register allocation r10/r8 and lfs f12 scheduling.',
  },
  {
    demangled: 'CARSFX_RoadNoise::Play(FXROADNOISE_LOOP, int)',
    symbol: 'Play__16CARSFX_RoadNoise16FXROADNOISE_LOOPi',
    diff_filter: 'Play__16CARSFX_RoadNoise16FXROADNOISE_LOOPi',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound2.o',
    size: 392,
    match: 94.94,
    source_file: 'src/Speed/Indep/Src/EAXSound/CARSFX/CARSFX_Roadnoise.cpp',
    virtual_address: '0x800D5508',
    signature: 'void CARSFX_RoadNoise::Play(FXROADNOISE_LOOP loop, int volume)',
    description: 'Plays road noise sound effect loop with specified volume and parameters.',
    hint: 'Currently 94.94% match (392 bytes, 99 instructions). In SND_GEN/MAIN_AEMS.h constructor for FX_ROADNOISE: adjust the order of setter calls to match ProDG backward list scheduler.',
  },
  {
    demangled: 'CARSFX_RoadNoise::GenerateRoadNoise',
    symbol: 'GenerateRoadNoise__16CARSFX_RoadNoise',
    diff_filter: 'GenerateRoadNoise__16CARSFX_RoadNoise',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound2.o',
    size: 1240,
    match: 92.96,
    source_file: 'src/Speed/Indep/Src/EAXSound/CARSFX/CARSFX_Roadnoise.cpp',
    virtual_address: '0x800D5030',
    signature: 'void CARSFX_RoadNoise::GenerateRoadNoise()',
    description: 'Generates road noise audio parameters based on tire surface interaction, speed, and slip.',
    hint: 'Currently 92.96% match (1240 bytes, 319 instructions). In CARSFX_Roadnoise.cpp lines 369-445: align wheel slip and suspension velocity magnitude calculations with bLength/bSqrt and temporary float register usage f11 vs f10.',
  },
]

log('Starting Batch 23 parallel decomp for ' + CANDIDATES.length + ' candidates across @nfs2 units')

phase('Decomp')
const decompResults = await parallel(
  CANDIDATES.map((cand) => () => {
    const prompt =
      'You are a specialized GOWE69 decompilation worker running gemini-3.5-flash-lite under ultracode orchestration. Your worktree is already set up — work in it directly.\n\n' +
      'ASSIGNED FUNCTION:\n' +
      '  Demangled: ' + cand.demangled + '\n' +
      '  Symbol (mangled): ' + cand.symbol + '\n' +
      '  Unit: ' + cand.unit + '\n' +
      '  Unit Object: ' + cand.unit_obj + '\n' +
      '  Current match: ' + cand.match + '%\n' +
      '  Size: ' + cand.size + ' bytes\n' +
      '  Source file: ' + cand.source_file + '\n' +
      '  Hint: ' + cand.hint + '\n\n' +
      'WORKFLOW (follow exactly):\n\n' +
      '## Step 0 — Setup environment\n' +
      'Run:\n' +
      '  mkdir -p build orig/GOWE69 && \\\n' +
      '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/orig/GOWE69/NFSMWRELEASE.ELF orig/GOWE69/NFSMWRELEASE.ELF && \\\n' +
      '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/orig/GOWE69/sys orig/GOWE69/sys 2>/dev/null || true && \\\n' +
      '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/compilers build/compilers && \\\n' +
      '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/ppc_binutils build/ppc_binutils && \\\n' +
      '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/tools build/tools && \\\n' +
      '  python3 configure.py\n\n' +
      '## Step 1 — Inspect current diff\n' +
      'Run:\n' +
      '  python3 tools/decomp-diff.py -u "' + cand.unit + '" -d "' + cand.diff_filter + '"\n\n' +
      '## Step 2 — Read source\n' +
      'Read ' + cand.source_file + ' and locate the function implementation.\n\n' +
      '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
      'For each round:\n' +
      'a. Inspect the diff:\n' +
      '     python3 tools/decomp-diff.py -u "' + cand.unit + '" -d "' + cand.diff_filter + '"\n' +
      'b. Identify mismatch patterns and adjust C++ code:\n' +
      '   - Register allocation differences (order of local variables, caching in locals)\n' +
      '   - Instruction scheduling (order of operations or temporary assignments)\n' +
      '   - Stack frame sizing (local structs or arrays)\n' +
      '   - Array indexing vs direct offsets\n' +
      'c. Compile unit: ninja ' + cand.unit_obj + '\n' +
      'd. Check new match percentage with tools/decomp-diff.py\n\n' +
      'Stop when you reach 100.0% match OR have exhausted 8 rounds.\n\n' +
      '## Step 4 — Docstring\n' +
      'Ensure the function has a clear Doxygen docstring:\n' +
      '  /**\n' +
      '   * @brief <summary>.\n' +
      '   */\n\n' +
      '## Step 5 — Regression check\n' +
      '  ninja ' + cand.unit_obj + '\n' +
      'If errors: git restore . and report failure.\n\n' +
      '## Step 6 — Commit (only if clean and match improved or maintained)\n' +
      '  git add -u\n' +
      '  git commit -m "match: ' + cand.demangled + ' (' + cand.unit + ')\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
      '## Step 7 — Report\n' +
      'Get branch: git rev-parse --abbrev-ref HEAD\n\n' +
      'Return structured result with all required fields.'

    return agent(prompt, {
      phase: 'Decomp',
      label: 'decomp:' + cand.symbol.slice(0, 15),
      schema: DECOMP_SCHEMA,
      isolation: 'worktree',
      agentType: 'decomp-worker',
    })
  })
)

const succeeded = decompResults.filter(Boolean).filter(r => r.success)
const failed = decompResults.filter(Boolean).filter(r => !r.success)
log('Decomp done: ' + succeeded.length + ' succeeded, ' + failed.length + ' failed')
for (const f of failed) {
  log('  FAILED: ' + f.function_name + ' — ' + (f.notes || 'no notes'))
}

phase('Merge')
const mergedFunctions = []
for (const result of succeeded) {
  log('Merging: ' + result.function_name + ' from branch ' + result.branch_name)
  const mr = await agent(
    'Merge a completed decompilation branch into main. Do this carefully and sequentially.\n\n' +
    'Branch: ' + result.branch_name + '\n' +
    'Function: ' + result.function_name + '\n' +
    'Unit: ' + result.unit + '\n\n' +
    'Steps:\n' +
    '1. cd /home/samuelcaldas/source/repos/nfsmw\n' +
    '2. git fetch origin\n' +
    '3. git pull --rebase origin main\n' +
    '4. git merge --no-ff ' + result.branch_name + '\n' +
    '   (If conflict: resolve by keeping the decompiled version, then: git add -A && git merge --continue)\n' +
    '5. ninja ' + (result.unit_obj || '') + ' (verify unit builds)\n' +
    '6. ninja changes (verify no regressions)\n' +
    '7. If clean:\n' +
    '   - git push origin main\n' +
    '   - git branch -D ' + result.branch_name + ' || true\n' +
    '   - Report success with merge commit: git rev-parse HEAD\n' +
    '8. If regressions:\n' +
    '   - git reset --hard HEAD^\n' +
    '   - Report failure with details\n\n' +
    'Return: success, function_name, merge_commit, notes',
    {
      phase: 'Merge',
      label: 'merge:' + result.function_name.replace(/.*::/, '').replace(/\(.*/, '').slice(0, 20),
      schema: MERGE_SCHEMA,
    }
  )
  if (mr && mr.success) {
    mergedFunctions.push({ ...result, merge_commit: mr.merge_commit })
    log('  Merged: ' + result.function_name)
  } else {
    log('  Merge FAILED: ' + result.function_name + ' — ' + (mr ? mr.notes : 'null'))
  }
}

log('Merged ' + mergedFunctions.length + ' functions into main')

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
    'Update decompilation documentation for newly merged functions.\n\n' +
    'Merged functions this batch:\n' + fnList + '\n\n' +
    'Tasks:\n' +
    '1. cd /home/samuelcaldas/source/repos/nfsmw\n' +
    '2. git fetch origin\n' +
    '3. git pull --rebase origin main\n' +
    '4. Read docs/decompiled_functions.md\n' +
    '5. For each function, add or update an entry in the appropriate ## section.\n' +
    '   Follow the EXACT style of existing entries:\n' +
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
    '6. Read docs/decompilation_status_ledger.md\n' +
    '7. Update section 1 to record each function as [Completed & Merged].\n\n' +
    '8. Commit and push:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: document Batch 23 decompiled functions (@nfs2)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n' +
    '   git pull --rebase origin main\n' +
    '   git push origin main',
    {
      phase: 'Docs',
      label: 'docs:update',
    }
  )
}

return {
  batch_candidates: CANDIDATES.length,
  succeeded: succeeded.length,
  failed: failed.length,
  merged: mergedFunctions.length,
  functions: mergedFunctions.map(r => r.function_name),
}
