/**
 * @file nfs5-batch14-workflow.js
 * @brief Batch 14 parallel matching decompilation workflow for nfs5 strictly using gemini-3.5-flash-lite.
 *
 * Units:
 * - zTrack: RenderVisibleSectionBoundary, RegionQuery::CalculateRegionInfo
 * - zFEng: FEMessageResponse::FindConditionBranchTarget, FEQuaternion::operator*
 * - zWorld: CarPartCuller::CullParts
 * - zEagl4Anim: EAGL4Anim::MemoryPoolManager::NewBlockAux
 */

export const meta = {
  name: 'nfsmw-parallel-decomp-batch14-nfs5',
  description: 'Batch 14 parallel decompilation for nfs5 (6 agents): zTrack, zFEng, zWorld & zEagl4Anim strictly using decomp-worker (gemini-3.5-flash-lite)',
  phases: [
    { title: 'Decomp-Pool', detail: '6 concurrent worker agents on distinct candidate functions across 4 unconflicted units' },
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
    virtual_address: '0x80258854',
    signature: 'void RenderVisibleSectionBoundary(VisibleSectionBoundary *boundary, eView *view)',
    extra_instructions:
      'Inspect RenderVisibleSectionBoundary in src/Speed/Indep/Src/World/Scenery.cpp (lines 590-635).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zTrack -d RenderVisibleSectionBoundary__FP22VisibleSectionBoundaryP5eView\n' +
      'Currently at 99.91% match (222 instructions, 888 bytes).\n' +
      'Only difference: r14 and r15 are swapped when loading constants lbl_80409ABC (9999.0f) and lbl_80409AA0 (1.0f).\n' +
      'Target allocates r14 to 9999.0f and r15 to 1.0f.\n' +
      'Refine local variable declaration order or register placement to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'RegionQuery::CalculateRegionInfo(eView *, RegionType, int)',
    symbol: 'CalculateRegionInfo__11RegionQueryP5eView10RegionTypei',
    unit: 'main/Speed/Indep/SourceLists/zTrack',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zTrack.o',
    size: 1208,
    match: 99.92,
    source_file: 'src/Speed/Indep/Src/World/WeatherMan.cpp',
    virtual_address: '0x8025B9FC',
    signature: 'int RegionQuery::CalculateRegionInfo(eView *view, RegionType regionKind, int InFE)',
    extra_instructions:
      'Inspect RegionQuery::CalculateRegionInfo in src/Speed/Indep/Src/World/WeatherMan.cpp (lines 119-150).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zTrack -d CalculateRegionInfo__11RegionQueryP5eView10RegionTypei\n' +
      'Currently at 99.92% match (302 instructions, 1208 bytes).\n' +
      'Only difference: at offset baa4-bab0, the stores to this (r3) are:\n' +
      '  Target: stfs f11, 0xc(r3) (DistFogStart), then stfs f12, 0(r3) (FogFalloff), stfs f13, 4(r3) (FogFalloffX), stfs f0, 8(r3) (FogFalloffY)\n' +
      '  Current: stores 0(r3), 4(r3), 8(r3), then 0xc(r3)\n' +
      'Use inline assembly or sequenced assignment to preserve the target store order to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'FEMessageResponse::FindConditionBranchTarget(unsigned long) const',
    symbol: 'FindConditionBranchTarget__C17FEMessageResponseUl',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 144,
    match: 98.47,
    source_file: 'src/Speed/Indep/Src/FEng/FEMessageResponse.cpp',
    virtual_address: '0x8018A4F4',
    signature: 'u32 FEMessageResponse::FindConditionBranchTarget(u32 Index) const',
    extra_instructions:
      'Inspect FindConditionBranchTarget in src/Speed/Indep/Src/FEng/FEMessageResponse.cpp (lines 95-120).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d FindConditionBranchTarget__C17FEMessageResponseUl\n' +
      'Currently at 98.47% match (36 instructions, 144 bytes).\n' +
      'Only difference: Target holds this in r11 and Nest in r10, whereas current has this in r9 and Nest in r11.\n' +
      'Use register variable hints (e.g. register int Nest asm("r10")) or structure to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'CarPartCuller::CullParts(bVector3 *, unsigned short)',
    symbol: 'CullParts__13CarPartCullerP8bVector3Us',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld.o',
    size: 836,
    match: 99.35,
    source_file: 'src/Speed/Indep/Src/World/CarRender.cpp',
    virtual_address: '0x80251DB0',
    signature: 'void CarPartCuller::CullParts(bVector3 *camera_eye, bAngle stang)',
    extra_instructions:
      'Inspect CarPartCuller::CullParts in src/Speed/Indep/Src/World/CarRender.cpp (lines 269-335).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zWorld -d CullParts__13CarPartCullerP8bVector3Us\n' +
      'Currently at 99.35% match (209 instructions, 836 bytes).\n' +
      'At offset 1f2c-1f34, target checks plane_info->Polarity using r0 and loads 0 into r9 (n = 0) before branch.\n' +
      'Switch/if restructure of Polarity check matches register allocation.\n' +
      'Refine control flow to achieve 100.0% PERFECT MATCH!',
  },
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
      'Inspect MemoryPoolManager::NewBlockAux in src/Speed/Indep/Src/EAGL4Anim/MemoryPoolManager.cpp (lines 75-88).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEagl4Anim -d NewBlockAux__Q29EAGL4Anim17MemoryPoolManagerUi\n' +
      'Currently at 88.57% match (22 instructions, 84 bytes).\n' +
      'Target sequence:\n' +
      '  stw r4, 0(r8)\n' +
      '  lwz r11, gMemoryPoolFree\n' +
      '  add r9, r11, r9\n' +
      '  addi r3, r11, 4\n' +
      '  stw r9, gMemoryPoolFree\n' +
      '  blr\n' +
      'Target computes return value in r3 (gMemoryPoolFree + 4) BEFORE storing updated gMemoryPoolFree.\n' +
      'Adjust local variable statements to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'FEQuaternion::operator*(FEQuaternion const &)',
    symbol: '__ml__12FEQuaternionRC12FEQuaternion',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 212,
    match: 89.1,
    source_file: 'src/Speed/Indep/Src/FEng/FEMath.h',
    virtual_address: '0x801906F0',
    signature: 'FEQuaternion FEQuaternion::operator*(const FEQuaternion &q1)',
    extra_instructions:
      'Inspect FEQuaternion::operator* in src/Speed/Indep/Src/FEng/FEMath.h (lines 60-67).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d "__ml__12FEQuaternionRC12FEQuaternion"\n' +
      'Currently at 89.1% match (54 instructions, 212 bytes).\n' +
      'Target order computes qRet.w components during the initial loads:\n' +
      '  qRet.w = q1.w * w - (q1.x * x + q1.y * y + q1.z * z);\n' +
      'Adjust statement ordering or intermediate variable expressions to achieve 100.0% PERFECT MATCH!',
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
    '  git commit -m "match(' + c.unit.split('/').pop() + '): decompile ' + c.demangled + '\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
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

log('Starting Batch 14 for nfs5: Spawning 6 agents inside workflow per round across zTrack, zFEng, zWorld, and zEagl4Anim strictly using decomp-worker (gemini-3.5-flash-lite)')

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
