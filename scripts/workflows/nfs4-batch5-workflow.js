export const meta = {
  name: 'nfsmw-parallel-decomp-batch5',
  description: 'Batch 5 decompilation: GRuntimeInstance linkage methods (zGameplay), GCharacter attachment methods (zGameplay), CDActionIce routines (zCamera), CDActionShowcase & CDActionTrackCar routines (zCamera)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GRuntimeInstance methods (zGameplay) & GCharacter attachment methods (zGameplay)' },
    { title: 'Decomp-2', detail: 'Pair 2: CDActionIce methods (zCamera) & CDActionShowcase / CDActionTrackCar methods (zCamera)' },
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
    demangled: 'GRuntimeInstance::SetConnectionBuffer & GetConnectionCount',
    symbol: 'SetConnectionBuffer__16GRuntimeInstancePQ216GRuntimeInstance17ConnectedInstanceUi',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 24,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GRuntimeInstance.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRuntimeInstance.h, declare within class GRuntimeInstance:\n' +
      '    struct ConnectedInstance;\n' +
      '    void SetConnectionBuffer(ConnectedInstance *buffer, unsigned int maxConnections);\n' +
      '    unsigned short GetConnectionCount() const;\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRuntimeInstance.cpp, implement:\n' +
      '#include "Speed/Indep/Src/Gameplay/GRuntimeInstance.h"\n\n' +
      '/**\n' +
      ' * @brief Sets the connection buffer for runtime instance linkages.\n' +
      ' * @param buffer Pointer to the connected instance storage array.\n' +
      ' * @param maxConnections Maximum capacity of the connection buffer.\n' +
      ' */\n' +
      'void GRuntimeInstance::SetConnectionBuffer(ConnectedInstance *buffer, unsigned int maxConnections) {\n' +
      '    this->mConnected = buffer;\n' +
      '    this->mNumConnected = 0;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Returns the number of currently linked connected instances.\n' +
      ' * @return Count of connected instances.\n' +
      ' */\n' +
      'unsigned short GRuntimeInstance::GetConnectionCount() const {\n' +
      '    return this->mNumConnected;\n' +
      '}\n\n' +
      'In src/Speed/Indep/SourceLists/zGameplay.cpp, ensure:\n' +
      '#include "Speed/Indep/Src/Gameplay/GRuntimeInstance.cpp"\n' +
      'Verify with decomp-diff for both SetConnectionBuffer and GetConnectionCount and run ninja changes.',
  },
  {
    demangled: 'GCharacter::Attach, Detach, IsAttached, GetAttachments',
    symbol: 'GetAttachments__C10GCharacter',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 116,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GCharacter.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GCharacter.h, declare within class GCharacter:\n' +
      '    virtual void Attach(UTL::COM::IUnknown *object);\n' +
      '    virtual void Detach(UTL::COM::IUnknown *object);\n' +
      '    virtual bool IsAttached(const UTL::COM::IUnknown *object) const;\n' +
      '    virtual Sim::Attachments *GetAttachments() const;\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GCharacter.cpp, implement:\n' +
      '#include "Speed/Indep/Src/Gameplay/GCharacter.h"\n' +
      '#include "Speed/Indep/Src/Sim/SimAttachable.h"\n\n' +
      '/**\n' +
      ' * @brief Attaches a COM object to the character attachments.\n' +
      ' */\n' +
      'void GCharacter::Attach(UTL::COM::IUnknown *object) {\n' +
      '    this->mAttachments->Attach(object);\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Detaches a COM object from the character attachments.\n' +
      ' */\n' +
      'void GCharacter::Detach(UTL::COM::IUnknown *object) {\n' +
      '    this->mAttachments->Detach(object);\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Checks if a COM object is attached.\n' +
      ' */\n' +
      'bool GCharacter::IsAttached(const UTL::COM::IUnknown *object) const {\n' +
      '    return this->mAttachments->IsAttached(object);\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Returns the character attachments.\n' +
      ' */\n' +
      'Sim::Attachments *GCharacter::GetAttachments() const {\n' +
      '    return this->mAttachments;\n' +
      '}\n\n' +
      'In src/Speed/Indep/SourceLists/zGameplay.cpp, ensure:\n' +
      '#include "Speed/Indep/Src/Gameplay/GCharacter.cpp"\n' +
      'Verify with decomp-diff for GetAttachments__C10GCharacter and Attach__10GCharacterPQ33UTL3COM8IUnknown, and run ninja changes.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'CDActionIce methods (Reset, SetSpecial, OnAttached)',
    symbol: 'Reset__11CDActionIce',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 12,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/Actions/CDActionIce.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Camera/Actions/CDActionIce.hpp, declare CDActionIce:\n' +
      '#ifndef CAMERA_ACTIONS_CDACTIONICE_HPP\n' +
      '#define CAMERA_ACTIONS_CDACTIONICE_HPP\n\n' +
      '#include "Speed/Indep/Src/Camera/CameraAI.hpp"\n' +
      '#include "Speed/Indep/Src/Interfaces/IAttachable.h"\n\n' +
      'class CDActionIce : public CameraAI::Action {\n' +
      'public:\n' +
      '    CDActionIce();\n' +
      '    virtual ~CDActionIce();\n' +
      '    virtual void Update(float dT) override;\n' +
      '    virtual void Reset() override;\n' +
      '    virtual const char *GetName() const override;\n' +
      '    virtual const char *GetNext() const override;\n' +
      '    virtual CameraMover *GetMover() override;\n' +
      '    virtual void SetSpecial(float) override;\n' +
      '    virtual void OnAttached(IAttachable *) override;\n' +
      '};\n\n' +
      '#endif\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionIce.cpp, implement:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionIce.hpp"\n\n' +
      '/**\n' +
      ' * @brief Resets CDActionIce state.\n' +
      ' */\n' +
      'void CDActionIce::Reset() {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Sets special parameter for CDActionIce.\n' +
      ' */\n' +
      'void CDActionIce::SetSpecial(float) {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Handles attachment callback.\n' +
      ' */\n' +
      'void CDActionIce::OnAttached(IAttachable *) {\n' +
      '}\n\n' +
      'In src/Speed/Indep/SourceLists/zCamera.cpp, ensure:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionIce.cpp"\n' +
      'Verify with decomp-diff for Reset__11CDActionIce and run ninja changes.',
  },
  {
    demangled: 'CDActionShowcase & CDActionTrackCar methods (Reset, OnAttached)',
    symbol: 'Reset__16CDActionShowcase',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 16,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/Actions/CDActionShowcase.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Camera/Actions/CDActionShowcase.hpp:\n' +
      '#ifndef CAMERA_ACTIONS_CDACTIONSHOWCASE_HPP\n' +
      '#define CAMERA_ACTIONS_CDACTIONSHOWCASE_HPP\n\n' +
      '#include "Speed/Indep/Src/Camera/CameraAI.hpp"\n' +
      '#include "Speed/Indep/Src/Interfaces/IAttachable.h"\n\n' +
      'class CDActionShowcase : public CameraAI::Action {\n' +
      'public:\n' +
      '    virtual ~CDActionShowcase();\n' +
      '    virtual void Reset() override;\n' +
      '    virtual void OnAttached(IAttachable *) override;\n' +
      '};\n' +
      '#endif\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionShowcase.cpp, implement:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionShowcase.hpp"\n\n' +
      '/**\n' +
      ' * @brief Resets showcase action.\n' +
      ' */\n' +
      'void CDActionShowcase::Reset() {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Handles attachment notification.\n' +
      ' */\n' +
      'void CDActionShowcase::OnAttached(IAttachable *) {\n' +
      '}\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionTrackCar.hpp:\n' +
      '#ifndef CAMERA_ACTIONS_CDACTIONTRACKCAR_HPP\n' +
      '#define CAMERA_ACTIONS_CDACTIONTRACKCAR_HPP\n\n' +
      '#include "Speed/Indep/Src/Camera/CameraAI.hpp"\n' +
      '#include "Speed/Indep/Src/Interfaces/IAttachable.h"\n\n' +
      'class CDActionTrackCar : public CameraAI::Action {\n' +
      'public:\n' +
      '    virtual ~CDActionTrackCar();\n' +
      '    virtual void Reset() override;\n' +
      '    virtual void OnAttached(IAttachable *) override;\n' +
      '};\n' +
      '#endif\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionTrackCar.cpp, implement:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionTrackCar.hpp"\n\n' +
      '/**\n' +
      ' * @brief Resets track car action.\n' +
      ' */\n' +
      'void CDActionTrackCar::Reset() {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Handles attachment notification.\n' +
      ' */\n' +
      'void CDActionTrackCar::OnAttached(IAttachable *) {\n' +
      '}\n\n' +
      'In src/Speed/Indep/SourceLists/zCamera.cpp, include both:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionShowcase.cpp"\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionTrackCar.cpp"\n' +
      'Verify with decomp-diff for Reset__16CDActionShowcase and run ninja changes.',
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
    'Read ' + c.source_file + ' and related headers.\n\n' +
    '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
    'Iterate on matching:\n' +
    'a. Study differences in python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'b. Adjust definitions, signatures, headers, and implementation.\n' +
    'c. Compile with ninja.\n' +
    'd. Re-check diff and percentage.\n' +
    'Stop when 100.0% match is reached or highest possible match is achieved without regressions.\n\n' +
    '## Step 4 — Docstring\n' +
    'Ensure concise Doxygen docstring precedes every function:\n' +
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

log('Starting Batch 5: GRuntimeInstance linkage methods (zGameplay), GCharacter attachment methods (zGameplay), CDActionIce routines (zCamera), CDActionShowcase & CDActionTrackCar routines (zCamera)')

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
    '   (If conflict: inspect conflict markers, resolve cleanly so that BOTH existing code on main and incoming code are retained, git add -A, and git commit --no-edit)\n' +
    '5. ninja  (ensure compilation succeeds)\n' +
    '6. ninja changes  (ensure NO regressions against baseline)\n' +
    '7. If ninja changes is clean:\n' +
    '   - git worktree remove --force .claude/worktrees/' + result.branch_name.replace('worktree-', '') + ' 2>/dev/null || true\n' +
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
    '   git commit -m "docs: record Batch 5 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"',
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
}
