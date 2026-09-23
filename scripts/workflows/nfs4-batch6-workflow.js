export const meta = {
  name: 'nfsmw-parallel-decomp-batch6',
  description: 'Batch 6 decompilation: GRaceStatus::GetRacerInfo (zGameplay), GRaceDatabase methods (zGameplay), CDActionTrackCop routines (zCamera), CDActionDebug / CDActionDebugWatchCar / CDActionTrackCar / CDActionShowcase routines (zCamera)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GRaceStatus::GetRacerInfo (zGameplay) & GRaceDatabase methods (zGameplay)' },
    { title: 'Decomp-2', detail: 'Pair 2: CDActionTrackCop routines (zCamera) & CDActionDebug / WatchCar / TrackCar / Showcase routines (zCamera)' },
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
    demangled: 'GRaceStatus::GetRacerInfo(int)',
    symbol: 'GetRacerInfo__11GRaceStatusi',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 16,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, add the implementation for GetRacerInfo(int):\n' +
      '/**\n' +
      ' * @brief Returns the racer info for the specified index.\n' +
      ' * @param index Index of the racer in the race status table.\n' +
      ' * @return Reference to the racer info record.\n' +
      ' */\n' +
      'GRacerInfo &GRaceStatus::GetRacerInfo(int index) {\n' +
      '    return this->mRacerInfo[index];\n' +
      '}\n\n' +
      'Check diff with: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetRacerInfo__11GRaceStatusi --no-collapse\n' +
      'Verify 100.0% match and run ninja changes.',
  },
  {
    demangled: 'GRaceDatabase::GetRaceCount, GetBinCount, GetBin, GetStartupRace, GetStartupRaceContext',
    symbol: 'GetBinCount__13GRaceDatabase',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 56,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.h, after GRaceCustom *GetStartupRace(); (around line 380), declare:\n' +
      '    GRace::Context GetStartupRaceContext();\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n' +
      ' * @brief Returns the total count of registered races.\n' +
      ' * @return Sum of static and dynamic race counts.\n' +
      ' */\n' +
      'unsigned int GRaceDatabase::GetRaceCount() {\n' +
      '    return this->mRaceCountStatic + this->mRaceCountDynamic;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Returns the total count of race bins.\n' +
      ' * @return Count of race bins.\n' +
      ' */\n' +
      'unsigned int GRaceDatabase::GetBinCount() {\n' +
      '    return this->mBinCount;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Returns the race bin at the specified index.\n' +
      ' * @param index Array index of the requested race bin.\n' +
      ' * @return Pointer to the requested race bin.\n' +
      ' */\n' +
      'GRaceBin *GRaceDatabase::GetBin(unsigned int index) {\n' +
      '    return &this->mBins[index];\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Returns the startup race custom object.\n' +
      ' * @return Pointer to the startup race custom object.\n' +
      ' */\n' +
      'GRaceCustom *GRaceDatabase::GetStartupRace() {\n' +
      '    return this->mStartupRace;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Returns the startup race context.\n' +
      ' * @return Race context for the startup race.\n' +
      ' */\n' +
      'GRace::Context GRaceDatabase::GetStartupRaceContext() {\n' +
      '    return this->mStartupRaceContext;\n' +
      '}\n\n' +
      'Check diffs for GetRaceCount__13GRaceDatabase, GetBinCount__13GRaceDatabase, GetBin__13GRaceDatabaseUi, GetStartupRace__13GRaceDatabase, GetStartupRaceContext__13GRaceDatabase with decomp-diff.\n' +
      'Verify 100.0% matches and run ninja changes.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'CDActionTrackCop methods (Reset, SetSpecial, OnAttached)',
    symbol: 'Reset__16CDActionTrackCop',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 12,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/Actions/CDActionTrackCop.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Camera/Actions/CDActionTrackCop.hpp:\n' +
      '#ifndef CAMERA_ACTIONS_CDACTIONTRACKCOP_HPP\n' +
      '#define CAMERA_ACTIONS_CDACTIONTRACKCOP_HPP\n\n' +
      '#include "Speed/Indep/Src/Camera/CameraAI.hpp"\n' +
      '#include "Speed/Indep/Src/Interfaces/IAttachable.h"\n\n' +
      'class CDActionTrackCop : public CameraAI::Action {\n' +
      'public:\n' +
      '    virtual ~CDActionTrackCop();\n' +
      '    virtual void Reset() override;\n' +
      '    virtual void SetSpecial(float) override;\n' +
      '    virtual void OnAttached(IAttachable *) override;\n' +
      '};\n\n' +
      '#endif\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionTrackCop.cpp:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionTrackCop.hpp"\n\n' +
      '/**\n' +
      ' * @brief Resets track cop action state.\n' +
      ' */\n' +
      'void CDActionTrackCop::Reset() {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Sets special parameter for track cop action.\n' +
      ' */\n' +
      'void CDActionTrackCop::SetSpecial(float) {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Handles attachment callback for track cop action.\n' +
      ' */\n' +
      'void CDActionTrackCop::OnAttached(IAttachable *) {\n' +
      '}\n\n' +
      'In src/Speed/Indep/SourceLists/zCamera.cpp, ensure:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionTrackCop.cpp"\n' +
      'Check diffs for Reset__16CDActionTrackCop, SetSpecial__16CDActionTrackCopf, OnAttached__16CDActionTrackCopP11IAttachable with decomp-diff.\n' +
      'Verify 100.0% matches and run ninja changes.',
  },
  {
    demangled: 'CDActionDebug, CDActionDebugWatchCar, CDActionTrackCar, CDActionShowcase SetSpecial & Reset methods',
    symbol: 'Reset__13CDActionDebug',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 24,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/Actions/CDActionDebug.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Camera/Actions/CDActionTrackCar.hpp, add:\n' +
      '    virtual void SetSpecial(float) override;\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionTrackCar.cpp, add:\n' +
      '/**\n' +
      ' * @brief Sets special parameter for track car action.\n' +
      ' */\n' +
      'void CDActionTrackCar::SetSpecial(float) {\n' +
      '}\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionShowcase.hpp, add:\n' +
      '    virtual void SetSpecial(float) override;\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionShowcase.cpp, add:\n' +
      '/**\n' +
      ' * @brief Sets special parameter for showcase action.\n' +
      ' */\n' +
      'void CDActionShowcase::SetSpecial(float) {\n' +
      '}\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionDebug.hpp:\n' +
      '#ifndef CAMERA_ACTIONS_CDACTIONDEBUG_HPP\n' +
      '#define CAMERA_ACTIONS_CDACTIONDEBUG_HPP\n\n' +
      '#include "Speed/Indep/Src/Camera/CameraAI.hpp"\n\n' +
      'class CDActionDebug : public CameraAI::Action {\n' +
      'public:\n' +
      '    virtual ~CDActionDebug();\n' +
      '    virtual void Reset() override;\n' +
      '    virtual void SetSpecial(float) override;\n' +
      '};\n\n' +
      '#endif\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionDebug.cpp:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionDebug.hpp"\n\n' +
      '/**\n' +
      ' * @brief Resets debug action state.\n' +
      ' */\n' +
      'void CDActionDebug::Reset() {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Sets special parameter for debug action.\n' +
      ' */\n' +
      'void CDActionDebug::SetSpecial(float) {\n' +
      '}\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionDebugWatchCar.hpp:\n' +
      '#ifndef CAMERA_ACTIONS_CDACTIONDEBUGWATCHCAR_HPP\n' +
      '#define CAMERA_ACTIONS_CDACTIONDEBUGWATCHCAR_HPP\n\n' +
      '#include "Speed/Indep/Src/Camera/CameraAI.hpp"\n\n' +
      'class CDActionDebugWatchCar : public CameraAI::Action {\n' +
      'public:\n' +
      '    virtual ~CDActionDebugWatchCar();\n' +
      '    virtual void Reset() override;\n' +
      '    virtual void SetSpecial(float) override;\n' +
      '};\n\n' +
      '#endif\n\n' +
      'In src/Speed/Indep/Src/Camera/Actions/CDActionDebugWatchCar.cpp:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionDebugWatchCar.hpp"\n\n' +
      '/**\n' +
      ' * @brief Resets debug watch car action state.\n' +
      ' */\n' +
      'void CDActionDebugWatchCar::Reset() {\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Sets special parameter for debug watch car action.\n' +
      ' */\n' +
      'void CDActionDebugWatchCar::SetSpecial(float) {\n' +
      '}\n\n' +
      'In src/Speed/Indep/SourceLists/zCamera.cpp, include:\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionDebug.cpp"\n' +
      '#include "Speed/Indep/Src/Camera/Actions/CDActionDebugWatchCar.cpp"\n\n' +
      'Check diffs for Reset__13CDActionDebug, SetSpecial__13CDActionDebugf, Reset__21CDActionDebugWatchCar, SetSpecial__21CDActionDebugWatchCarf, SetSpecial__16CDActionTrackCarf, SetSpecial__16CDActionShowcasef with decomp-diff.\n' +
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
    '  git add -A\n' +
    '  git commit -m "match: ' + c.demangled + '\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
    '## Step 7 — Structured report\n' +
    'Query branch: git rev-parse --abbrev-ref HEAD\n' +
    'Return structured result with all required schema fields.'
  )
}

log('Starting Batch 6: GRaceStatus::GetRacerInfo (zGameplay), GRaceDatabase methods (zGameplay), CDActionTrackCop routines (zCamera), CDActionDebug / WatchCar / TrackCar / Showcase routines (zCamera)')

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
    '   git commit -m "docs: record Batch 6 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"',
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
