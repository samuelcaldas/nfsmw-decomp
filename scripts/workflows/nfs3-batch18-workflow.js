export const meta = {
  name: 'nfsmw-parallel-decomp-batch18-nfs3',
  description: 'Batch 18 decompilation for nfs3: bATan (zBWare), SaveSomeData (zFe2), GetBasePkgName (zFe2), IsCarPartUnlocked (zFe2), NotifySoundMessage (zFe2), LeaderBoard::Update (zFe2)',
  phases: [
    { title: 'Decomp-1', detail: 'Triplet 1: bATan (zBWare), SaveSomeData (zFe2), GetBasePkgName (zFe2)' },
    { title: 'Decomp-2', detail: 'Triplet 2: IsCarPartUnlocked (zFe2), NotifySoundMessage (zFe2), LeaderBoard::Update (zFe2)' },
    { title: 'Merge', detail: 'Sequential merge of feature branches into main with zero-regression verification' },
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

const DOCS_SCHEMA = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    commit: { type: 'string' },
    notes: { type: 'string' },
  },
  required: ['success'],
}

const CANDIDATES_TRIPLET1 = [
  {
    demangled: 'bATan(float, float)',
    symbol: 'bATan__Fff',
    unit: 'main/Speed/Indep/SourceLists/zBWare',
    size: 328,
    match: 98.05,
    source_file: 'src/Speed/Indep/bWare/Src/bMath.cpp',
    virtual_address: '0x803C5FF8',
    extra_instructions:
      'In src/Speed/Indep/bWare/Src/bMath.cpp around lines 329-366: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zBWare -d bATan__Fff. The function is at 98.05% match. Look at register allocations (r10 vs r11) in table lookup and arithmetic, especially around lines 344-346 and 350-353. Adjust local variable declarations, casts, and table indexing to align registers and achieve 100.0% match parity with 0 regressions in ninja changes.',
  },
  {
    demangled: 'SaveSomeData(void *, void *, int, void *)',
    symbol: 'SaveSomeData__FPvT0iT0',
    unit: 'main/Speed/Indep/SourceLists/zFe2',
    size: 60,
    match: 93.0,
    source_file: 'src/Speed/Indep/Src/Frontend/Database/FEDatabase.cpp',
    virtual_address: '0x8015099C',
    extra_instructions:
      'In src/Speed/Indep/Src/Frontend/Database/FEDatabase.cpp around lines 44-50: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe2 -d SaveSomeData__FPvT0iT0. Notice lines 44-50: target assembly does: mr r0, r3; add r31, r0, r5; cmplw r31, r6; bgt ...; bl bMemCpy; mr r3, r31; blr. Introduce a local pointer variable storing (static_cast<char *>(save_to) + bytes) prior to condition check so r31 holds the new pointer. Align to 100.0% match parity with 0 regressions.',
  },
  {
    demangled: 'FEPackageManager::GetBasePkgName(char const *)',
    symbol: 'GetBasePkgName__16FEPackageManagerPCc',
    unit: 'main/Speed/Indep/SourceLists/zFe2',
    size: 100,
    match: 93.6,
    source_file: 'src/Speed/Indep/Src/Frontend/FEPackageManager.cpp',
    virtual_address: '0x8015E978',
    extra_instructions:
      'In src/Speed/Indep/Src/Frontend/FEPackageManager.cpp around lines 79-94: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe2 -d GetBasePkgName__16FEPackageManagerPCc. Notice the loop condition placement at line 2aca8 (b 2acbc). Rewrite the while loop over *ptr != \'\\\\\' or pointer decrements so compiler generates the bottom loop test to achieve 100.0% match parity with 0 regressions.',
  },
]

