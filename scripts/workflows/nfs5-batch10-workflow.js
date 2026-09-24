export const meta = {
  name: 'nfsmw-parallel-decomp-batch10-nfs5',
  description: 'Batch 10 parallel decompilation for nfs5 (6 agents): zTrack, zWorld2, zAI, zWorld, zFEng & zPhysicsBehaviors with TDD and worktree isolation',
  phases: [
    { title: 'Decomp-Pool', detail: '6 concurrent worker agents on distinct candidate functions' },
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
    demangled: 'RenderVisibleSectionBoundary(VisibleSectionBoundary*, eView*)',
    symbol: 'RenderVisibleSectionBoundary__FP22VisibleSectionBoundaryP5eView',
    unit: 'main/Speed/Indep/SourceLists/zTrack',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zTrack.o',
    size: 888,
    match: 99.91,
    source_file: 'src/Speed/Indep/Src/World/Scenery.cpp',
    virtual_address: '0x802BC098',
    signature: 'void RenderVisibleSectionBoundary(VisibleSectionBoundary *boundary, eView *view)',
    extra_instructions:
      'Inspect RenderVisibleSectionBoundary in src/Speed/Indep/Src/World/Scenery.cpp (lines 591-630).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zTrack -d RenderVisibleSectionBoundary__FP22VisibleSectionBoundaryP5eView\n' +
      'Currently at 99.91% match (222 instructions, 888 bytes).\n' +
      'The diff shows only a single register load swap between r14 and r15 for constants $LC464 and $LC462:\n' +
      '  lis {r14}, lbl_80409ABC@ha | lis {r15}, $LC464@ha\n' +
      '  lis {r15}, lbl_80409AA0@ha | lis {r14}, $LC462@ha\n' +
      'Target loads lbl_80409ABC into r14 and lbl_80409AA0 into r15.\n' +
      'Adjust variable declaration order or use register asm bindings to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'WCollisionMgr::FindFaceInCInst(UMath::Matrix4 const &, UMath::Vector3 const &, WCollisionInstance const &, WCollisionTri &, float &)',
    symbol: 'FindFaceInCInst__13WCollisionMgrRCQ25UMath7Matrix4RCQ25UMath7Vector3RC18WCollisionInstanceR13WCollisionTriRf',
    unit: 'main/Speed/Indep/SourceLists/zWorld2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld2.o',
    size: 1436,
    match: 99.92,
    source_file: 'src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp',
    virtual_address: '0x802EE418',
    signature: 'bool WCollisionMgr::FindFaceInCInst(const UMath::Matrix4 &vectorMat, const UMath::Vector3 &endPt, const WCollisionInstance &cInst, WCollisionTri &retFace, float &retDist)',
    extra_instructions:
      'Inspect WCollisionMgr::FindFaceInCInst in src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp (lines 275-345).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zWorld2 -d "FindFaceInCInst__13WCollisionMgrRCQ25UMath7Matrix4RCQ25UMath7Vector3RC18WCollisionInstanceR13WCollisionTriRf"\n' +
      'Currently at 99.92% match (359 instructions, 1436 bytes).\n' +
      'The diff shows register allocation rotation of intermediate stack pointers:\n' +
      '  addi {r26}, r1, 0x98 | addi {r28}, r1, 0x98\n' +
      '  addi {r28}, r1, 0xa8 | addi {r27}, r1, 0xa8\n' +
      '  addi {r27}, r1, 0xb8 | addi {r26}, r1, 0xb8\n' +
      'Adjust stack object declaration order or intermediate pointer bindings to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'AICopManager::UpdatePursuits',
    symbol: 'UpdatePursuits__12AICopManager',
    unit: 'main/Speed/Indep/SourceLists/zAI',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zAI.o',
    size: 2516,
    match: 99.97,
    source_file: 'src/Speed/Indep/Src/AI/Activities/AICopManager.cpp',
    virtual_address: '0x8000A47C',
    signature: 'void AICopManager::UpdatePursuits()',
    extra_instructions:
      'Inspect AICopManager::UpdatePursuits in src/Speed/Indep/Src/AI/Activities/AICopManager.cpp (lines 1836-1981).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zAI -d UpdatePursuits__12AICopManager\n' +
      'Currently at 99.97% match (629 instructions, 2516 bytes).\n' +
      'The diff shows only a swap between r25 and r26 loading 0x4330 vs VehicleClass::CHOPPER:\n' +
      '  lis {r25}, 0x4330                   | lis {r26}, 0x4330\n' +
      '  lis {r26}, VehicleClass::CHOPPER@ha | lis {r25}, VehicleClass::CHOPPER@ha\n' +
      'Target uses r25 for 0x4330 and r26 for VehicleClass::CHOPPER.\n' +
      'Adjust the declaration order or bind register asm hints to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'CarPartCuller::CullParts(bVector3 *, unsigned short)',
    symbol: 'CullParts__13CarPartCullerP8bVector3Us',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld.o',
    size: 836,
    match: 99.35,
    source_file: 'src/Speed/Indep/Src/World/CarRender.cpp',
    virtual_address: '0x802C4EF4',
    signature: 'void CarPartCuller::CullParts(bVector3 *camera_eye, bAngle stang)',
    extra_instructions:
      'Inspect CarPartCuller::CullParts in src/Speed/Indep/Src/World/CarRender.cpp (lines 269-352).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zWorld -d CullParts__13CarPartCullerP8bVector3Us\n' +
      'Currently at 99.35% match (209 instructions, 836 bytes).\n' +
      'Diff shows:\n' +
      '  lis {r17}, 0x4330     | lis {r18}, 0x4330\n' +
      '  lis {r18}, culldiv@ha | lis {r17}, culldiv@ha\n' +
      'and comparison of plane_info->Polarity at line 306:\n' +
      '  lwz {r0}, 8(r30)      | lwz {r9}, 8(r30)\n' +
      '  li r9, 0              |\n' +
      '  cmpwi {r0}, 0         | cmpwi {r9}, 0\n' +
      'Align variable register assignments and control flow to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'FEPackageReader::ReadObjectChunk',
    symbol: 'ReadObjectChunk__15FEPackageReader',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 964,
    match: 99.02,
    source_file: 'src/Speed/Indep/Src/FEng/FEPackageReader.cpp',
    virtual_address: '0x8018A1B0',
    signature: 'bool FEPackageReader::ReadObjectChunk()',
    extra_instructions:
      'Inspect FEPackageReader::ReadObjectChunk in src/Speed/Indep/Src/FEng/FEPackageReader.cpp (lines 252-342).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d ReadObjectChunk__15FEPackageReader\n' +
      'Currently at 99.02% match (241 instructions, 964 bytes).\n' +
      'Diff shows minor register assignment differences in endian byte swap sequences (bEndianSwap32 / GetID) and subID branch ordering.\n' +
      'Align register usage and loop exit checks to push match towards 100.0%!',
  },
  {
    demangled: 'SuspensionSimple::Tire::UpdateLoaded(float, float, float, float, float, float)',
    symbol: 'UpdateLoaded__Q216SuspensionSimple4Tireffffff',
    unit: 'main/Speed/Indep/SourceLists/zPhysicsBehaviors',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zPhysicsBehaviors.o',
    size: 1972,
    match: 98.90,
    source_file: 'src/Speed/Indep/Src/Physics/Behaviors/SuspensionSimple.cpp',
    virtual_address: '0x8024AF20',
    signature: 'void SuspensionSimple::Tire::UpdateLoaded(float lat_vel, float fwd_vel, float load, float drive_torque, float brake_torque, float dT)',
    extra_instructions:
      'Inspect SuspensionSimple::Tire::UpdateLoaded in src/Speed/Indep/Src/Physics/Behaviors/SuspensionSimple.cpp (lines 402-525).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zPhysicsBehaviors -d UpdateLoaded__Q216SuspensionSimple4Tireffffff\n' +
      'Currently at 98.90% match (494 instructions, 1972 bytes).\n' +
      'Notice the friction and traction force calculations (lines 462-478):\n' +
      'Target has fdivs and fmuls sequence storing mLongitudeForce and mLateralForce.\n' +
      'Notice UMath::Limit at line 475: target directly clamps without extra branching.\n' +
      'Align floating-point expression order and clamp sequence to push match towards 100.0%!',
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

log('Starting Batch 10 for nfs5: Spawning 6 agents inside workflow per round across zTrack, zWorld2, zAI, zWorld, zFEng, and zPhysicsBehaviors')

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
