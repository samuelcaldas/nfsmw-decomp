export const meta = {
  name: 'nfs2-batch20-decomp',
  description: 'Batch 20 decompilation for @nfs2 units: CarLoader::SetMemoryPoolSize (zWorld), WCollisionMgr::FindFaceInCInst (zWorld2), UIWidgetMenu::Scroll (zFe2), RegionQuery::CalculateRegionInfo (zTrack), bATan (zBWare), GinsuSynthData::BindToData (zEAXSound2)',
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
    hint: 'Currently 97.4% match (304 bytes, 77 instructions). In CarLoader.cpp around lines 543-547: adjust CarLoaderMemoryPoolNumber assignment in bInitMemoryPool: bInitMemoryPool(CarLoaderMemoryPoolNumber = pool, this->MemoryPoolMem, this->MemoryPoolSize, "Cars"); to align register store scheduling.',
  },
  {
    demangled: 'WCollisionMgr::FindFaceInCInst(UMath::Matrix4 const &, UMath::Vector3 const &, WCollisionInstance const &, WCollisionTri &, float &)',
    symbol: 'FindFaceInCInst__13WCollisionMgrRCQ25UMath7Matrix4RCQ25UMath7Vector3RC18WCollisionInstanceR13WCollisionTriRf',
    diff_filter: 'FindFaceInCInst__13WCollisionMgrRCQ25UMath7Matrix4',
    unit: 'main/Speed/Indep/SourceLists/zWorld2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld2.o',
    size: 1436,
    match: 99.9,
    source_file: 'src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp',
    virtual_address: '0x802f0818',
    signature: 'bool WCollisionMgr::FindFaceInCInst(const UMath::Matrix4 &vectorMat, const UMath::Vector3 &endPt, const WCollisionInstance &cInst, WCollisionTri &retFace, float &retDist)',
    description: 'Finds the collision face in a collision instance using strip sphere bounding checks and tri-strip intersection.',
    hint: 'Currently 99.9% match (1436 bytes, 359 instructions). In WCollisionMgr.cpp lines 276-290: reorder local vector temporaries (r26, r28, r27) to align register assignments.',
  },
  {
    demangled: 'UIWidgetMenu::Scroll(eScrollDir)',
    symbol: 'Scroll__12UIWidgetMenu10eScrollDir',
    diff_filter: 'Scroll__12UIWidgetMenu',
    unit: 'main/Speed/Indep/SourceLists/zFe2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFe2.o',
    size: 536,
    match: 97.0,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/Common/feUIWidgetMenu.cpp',
    virtual_address: '0x80175198',
    signature: 'void UIWidgetMenu::Scroll(eScrollDir dir)',
    description: 'Scrolls the UI widget menu up/down, handling disabled options, wrapping, scrollbar updates, and button focus.',
    hint: 'Currently 97.0% match (536 bytes, 135 instructions). In feUIWidgetMenu.cpp lines 150-165: adjust register allocation (r29 vs r28) and branch conditions for disabled widgets.',
  },
  {
    demangled: 'RegionQuery::CalculateRegionInfo(eView *, RegionType, int)',
    symbol: 'CalculateRegionInfo__11RegionQueryP5eView10RegionTypei',
    diff_filter: 'CalculateRegionInfo',
    unit: 'main/Speed/Indep/SourceLists/zTrack',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zTrack.o',
    size: 1208,
    match: 99.9,
    source_file: 'src/Speed/Indep/Src/World/WeatherMan.cpp',
    virtual_address: '0x802c1640',
    signature: 'int RegionQuery::CalculateRegionInfo(eView *view, RegionType regionKind, int InFE)',
    description: 'Calculates region fog and lighting parameters for the current view and weather region.',
    hint: 'Currently 99.9% match (1208 bytes, 302 instructions). In WeatherMan.cpp lines 135-143: reorder float assignments to align floating-point register stores f11, f12, f13, f0.',
  },
  {
    demangled: 'bATan(float, float)',
    symbol: 'bATan__Fff',
    diff_filter: 'bATan',
    unit: 'main/Speed/Indep/SourceLists/zBWare',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zBWare.o',
    size: 328,
    match: 98.0,
    source_file: 'src/Speed/Indep/bWare/Src/bMath.cpp',
    virtual_address: '0x8005d1f0',
    signature: 'bAngle bATan(float x, float y)',
    description: 'Computes the 2D arctangent using quadrant detection and fast lookup table interpolation.',
    hint: 'Currently 98.0% match (328 bytes, 82 instructions). In bMath.cpp lines 344-353: tune local variable caching and register allocation around bFastATanTable access.',
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
    virtual_address: '0x800eae74',
    signature: 'bool GinsuSynthData::BindToData(void *data)',
    description: 'Binds synthesis structures to raw sound data chunks, endian-swapping headers and setting up grain pointers.',
    hint: 'Currently 96.2% match (340 bytes, 86 instructions). In GinsuSynthData.cpp lines 150-185: adjust loop counter register allocation and temporary pointer indexing.',
  },
]

log('Starting Batch 20 parallel decomp for ' + CANDIDATES.length + ' candidates across @nfs2 units')

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
      '  ln -sfn /home/samuelcaldas/repos/nfsmw/orig/GOWE69/NFSMWRELEASE.ELF orig/GOWE69/NFSMWRELEASE.ELF && \\\n' +
      '  ln -sfn /home/samuelcaldas/repos/nfsmw/orig/GOWE69/sys orig/GOWE69/sys 2>/dev/null || true && \\\n' +
      '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers && \\\n' +
      '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils && \\\n' +
      '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools && \\\n' +
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
      '   - Stack frame sizing\n' +
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
      '  git commit -m "match: ' + cand.demangled + ' (' + cand.unit + ')\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"\n\n' +
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
    '   git commit -m "docs: document Batch 20 decompiled functions (@nfs2)\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"\n' +
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
