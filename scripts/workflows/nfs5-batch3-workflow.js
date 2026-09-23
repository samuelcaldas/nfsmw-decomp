export const meta = {
  name: 'nfsmw-parallel-decomp-batch3-nfs5',
  description: 'Batch 3 decompilation for nfs5 (zDynamics): Joint::AddConstraint (Articulation.cpp) & Moment::Moment(Matrix4) (Collision.cpp) in Pair 1, Constraint::Constraint (Articulation.cpp) & Moment::Moment(IEntity) (Collision.cpp) in Pair 2',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: Joint::AddConstraint (Articulation.cpp) & Moment::Moment(Matrix4) (Collision.cpp)' },
    { title: 'Decomp-2', detail: 'Pair 2: Constraint::Constraint (Articulation.cpp) & Moment::Moment(IEntity) (Collision.cpp)' },
    { title: 'Merge', detail: 'Sequential merge to main' },
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

const CANDIDATES_PAIR1 = [
  {
    demangled: 'Dynamics::Articulation::Joint::AddConstraint',
    symbol: 'AddConstraint__Q38Dynamics12Articulation5JointPQ28Dynamics7IEntityRCQ25UMath7Matrix4ffRCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    size: 272,
    match: 84.7,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp',
    virtual_address: '0x80088380',
    extra_instructions:
      'In src/Speed/Indep/Src/Physics/Dynamics/Articulation.h and Articulation.cpp:\n' +
      '1. Object Layout:\n' +
      '   In GCC 2.95 (SN ProDG), Constraint has size 0x6c (108 bytes). Its layout derives from a non-polymorphic ConstraintData:\n' +
      '   struct ConstraintData {\n' +
      '       int mPad;\n' +
      '       Quaternion mOrient;\n' +
      '       float mCoeffs[12];\n' +
      '       Lever *mFemale;\n' +
      '       Lever *mMale;\n' +
      '       UMath::Vector3 mPost;\n' +
      '       float mMinTheta;\n' +
      '       float mMaxTheta;\n' +
      '       int mFlag;\n' +
      '       eConstraint mType;\n' +
      '   };\n' +
      '   class Constraint : public ConstraintData {\n' +
      '     public:\n' +
      '       USE_FASTALLOC(Constraint);\n' +
      '       Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type);\n' +
      '       virtual void OnDebugDraw();\n' +
      '   };\n' +
      '   This places members at 0x00..0x67 and _vptr at 0x68, yielding sizeof(Constraint) == 0x6c (108 bytes)!\n' +
      '2. In Joint::AddConstraint(entity, orient, minTheta, maxTheta, post, type):\n' +
      '   FastMem::Alloc(0x6c) is called with sizeof(Constraint).\n' +
      '   Constraint *c;\n' +
      '   if (entity == this->mFemale.GetEntity()) {\n' +
      '       c = new Constraint(orient, minTheta, maxTheta, this->mFemale, this->mMale, post, type);\n' +
      '   } else {\n' +
      '       c = new Constraint(orient, minTheta, maxTheta, this->mMale, this->mFemale, post, type);\n' +
      '   }\n' +
      '   this->mConstraints.push_back(c);\n' +
      '   Inspect diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d AddConstraint__Q38Dynamics12Articulation5JointPQ28Dynamics7IEntityRCQ25UMath7Matrix4ffRCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint.\n' +
      '   Aim for 100.0% match.',
  },
  {
    demangled: 'Dynamics::Collision::Moment::Moment(const Matrix4&, ...)',
    symbol: '__Q38Dynamics9Collision6MomentRCQ25UMath7Matrix4fRCQ25UMath7Vector3N43',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    size: 440,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp',
    virtual_address: '0x800837D0',
    extra_instructions:
      'In src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp, implement Moment::Moment(const Matrix4 &orientation, float mass, const Vector3 &inertia, const Vector3 &cg, const Vector3 &linearVel, const Vector3 &angularVel, const Vector3 &position):\n' +
      'Target assembly at 0x800837D0 (440 bytes):\n' +
      'ProDG compiles without saving non-volatile registers (stwu r1, -0x48(r1)).\n' +
      'Follow exact order:\n' +
      '1. mInertiaP = inertia; (offset 0x80)\n' +
      '2. mCG = cg; (offset 0x8c)\n' +
      '3. mLinearVelocity = linearVel; (offset 0x98)\n' +
      '4. mAngularVelocity = angularVel; (offset 0xa4)\n' +
      '5. mPosition = position; (offset 0xb0)\n' +
      '6. mInertialScale.x = 1.0f; mInertialScale.y = 1.0f; mInertialScale.z = 1.0f; (0xbc..0xc4)\n' +
      '7. mMass = mass; (0xd0)\n' +
      '8. mElasticity = 0.0f; (0x10c)\n' +
      '9. mFixedCG = false; (0x110)\n' +
      '10. mImmobile = false; (0xc8)\n' +
      '11. mBrakingForce = 0.0f; (0xcc)\n' +
      '12. Zero fields from 0xd8 to 0x108 with 0 integer stores (mClosingVelocity, mSlidingVelocity, mForce, mFriction, mFrictionState).\n' +
      '13. mOrientation = orientation; (64 bytes copied at 0x00)\n' +
      '14. Inlined 4x4 matrix transposition into mOrientationInv at offset 0x40 (for i in 0..3: for j in 0..3: mOrientationInv.m[i][j] = orientation.m[j][i]).\n' +
      '15. mMassInv = 1.0f / mass; (offset 0xd4)\n' +
      'Inspect diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d __Q38Dynamics9Collision6MomentRCQ25UMath7Matrix4fRCQ25UMath7Vector3N43.\n' +
      'Aim for 100.0% match.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'Dynamics::Articulation::Constraint::Constraint',
    symbol: '__Q38Dynamics12Articulation10ConstraintRCQ25UMath7Matrix4ffRQ38Dynamics12Articulation5LeverT4RCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    size: 416,
    match: 36.3,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp',
    virtual_address: '0x80088490',
    extra_instructions:
      'In src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp, implement Constraint::Constraint(const Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const Vector3 &post, eConstraint type):\n' +
      'Target assembly at 0x80088490 (416 bytes):\n' +
      '1. Store mFemale = &female; (0x44) and mMale = &male; (0x48).\n' +
      '2. Zero mCoeffs[12] (0x14..0x40) and 0 at 0x40.\n' +
      '3. Store _vptr at 0x68.\n' +
      '4. Store mPost = post; (0x4c..0x54).\n' +
      '5. Store mFlag = 1; (0x60) and mType = type; (0x64).\n' +
      '6. mMinTheta = minTheta * (PI / 180.0f); (0x58) and mMaxTheta = maxTheta * (PI / 180.0f); (0x5c).\n' +
      '7. VU0_m4toquat(orient, *(UMath::Vector4*)&mOrient); (into 0x04).\n' +
      '8. float len = VU0_sqrt(VU0_v3lengthsquare(post));\n' +
      '9. Compute trigonometric coefficients:\n' +
      '   float halfMin = mMinTheta * 0.5f;\n' +
      '   float halfMax = mMaxTheta * 0.5f;\n' +
      '   mCoeffs[0] = -cosf(halfMin);\n' +
      '   mCoeffs[1] = 1.0f;\n' +
      '   mCoeffs[2] = sinf(halfMin);\n' +
      '   mCoeffs[3] = sinf(halfMin) * len;\n' +
      '   mCoeffs[4] = cosf(halfMin) * len;\n' +
      '   mCoeffs[5] = cosf(halfMax);\n' +
      '   mCoeffs[6] = 1.0f;\n' +
      '   mCoeffs[7] = sinf(halfMax);\n' +
      '   mCoeffs[8] = -sinf(halfMax) * len;\n' +
      '   mCoeffs[9] = 1.0f;\n' +
      '   mCoeffs[10] = cosf(halfMax) * len;\n' +
      '   mCoeffs[11] = cosf(halfMax) * len;\n' +
      '   Adjust exact coefficient order to match target assembly.\n' +
      'Inspect diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d __Q38Dynamics12Articulation10ConstraintRCQ25UMath7Matrix4ffRQ38Dynamics12Articulation5LeverT4RCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint.\n' +
      'Aim for 100.0% match.',
  },
  {
    demangled: 'Dynamics::Collision::Moment::Moment(const IEntity*)',
    symbol: '__Q38Dynamics9Collision6MomentPCQ28Dynamics7IEntity',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    size: 668,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp',
    virtual_address: '0x80083988',
    extra_instructions:
      'In src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp, implement Moment::Moment(const IEntity *entity):\n' +
      'Target assembly at 0x80083988 (668 bytes):\n' +
      'Follow exact sequence of virtual calls and assignments:\n' +
      '1. mInertiaP = entity->GetPrincipalInertia(); (call vtable offset 0x5c, store to 0x80)\n' +
      '2. mCG = entity->GetCenterOfGravity(); (call vtable offset 0x6c, store to 0x8c)\n' +
      '3. mLinearVelocity = entity->GetLinearVelocity(); (call vtable offset 0x2c, store to 0x98)\n' +
      '4. mAngularVelocity = entity->GetAngularVelocity(); (call vtable offset 0x1c, store to 0xa4)\n' +
      '5. mPosition = entity->GetPosition(); (call vtable offset 0x0c, store to 0xb0)\n' +
      '6. mInertialScale.x = 1.0f; mInertialScale.y = 1.0f; mInertialScale.z = 1.0f; (0xbc..0xc4)\n' +
      '7. mImmobile = entity->IsImmobile(); (call vtable offset 0x74, store to 0xc8)\n' +
      '8. mBrakingForce = 0.0f; (0xcc)\n' +
      '9. mMass = entity->GetMass(); (call vtable offset 0x64, store to 0xd0)\n' +
      '10. mElasticity = 0.0f; (0x10c)\n' +
      '11. mFixedCG = false; (0x110)\n' +
      '12. Zero 0xd8..0x108 with 0 integer stores (mClosingVelocity, mSlidingVelocity, mForce, mFriction, mFrictionState).\n' +
      '13. mOrientation = entity->GetRotation(); (call vtable offset 0x3c, copy 64B to 0x00)\n' +
      '14. Inlined 4x4 matrix transposition into mOrientationInv at offset 0x40 (for i in 0..3: for j in 0..3: mOrientationInv.m[i][j] = mOrientation.m[j][i]).\n' +
      '15. mMassInv = 1.0f / mMass; (0xd4)\n' +
      'Inspect diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d __Q38Dynamics9Collision6MomentPCQ28Dynamics7IEntity.\n' +
      'Aim for 100.0% match.',
  },
]

function makePrompt(c) {
  return (
    'You are a GOWE69 decompilation specialist working in an isolated worktree.\n\n' +
    'ASSIGNED TARGET:\n' +
    '  Demangled: ' + c.demangled + '\n' +
    '  Symbol (mangled): ' + c.symbol + '\n' +
    '  Unit: ' + c.unit + '\n' +
    '  Initial match: ' + c.match + '%\n' +
    '  Size: ' + c.size + ' bytes\n' +
    '  Virtual address: ' + (c.virtual_address || 'unknown') + '\n' +
    '  Primary source: ' + c.source_file + '\n' +
    (c.extra_instructions ? '  Guidance: ' + c.extra_instructions + '\n\n' : '\n') +
    'WORKTREE SETUP & EXECUTION RULES:\n\n' +
    '## Step 0 — Setup environment symlinks\n' +
    'Run immediately in your worktree root:\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/orig orig\n' +
    '  mkdir -p build\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n' +
    '  python3 configure.py\n' +
    '  ninja  (quick build check to ensure build works)\n\n' +
    '## Step 1 — Context inspection\n' +
    'Inspect function context and initial diff:\n' +
    '  python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n\n' +
    '## Step 2 — Read implementation\n' +
    'Read ' + c.source_file + ' around ' + c.demangled + '.\n\n' +
    '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
    'Iterate on matching:\n' +
    'a. Study differences in python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'b. Adjust register allocation, local variable ordering, types, loop bounds, condition checks.\n' +
    'c. Compile with ninja.\n' +
    'd. Re-check diff and percentage.\n' +
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
    'Return structured result with all required schema fields.'
  )
}

log('Starting Batch 3 for nfs5: Joint::AddConstraint, Moment::Moment(Matrix4), Constraint::Constraint, Moment::Moment(IEntity)')

phase('Decomp-1')
const resultsPair1 = await parallel(CANDIDATES_PAIR1.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-1',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

phase('Decomp-2')
const resultsPair2 = await parallel(CANDIDATES_PAIR2.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-2',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

const allResults = [...resultsPair1, ...resultsPair2]
const succeeded = allResults.filter(Boolean).filter(r => r.success)
const failed = allResults.filter(Boolean).filter(r => !r.success)
log('Decomp phases finished: ' + succeeded.length + ' succeeded, ' + failed.length + ' failed')

phase('Merge')
const mergedFunctions = []
for (const result of succeeded) {
  log('Sequentially merging: ' + result.function_name + ' from ' + result.branch_name)
  const mr = await agent(
    'Merge a completed decompilation branch into main. Follow serialized protocol strictly.\n\n' +
    'Branch: ' + result.branch_name + '\n' +
    'Function: ' + result.function_name + '\n' +
    'Unit: ' + result.unit + '\n\n' +
    'Protocol:\n' +
    '1. git fetch origin\n' +
    '2. git checkout main\n' +
    '3. git pull --rebase origin main\n' +
    '4. git merge --no-ff ' + result.branch_name + '\n' +
    '   (If conflict: resolve cleanly in favor of decompiled code, git add -A, and git commit --no-edit)\n' +
    '5. ninja  (ensure compilation succeeds)\n' +
    '6. ninja changes  (ensure NO regressions against baseline)\n' +
    '7. If ninja changes is clean:\n' +
    '   - git branch -d ' + result.branch_name + ' (best effort cleanup)\n' +
    '   - Report success with merge commit: git rev-parse HEAD\n' +
    '8. If regressions found:\n' +
    '   - git reset --hard HEAD^\n' +
    '   - Report failure with explanation\n\n' +
    'Return structured output with success, function_name, merge_commit, notes.',
    {
      phase: 'Merge',
      label: 'merge:' + result.function_name.replace(/.*::/, '').slice(0, 20),
      schema: MERGE_SCHEMA,
    }
  )
  if (mr && mr.success) {
    mergedFunctions.push({ ...result, merge_commit: mr.merge_commit })
    log('  Successfully merged: ' + result.function_name + ' (' + mr.merge_commit + ')')
  } else {
    log('  Merge skipped/failed: ' + result.function_name + ' — ' + (mr ? mr.notes : 'null'))
  }
}

log('Total merged this batch: ' + mergedFunctions.length)

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
    'Update decompilation documentation and ledger for newly merged functions.\n\n' +
    'Merged functions:\n' + fnList + '\n\n' +
    'Tasks:\n' +
    '1. Read docs/decompiled_functions.md\n' +
    '2. Add an entry for each function in the corresponding subsystem section.\n' +
    '   Use the exact markdown formatting of existing entries:\n' +
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
    '3. Read docs/decompilation_status_ledger.md and add each function as [Completed & Merged] under its subsystem in Section 1.\n' +
    '4. Commit documentation changes:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: record Batch 3 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"',
    {
      phase: 'Docs',
      label: 'docs:update',
    }
  )
}

return {
  total_candidates: 4,
  succeeded: succeeded.length,
  failed: failed.length,
  merged: mergedFunctions.length,
  functions: mergedFunctions,
}
