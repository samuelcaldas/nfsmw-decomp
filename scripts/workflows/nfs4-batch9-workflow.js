export const meta = {
  name: 'nfsmw-parallel-decomp-batch9-nfs4',
  description: 'Batch 9 decompilation for nfs4: GManager bounty spawn markers (zGameplay), CameraMover::GetAnchorID & CubicCameraMover accessors (zCamera), AreMomentCamerasEnabled (zCamera), AverageBase::Recalculate (zCamera)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GManager bounty spawn markers (zGameplay) & CameraMover::GetAnchorID and CubicCameraMover accessors (zCamera)' },
    { title: 'Decomp-2', detail: 'Pair 2: AreMomentCamerasEnabled (zCamera) & AverageBase::Recalculate (zCamera)' },
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
    demangled: 'GManager bounty spawn marker methods (GetNumBountySpawnMarkers, GetBountySpawnMarker, GetBountySpawnMarkerTag)',
    symbol: 'GetNumBountySpawnMarkers__C8GManager',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 204,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GManager.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GManager.h:\n' +
      'Verify declarations in class GManager:\n' +
      '    unsigned int GetNumBountySpawnMarkers() const;\n' +
      '    Attrib::Key GetBountySpawnMarker(unsigned int index) const;\n' +
      '    int GetBountySpawnMarkerTag(unsigned int index) const;\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GManager.cpp, implement with concise Doxygen docstrings:\n' +
      '#include "Speed/Indep/Src/Gameplay/GManager.h"\n' +
      '#include "Speed/Indep/Src/Generated/AttribSys/Classes/gameplay.h"\n\n' +
      '/**\n' +
      ' * @brief Returns the number of bounty spawn markers.\n' +
      ' * @return The count of available bounty spawn markers.\n' +
      ' */\n' +
      'unsigned int GManager::GetNumBountySpawnMarkers() const {\n' +
      '    return this->mNumBountySpawnPoints;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Retrieves the bounty spawn marker key at the specified index.\n' +
      ' * @param index Zero-based index of the bounty spawn marker.\n' +
      ' * @return The marker key, or 0 if index is out of bounds.\n' +
      ' */\n' +
      'Attrib::Key GManager::GetBountySpawnMarker(unsigned int index) const {\n' +
      '    if (index < this->mNumBountySpawnPoints) {\n' +
      '        return this->mBountySpawnPoint[index];\n' +
      '    }\n' +
      '    return 0;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Retrieves the localization tag for a bounty spawn marker.\n' +
      ' * @param index Zero-based index of the bounty spawn marker.\n' +
      ' * @return The localization tag integer value.\n' +
      ' */\n' +
      'int GManager::GetBountySpawnMarkerTag(unsigned int index) const {\n' +
      '    Attrib::Key key = this->GetBountySpawnMarker(index);\n' +
      '    Attrib::Gen::gameplay gameplayObj(Attrib::FindCollection(Attrib::Gen::gameplay::ClassKey(), key), 0, nullptr);\n' +
      '    return gameplayObj.LocalizationTag();\n' +
      '}\n\n' +
      'In src/Speed/Indep/SourceLists/zGameplay.cpp:\n' +
      'Ensure #include "Speed/Indep/Src/Gameplay/GManager.cpp" is included.\n' +
      'Also, move any existing GManager methods from zGameplay.cpp into GManager.cpp if needed to avoid duplication.\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetNumBountySpawnMarkers__C8GManager --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetBountySpawnMarker__C8GManagerUi --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetBountySpawnMarkerTag__C8GManagerUi --no-collapse\n' +
      'Verify 100.0% matches and run ninja changes.',
  },
  {
    demangled: 'CameraMover::GetAnchorID and CubicCameraMover accessors (SetLookBack, SetDisableLag, GetLookbackAngle, GetAnchor)',
    symbol: 'GetAnchorID__11CameraMover',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 124,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/CameraMover.cpp',
    extra_instructions:
      '1. In src/Speed/Indep/Src/Camera/CameraMover.cpp:\n' +
      'Implement CameraMover::GetAnchorID():\n' +
      '/**\n' +
      ' * @brief Retrieves the world unique identifier of the attached anchor.\n' +
      ' * @return The anchor ID if an anchor is attached; otherwise 0.\n' +
      ' */\n' +
      'WUID CameraMover::GetAnchorID() {\n' +
      '    CameraAnchor *anchor = this->GetAnchor();\n' +
      '    if (anchor != nullptr) {\n' +
      '        return anchor->GetWorldID();\n' +
      '    }\n' +
      '    return 0;\n' +
      '}\n\n' +
      'Check diff for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetAnchorID__11CameraMover --no-collapse\n' +
      'Must match 100.0%.\n\n' +
      '2. In src/Speed/Indep/Src/Camera/CameraMover.hpp (or CameraMover.cpp):\n' +
      'Implement CubicCameraMover methods:\n' +
      'class CubicCameraMover : public CameraMover {\n' +
      'public:\n' +
      '    virtual ~CubicCameraMover();\n' +
      '    virtual void SetLookBack(bool b);\n' +
      '    virtual void SetDisableLag(bool disable);\n' +
      '    virtual unsigned short GetLookbackAngle();\n' +
      '    virtual CameraAnchor *GetAnchor();\n' +
      '    virtual bool HighliteMode() { return false; }\n' +
      'private:\n' +
      '    int mPad7c;\n' +
      '    CameraAnchor *mAnchor; // offset 0x80\n' +
      '    int mPad84[7];\n' +
      '    int mLagEnabled;       // offset 0xa0\n' +
      '    int mLookBack;         // offset 0xa4\n' +
      '};\n\n' +
      'Implement out-of-line or in CameraMover.cpp:\n' +
      'void CubicCameraMover::SetLookBack(bool b) {\n' +
      '    this->mLookBack = b;\n' +
      '}\n' +
      'void CubicCameraMover::SetDisableLag(bool disable) {\n' +
      '    this->mLagEnabled = !disable;\n' +
      '}\n' +
      'unsigned short CubicCameraMover::GetLookbackAngle() {\n' +
      '    if (this->mLookBack) {\n' +
      '        return 0x8000;\n' +
      '    }\n' +
      '    return 0;\n' +
      '}\n' +
      'CameraAnchor *CubicCameraMover::GetAnchor() {\n' +
      '    return this->mAnchor;\n' +
      '}\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d SetLookBack__16CubicCameraMoverb --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d SetDisableLag__16CubicCameraMoverb --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetLookbackAngle__16CubicCameraMover --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d GetAnchor__16CubicCameraMover --no-collapse\n' +
      'Verify 100.0% matches and run ninja changes.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'AreMomentCamerasEnabled',
    symbol: 'AreMomentCamerasEnabled__Fv',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 84,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/CameraAI.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Camera/CameraAI.cpp (and CameraAI.hpp if needed):\n' +
      'Implement AreMomentCamerasEnabled():\n' +
      '/**\n' +
      ' * @brief Determines if moment (jump/action) cameras are enabled based on frontend game mode.\n' +
      ' * @return True if moment cameras are enabled; false in split screen, network modes, or disabled in options.\n' +
      ' */\n' +
      'bool AreMomentCamerasEnabled() {\n' +
      '    if (FEDatabase->IsSplitScreenMode()) {\n' +
      '        return false;\n' +
      '    }\n' +
      '    if (FEDatabase->IsLANMode() || FEDatabase->IsOnlineMode()) {\n' +
      '        return false;\n' +
      '    }\n' +
      '    return FEDatabase->GetGameplaySettings()->JumpCam;\n' +
      '}\n\n' +
      'Check diff for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d AreMomentCamerasEnabled__Fv --no-collapse\n' +
      'Verify 100.0% match and run ninja changes.',
  },
  {
    demangled: 'AverageBase::Recalculate',
    symbol: 'Recalculate__11AverageBase',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 4,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Misc/Table.hpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Misc/Table.hpp:\n' +
      'Define AverageBase::Recalculate() out of line:\n' +
      'class AverageBase {\n' +
      '    ...\n' +
      '    virtual void Recalculate();\n' +
      '};\n\n' +
      'inline void AverageBase::Recalculate() {\n' +
      '}\n' +
      'Or in src/Speed/Indep/Src/Camera/Actions/CDActionDebugWatchCar.cpp, include Table.hpp if required to instantiate.\n\n' +
      'Check diff for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d Recalculate__11AverageBase --no-collapse\n' +
      'Must match 100.0% (4 bytes: blr).\n' +
      'Verify 100.0% match and run ninja changes.',
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

log('Starting Batch 9 for nfs4: GManager bounty markers (zGameplay), CameraMover & CubicCameraMover (zCamera), AreMomentCamerasEnabled (zCamera), AverageBase::Recalculate (zCamera)')

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
    '   git commit -m "docs: record Batch 9 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"',
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
  merged_functions: mergedFunctions,
}
