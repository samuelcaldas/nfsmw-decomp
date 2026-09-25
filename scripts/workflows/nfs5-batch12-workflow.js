export const meta = {
  name: 'nfsmw-parallel-decomp-batch12-nfs5',
  description: 'Batch 12 parallel decompilation for nfs5 (6 agents): zEagl4Anim, zTrack, zWorld2, zWorld, zAI & zEcstasy with TDD and worktree isolation',
  phases: [
    { title: 'Decomp-Pool', detail: '6 concurrent worker agents on distinct candidate functions across 6 units' },
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

const CANDIDATES = [
  {
    demangled: 'EAGL4Anim::MemoryPoolManager::NewBlockAux(unsigned int)',
    symbol: 'NewBlockAux__Q29EAGL4Anim17MemoryPoolManagerUi',
    unit: 'main/Speed/Indep/SourceLists/zEagl4Anim',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEagl4Anim.o',
    size: 84,
    match: 88.57,
    source_file: 'src/Speed/Indep/Src/EAGL4Anim/MemoryPoolManager.cpp',
    virtual_address: '0x80231534',
    signature: 'void *EAGL4Anim::MemoryPoolManager::NewBlockAux(size_t size)',
    extra_instructions:
      'Inspect MemoryPoolManager::NewBlockAux in src/Speed/Indep/Src/EAGL4Anim/MemoryPoolManager.cpp (lines 77-89).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEagl4Anim -d NewBlockAux__Q29EAGL4Anim17MemoryPoolManagerUi\n' +
      'Currently at 88.57% match (22 instructions, 84 bytes).\n' +
      'The diff shows the memory allocation block:\n' +
      '  Target reads gMemoryPoolFree, stores idx at 0(gMemoryPoolFree), re-reads gMemoryPoolFree, adds offset, and computes return value (r3 = gMemoryPoolFree + 4) before storing updated gMemoryPoolFree.\n' +
      'Adjust local variable sequencing to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'RenderVisibleSectionBoundary(VisibleSectionBoundary*, eView*)',
    symbol: 'RenderVisibleSectionBoundary__FP22VisibleSectionBoundaryP5eView',
    unit: 'main/Speed/Indep/SourceLists/zTrack',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zTrack.o',
    size: 888,
    match: 99.91,
    source_file: 'src/Speed/Indep/Src/World/Scenery.cpp',
    virtual_address: '0x802BC854',
    signature: 'void RenderVisibleSectionBoundary(VisibleSectionBoundary *boundary, eView *view)',
    extra_instructions:
      'Inspect RenderVisibleSectionBoundary in src/Speed/Indep/Src/World/Scenery.cpp (lines 591-630).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zTrack -d RenderVisibleSectionBoundary__FP22VisibleSectionBoundaryP5eView\n' +
      'Currently at 99.91% match (222 instructions, 888 bytes).\n' +
      'The diff shows only 4 instructions swapped between r14 and r15 for loading float constants $LC464 and $LC462:\n' +
      '  Target loads $LC464 into r14, $LC462 into r15.\n' +
      '  Our code loads $LC464 into r15, $LC462 into r14.\n' +
      'Adjust variable usage order or constant evaluation around lines 600-610 to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'WCollisionMgr::FindFaceInCInst(UMath::Matrix4 const &, UMath::Vector3 const &, WCollisionInstance const &, WCollisionTri &, float &)',
    symbol: 'FindFaceInCInst__13WCollisionMgrRCQ25UMath7Matrix4RCQ25UMath7Vector3RC18WCollisionInstanceR13WCollisionTriRf',
    unit: 'main/Speed/Indep/SourceLists/zWorld2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld2.o',
    size: 1436,
    match: 99.92,
    source_file: 'src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp',
    virtual_address: '0x802E7E18',
    signature: 'bool WCollisionMgr::FindFaceInCInst(const UMath::Matrix4 &vectorMat, const UMath::Vector3 &endPt, const WCollisionInstance &cInst, WCollisionTri &retFace, float &retDist)',
    extra_instructions:
      'Inspect WCollisionMgr::FindFaceInCInst in src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp (lines 275-345).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zWorld2 -d "FindFaceInCInst__13WCollisionMgrRCQ25UMath7Matrix4"\n' +
      'Currently at 99.92% match (359 instructions, 1436 bytes).\n' +
      'The diff shows register allocation ordering across r26, r27, r28 for the matrix row offsets.\n' +
      'Adjust matrix row reference ordering to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'CarPartCuller::CullParts(bVector3 *, unsigned short)',
    symbol: 'CullParts__13CarPartCullerP8bVector3Us',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld.o',
    size: 836,
    match: 99.35,
    source_file: 'src/Speed/Indep/Src/World/CarRender.cpp',
    virtual_address: '0x80085DB0',
    signature: 'void CarPartCuller::CullParts(bVector3 *camera_eye, bAngle stang)',
    extra_instructions:
      'Inspect CarPartCuller::CullParts in src/Speed/Indep/Src/World/CarRender.cpp (lines 269-351).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zWorld -d CullParts__13CarPartCullerP8bVector3Us\n' +
      'Currently at 99.35% match (209 instructions, 836 bytes).\n' +
      'The diff shows:\n' +
      '  1. Inverted r17/r18 for culldiv vs 0x4330 float constant.\n' +
      '  2. Target compares plane_info->Polarity using r0 (cmpwi r0, 0 / cmpwi r0, 1) rather than r9.\n' +
      'Adjust variable ordering and polarity check to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'AICopManager::UpdatePursuits',
    symbol: 'UpdatePursuits__12AICopManager',
    unit: 'main/Speed/Indep/SourceLists/zAI',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zAI.o',
    size: 2516,
    match: 99.97,
    source_file: 'src/Speed/Indep/Src/AI/Activities/AICopManager.cpp',
    virtual_address: '0x80034FDC',
    signature: 'void AICopManager::UpdatePursuits()',
    extra_instructions:
      'Inspect AICopManager::UpdatePursuits in src/Speed/Indep/Src/AI/Activities/AICopManager.cpp (lines 1836-1981).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zAI -d UpdatePursuits__12AICopManager\n' +
      'Currently at 99.97% match (629 instructions, 2516 bytes; objdiff already reports 100% fuzzy match).\n' +
      'The diff shows only r25 and r26 swapped between 0x4330 constant and VehicleClass::CHOPPER@ha.\n' +
      'Adjust local variable declarations around float conversion to match exact register allocation and achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: '__InitMatrices()',
    symbol: '__InitMatrices__Fv',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEcstasy.o',
    size: 508,
    match: 97.95,
    source_file: 'src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp',
    virtual_address: '0x802D1E64',
    signature: 'void __InitMatrices(void)',
    extra_instructions:
      'Inspect __InitMatrices in src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp (lines 680-696).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEcstasy -d __InitMatrices__Fv\n' +
      'Currently at 97.95% match (128 instructions, 508 bytes).\n' +
      'The diff shows float register scheduling for transx, transy, and MTXScale calculations (lines 688-690).\n' +
      'Adjust the intermediate float expression groupings to achieve 100.0% PERFECT MATCH!',
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
    '## Step 0 — Setup environment symlinks & baseline\n' +
    'Run immediately in your worktree root:\n' +
    '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/orig orig\n' +
    '  mkdir -p build/GOWE69\n' +
    '  cp /home/samuelcaldas/source/repos/nfsmw/build/GOWE69/baseline.json build/GOWE69/baseline.json\n' +
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
    '- success: boolean (true if improved match or reached 100% without regressions)\n' +
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

log('Starting Batch 12 for nfs5: Spawning 6 agents inside workflow per round across zEagl4Anim, zTrack, zWorld2, zWorld, zAI, and zEcstasy')

phase('Decomp-Pool')
const results = await parallel(CANDIDATES.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-Pool',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').replace(/\(.*/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

const succeeded = results.filter(Boolean).filter(r => r.success)
const failed = results.filter(Boolean).filter(r => !r.success)
log('Decomp pool finished: ' + succeeded.length + ' succeeded, ' + failed.length + ' failed')

return {
  total_candidates: CANDIDATES.length,
  succeeded: succeeded.length,
  failed: failed.length,
  results: results.filter(Boolean),
}
