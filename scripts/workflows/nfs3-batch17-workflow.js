export const meta = {
  name: 'nfsmw-parallel-decomp-batch17-nfs3',
  description: 'Batch 17 decompilation for nfs3: UIQRChallengeSeries::NotificationMessage (zFeOverlay), PauseMenu::NotificationMessage (zFe), CustomTuningScreen::NotificationMessage (zFe2), TrackStreamer::GetLoadingPriority (zTrack), UIQRCarSelect::NotificationMessage (zFeOverlay), UISafehouseRaceSheet::RefreshHeader (zFe)',
  phases: [
    { title: 'Decomp-1', detail: 'Triplet 1: UIQRChallengeSeries (zFeOverlay), PauseMenu (zFe), CustomTuningScreen (zFe2)' },
    { title: 'Decomp-2', detail: 'Triplet 2: TrackStreamer (zTrack), UIQRCarSelect (zFeOverlay), UISafehouseRaceSheet (zFe)' },
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
    demangled: 'UIQRChallengeSeries::NotificationMessage',
    symbol: 'NotificationMessage__19UIQRChallengeSeriesUlP8FEObjectUlUl',
    unit: 'main/Speed/Indep/SourceLists/zFeOverlay',
    size: 676,
    match: 97.7,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/quickrace/uiQRChallengeSeries.cpp',
    virtual_address: '0x80132114',
    extra_instructions: 'In src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/quickrace/uiQRChallengeSeries.cpp around lines 61-129: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFeOverlay -d NotificationMessage__19UIQRChallengeSeriesUlP8FEObjectUlUl. The diff shows minor branch ordering in the notification message switch/if-chain. Adjust the hash comparison and fall-through structure to match original binary assembly with 0 regressions in ninja changes.',
  },
  {
    demangled: 'PauseMenu::NotificationMessage',
    symbol: 'NotificationMessage__9PauseMenuUlP8FEObjectUlUl',
    unit: 'main/Speed/Indep/SourceLists/zFe',
    size: 1204,
    match: 97.7,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/InGame/uiPause.cpp',
    virtual_address: '0x80126E80',
    extra_instructions: 'In src/Speed/Indep/Src/Frontend/MenuScreens/InGame/uiPause.cpp around lines 45-124: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe -d NotificationMessage__9PauseMenuUlP8FEObjectUlUl. Look at the hash comparisons and event allocation (ERestartRace / EUnPause). Adjust branch ordering, case statements, and temporary variables to achieve 100.0% match parity with 0 regressions.',
  },
  {
    demangled: 'CustomTuningScreen::NotificationMessage',
    symbol: 'NotificationMessage__18CustomTuningScreenUlP8FEObjectUlUl',
    unit: 'main/Speed/Indep/SourceLists/zFe2',
    size: 820,
    match: 96.9,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/InGame/CustomTuning.cpp',
    virtual_address: '0x80157DA4',
    extra_instructions: 'In src/Speed/Indep/Src/Frontend/MenuScreens/InGame/CustomTuning.cpp around lines 129-198: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe2 -d NotificationMessage__18CustomTuningScreenUlP8FEObjectUlUl. Notice at line 141 that field_2e0 check order was inverted relative to the 4 message hashes (0x9120409e, 0xb5971bf1, 0x72619778, 0x911ca4b). Align the boolean condition order so hashes are tested before loading and checking 0x2e0(r29). Also check line 172 help blurb check.',
  },
]

const CANDIDATES_TRIPLET2 = [
  {
    demangled: 'TrackStreamer::GetLoadingPriority',
    symbol: 'GetLoadingPriority__13TrackStreamerP21TrackStreamingSectionP22StreamingPositionEntryb',
    unit: 'main/Speed/Indep/SourceLists/zTrack',
    size: 708,
    match: 97.0,
    source_file: 'src/Speed/Indep/Src/World/TrackStreamer.cpp',
    virtual_address: '0x801B8460',
    extra_instructions: 'In src/Speed/Indep/Src/World/TrackStreamer.cpp around lines 2147-2238: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zTrack -d GetLoadingPriority__13TrackStreamerP21TrackStreamingSectionP22StreamingPositionEntryb. Notice stack size differences (0x120 vs 0x80) and local variable layout around bVector2 normalization and bASin calculations. Align local variables, parameter passing, and floating point temporary math.',
  },
  {
    demangled: 'UIQRCarSelect::NotificationMessage',
    symbol: 'NotificationMessage__13UIQRCarSelectUlP8FEObjectUlUl',
    unit: 'main/Speed/Indep/SourceLists/zFeOverlay',
    size: 5096,
    match: 99.2,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/quickrace/uiQRCarSelect.cpp',
    virtual_address: '0x80133180',
    extra_instructions: 'In src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/quickrace/uiQRCarSelect.cpp: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFeOverlay -d NotificationMessage__13UIQRCarSelectUlP8FEObjectUlUl. The function is already at 99.18% match. Check register allocation and instruction ordering in the message handling dispatch to reach 100.0% matching with 0 regressions in ninja changes.',
  },
  {
    demangled: 'UISafehouseRaceSheet::RefreshHeader',
    symbol: 'RefreshHeader__20UISafehouseRaceSheet',
    unit: 'main/Speed/Indep/SourceLists/zFe',
    size: 1776,
    match: 97.9,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/career/uiRepSheetRaceEvents.cpp',
    virtual_address: '0x8011F1B4',
    extra_instructions: 'In src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/career/uiRepSheetRaceEvents.cpp lines 128-212: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe -d RefreshHeader__20UISafehouseRaceSheet. Notice caching this->Package in r30 vs reloading 0xc(r31), and floating point evaluation order around FEPrintf calls. Align local variable caching and expression order to reach 100.0% matching with 0 regressions.',
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

log('Starting Batch 17 for nfs3: 6 parallel candidates across zFeOverlay, zFe, zFe2, zTrack')

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
    '   git commit -m "docs: record Batch 17 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"\n\n' +
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
