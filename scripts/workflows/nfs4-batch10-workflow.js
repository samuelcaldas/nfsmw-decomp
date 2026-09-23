export const meta = {
  name: 'nfsmw-parallel-decomp-batch10-nfs4',
  description: 'Batch 10 decompilation for nfs4: GetPaddedObjectSize templates (zGameplay), RuntimeInstance GetType methods (zGameplay), CameraMover subclass accessors (zCamera), and ICE::Cubic1D polynomial routines (zCamera)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GetPaddedObjectSize templates (zGameplay) & RuntimeInstance GetType methods (zGameplay)' },
    { title: 'Decomp-2', detail: 'Pair 2: CameraMover subclass accessors (zCamera) & ICE::Cubic1D polynomial routines (zCamera)' },
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
    demangled: 'GetPaddedObjectSize templates (GTrigger, GMarker, GCharacter, GActivity, GState, GHandler)',
    symbol: 'GetPaddedObjectSize__H1Z8GTrigger_v_Ui',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 48,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GObjectBlock.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GObjectBlock.cpp:\n' +
      'Implement the template function GetPaddedObjectSize<T>() with concise Doxygen docstrings:\n' +
      '#include "Speed/Indep/Src/Gameplay/GTrigger.h"\n' +
      '#include "Speed/Indep/Src/Gameplay/GMarker.h"\n' +
      '#include "Speed/Indep/Src/Gameplay/GCharacter.h"\n' +
      '#include "Speed/Indep/Src/Gameplay/GActivity.h"\n' +
      '#include "Speed/Indep/Src/Gameplay/GState.h"\n' +
      '#include "Speed/Indep/Src/Gameplay/GHandler.h"\n\n' +
      '/**\n' +
      ' * @brief Computes 16-byte padded size for gameplay object types.\n' +
      ' * @tparam T Gameplay object class.\n' +
      ' * @return 16-byte aligned object byte size.\n' +
      ' */\n' +
      'template <typename T>\n' +
      'unsigned int GetPaddedObjectSize() {\n' +
      '    return (sizeof(T) + 15) & ~15;\n' +
      '}\n\n' +
      'template unsigned int GetPaddedObjectSize<GTrigger>();\n' +
      'template unsigned int GetPaddedObjectSize<GMarker>();\n' +
      'template unsigned int GetPaddedObjectSize<GCharacter>();\n' +
      'template unsigned int GetPaddedObjectSize<GActivity>();\n' +
      'template unsigned int GetPaddedObjectSize<GState>();\n' +
      'template unsigned int GetPaddedObjectSize<GHandler>();\n\n' +
      'In src/Speed/Indep/SourceLists/zGameplay.cpp:\n' +
      'Include #include "Speed/Indep/Src/Gameplay/GObjectBlock.cpp" right after GRuntimeInstance.cpp.\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetPaddedObjectSize__H1Z8GTrigger_v_Ui --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetPaddedObjectSize__H1Z7GMarker_v_Ui --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetPaddedObjectSize__H1Z10GCharacter_v_Ui --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetPaddedObjectSize__H1Z9GActivity_v_Ui --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetPaddedObjectSize__H1Z6GState_v_Ui --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetPaddedObjectSize__H1Z8GHandler_v_Ui --no-collapse\n' +
      'Verify 100.0% matches for all 6 template instances and run ninja changes.',
  },
  {
    demangled: 'RuntimeInstance GetType methods (GActivity, GCharacter, GHandler, GMarker, GState, GTrigger)',
    symbol: 'GetType__C7GMarker',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 48,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GMarker.h',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/ headers, ensure each class overrides GetType() with Doxygen docstrings and returns its corresponding GameplayObjType:\n' +
      '1. In GActivity.h in class GActivity:\n' +
      '   GameplayObjType GetType() const override { return kGameplayObjType_Activity; }\n' +
      '2. In GCharacter.h in class GCharacter:\n' +
      '   GameplayObjType GetType() const override { return kGameplayObjType_Character; }\n' +
      '3. In GHandler.h in class GHandler:\n' +
      '   GameplayObjType GetType() const override { return kGameplayObjType_Handler; }\n' +
      '4. In GMarker.h in class GMarker:\n' +
      '   GameplayObjType GetType() const override { return kGameplayObjType_Marker; }\n' +
      '5. In GState.h in class GState:\n' +
      '   GameplayObjType GetType() const override { return kGameplayObjType_State; }\n' +
      '6. In GTrigger.h in class GTrigger:\n' +
      '   GameplayObjType GetType() const override { return kGameplayObjType_Trigger; }\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetType__C7GMarker --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetType__C8GTrigger --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetType__C9GActivity --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetType__C6GState --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetType__C8GHandler --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetType__C10GCharacter --no-collapse\n' +
      'Verify 100.0% matches for all 6 routines and run ninja changes.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'CameraMover subclass accessors (RearViewMirrorCameraMover::GetAnchor, TrackCarCameraMover::GetAnchor, TrackCopCameraMover::GetAnchor, TrackCopCameraMover::RenderCarPOV)',
    symbol: 'GetAnchor__25RearViewMirrorCameraMover',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 32,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/CameraMover.hpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Camera/CameraMover.hpp:\n' +
      'Declare the camera mover subclasses inheriting from CameraMover:\n' +
      'class RearViewMirrorCameraMover : public CameraMover {\n' +
      'public:\n' +
      '    RearViewMirrorCameraMover(int view_id, CameraAnchor *p_car);\n' +
      '    virtual ~RearViewMirrorCameraMover();\n' +
      '    virtual void Update(float dT);\n' +
      '    virtual CameraAnchor *GetAnchor() override;\n' +
      'private:\n' +
      '    CameraAnchor *mAnchor; // offset 0x80\n' +
      '};\n\n' +
      'class TrackCarCameraMover : public CameraMover {\n' +
      'public:\n' +
      '    TrackCarCameraMover(int view_id, CameraAnchor *p_car, bool b);\n' +
      '    virtual ~TrackCarCameraMover();\n' +
      '    void Init();\n' +
      '    void GetTarget();\n' +
      '    virtual void Update(float dT);\n' +
      '    virtual CameraAnchor *GetAnchor() override;\n' +
      'private:\n' +
      '    char mPad80[0x20];\n' +
      '    CameraAnchor *mAnchor; // offset 0xa0\n' +
      '};\n\n' +
      'class TrackCopCameraMover : public CameraMover {\n' +
      'public:\n' +
      '    TrackCopCameraMover(int view_id, CameraAnchor *p_car, bool b);\n' +
      '    virtual ~TrackCopCameraMover();\n' +
      '    void FindPursuitVehiclePosition(bVector3 *p);\n' +
      '    void Init();\n' +
      '    void GetTarget();\n' +
      '    virtual void Update(float dT);\n' +
      '    virtual CameraAnchor *GetAnchor() override;\n' +
      '    virtual bool RenderCarPOV() override;\n' +
      'private:\n' +
      '    char mPad80[0x198];\n' +
      '    CameraAnchor *mAnchor; // offset 0x218\n' +
      '    char mPad21C[0x30];\n' +
      '    int mRenderCarPOV; // offset 0x24c\n' +
      '};\n\n' +
      'In src/Speed/Indep/Src/Camera/CameraMover.cpp, implement with concise Doxygen docstrings:\n' +
      'CameraAnchor *RearViewMirrorCameraMover::GetAnchor() {\n' +
      '    return this->mAnchor;\n' +
      '}\n\n' +
      'CameraAnchor *TrackCarCameraMover::GetAnchor() {\n' +
      '    return this->mAnchor;\n' +
      '}\n\n' +
      'CameraAnchor *TrackCopCameraMover::GetAnchor() {\n' +
      '    return this->mAnchor;\n' +
      '}\n\n' +
      'bool TrackCopCameraMover::RenderCarPOV() {\n' +
      '    return this->mRenderCarPOV;\n' +
      '}\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetAnchor__25RearViewMirrorCameraMover --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetAnchor__19TrackCarCameraMover --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetAnchor__19TrackCopCameraMover --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d RenderCarPOV__19TrackCopCameraMover --no-collapse\n' +
      'Verify 100.0% matches for all 4 routines and run ninja changes.',
  },
  {
    demangled: 'ICE::Cubic1D polynomial routines (MakeCoeffs, GetVal, GetdVal, GetddVal, GetValDesired)',
    symbol: 'MakeCoeffs__Q23ICE7Cubic1D',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 184,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/ICE/ICEPoint.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Camera/ICE/ICEPoint.hpp:\n' +
      'namespace ICE {\n' +
      'class Cubic1D {\n' +
      'public:\n' +
      '    void MakeCoeffs();\n' +
      '    float GetVal(float t) const;\n' +
      '    float GetdVal(float t) const;\n' +
      '    float GetddVal(float t) const;\n' +
      '    float GetValDesired() const { return this->ValDesired; }\n' +
      '    float GetDerivative(float t) const;\n' +
      '    float GetSecondDerivative(float t) const;\n' +
      '    void ClampDerivative(float maxDeriv);\n' +
      '    void ClampSecondDerivative(float maxSecondDeriv);\n' +
      '    void Update(float dt, float valDesired, float dValDesired);\n' +
      'private:\n' +
      '    float Val; // offset 0x0\n' +
      '    float dVal; // offset 0x4\n' +
      '    float ValDesired; // offset 0x8\n' +
      '    float dValDesired; // offset 0xC\n' +
      '    float Coeff[4]; // offset 0x10..0x1C\n' +
      '    float duration; // offset 0x20\n' +
      '};\n' +
      '} // namespace ICE\n\n' +
      'In src/Speed/Indep/Src/Camera/ICE/ICEPoint.cpp, implement with concise Doxygen docstrings:\n' +
      '#include "Speed/Indep/Src/Camera/ICE/ICEPoint.hpp"\n\n' +
      'namespace ICE {\n' +
      'void Cubic1D::MakeCoeffs() {\n' +
      '    this->Coeff[0] = (this->dVal + this->dValDesired) - 2.0f * (this->ValDesired - this->Val);\n' +
      '    this->Coeff[1] = ((this->ValDesired - this->Val) * 3.0f - this->dValDesired) - (this->dVal + this->dVal);\n' +
      '    this->Coeff[2] = this->dVal;\n' +
      '    this->Coeff[3] = this->Val;\n' +
      '}\n\n' +
      'float Cubic1D::GetVal(float t) const {\n' +
      '    return ((this->Coeff[0] * t + this->Coeff[1]) * t + this->Coeff[2]) * t + this->Coeff[3];\n' +
      '}\n\n' +
      'float Cubic1D::GetdVal(float t) const {\n' +
      '    return (2.0f * this->Coeff[1] + 3.0f * this->Coeff[0] * t) * t + this->Coeff[2];\n' +
      '}\n\n' +
      'float Cubic1D::GetddVal(float t) const {\n' +
      '    return 2.0f * this->Coeff[1] + 6.0f * this->Coeff[0] * t;\n' +
      '}\n' +
      '} // namespace ICE\n\n' +
      'In src/Speed/Indep/SourceLists/zCamera.cpp:\n' +
      'Include #include "Speed/Indep/Src/Camera/ICE/ICEPoint.cpp" right after ICEReplay.cpp.\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d MakeCoeffs__Q23ICE7Cubic1D --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetVal__CQ23ICE7Cubic1Df --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetdVal__CQ23ICE7Cubic1Df --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetddVal__CQ23ICE7Cubic1Df --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetValDesired__CQ23ICE7Cubic1D --no-collapse\n' +
      'Verify 100.0% matches for all 5 routines and run ninja changes.',
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
    (c.extra_instructions ? '  Guidance:\n' + c.extra_instructions + '\n\n' : '\n') +
    'WORKTREE SETUP & EXECUTION RULES:\n\n' +
    '## Step 0 — Setup environment symlinks\n' +
    'Run immediately in your worktree root:\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/orig orig\n' +
    '  mkdir -p build/GOWE69\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/GOWE69/baseline.json build/GOWE69/baseline.json\n' +
    '  python3 configure.py\n' +
    '  ninja ' + (c.unit.includes('zGameplay') ? 'build/GOWE69/src/Speed/Indep/SourceLists/zGameplay.o' : 'build/GOWE69/src/Speed/Indep/SourceLists/zCamera.o') + '\n\n' +
    '## Step 1 — Context inspection\n' +
    'Inspect function context and initial diff:\n' +
    '  python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '" --no-collapse\n\n' +
    '## Step 2 — Read implementation\n' +
    'Read ' + c.source_file + ' and apply the guidance.\n\n' +
    '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
    'Iterate on matching:\n' +
    'a. Study differences in python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '" --no-collapse\n' +
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
    'CRITICAL: DO NOT git add orig or build!\n' +
    'Only add source files: git add src/...\n' +
    '  git commit -m "match: ' + c.demangled + '\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
    '## Step 7 — Structured report\n' +
    'Query branch: git rev-parse --abbrev-ref HEAD\n' +
    'Return structured result with all required schema fields.'
  )
}

log('Starting Batch 10 for nfs4: GetPaddedObjectSize templates, RuntimeInstance GetType methods, CameraMover subclass accessors, ICE::Cubic1D polynomial routines')

phase('Decomp-1')
const resultsPair1 = await parallel(CANDIDATES_PAIR1.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-1',
    label: 'decomp:' + c.demangled.slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

phase('Decomp-2')
const resultsPair2 = await parallel(CANDIDATES_PAIR2.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-2',
    label: 'decomp:' + c.demangled.slice(0, 20),
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
    '2. Add an entry for each function in the corresponding subsystem section (Gameplay or Camera).\n' +
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
    '   git commit -m "docs: record Batch 10 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"',
    {
      phase: 'Docs',
      label: 'docs:update',
    }
  )
  log('Documentation updated and committed.')
}

return {
  total_attempted: 4,
  succeeded: succeeded.length,
  failed: failed.length,
  merged: mergedFunctions.length,
  functions: mergedFunctions,
}
