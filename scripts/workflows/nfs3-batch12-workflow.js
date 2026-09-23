export const meta = {
  name: 'nfsmw-parallel-decomp-batch12-nfs3',
  description: 'Batch 12 decompilation for nfs3: UISafehouseRaceSheet::RefreshHeader (zFe), CARSFX_RoadNoise::GenerateRoadNoise (zEAXSound2), WorldMap::AddCops (zFe), GinsuSynthData::SampleToCycle (zEAXSound2)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: UISafehouseRaceSheet::RefreshHeader (zFe) & CARSFX_RoadNoise::GenerateRoadNoise (zEAXSound2)' },
    { title: 'Decomp-2', detail: 'Pair 2: WorldMap::AddCops (zFe) & GinsuSynthData::SampleToCycle (zEAXSound2)' },
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
    demangled: 'UISafehouseRaceSheet::RefreshHeader',
    symbol: 'RefreshHeader__20UISafehouseRaceSheet',
    unit: 'main/Speed/Indep/SourceLists/zFe',
    size: 1776,
    match: 96.6,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/career/uiRepSheetRaceEvents.cpp',
    virtual_address: '0x801263FC',
    extra_instructions: 'In uiRepSheetRaceEvents.cpp UISafehouseRaceSheet::RefreshHeader: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe -d RefreshHeader__20UISafehouseRaceSheet. Look at lines 152-186: reorder intermediate calls to FEngFindImage, cFrontendDatabase::GetRaceIconHash, and GRaceParameters::GetRaceType to prevent unnecessary register spills and match original instruction order. Aim for 100.0% match parity. Ensure 0 regressions with ninja changes.',
  },
  {
    demangled: 'CARSFX_RoadNoise::GenerateRoadNoise',
    symbol: 'GenerateRoadNoise__16CARSFX_RoadNoise',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    size: 1240,
    match: 93.0,
    source_file: 'src/Speed/Indep/Src/EAXSound/CARSFX/CARSFX_Roadnoise.cpp',
    virtual_address: '0x800D80FC',
    extra_instructions: 'In CARSFX_Roadnoise.cpp CARSFX_RoadNoise::GenerateRoadNoise: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEAXSound2 -d GenerateRoadNoise__16CARSFX_RoadNoise. The differences stem from the inlined vector length / rsqrt calculations and float constant loading sequence for the road surface graphs. Reorder local temporary float declarations to match target compiler register allocation. Aim for 100.0% match.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'WorldMap::AddCops',
    symbol: 'AddCops__8WorldMap',
    unit: 'main/Speed/Indep/SourceLists/zFe',
    size: 968,
    match: 96.4,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/InGame/uiWorldMap.cpp',
    virtual_address: '0x8012028C',
    extra_instructions: 'In uiWorldMap.cpp WorldMap::AddCops: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe -d AddCops__8WorldMap. Currently at 96.4% match. Refine cop entity iteration, position vector transformation, and map marker icon placement logic. Aim for 100.0% match parity with 0 regressions.',
  },
  {
    demangled: 'GinsuSynthData::SampleToCycle',
    symbol: 'SampleToCycle__C14GinsuSynthDatai',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    size: 876,
    match: 85.6,
    source_file: 'src/Speed/Indep/Src/EAXSound/Ginsu/ginsudata.cpp',
    virtual_address: '0x800ED4C8',
    extra_instructions: 'In ginsudata.cpp GinsuSynthData::SampleToCycle: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEAXSound2 -d SampleToCycle__C14GinsuSynthDatai. Currently at 85.6% match. Align binary search / indexing loop over sample cycles to recover exact register allocation and condition branch structure. Aim for 100.0% match.',
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

log('Starting Batch 12 for nfs3: UISafehouseRaceSheet::RefreshHeader, CARSFX_RoadNoise::GenerateRoadNoise, WorldMap::AddCops, GinsuSynthData::SampleToCycle')

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
    '   git commit -m "docs: record Batch 12 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"',
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
