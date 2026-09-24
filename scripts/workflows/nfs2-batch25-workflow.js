export const meta = {
  name: 'nfs2-batch25-decomp',
  description: 'Batch 25 decompilation for @nfs2 units: MsgPlayMiscSound (zEAXSound2), HandlePacketRelease (zEAXSound2), InitializeEATrax (zEAXSound2), CARSFX_RoadNoise::Play (zEAXSound2), CARSFX_PreColWoosh::MsgBarrier (zEAXSound2), SFXCTL_Physics::UpdateMixerOutputs (zEAXSound)',
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
    demangled: 'SFX_Common::MsgPlayMiscSound(MMiscSound const &)',
    symbol: 'MsgPlayMiscSound__10SFX_CommonRC10MMiscSound',
    diff_filter: 'MsgPlayMiscSound__10SFX_CommonRC10MMiscSound',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound2.o',
    size: 780,
    match: 99.97,
    source_file: 'src/Speed/Indep/Src/EAXSound/SFX_Common.cpp',
    virtual_address: '0x800D36C4',
    signature: 'void SFX_Common::MsgPlayMiscSound(const MMiscSound &message)',
    description: 'Handles playing miscellaneous sound messages and managing EAX sound effects.',
    hint: 'Currently 99.97% match (780 bytes, 195 instructions). The only mismatch is the member store order in FX_UVES constructor in src/Speed/Indep/Src/EAXSound/SND_GEN/MAIN_AEMS.h. Reorder the setter calls in FX_UVES constructor (lines 1765-1772) to: SetStop(stop); SetID(iD); SetVolume(volume); SetWidth(width); SetPitch_Offset(pitch_Offset); SetIntensity(intensity);. Check diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEAXSound2 -d MsgPlayMiscSound__10SFX_CommonRC10MMiscSound to verify 100.0% match.',
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
    virtual_address: '0x800EB9F0',
    signature: 'void GinsuSynthesis::HandlePacketRelease(short *samples)',
    description: 'Handles packet release and audio sample blending/cycling in Ginsu granular synthesis.',
    hint: 'Currently 99.54% match (1936 bytes, 485 instructions, only 8 bytes mismatch at line 93-96). In ginsusynth.cpp lines 92-96: cmpw r7, r10 (comparing i < this->mOverlapSize) must occur before loading float 0.0f into f12. Refine the loop initialization and variable declaration order: int i = 0; float blendstep = 1.0f / static_cast<float>(this->mOverlapSize); float blend; or guard with if (i < this->mOverlapSize) { blend = 0.0f; do { ... } while (...); }. Check diff with tools/decomp-diff.py to achieve 100.0% match.',
  },
  {
    demangled: 'InitializeEATrax(bool)',
    symbol: 'InitializeEATrax__Fb',
    diff_filter: 'InitializeEATrax__Fb',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound2.o',
    size: 344,
    match: 71.85,
    source_file: 'src/Speed/Indep/Src/EAXSound/CARSFX/SFXObj_Pathfinder.cpp',
    virtual_address: '0x800E3F18',
    signature: 'void InitializeEATrax(bool breset)',
    description: 'Initializes EA Trax song playback masks, enabled song counts, and jukebox playlist indices.',
    hint: 'Currently 71.85% match (344 bytes). In SFXObj_Pathfinder.cpp lines 390-430: (1) Set SFXObj_PFEATrax::m_EATrax[0].PBMode = FEDatabase->CurrentUserProfiles[0]->GetOptions()->TheAudioSettings.PlayState; and SFXObj_PFEATrax::m_EATrax[1].PBMode = FEDatabase->CurrentUserProfiles[0]->GetOptions()->TheAudioSettings.PlayState; (2) Initialize m_EATrax[0].TraxMask = 0; m_EATrax[1].TraxMask = 0; m_EATrax[0].NumEnabledSongs = 0; m_EATrax[1].NumEnabledSongs = 0; (3) Set JukeboxEntry *playlist = FEDatabase->CurrentUserProfiles[0]->Playlist; (4) In the loop for (int n = 0; n < g_MaxSongs; n++): change 1 << (songindex & 0x1F) to 1 << songindex; (5) In the switch (playability): case 1: m_EATrax[0].TraxMask |= 1 << songindex; m_EATrax[0].NumEnabledSongs++; break; case 2: m_EATrax[1].TraxMask |= 1 << songindex; m_EATrax[1].NumEnabledSongs++; break; case 3: both; (6) If breset is true: m_EATrax[1].LastPlaylistSong = -1; m_EATrax[0].LastPlaylistSong = -1;. Check diff with tools/decomp-diff.py.',
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
    virtual_address: '0x800D85D4',
    signature: 'void CARSFX_RoadNoise::Play(FXROADNOISE_LOOP ID, int side)',
    description: 'Plays road noise sound effect loop with specified volume and parameters.',
    hint: 'Currently 94.94% match (392 bytes, 99 instructions). In CARSFX_Roadnoise.cpp and ENVIRO_AEMS.h: refine FX_ROADNOISE constructor and parameter passing.',
  },
  {
    demangled: 'CARSFX_PreColWoosh::MsgBarrier(MAudioReflection const &)',
    symbol: 'MsgBarrier__18CARSFX_PreColWooshRC16MAudioReflection',
    diff_filter: 'MsgBarrier__18CARSFX_PreColWooshRC16MAudioReflection',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound2.o',
    size: 140,
    match: 94.29,
    source_file: 'src/Speed/Indep/Src/EAXSound/CARSFX/CARSFX_PreColWoosh.cpp',
    virtual_address: '0x800DC378',
    signature: 'void CARSFX_PreColWoosh::MsgBarrier(const MAudioReflection &message)',
    description: 'Handles the barrier message for pre-collision woosh sound effects.',
    hint: 'Currently 94.29% match (140 bytes, only 1 instruction placement mismatch: li r4, 1 relative to stfs f13). In CARSFX_PreColWoosh.cpp: test statement reordering between mDurationActive calculation and WooshFadeOut.Initialize(...) or passing an explicit variable for duration.',
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
    virtual_address: '0x800BFFC8',
    signature: 'void SFXCTL_Physics::UpdateMixerOutputs()',
    description: 'Updates physics mixer outputs for EAX sound based on vehicle speed, RPM, wheels on ground, and POV.',
    hint: 'Currently 98.65% match (1212 bytes, only 16 bytes unmatched). In SFXCTL_Physics.cpp lines 157-178: adjust float literal constants and local temporaries around MixerSqrt calculation.',
  },
]

