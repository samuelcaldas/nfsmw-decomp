export const meta = {
  name: 'nfsmw-parallel-decomp-batch11-nfs5',
  description: 'Batch 11 parallel decompilation for nfs5 (6 agents): zFEng, zTrack, zWorld, zAI, zPhysics & zDynamics with TDD and worktree isolation',
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
    demangled: 'FEngine::Update(long, unsigned int)',
    symbol: 'Update__7FEnginelUi',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 776,
    match: 99.77,
    source_file: 'src/Speed/Indep/Src/FEng/FEngine.cpp',
    virtual_address: '0x8018610C',
    signature: 'void FEngine::Update(const i32 tDeltaTicks, uint32 lock)',
    extra_instructions:
      'Inspect FEngine::Update in src/Speed/Indep/Src/FEng/FEngine.cpp (lines 277-347).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d Update__7FEnginelUi\n' +
      'Currently at 99.77% match (194 instructions, 776 bytes).\n' +
      'The diff shows only a swap between r30 and r31 in the PadHoldRegistered loop (lines 300-307):\n' +
      '  Target uses r30 for byte offset (i * 4) and r31 for loop counter PadIdx.\n' +
      '  Our code currently uses r31 for byte offset and r30 for PadIdx.\n' +
      'Adjust loop variable declaration order, types, or register bindings to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'RegionQuery::CalculateRegionInfo(eView *, RegionType, int)',
    symbol: 'CalculateRegionInfo__11RegionQueryP5eView10RegionTypei',
    unit: 'main/Speed/Indep/SourceLists/zTrack',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zTrack.o',
    size: 1208,
    match: 99.92,
    source_file: 'src/Speed/Indep/Src/World/WeatherMan.cpp',
    virtual_address: '0x802B99FC',
    signature: 'int RegionQuery::CalculateRegionInfo(eView *view, RegionType regionKind, int InFE)',
    extra_instructions:
      'Inspect RegionQuery::CalculateRegionInfo in src/Speed/Indep/Src/World/WeatherMan.cpp (lines 119-155).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zTrack -d CalculateRegionInfo__11RegionQueryP5eView10RegionTypei\n' +
      'Currently at 99.92% match (302 instructions, 1208 bytes).\n' +
      'The diff shows member store ordering in the FogControlOverRide block (lines 137-142):\n' +
      '  Target stores: stfs f11, 0xc(r3) [DistFogStart], stfs f12, 0(r3) [FogFalloff], stfs f13, 4(r3) [FogFalloffX], stfs f0, 8(r3) [FogFalloffY]\n' +
      '  Our code stores: FogFalloff, FogFalloffX, FogFalloffY, then DistFogStart.\n' +
      'Reorder the store assignments so DistFogStart is stored first to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'CarLoader::SetMemoryPoolSize(int)',
    symbol: 'SetMemoryPoolSize__9CarLoaderi',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld.o',
    size: 304,
    match: 97.37,
    source_file: 'src/Speed/Indep/Src/World/CarLoader.cpp',
    virtual_address: '0x80017E1C',
    signature: 'void CarLoader::SetMemoryPoolSize(int size)',
    extra_instructions:
      'Inspect CarLoader::SetMemoryPoolSize in src/Speed/Indep/Src/World/CarLoader.cpp (lines 515-550).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zWorld -d SetMemoryPoolSize__9CarLoaderi\n' +
      'Currently at 97.37% match (77 instructions, 304 bytes).\n' +
      'The diff shows the timing of the store into CarLoaderMemoryPoolNumber relative to loading the string "Cars" (lines 543-544):\n' +
      '  Target loads "Cars" into r6 first, then stores r0 into CarLoaderMemoryPoolNumber, then calls bInitMemoryPool.\n' +
      'Adjust expression structure (e.g. bInitMemoryPool(CarLoaderMemoryPoolNumber = bGetFreeMemoryPoolNum(), ...) or temporary) to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'AIPursuit::AssignClosestOffsets',
    symbol: 'AssignClosestOffsets__9AIPursuitRQ33UTL3Stdt6vector2ZQ25UMath7Vector3Z19_type_AIVector3ListRQ33UTL3Stdt6vector2ZP10IPursuitAIZ16_type_AIPursuersRQ33UTL3Stdt6vector2ZQ29AIPursuit15FormationTargetZ27_type_AIFormationTargetListb',
    unit: 'main/Speed/Indep/SourceLists/zAI',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zAI.o',
    size: 1684,
    match: 99.67,
    source_file: 'src/Speed/Indep/Src/AI/Common/AIPursuit.cpp',
    virtual_address: '0x8002E2C0',
    signature: 'void AIPursuit::AssignClosestOffsets(Vector3List &copRelativePositions, Pursuers &assignCopList, FormationTargetList &formationOffsets, bool information)',
    extra_instructions:
      'Inspect AIPursuit::AssignClosestOffsets in src/Speed/Indep/Src/AI/Common/AIPursuit.cpp (lines 1103-1205).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zAI -d AssignClosestOffsets__9AIPursuitRQ33UTL3Stdt6vector2ZQ25UMath7Vector3Z19_type_AIVector3ListRQ33UTL3Stdt6vector2ZP10IPursuitAIZ16_type_AIPursuersRQ33UTL3Stdt6vector2ZQ29AIPursuit15FormationTargetZ27_type_AIFormationTargetListb\n' +
      'Currently at 99.67% match (421 instructions, 1684 bytes).\n' +
      'The diff shows an inverted register assignment between r28 and r29 for loading constant float address and loop counter:\n' +
      '  Target uses r28 for float constant address and r29 for counter decrement (subi r29, r9, 1).\n' +
      'Adjust variable declarations, scoping, or asm hints to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'Physics::Info::ShiftPoints',
    symbol: 'ShiftPoints__Q27Physics4InfoRCQ36Attrib3Gen12transmissionRCQ36Attrib3Gen6engineRCQ36Attrib3Gen9inductionPfT4Ui',
    unit: 'main/Speed/Indep/SourceLists/zPhysics',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zPhysics.o',
    size: 824,
    match: 97.63,
    source_file: 'src/Speed/Indep/Src/Physics/PhysicsInfo.cpp',
    virtual_address: '0x80216D20',
    signature: 'bool Physics::Info::ShiftPoints(const Attrib::Gen::transmission &transmission, const Attrib::Gen::engine &engine, const Attrib::Gen::induction &induction, float *shift_up, float *shift_down, unsigned int numpts)',
    extra_instructions:
      'Inspect Physics::Info::ShiftPoints in src/Speed/Indep/Src/Physics/PhysicsInfo.cpp (lines 156-225).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zPhysics -d ShiftPoints__Q27Physics4InfoRCQ36Attrib3Gen12transmissionRCQ36Attrib3Gen6engineRCQ36Attrib3Gen9inductionPfT4Ui\n' +
      'Currently at 97.63% match (206 instructions, 824 bytes).\n' +
      'Target function prologue saves non-volatile registers from r18 (stmw r18, 0x10(r1)), whereas current code saves from r17 (stmw r17, 0xc(r1)).\n' +
      'Eliminate register r17 usage or adjust register allocation to save registers starting from r18 to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'Dynamics::Articulation::Constraint::Constraint',
    symbol: '__Q38Dynamics12Articulation10ConstraintRCQ25UMath7Matrix4ffRQ38Dynamics12Articulation5LeverT4RCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zDynamics.o',
    size: 416,
    match: 90.83,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp',
    virtual_address: '0x80234E10',
    signature: 'Constraint::Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type)',
    extra_instructions:
      'Inspect Constraint::Constraint in src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp (lines 105-130).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d __Q38Dynamics12Articulation10ConstraintRCQ25UMath7Matrix4ffRQ38Dynamics12Articulation5LeverT4RCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint\n' +
      'Currently at 90.83% match (109 instructions, 416 bytes).\n' +
      'The diff shows:\n' +
      '  Target stores: stw r5, 0x44(r30) [mFemale], stw r6, 0x48(r30) [mMale], stw r0, 0x40(r30), then zeros offsets 0x14 through 0x3c.\n' +
      '  Our code currently zeros 0x14-0x3c first, then stores mFemale and mMale later.\n' +
      'Adjust member initialization and constructor body order to reach 100.0% PERFECT MATCH!',
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

log('Starting Batch 11 for nfs5: Spawning 6 agents inside workflow per round across zFEng, zTrack, zWorld, zAI, zPhysics, and zDynamics')

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
