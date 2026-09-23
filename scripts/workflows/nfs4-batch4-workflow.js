export const meta = {
  name: 'nfsmw-parallel-decomp-batch4',
  description: 'Batch 4 decompilation: CameraAI core routines (zCamera), GRaceDatabase::SimulateDDayComplete (zGameplay), LuaMessageDeliveryInfo accessors (zGameplay), GVault & GRaceBin accessors (zGameplay)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: CameraAI core routines (zCamera) & GRaceDatabase::SimulateDDayComplete (zGameplay)' },
    { title: 'Decomp-2', detail: 'Pair 2: LuaMessageDeliveryInfo accessors (zGameplay) & GVault & GRaceBin accessors (zGameplay)' },
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
    demangled: 'CameraAI::Director methods & CameraAI::Reset',
    symbol: 'Reset__8CameraAIv',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 732,
    match: 4.35,
    source_file: 'src/Speed/Indep/Src/Camera/CameraAI.cpp',
    extra_instructions:
      'In CameraAI.hpp and CameraAI.cpp, implement the verified 6 CameraAI routines:\n' +
      '1. CameraAI::Director::ReleaseAction (symbol: ReleaseAction__Q28CameraAI8Director)\n' +
      '2. CameraAI::Director::Reset (symbol: Reset__Q28CameraAI8Director)\n' +
      '3. CameraAI::Director::TotaledStart (symbol: TotaledStart__Q28CameraAI8Director)\n' +
      '4. CameraAI::Director::GetMover (symbol: GetMover__Q28CameraAI8Director)\n' +
      '5. CameraAI::Reset (symbol: Reset__8CameraAIv)\n' +
      '6. CameraAI::MaybeDoTotaledCam (symbol: MaybeDoTotaledCam__8CameraAIP7IPlayer)\n\n' +
      'Header layout in CameraAI.hpp:\n' +
      'class Action : public UTL::COM::Object, public UTL::COM::Factory<CameraAI::Director *, CameraAI::Action, UCrc32> {\n' +
      'public:\n' +
      '    Action() : UTL::COM::Object(0) {}\n' +
      '    virtual ~Action() {}\n' +
      '    virtual void Update(float dT) = 0;\n' +
      '    virtual void Reset() = 0;\n' +
      '    virtual const char *GetName() const = 0;\n' +
      '    virtual Action *GetNext() const = 0;\n' +
      '    virtual CameraMover *GetMover() = 0;\n' +
      '    virtual void SetSpecial(float val) = 0;\n' +
      '};\n\n' +
      'class Director : public UTL::Collections::Listable<Director, 2> {\n' +
      'public:\n' +
      '    EVIEW_ID mViewID;\n' +
      '    Attrib::StringKey mDesiredMode;\n' +
      '    Action *mAction;\n' +
      '    char _pad_inputq[0x294];\n' +
      '    bool mPrepareToEnableIce;\n' +
      '    float mPursuitStartTime;\n' +
      '    float mJumpTime;\n' +
      '    bool mIsCinematicMomement;\n' +
      '    float mCinematicSlowdownSeconds;\n' +
      '    virtual ~Director();\n' +
      '    void JumpStart(float time);\n' +
      '    void EndJumping();\n' +
      '    void EndPursuitStart();\n' +
      '    void TotaledStart();\n' +
      '    void Reset();\n' +
      '    void ReleaseAction();\n' +
      '    CameraMover *GetMover();\n' +
      '    void SetAction(Attrib::StringKey key);\n' +
      '};\n\n' +
      'Ensure UTL::Collections::Listable<Director, 2>::GetList().begin() and .end() are used in CameraAI::Reset and CameraAI::MaybeDoTotaledCam.\n' +
      'Verify with: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d Reset__8CameraAIv and ninja changes.',
  },
  {
    demangled: 'GRaceDatabase::SimulateDDayComplete',
    symbol: 'SimulateDDayComplete__13GRaceDatabase',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 4,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement GRaceDatabase::SimulateDDayComplete():\n' +
      '/**\n' +
      ' * @brief Simulates completion of D-Day races.\n' +
      ' */\n' +
      'void GRaceDatabase::SimulateDDayComplete() {\n' +
      '}\n' +
      'This compiles directly to blr (4 bytes, 100% match). Verify with decomp-diff and ninja changes.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'LuaMessageDeliveryInfo accessors',
    symbol: 'GetActivity__C22LuaMessageDeliveryInfo',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 32,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Lua/LuaPostOffice.h',
    extra_instructions:
      'In src/Speed/Indep/Src/Lua/LuaPostOffice.h, define IMessageFilterContext and LuaMessageDeliveryInfo:\n' +
      'struct IMessageFilterContext : public UTL::COM::IUnknown {\n' +
      '    virtual ~IMessageFilterContext() {}\n' +
      '    virtual struct lua_State *GetLuaState() const = 0;\n' +
      '    virtual struct GActivity *GetActivity() const = 0;\n' +
      '    virtual struct GHandler *GetHandler() const = 0;\n' +
      '    virtual const struct Message *GetMessage() const = 0;\n' +
      '};\n\n' +
      'struct LuaMessageDeliveryInfo : public UTL::COM::Object, public IMessageFilterContext {\n' +
      '    UCrc32 mMessageKind;\n' +
      '    const struct Message *mMessageBase;\n' +
      '    void (*mBuildTableFunc)(struct lua_State *, const struct Message *);\n' +
      '    bool mLuaTableBuilt;\n' +
      '    struct lua_State *mLuaState;\n' +
      '    struct GActivity *mActivityContext;\n' +
      '    struct GHandler *mHandlerContext;\n' +
      '    virtual ~LuaMessageDeliveryInfo() {}\n' +
      '    virtual struct lua_State *GetLuaState() const override { return this->mLuaState; }\n' +
      '    virtual struct GActivity *GetActivity() const override { return this->mActivityContext; }\n' +
      '    virtual struct GHandler *GetHandler() const override { return this->mHandlerContext; }\n' +
      '    virtual const struct Message *GetMessage() const override { return this->mMessageBase; }\n' +
      '};\n' +
      'Verify with: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetActivity__C22LuaMessageDeliveryInfo and ninja.',
  },
  {
    demangled: 'GVault::GetAttribVault & GRaceBin::GetAwardedRaceWins',
    symbol: 'GetAttribVault__C6GVault',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 16,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GVault.h',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GVault.h:\n' +
      'namespace Attrib { class Vault; }\n' +
      'In class GVault, declare/define:\n' +
      '    Attrib::Vault *mVault; // offset 0x0\n' +
      '    Attrib::Vault *GetAttribVault() const { return this->mVault; }\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.h, in struct GRaceBin, ensure:\n' +
      '    unsigned short GetAwardedRaceWins() const { return this->mStats.mRacesWon; }\n' +
      'Verify with decomp-diff and ninja changes.',
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

log('Starting Batch 4: CameraAI routines (zCamera), GRaceDatabase::SimulateDDayComplete (zGameplay), LuaMessageDeliveryInfo accessors (zGameplay), GVault & GRaceBin accessors (zGameplay)')

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
    '   git commit -m "docs: record Batch 4 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"',
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
