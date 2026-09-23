export const meta = {
  name: 'nfsmw-parallel-decomp-batch1-nfs5',
  description: 'Batch 1 decompilation for nfs5 (zDynamics): Geometry::SphereVsSphere (Geometry.cpp), Joint::AddConstraint (Articulation.cpp), Moment::Moment (Collision.cpp), Constraint::Constraint (Articulation.cpp)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: Geometry::SphereVsSphere & Joint::AddConstraint' },
    { title: 'Decomp-2', detail: 'Pair 2: Moment::Moment & Constraint::Constraint' },
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
    demangled: 'Dynamics::Collision::Geometry::SphereVsSphere',
    symbol: 'SphereVsSphere__Q38Dynamics9Collision8GeometryPCQ38Dynamics9Collision8GeometryT1PQ38Dynamics9Collision8Geometry',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    size: 332,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Geometry.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Physics/Dynamics/Geometry.cpp, implement Geometry::SphereVsSphere(const Geometry *A, const Geometry *B, Geometry *result).\n' +
      'Target assembly at 0x8008A4B8 (332 bytes):\n' +
      '1. Sub delta vector using VU0_v4subxyz between positions (local Vector4 delta).\n' +
      '2. Distance = VU0_sqrt(VU0_v4lengthsquarexyz(delta)).\n' +
      '3. Float sum = A->mRadius + B->mRadius (radii are at offset 0x90 of Geometry).\n' +
      '4. If distance == 0.0f:\n' +
      '   result->mCollision_normal = Vector3(0.0f, 1.0f, 0.0f) at 0x80;\n' +
      '   result->mCollision_point = A->mPosition + Vector3(0, rA, 0) at 0x70;\n' +
      '   result->mOverlap = -rA at 0xac;\n' +
      '5. Else if distance >= sum: return false;\n' +
      '   Else:\n' +
      '   rsqrt = VU0_rsqrt(VU0_v4lengthsquarexyz(delta));\n' +
      '   VU0_v4scalexyz(delta, rsqrt, result->mCollision_normal);\n' +
      '   result->mOverlap = distance - sum at 0xac;\n' +
      '   VU0_v4scaleaddxyz(result->mCollision_normal, B->mRadius + overlap, B->mPosition, result->mCollision_point);\n' +
      '6. If A != result: negate normal and result->mPenetratesOther = 0; else result->mPenetratesOther = 1;\n' +
      '7. Return true.\n' +
      'Verify 100.0% match with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d SphereVsSphere__Q38Dynamics9Collision8GeometryPCQ38Dynamics9Collision8GeometryT1PQ38Dynamics9Collision8Geometry',
  },
  {
    demangled: 'Dynamics::Articulation::Joint::AddConstraint',
    symbol: 'AddConstraint__Q38Dynamics12Articulation5JointPQ28Dynamics7IEntityRCQ25UMath7Matrix4ffRCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    size: 272,
    match: 83.97,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Physics/Dynamics/Articulation.h and Articulation.cpp:\n' +
      '1. In class Lever, add int mPad at offset 0 before UVector3 mArm so mArm is at offset 4, mEntity at offset 16, mImmobile at offset 20, and _vptr at offset 24.\n' +
      '2. In class Joint, remove int mPad0[2] so mFemale is at offset 0xc. Keep int mPad1 between mFemale (0xc..0x24) and mMale (0x28).\n' +
      '3. In Joint::AddConstraint(entity, orient, minTheta, maxTheta, post, type):\n' +
      '   Constraint *c;\n' +
      '   if (entity == this->mFemale.GetEntity()) {\n' +
      '       c = new Constraint(orient, minTheta, maxTheta, this->mFemale, this->mMale, post, type);\n' +
      '   } else {\n' +
      '       c = new Constraint(orient, minTheta, maxTheta, this->mMale, this->mFemale, post, type);\n' +
      '   }\n' +
      '   this->mConstraints.push_back(c);\n' +
      'Check diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d AddConstraint__Q38Dynamics12Articulation5JointPQ28Dynamics7IEntityRCQ25UMath7Matrix4ffRCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint\n' +
      'Aim for 100.0% match.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'Dynamics::Collision::Moment::Moment',
    symbol: '__Q38Dynamics9Collision6MomentRCQ25UMath7Matrix4fRCQ25UMath7Vector3N43',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    size: 440,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp, implement Moment::Moment(const UMath::Matrix4 &orient, float mass, const UMath::Vector3 &inertia, const UMath::Vector3 &cg, const UMath::Vector3 &p1, const UMath::Vector3 &p2, const UMath::Vector3 &p3).\n' +
      'Inspect target assembly at 0x800837D0 (440 bytes):\n' +
      'Copies orientation matrix, calls SetMass(mass), SetInertia(inertia), SetCG(cg), and initializes point/moment vectors.\n' +
      'Check diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d __Q38Dynamics9Collision6MomentRCQ25UMath7Matrix4fRCQ25UMath7Vector3N43\n' +
      'Aim for 100.0% match.',
  },
  {
    demangled: 'Dynamics::Articulation::Constraint::Constraint',
    symbol: '__Q38Dynamics12Articulation10ConstraintRCQ25UMath7Matrix4ffRQ38Dynamics12Articulation5LeverT4RCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint',
    unit: 'main/Speed/Indep/SourceLists/zDynamics',
    size: 416,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp, implement Constraint::Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type).\n' +
      'Inspect target assembly at 0x80088490 (416 bytes):\n' +
      '1. Saves female and male lever references at 0x44 and 0x48.\n' +
      '2. Copies post vector to 0x4c..0x54.\n' +
      '3. Converts orient matrix to quaternion using VU0_m4toquat into 0x04.\n' +
      '4. Scales minTheta and maxTheta by float literal (deg to rad) and stores to 0x58, 0x5c.\n' +
      '5. Computes post length using VU0_v3lengthsquare and VU0_sqrt.\n' +
      '6. Sets type at 0x64 and flag at 0x60.\n' +
      'Check diff with python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zDynamics -d __Q38Dynamics12Articulation10ConstraintRCQ25UMath7Matrix4ffRQ38Dynamics12Articulation5LeverT4RCQ25UMath7Vector3Q38Dynamics12Articulation11eConstraint\n' +
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

log('Starting Batch 1 for nfs5: Geometry::SphereVsSphere, Joint::AddConstraint, Moment::Moment, Constraint::Constraint')

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
    '2. Add an entry for each function in the Dynamics section.\n' +
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
    '3. Read docs/decompilation_status_ledger.md and add each function as [Completed & Merged] under Dynamics Subsystem (zDynamics) in Section 1.\n' +
    '4. Commit documentation changes:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: record Batch 1 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n' +
    '5. git push origin main',
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
