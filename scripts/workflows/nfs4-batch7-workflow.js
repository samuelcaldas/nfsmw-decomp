export const meta = {
  name: 'nfsmw-parallel-decomp-batch7-nfs4',
  description: 'Batch 7 decompilation for nfs4: GRaceBin & SimulateDDayComplete (zGameplay), CDAction GetMover accessors (zCamera), CDAction GetAttachments accessors (zCamera), CDActionDrive implementation (zCamera)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GRaceBin & SimulateDDayComplete (zGameplay) & CDAction GetMover accessors (zCamera)' },
    { title: 'Decomp-2', detail: 'Pair 2: CDAction GetAttachments accessors (zCamera) & CDActionDrive implementation (zCamera)' },
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
    demangled: 'GRaceBin methods (GetCompletedChallenges, GetAwardedRaceWins, SetCompletedChallenges, SetRacesWon) & GRaceDatabase::SimulateDDayComplete',
    symbol: 'GetCompletedChallenges__C8GRaceBin',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 36,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.h, in class GRaceBin:\n' +
      'Change inline definition of GetAwardedRaceWins to declaration:\n' +
      '    unsigned short GetAwardedRaceWins() const;\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp:\n' +
      'Remove static ForceGRaceBinInstantiation if present.\n' +
      'Implement:\n' +
      '/**\n' +
      ' * @brief Returns the number of completed challenges.\n' +
      ' * @return Count of completed challenges.\n' +
      ' */\n' +
      'int GRaceBin::GetCompletedChallenges() const {\n' +
      '    return this->mStats.mChallengesCompleted;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Returns the number of awarded race wins.\n' +
      ' * @return Count of awarded race wins.\n' +
      ' */\n' +
      'unsigned short GRaceBin::GetAwardedRaceWins() const {\n' +
      '    return this->mStats.mRacesWon;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Sets the number of completed challenges.\n' +
      ' * @param numChallenges Number of completed challenges.\n' +
      ' */\n' +
      'void GRaceBin::SetCompletedChallenges(int numChallenges) {\n' +
      '    this->mStats.mChallengesCompleted = numChallenges;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Sets the number of won races.\n' +
      ' * @param numRaces Number of won races.\n' +
      ' */\n' +
      'void GRaceBin::SetRacesWon(int numRaces) {\n' +
      '    this->mStats.mRacesWon = numRaces;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Simulates completion of D-Day event.\n' +
      ' */\n' +
      'void GRaceDatabase::SimulateDDayComplete() {\n' +
      '}\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetCompletedChallenges__C8GRaceBin --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetAwardedRaceWins__C8GRaceBin --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d SetCompletedChallenges__8GRaceBini --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d SetRacesWon__8GRaceBini --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d SimulateDDayComplete__13GRaceDatabase --no-collapse\n' +
      'Verify 100.0% matches and run ninja changes.',
  },
  {
    demangled: 'CDAction GetMover accessors (TrackCar, TrackCop, Showcase, Debug, DebugWatchCar, Ice)',
    symbol: 'GetMover__16CDActionTrackCar',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 48,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/Actions/CDActionTrackCar.cpp',
    extra_instructions:
      'Declare and implement GetMover() in the 6 camera action classes:\n' +
      '1. In CDActionTrackCar.hpp: declare virtual CameraMover *GetMover() override;\n' +
      '   and protected member: char _pad_mover[0x20]; CameraMover *mMover; (offset 0x28)\n' +
      '   In CDActionTrackCar.cpp: CameraMover *CDActionTrackCar::GetMover() { return this->mMover; }\n\n' +
      '2. In CDActionTrackCop.hpp: declare virtual CameraMover *GetMover() override;\n' +
      '   and protected member: char _pad_mover[0x20]; CameraMover *mMover; (offset 0x28)\n' +
      '   In CDActionTrackCop.cpp: CameraMover *CDActionTrackCop::GetMover() { return this->mMover; }\n\n' +
      '3. In CDActionShowcase.hpp: declare virtual CameraMover *GetMover() override;\n' +
      '   and protected member: char _pad_mover[0x18]; CameraMover *mMover; (offset 0x20)\n' +
      '   In CDActionShowcase.cpp: CameraMover *CDActionShowcase::GetMover() { return this->mMover; }\n\n' +
      '4. In CDActionDebug.hpp: declare virtual CameraMover *GetMover() override;\n' +
      '   and protected member: char _pad_mover[0x2ac]; CameraMover *mMover; (offset 0x2b4)\n' +
      '   In CDActionDebug.cpp: CameraMover *CDActionDebug::GetMover() { return this->mMover; }\n\n' +
      '5. In CDActionDebugWatchCar.hpp: declare virtual CameraMover *GetMover() override;\n' +
      '   and protected member: char _pad_mover[0x24]; CameraMover *mMover; (offset 0x2c)\n' +
      '   In CDActionDebugWatchCar.cpp: CameraMover *CDActionDebugWatchCar::GetMover() { return this->mMover; }\n\n' +
      '6. In CDActionIce.hpp: declare virtual CameraMover *GetMover() override;\n' +
      '   and protected member: char _pad_mover[0x2c4]; CameraMover *mMover; (offset 0x2cc)\n' +
      '   In CDActionIce.cpp: CameraMover *CDActionIce::GetMover() { return this->mMover; }\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetMover__16CDActionTrackCar --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetMover__16CDActionTrackCop --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetMover__16CDActionShowcase --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetMover__13CDActionDebug --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetMover__21CDActionDebugWatchCar --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetMover__11CDActionIce --no-collapse\n' +
      'Verify 100.0% matches and run ninja changes.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'CDAction GetAttachments accessors (TrackCar, TrackCop, Showcase, Ice)',
    symbol: 'GetAttachments__C16CDActionTrackCar',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 32,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/Actions/CDActionTrackCar.cpp',
    extra_instructions:
      'Declare and implement GetAttachments() in the 4 camera action classes:\n' +
      '1. In CDActionTrackCar.hpp: declare virtual const IAttachable::List *GetAttachments() const;\n' +
      '   and protected member: char _pad_attach[0x18]; const IAttachable::List *mAttachments; (offset 0x44)\n' +
      '   In CDActionTrackCar.cpp: const IAttachable::List *CDActionTrackCar::GetAttachments() const { return this->mAttachments; }\n\n' +
      '2. In CDActionTrackCop.hpp: declare virtual const IAttachable::List *GetAttachments() const;\n' +
      '   and protected member: char _pad_attach[0x18]; const IAttachable::List *mAttachments; (offset 0x44)\n' +
      '   In CDActionTrackCop.cpp: const IAttachable::List *CDActionTrackCop::GetAttachments() const { return this->mAttachments; }\n\n' +
      '3. In CDActionShowcase.hpp: declare virtual const IAttachable::List *GetAttachments() const;\n' +
      '   and protected member: char _pad_attach[0x18]; const IAttachable::List *mAttachments; (offset 0x3c)\n' +
      '   In CDActionShowcase.cpp: const IAttachable::List *CDActionShowcase::GetAttachments() const { return this->mAttachments; }\n\n' +
      '4. In CDActionIce.hpp: declare virtual const IAttachable::List *GetAttachments() const;\n' +
      '   and protected member: char _pad_attach[0x14]; const IAttachable::List *mAttachments; (offset 0x2e4)\n' +
      '   In CDActionIce.cpp: const IAttachable::List *CDActionIce::GetAttachments() const { return this->mAttachments; }\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetAttachments__C16CDActionTrackCar --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetAttachments__C16CDActionTrackCop --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetAttachments__C16CDActionShowcase --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetAttachments__C11CDActionIce --no-collapse\n' +
      'Verify 100.0% matches and run ninja changes.',
  },
  {
    demangled: 'CDActionDrive class implementation (OnAttached, GetMover, GetAttachments)',
    symbol: 'OnAttached__13CDActionDriveP11IAttachable',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 20,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/Actions/CDActionDrive.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Camera/Actions/CDActionDrive.hpp:\n' +
      '#ifndef CAMERA_ACTIONS_CDACTIONDRIVE_HPP\n' +
      '#define CAMERA_ACTIONS_CDACTIONDRIVE_HPP\n\n' +
      '#include "Speed/Indep/Src/Camera/CameraAI.hpp"\n' +
      '#include "Speed/Indep/Src/Interfaces/IAttachable.h"\n\n' +
      'class CDActionDrive : public CameraAI::Action {\n' +
      'public:\n' +
      '    virtual ~CDActionDrive();\n' +
      '    virtual void Reset() override;\n' +
      '    virtual void SetSpecial(float) override;\n' +
      '    virtual void OnAttached(IAttachable *) override;\n' +
      '    virtual CameraMover *GetMover() override;\n' +
      '    virtual const IAttachable::List *GetAttachments() const;\n\n' +
      'protected:\n' +
      '    char _pad_mover[0x24];\n' +
      '    CameraMover *mMover; // offset 0x2c\n' +
      '    char _pad_attach[0x1c];\n' +
      '    const IAttachable::List *mAttachments; // offset 0x4c\n' +
      '};\n\n' +
      '#endif\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionDrive.cpp:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionDrive.hpp"\n\n' +
      '/**\n' +
      ' * @brief Resets drive camera action state.\n' +
      ' */\n' +
      'void CDActionDrive::Reset() {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Sets special parameter for drive camera action.\n' +
      ' */\n' +
      'void CDActionDrive::SetSpecial(float) {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Returns camera mover for drive camera action.\n' +
      ' * @return Pointer to camera mover.\n' +
      ' */\n' +
      'CameraMover *CDActionDrive::GetMover() {\n' +
      '    return this->mMover;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Handles attachment callback for drive camera action.\n' +
      ' */\n' +
      'void CDActionDrive::OnAttached(IAttachable *) {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Returns attachments list for drive camera action.\n' +
      ' * @return Pointer to attachments list.\n' +
      ' */\n' +
      'const IAttachable::List *CDActionDrive::GetAttachments() const {\n' +
      '    return this->mAttachments;\n' +
      '}\n\n' +
      'In src/Speed/Indep/SourceLists/zCamera.cpp, include:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionDrive.cpp"\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d OnAttached__13CDActionDriveP11IAttachable --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetMover__13CDActionDrive --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetAttachments__C13CDActionDrive --no-collapse\n' +
      'Verify 100.0% matches and run ninja changes.',
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
    '  git add -A\n' +
    '  git commit -m "match: ' + c.demangled + '\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
    '## Step 7 — Structured report\n' +
    'Query branch: git rev-parse --abbrev-ref HEAD\n' +
    'Return structured result with all required schema fields.'
  )
}

log('Starting Batch 7 for nfs4: GRaceBin & SimulateDDayComplete (zGameplay), CDAction GetMover accessors (zCamera), CDAction GetAttachments accessors (zCamera), CDActionDrive implementation (zCamera)')

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
    '   git commit -m "docs: record Batch 7 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"',
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