log('Starting Batch 25 parallel decomp for ' + CANDIDATES.length + ' candidates across @nfs2 units')

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
    'Merge a completed decompilation branch into main using an ephemeral integration branch. Work strictly in your current worktree.\n\n' +
    'Branch: ' + result.branch_name + '\n' +
    'Function: ' + result.function_name + '\n' +
    'Unit: ' + result.unit + '\n\n' +
    'IMPORTANT RULES:\n' +
    '- NEVER open PRs. Do NOT use gh pr create or /commit-commands.\n' +
    '- Merge directly into origin/main.\n\n' +
    'Steps:\n' +
    '1. git fetch origin\n' +
    '2. git checkout -b integration origin/main\n' +
    '3. git merge --no-ff ' + result.branch_name + '\n' +
    '   (If conflict: resolve cleanly, git add -A, git merge --continue)\n' +
    '4. ninja ' + (result.unit_obj || '') + ' (verify unit builds)\n' +
    '5. ninja changes (verify zero regressions)\n' +
    '6. If clean:\n' +
    '   - git push origin integration:main\n' +
    '   - Report success with merge commit: git rev-parse HEAD\n' +
    '7. Cleanup:\n' +
    '   - git checkout nfs2-b22-msgplaymiscsound\n' +
    '   - git branch -D integration || true\n' +
    '   - git worktree remove -f ' + result.branch_name + ' 2>/dev/null || true\n' +
    '   - git branch -D ' + result.branch_name + ' 2>/dev/null || true\n\n' +
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
    'Update decompilation documentation for newly merged functions using an ephemeral integration branch.\n\n' +
    'Merged functions this batch:\n' + fnList + '\n\n' +
    'Tasks:\n' +
    '1. git fetch origin\n' +
    '2. git checkout -b integration origin/main\n' +
    '3. Read docs/decompiled_functions.md\n' +
    '4. For each function, add or update an entry in the appropriate ## section.\n' +
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
    '5. Read docs/decompilation_status_ledger.md\n' +
    '6. Update section 1 to record each function as [Completed & Merged].\n\n' +
    '7. Commit and push:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: document Batch 25 decompiled functions (@nfs2)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n' +
    '   git push origin integration:main\n' +
    '8. Cleanup:\n' +
    '   git checkout nfs2-b22-msgplaymiscsound\n' +
    '   git branch -D integration || true',
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
