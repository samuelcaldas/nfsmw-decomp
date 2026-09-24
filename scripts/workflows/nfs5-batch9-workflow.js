export const meta = {
  name: 'nfsmw-parallel-decomp-batch9-nfs5',
  description: 'Batch 9 parallel decompilation for nfs5 (6 agents): zFEng, zPhysicsBehaviors, zPhysics & zDynamics with TDD and worktree isolation',
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
    demangled: 'FEQuaternion::operator*(FEQuaternion const &)',
    symbol: '__ml__12FEQuaternionRC12FEQuaternion',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 212,
    match: 89.06,
    source_file: 'src/Speed/Indep/Src/FEng/FEMath.h',
    virtual_address: '0x801906F0',
    signature: 'FEQuaternion FEQuaternion::operator*(const FEQuaternion &q1)',
    extra_instructions:
      'Inspect FEQuaternion::operator* in src/Speed/Indep/Src/FEng/FEMath.h (lines 55-68).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d __ml__12FEQuaternionRC12FEQuaternion\n' +
      'Currently at 89.06% match (only 54 instructions, 212 bytes).\n' +
      'The difference is purely in the subexpression and calculation order of quaternion multiplication terms.\n' +
      'Target instruction stream begins with: lfs f5, 4(r4) (y); lfs f11, 4(r5) (q1.y); lfs f0, 0(r5) (q1.x); lfs f10, 0(r4) (x); fmuls f8, f5, f11 (y * q1.y); lfs f6, 0xc(r4) (w); fmuls f1, f5, f0 (y * q1.x); lfs f13, 8(r5) (q1.z); fmadds f8, f10, f0, f8 (x * q1.x + y * q1.y).\n' +
      'Align the order of operations in qRet.x, qRet.y, qRet.z, qRet.w to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'FEMessageResponse::FindConditionBranchTarget',
    symbol: 'FindConditionBranchTarget__C17FEMessageResponseUl',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 144,
    match: 63.06,
    source_file: 'src/Speed/Indep/Src/FEng/FEMessageResponse.cpp',
    virtual_address: '0x80185414',
    signature: 'u32 FEMessageResponse::FindConditionBranchTarget(u32 Index) const',
    extra_instructions:
      'Inspect FEMessageResponse::FindConditionBranchTarget in src/Speed/Indep/Src/FEng/FEMessageResponse.cpp (lines 95-120).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d FindConditionBranchTarget__C17FEMessageResponseUl\n' +
      'Currently at 63.06% match (only 42 instructions, 144 bytes).\n' +
      'Target prologue begins: mr r11, r3; lwz r3, 0x10(r11) (Count); subi r0, r3, 1; cmpw r4, r0; beqlr (early return Count if Index == Count - 1).\n' +
      'Then li r10, 1 (Nest = 1); mr r0, r3; lwz r3, 0x14(r11) (pResponseList); b 0x5614; loop: cmpwi r10, 0; beq return Index; addi r4, r4, 1 (Index++).\n' +
      'Refine the loop control flow (while vs do-while) and early return to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'FEngine::Update',
    symbol: 'Update__7FEnginelUi',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 776,
    match: 91.68,
    source_file: 'src/Speed/Indep/Src/FEng/FEngine.cpp',
    virtual_address: '0x80185F38',
    signature: 'void FEngine::Update(long param_1, unsigned int param_2)',
    extra_instructions:
      'Inspect FEngine::Update in src/Speed/Indep/Src/FEng/FEngine.cpp (lines 275-345).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d Update__7FEnginelUi\n' +
      'Currently at 91.68% match (198 instructions, 776 bytes).\n' +
      'Notice register mapping: target uses r29 for this; current code uses r31.\n' +
      'Notice the package update loop around line 310-322: there is a loop repeating package update based on dirty flags.\n' +
      'Align control flow and register usage to improve matching towards 100.0%!',
  },
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
      'Currently at 99.79% match (214 instructions, 856 bytes - almost perfect!).\n' +
      'Difference is a register swap between f10 and f11 at lines 333-340:\n' +
      'Target has fneg f11, f30; fadds f0, f11, f11; then loads lbl_803FB6B8 into f10 and does fcmpu cr0, f1, f10.\n' +
      'Adjust local float variable ordering or expression decomposition to ensure fneg uses f11 and lbl_803FB6B8 loads into f10, achieving 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'Physics::Info::ShiftPoints',
    symbol: 'ShiftPoints__Q27Physics4InfoRCQ36Attrib3Gen12transmissionRCQ36Attrib3Gen6engineRCQ36Attrib3Gen9inductionPfT4Ui',
    unit: 'main/Speed/Indep/SourceLists/zPhysics',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zPhysics.o',
    size: 824,
    match: 90.41,
    source_file: 'src/Speed/Indep/Src/Physics/PhysicsInfo.cpp',
    virtual_address: '0x80224CB8',
    signature: 'bool Physics::Info::ShiftPoints(const Attrib::Gen::transmission &trans, const Attrib::Gen::engine &eng, const Attrib::Gen::induction &ind, float *upshift, float *downshift, unsigned int max_gears)',
    extra_instructions:
      'Inspect Physics::Info::ShiftPoints in src/Speed/Indep/Src/Physics/PhysicsInfo.cpp (lines 155-230).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zPhysics -d ShiftPoints__Q27Physics4InfoRCQ36Attrib3Gen12transmissionRCQ36Attrib3Gen6engineRCQ36Attrib3Gen9inductionPfT4Ui\n' +
      'Currently at 90.41% match (214 instructions, 824 bytes).\n' +
      'Target saves r17-r31 (stmw r17, 0xc(r1)), whereas current code saves r18-r31 (stmw r18, 0x10(r1)).\n' +
      'An extra non-volatile register is needed for intermediate constants/pointers in the gear loop (lines 177-224).\n' +
      'Refine local variable allocations and loop structures to achieve higher matching!',
  },
  {
    demangled: 'Dynamics::Articulation::Constraint::Constraint',
    symbol: '__Q38Dynamics12Articulation10ConstraintRCQ25UMath7Matrix4ffRQ38Dynamics12Articulation5LeverT4RCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zDynamics.o',
    size: 416,
    match: 90.83,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp',
    virtual_address: '0x80242850',
    signature: 'Dynamics::Articulation::Constraint::Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type)',
    extra_instructions:
      'Inspect Constraint::Constraint in src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp (lines 105-130).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d __Q38Dynamics12Articulation10ConstraintRCQ25UMath7Matrix4ffRQ38Dynamics12Articulation5LeverT4RCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint\n' +
      'Currently at 90.83% match (109 instructions, 416 bytes).\n' +
      'Notice that the current code zeroes 0x4c, 0x50, 0x54 (mPost) during construction, but target only copies post into 0x4c, 0x50, 0x54 without pre-zeroing.\n' +
      'Examine how mPost or other members are initialized or declared so that redundant stores are eliminated, pushing match to 100.0%!',
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

log('Starting Batch 9 for nfs5: Spawning 6 agents inside workflow per round across zFEng, zPhysicsBehaviors, zPhysics, and zDynamics')

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
