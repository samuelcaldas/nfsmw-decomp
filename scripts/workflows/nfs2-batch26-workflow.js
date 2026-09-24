export const meta = {
  name: 'nfs2-batch26-decomp',
  description: 'Batch 26 decompilation for @nfs2 units: CARSFX_PreColWoosh::MsgBarrier (zEAXSound2), EAXCommon::Play (zEAXSound), CARSFX_RoadNoise::Play (zEAXSound2), GinsuSynthesis::HandlePacketRelease (zEAXSound2)',
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
    virtual_address: '0x800DC378',
    signature: 'void CARSFX_PreColWoosh::MsgBarrier(const MAudioReflection &message)',
    description: 'Handles the barrier message for pre-collision woosh sound effects.',
    hint: 'Currently 94.29% match (140 bytes, only 1 instruction placement mismatch: li r4, 1 relative to stfs f13). In CARSFX_PreColWoosh.cpp lines 53-59: LEFT original emitted "li r4, 1" before "stfs f13, 0x34(r10)". Notice that WooshFadeOut.Initialize takes (1.0f, 1.0f, 1, LINEAR). Test reordering or structuring: e.g. int steps = 1; this->bGoingToCollide = true; this->mDurationActive = 0.0f; this->WooshFadeOut.Initialize(1.0f, 1.0f, steps, LINEAR); or test moving this->mDurationActive = 0.0f after Initialize, or evaluate how to schedule li r4, 1 before stfs. Check diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEAXSound2 -d MsgBarrier__18CARSFX_PreColWooshRC16MAudioReflection.',
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
    virtual_address: '0x800ADA44',
    signature: 'int EAXCommon::Play(eMenuSoundTriggers etrigger)',
    description: 'Plays common menu sound triggers and front-end HUD audio samples.',
    hint: 'Currently 96.83% match (492 bytes, 124 instructions, 92 consecutive matching instructions at end). In EAXFrontEnd.cpp lines 187-205: In LEFT original, "li r3, -1" is placed before branch on Debug_Common_FE_OFF, and then "lwz r3, 0x24(r28)" loads this->m_pSFXOBJ_FEHUD directly into r3. If r3 is non-null, "lwz r0, 0xc(r3)" calls GetOutputBlockPtr() directly using r3, and if non-null, r3 is already in place for GetDMixOutput(1, DMX_VOL) without any "mr r3, r9" register move! Match the guard structure: test if (IsSoundEnabled == 0 || Debug_Common_FE_OFF != 0) return -1; or check how r3 is loaded. Check diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEAXSound -d Play__9EAXCommon18eMenuSoundTriggers.',
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
    hint: 'Currently 94.94% match (392 bytes, 99 instructions). In CARSFX_Roadnoise.cpp lines 80-92 and src/Speed/Indep/Src/EAXSound/SND_GEN/ENVIRO_AEMS.h: The caller passes new Csis::FX_ROADNOISE(ID, 0, 0x1000, 0, Csis::FXROADNOISETYPETYPE_LOOP, 0, 0, 25000, 0, 0x7FFF, 0). LEFT original reuses r29 (the register used for ID) to hold constant 0 after clamping ID into r8, and puts gFX_ROADNOISEHandle into r30. Inspect member initializer order in FX_ROADNOISE constructor to match register allocation. Check diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEAXSound2 -d Play__16CARSFX_RoadNoise16FXROADNOISE_LOOPi.',
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
    description: 'Processes a released audio packet and crossfades jump overlaps in Ginsu granular synthesis.',
    hint: 'Currently 99.54% match (1936 bytes, 485 instructions, only 8 bytes mismatch at line 93-96). In ginsusynth.cpp lines 92-96: LEFT original emits "cmpw r7, r10" (comparing i < this->mOverlapSize) BEFORE "lfs f12, 0.0f". In our code, float blend = 0.0f causes lfs f12 to emit before cmpw. Refine loop initialization: test "for (int i = 0; i < this->mOverlapSize; i++)" with blend initialized inside or after the loop condition test, or "float blend; if (i < this->mOverlapSize) { blend = 0.0f; do { ... } while (...); }". Check diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEAXSound2 -d HandlePacketRelease__14GinsuSynthesisPs to achieve 100.0% match.',
  },
]

log('Starting Batch 26 parallel decomp for ' + CANDIDATES.length + ' candidates across @nfs2 units')

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
    '   git commit -m "docs: document Batch 26 decompiled functions (@nfs2)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n' +
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
