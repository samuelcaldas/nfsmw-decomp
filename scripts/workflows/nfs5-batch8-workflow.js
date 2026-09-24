export const meta = {
  name: 'nfsmw-parallel-decomp-batch8-nfs5',
  description: 'Batch 8 parallel decompilation for nfs5 (6 agents): zPhysicsBehaviors, zFEng & zDynamics with TDD and worktree isolation',
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
    demangled: 'SuspensionTraffic::Tire::UpdateLoaded',
    symbol: 'UpdateLoaded__Q217SuspensionTraffic4Tireffff',
    unit: 'main/Speed/Indep/SourceLists/zPhysicsBehaviors',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zPhysicsBehaviors.o',
    size: 856,
    match: 99.79,
    source_file: 'src/Speed/Indep/Src/Physics/Behaviors/SuspensionTraffic.cpp',
    virtual_address: '0x8024B310',
    signature: 'void SuspensionTraffic::Tire::UpdateLoaded(float lat_vel, float fwd_vel, float load, float dT)',
    extra_instructions:
      'Inspect SuspensionTraffic::Tire::UpdateLoaded in src/Speed/Indep/Src/Physics/Behaviors/SuspensionTraffic.cpp (lines 270-345).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zPhysicsBehaviors -d UpdateLoaded__Q217SuspensionTraffic4Tireffff\n' +
      'Currently at 99.79% match (only 214 instructions, nearly perfect!).\n' +
      'Remaining difference is just a minor floating-point register allocation swap between f10 and f11 around lines 330-340 (loading lbl_803FB6B8 vs fneg f30 and fcmpu).\n' +
      'Adjust local float variable ordering or explicit register hints to eliminate this final swap and achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'FEPackageReader::ReadObjectChunk',
    symbol: 'ReadObjectChunk__15FEPackageReader',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 964,
    match: 99.02,
    source_file: 'src/Speed/Indep/Src/FEng/FEPackageReader.cpp',
    virtual_address: '0x8018C1B0',
    signature: 'bool FEPackageReader::ReadObjectChunk()',
    extra_instructions:
      'Inspect FEPackageReader::ReadObjectChunk in src/Speed/Indep/Src/FEng/FEPackageReader.cpp (lines 249-342).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d ReadObjectChunk__15FEPackageReader\n' +
      'Currently at 99.02% match.\n' +
      'Remaining differences are temporary register swaps (r0/r9/r10/r11) in endian conversions (FEngGetu32 / GetID) across chunk iteration loops.\n' +
      'Refine local variable declarations and scoping of chunk pointers to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'FEObjectSorter<1024>::SortObjects',
    symbol: 'SortObjects__t14FEObjectSorter1i1024',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 316,
    match: 94.67,
    source_file: 'src/Speed/Indep/Src/FEng/FEObjectSorter.h',
    virtual_address: '0x80190570',
    signature: 'template <int N> void FEObjectSorter<N>::SortObjects()',
    extra_instructions:
      'Inspect FEObjectSorter<N>::SortObjects() in src/Speed/Indep/Src/FEng/FEObjectSorter.h (lines 52-81).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d SortObjects__t14FEObjectSorter1i1024\n' +
      'Currently at 94.67% match (only 80 instructions, 316 bytes).\n' +
      'Study register indexing in the 4-pass radix sort loops (lines 60-78). Align intermediate pointers and loop index registers (r6/r11, r25/r26/r27) to reach 100.0% match!',
  },
  {
    demangled: 'FEngine::ProcessResponses',
    symbol: 'ProcessResponses__7FEngineP17FEMessageResponseP8FEObjectP9FEPackageUl',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 1172,
    match: 96.58,
    source_file: 'src/Speed/Indep/Src/FEng/FEngine.cpp',
    virtual_address: '0x80187FE4',
    signature: 'void FEngine::ProcessResponses(FEMessageResponse *pRespList, FEObject *pObj, FEPackage *pPack, u32 ControlMask)',
    extra_instructions:
      'Inspect FEngine::ProcessResponses in src/Speed/Indep/Src/FEng/FEngine.cpp (lines 1120-1255).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d ProcessResponses__7FEngineP17FEMessageResponseP8FEObjectP9FEPackageUl\n' +
      'Currently at 96.58% match.\n' +
      'Notice the register swap between r25 and r26: in the original binary, pObj is in r26 and ControlMask is in r25. In current decompilation, they are inverted.\n' +
      'Reorder parameter usage/caching and case order in the response switch to match original jump table comparisons and reach 100.0% match!',
  },
  {
    demangled: 'FEQuaternion::GetMatrix',
    symbol: 'GetMatrix__12FEQuaternionP9FEMatrix4',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 196,
    match: 88.59,
    source_file: 'src/Speed/Indep/Src/FEng/FEMath.cpp',
    virtual_address: '0x80184A10',
    signature: 'void FEQuaternion::GetMatrix(FEMatrix4 *rotmat)',
    extra_instructions:
      'Inspect FEQuaternion::GetMatrix in src/Speed/Indep/Src/FEng/FEMath.cpp (lines 7-40).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d GetMatrix__12FEQuaternionP9FEMatrix4\n' +
      'Currently at 88.59% match (only 51 instructions, 196 bytes).\n' +
      'Notice the constant zero assignments: rotmat->m14, m24, m34, m41, m42, m43, and m44 = 1.0f.\n' +
      'The original binary clears/sets the affine matrix elements in a specific order (or sets 0.0f at the beginning/end). Align the store order and temporary float calculations to reach 100.0% match!',
  },
  {
    demangled: 'Dynamics::Articulation::Constraint::Constraint',
    symbol: '__Q38Dynamics12Articulation10ConstraintRCQ25UMath7Matrix4ffRQ38Dynamics12Articulation5LeverT4RCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zDynamics.o',
    size: 416,
    match: 90.18,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp',
    virtual_address: '0x80242850',
    signature: 'Dynamics::Articulation::Constraint::Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type)',
    extra_instructions:
      'Inspect Constraint::Constraint in src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp (lines 105-130).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d __Q38Dynamics12Articulation10ConstraintRCQ25UMath7Matrix4ffRQ38Dynamics12Articulation5LeverT4RCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint\n' +
      'Currently at 90.18% match (109 instructions, 416 bytes).\n' +
      'Notice lines 109-113: mType, mEnabled, mOuterA, mInnerA assignment order vs mPost vector copying and angle normalization by 360.0f.\n' +
      'Reorder member assignments and temporary float expressions to align instruction scheduling and achieve 100.0% match!',
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

log('Starting Batch 8 for nfs5: Spawning 6 agents inside workflow per round across zPhysicsBehaviors, zFEng, and zDynamics')

phase('Decomp-Pool')
const results = await parallel(CANDIDATES.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-Pool',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
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
