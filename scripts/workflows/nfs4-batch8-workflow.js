export const meta = {
  name: 'nfsmw-parallel-decomp-batch8-nfs4',
  description: 'Batch 8 decompilation for nfs4: GVault core accessors & size methods (zGameplay), GVault state & SetRaceBin methods (zGameplay), GRaceParameters & GRaceBin vault accessors (zGameplay), ICEManager::Update (zCamera) & LuaMessageDeliveryInfo accessors (zGameplay)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GVault core accessors (zGameplay) & GVault state methods (zGameplay)' },
    { title: 'Decomp-2', detail: 'Pair 2: GRaceParameters & GRaceBin accessors (zGameplay) & ICEManager::Update & LuaMessageDeliveryInfo (zCamera/zGameplay)' },
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
    demangled: 'GVault core accessors and footprint (GetName, GetAttribVault, GetObjectCount, GetFootprint, GetDataOffset, GetDataSize, GetLoadDataOffset, GetLoadDataSize)',
    symbol: 'GetName__C6GVault',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 80,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GVault.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GVault.h, update class GVault to declare (not inline):\n' +
      'class GVault {\n' +
      'public:\n' +
      '    Attrib::Vault *mVault; // offset 0x0\n' +
      '    const char *mName; // offset 0x4\n' +
      '    unsigned int mFlags; // offset 0x8\n' +
      '    unsigned int mPad0c; // offset 0xc\n' +
      '    unsigned int mDataOffset; // offset 0x10\n' +
      '    unsigned int mDataSize; // offset 0x14\n' +
      '    unsigned int mLoadDataOffset; // offset 0x18\n' +
      '    unsigned int mLoadDataSize; // offset 0x1c\n' +
      '    unsigned int mPad20; // offset 0x20\n' +
      '    unsigned int mField_0x24; // offset 0x24\n' +
      '    unsigned int mPad28; // offset 0x28\n' +
      '    unsigned int mPad2c; // offset 0x2c\n' +
      '    unsigned int mField_0x30; // offset 0x30\n' +
      '    unsigned int mObjectCount; // offset 0x34\n\n' +
      '    const char *GetName() const;\n' +
      '    Attrib::Vault *GetAttribVault() const;\n' +
      '    unsigned int GetObjectCount() const;\n' +
      '    unsigned int GetFootprint() const;\n' +
      '    unsigned int GetDataOffset() const;\n' +
      '    unsigned int GetDataSize() const;\n' +
      '    unsigned int GetLoadDataOffset() const;\n' +
      '    unsigned int GetLoadDataSize() const;\n' +
      '    bool IsLoaded() const;\n' +
      '    bool IsResident() const;\n' +
      '    bool IsTransient() const;\n' +
      '    bool IsRaceBin() const;\n' +
      '    void SetRaceBin();\n' +
      '    void LoadSyncTransient();\n' +
      '};\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GVault.cpp, remove ForceGVaultInstantiation and implement with concise Doxygen docstrings:\n' +
      'const char *GVault::GetName() const {\n' +
      '    return this->mName;\n' +
      '}\n\n' +
      'Attrib::Vault *GVault::GetAttribVault() const {\n' +
      '    return this->mVault;\n' +
      '}\n\n' +
      'unsigned int GVault::GetObjectCount() const {\n' +
      '    return this->mObjectCount;\n' +
      '}\n\n' +
      'unsigned int GVault::GetFootprint() const {\n' +
      '    return this->mDataSize + this->mField_0x24 + this->mField_0x30;\n' +
      '}\n\n' +
      'unsigned int GVault::GetDataOffset() const {\n' +
      '    return this->mDataOffset;\n' +
      '}\n\n' +
      'unsigned int GVault::GetDataSize() const {\n' +
      '    return this->mDataSize;\n' +
      '}\n\n' +
      'unsigned int GVault::GetLoadDataOffset() const {\n' +
      '    return this->mLoadDataOffset;\n' +
      '}\n\n' +
      'unsigned int GVault::GetLoadDataSize() const {\n' +
      '    return this->mLoadDataSize;\n' +
      '}\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetName__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetAttribVault__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetObjectCount__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetFootprint__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetDataOffset__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetDataSize__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetLoadDataOffset__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetLoadDataSize__C6GVault --no-collapse\n' +
      'Verify 100.0% matches and run ninja changes.',
  },
  {
    demangled: 'GVault status methods and SetRaceBin (IsLoaded, IsResident, IsTransient, IsRaceBin, SetRaceBin)',
    symbol: 'IsLoaded__C6GVault',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 80,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GVault.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GVault.h, ensure class GVault has members and declarations:\n' +
      '    bool IsLoaded() const;\n' +
      '    bool IsResident() const;\n' +
      '    bool IsTransient() const;\n' +
      '    bool IsRaceBin() const;\n' +
      '    void SetRaceBin();\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GVault.cpp, implement with concise Doxygen docstrings:\n' +
      'bool GVault::IsLoaded() const {\n' +
      '    return this->mVault != nullptr;\n' +
      '}\n\n' +
      'bool GVault::IsResident() const {\n' +
      '    return (this->mFlags & 1) != 0;\n' +
      '}\n\n' +
      'bool GVault::IsTransient() const {\n' +
      '    return !this->IsResident();\n' +
      '}\n\n' +
      'bool GVault::IsRaceBin() const {\n' +
      '    return (this->mFlags & 2) != 0;\n' +
      '}\n\n' +
      'void GVault::SetRaceBin() {\n' +
      '    this->mFlags |= 2;\n' +
      '}\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d IsLoaded__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d IsResident__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d IsTransient__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d IsRaceBin__C6GVault --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d SetRaceBin__6GVault --no-collapse\n' +
      'Verify 100.0% matches and run ninja changes.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'GRaceParameters and GRaceBin vault accessors (GRaceParameters::GetGameplayObj, GetChildVault, GetParentVault; GRaceBin::GetCollectionKey, GetChildVault)',
    symbol: 'GetChildVault__C15GRaceParameters',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    size: 64,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.h:\n' +
      'In class GRaceParameters:\n' +
      'Verify declarations:\n' +
      '    const Attrib::Gen::gameplay *GetGameplayObj() const;\n' +
      '    GVault *GetChildVault() const;\n' +
      '    GVault *GetParentVault() const;\n\n' +
      'In class GRaceBin:\n' +
      'Verify declarations:\n' +
      '    unsigned int GetCollectionKey() const;\n' +
      '    GVault *GetChildVault() const;\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement with concise Doxygen docstrings:\n' +
      'const Attrib::Gen::gameplay *GRaceParameters::GetGameplayObj() const {\n' +
      '    return this->mGameplayObj;\n' +
      '}\n\n' +
      'GVault *GRaceParameters::GetParentVault() const {\n' +
      '    return this->mParentVault;\n' +
      '}\n\n' +
      'GVault *GRaceParameters::GetChildVault() const {\n' +
      '    return this->mChildVault;\n' +
      '}\n\n' +
      'unsigned int GRaceBin::GetCollectionKey() const {\n' +
      '    return this->mGameplayObj.GetCollection();\n' +
      '}\n\n' +
      'GVault *GRaceBin::GetChildVault() const {\n' +
      '    return this->mChildVault;\n' +
      '}\n\n' +
      'Check diffs for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetGameplayObj__C15GRaceParameters --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetParentVault__C15GRaceParameters --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetChildVault__C15GRaceParameters --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetCollectionKey__C8GRaceBin --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetChildVault__C8GRaceBin --no-collapse\n' +
      'Verify 100.0% matches and run ninja changes.',
  },
  {
    demangled: 'ICEManager::Update (zCamera) and LuaMessageDeliveryInfo accessors (zGameplay)',
    symbol: 'Update__10ICEManager',
    unit: 'main/Speed/Indep/SourceLists/zCamera',
    size: 36,
    match: 0.0,
    source_file: 'src/Speed/Indep/Src/Camera/ICE/ICEManager.cpp',
    extra_instructions:
      '1. In src/Speed/Indep/Src/Camera/ICE/ICEManager.cpp:\n' +
      'Implement ICEManager::Update():\n' +
      '/**\n' +
      ' * @brief Updates ICE camera manager state.\n' +
      ' */\n' +
      'void ICEManager::Update() {\n' +
      '}\n\n' +
      'Check diff for:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zCamera -d Update__10ICEManager --no-collapse\n' +
      'Must match 100.0% (4 bytes: blr).\n\n' +
      '2. In src/Speed/Indep/Src/Lua/LuaPostOffice.h:\n' +
      'Adjust LuaMessageDeliveryInfo struct member layout and offsets to match GOWE69:\n' +
      '  mMessageBase at offset 0x1c\n' +
      '  mLuaState at offset 0x28\n' +
      '  mActivityContext at offset 0x2c\n' +
      '  mHandlerContext at offset 0x30\n' +
      'Ensure accessors return correct members matching:\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetLuaState__C22LuaMessageDeliveryInfo --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetActivity__C22LuaMessageDeliveryInfo --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetHandler__C22LuaMessageDeliveryInfo --no-collapse\n' +
      '  python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zGameplay -d GetMessage__C22LuaMessageDeliveryInfo --no-collapse\n' +
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

log('Starting Batch 8 for nfs4: GVault accessors & state (zGameplay), GRaceParameters & GRaceBin accessors (zGameplay), ICEManager::Update (zCamera) & LuaMessageDeliveryInfo (zGameplay)')

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
    '   git commit -m "docs: record Batch 8 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"',
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