const CANDIDATES_TRIPLET2 = [
  {
    demangled: 'UnlockSystem::IsCarPartUnlocked',
    symbol: 'IsCarPartUnlocked__12UnlockSystem14eUnlockFiltersiP7CarPartib',
    unit: 'main/Speed/Indep/SourceLists/zFe2',
    size: 260,
    match: 94.23,
    source_file: 'src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp',
    virtual_address: '0x8016C2FC',
    extra_instructions:
      'In src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp around lines 589-603: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe2 -d IsCarPartUnlocked__12UnlockSystem14eUnlockFiltersiP7CarPartib. In target assembly, r31 preserves input filter and r30 accumulates answer. Adjust local variable declarations, scoping, or temporary assignments so filter stays in r31 and answer in r30. Achieve 100.0% match parity with 0 regressions.',
  },
  {
    demangled: 'feDialogScreen::NotifySoundMessage',
    symbol: 'NotifySoundMessage__14feDialogScreenUl18eMenuSoundTriggers',
    unit: 'main/Speed/Indep/SourceLists/zFe2',
    size: 184,
    match: 93.2,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/Common/feDialogBox.cpp',
    virtual_address: '0x8014E504',
    extra_instructions:
      'In src/Speed/Indep/Src/Frontend/MenuScreens/Common/feDialogBox.cpp around lines 47-63: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe2 -d NotifySoundMessage__14feDialogScreenUl18eMenuSoundTriggers. Notice target assembly uses single return register r30 initialized with input maybe (r4), conditionally updated to UISND_NONE (-1), and falls through to mr r3, r30. Structure with a single result variable to achieve 100.0% match parity with 0 regressions.',
  },
  {
    demangled: 'LeaderBoard::Update(IPlayer *)',
    symbol: 'Update__11LeaderBoardP7IPlayer',
    unit: 'main/Speed/Indep/SourceLists/zFe2',
    size: 1360,
    match: 95.98,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/InGame/LeaderBoard.cpp',
    virtual_address: '0x80139B7C',
    extra_instructions:
      'In src/Speed/Indep/Src/Frontend/MenuScreens/InGame/LeaderBoard.cpp around lines 51-149: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe2 -d Update__11LeaderBoardP7IPlayer. Notice stack frame differences (-0x78 vs -0x80) and local variable caching for FEDatabase and string pointers. Align local variable declarations and expressions to reach maximum matching parity with 0 regressions in ninja changes.',
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
    '  git commit -m "match: ' + c.demangled + '\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"\n\n' +
    '## Step 7 — Structured report\n' +
    'Query branch: git rev-parse --abbrev-ref HEAD\n' +
    'Return structured result with all required schema fields.'
  )
}

log('Starting Batch 18 for nfs3: 6 parallel candidates across zBWare and zFe2')

phase('Decomp-1')
const resultsTriplet1 = await parallel(CANDIDATES_TRIPLET1.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-1',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

phase('Decomp-2')
const resultsTriplet2 = await parallel(CANDIDATES_TRIPLET2.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-2',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

const allResults = [...resultsTriplet1, ...resultsTriplet2]
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
    log('  Merge failed or reverted for: ' + result.function_name)
  }
}

phase('Docs')
if (mergedFunctions.length > 0) {
  log('Updating documentation for ' + mergedFunctions.length + ' merged functions')
  const docAgentPrompt =
    'Update documentation for newly decompiled and merged functions in GOWE69.\n\n' +
    'Merged functions:\n' +
    JSON.stringify(mergedFunctions, null, 2) + '\n\n' +
    'Instructions:\n' +
    '1. In docs/decompiled_functions.md: append entries under the corresponding subsystem sections for each merged function.\n' +
    '   Follow standard format:\n' +
    '   ### `FunctionName`\n' +
    '   - **Unit**: <unit_name>\n' +
    '   - **Source File**: <source_path>\n' +
    '   - **Virtual Address**: <hex_address>\n' +
    '   - **Size**: <size> bytes\n' +
    '   - **Matching State**: <percentage>% match\n' +
    '   - **Signature**:\n' +
    '     ```cpp\n' +
    '     <signature>\n' +
    '     ```\n' +
    '   - **Description**: <description>\n' +
    '   ---\n\n' +
    '2. In docs/decompilation_status_ledger.md: add entries as [Completed & Merged] under Section 1.\n\n' +
    '3. Commit documentation updates directly to main:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: record Batch 18 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"\n\n' +
    'Return structured output { success: true, commit: "<hash>", notes: "..." }.'

  await agent(docAgentPrompt, {
    phase: 'Docs',
    label: 'docs-update',
    schema: DOCS_SCHEMA,
  })
}

return {
  total_candidates: CANDIDATES_TRIPLET1.length + CANDIDATES_TRIPLET2.length,
  succeeded_decomp: succeeded.length,
  merged_count: mergedFunctions.length,
  merged_functions: mergedFunctions,
}
