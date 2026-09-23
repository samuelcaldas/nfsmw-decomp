export const meta = {
  name: 'nfsmw-parallel-decomp-batch18',
  description: 'Batch 18 decompilation: AllocVectorSpace/FreeVectorSpace, InitAtSegment, GetLoadingPriority, InternalLoadStreamingEntry',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: AllocVectorSpace/FreeVectorSpace (zAI) & InitAtSegment (zWorld2)' },
    { title: 'Decomp-2', detail: 'Pair 2: GetLoadingPriority (zTrack) & InternalLoadStreamingEntry (zEcstasy)' },
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
    demangled: 'UTL::FastVector<unsigned int, 16>::AllocVectorSpace',
    symbol: 'AllocVectorSpace__Q23UTLt10FastVector2ZUii16UiUi',
    unit: 'main/Speed/Indep/SourceLists/zAI',
    size: 52,
    match: 61.54,
    source_file: 'src/Speed/Indep/Libs/Support/Utility/UTLVector.h',
    virtual_address: '0x80042754',
    signature: 'virtual pointer UTL::FastVector<T, Alignment>::AllocVectorSpace(std::size_t num, unsigned int alignment)',
    hint: 'Around lines 269-275 in src/Speed/Indep/Libs/Support/Utility/UTLVector.h. In the target assembly, AllocVectorSpace loads string literal "FastVector" (at $LC2151463064 / 0x803C5898) into r5 instead of passing nullptr/0 to gFastMem.Alloc(num * sizeof(T), ...). Similarly, FreeVectorSpace passes "FastVector" to gFastMem.Free(buffer, num * sizeof(T), ...). Changing nullptr to "FastVector" matches both AllocVectorSpace and FreeVectorSpace to 100.0%!',
  },
  {
    demangled: 'WRoadNav::InitAtSegment',
    symbol: 'InitAtSegment__8WRoadNavscf',
    unit: 'main/Speed/Indep/SourceLists/zWorld2',
    size: 816,
    match: 99.00,
    source_file: 'src/Speed/Indep/Src/World/Common/WRoadNetwork.cpp',
    virtual_address: '0x8030183C',
    signature: 'void WRoadNav::InitAtSegment(short segInd, char laneInd, float timeStep)',
    hint: 'Around line 2435 in src/Speed/Indep/Src/World/Common/WRoadNetwork.cpp. Initial match is 99.0%. Target stack frame is -0x90(r1) vs compiled -0x98(r1). Target saves non-volatiles using stmw r24, 0x58(r1) while compiled uses stmw r25, 0x64(r1). Target holds timeStep in f31 and lane index in r24. Adjust local variables declarations to eliminate extra register spill and align stack frame to -0x90.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'TrackStreamer::GetLoadingPriority',
    symbol: 'GetLoadingPriority__13TrackStreamerP21TrackStreamingSectionP22StreamingPositionEntryb',
    unit: 'main/Speed/Indep/SourceLists/zTrack',
    size: 708,
    match: 97.01,
    source_file: 'src/Speed/Indep/Src/World/TrackStreamer.cpp',
    virtual_address: '0x802BAE70',
    signature: 'int TrackStreamer::GetLoadingPriority(TrackStreamingSection *section, StreamingPositionEntry *position_entry, bool calculating_jettison)',
    hint: 'Around line 2147 in src/Speed/Indep/Src/World/TrackStreamer.cpp. Initial match 97.0%. Difference is floating point register choice (f31 vs f30 around lines 2156-2166) and local variable stack offsets (stfs f8, 0xa8(r1) in target vs 8(r1)). Check local float variables ordering and conditionals.',
  },
  {
    demangled: 'eStreamPackLoader::InternalLoadStreamingEntry',
    symbol: 'InternalLoadStreamingEntry__17eStreamPackLoaderP23eStreamingPackLoadTableP14eStreamingPackP15eStreamingEntry',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    size: 440,
    match: 95.41,
    source_file: 'src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp',
    virtual_address: '0x8010B0E4',
    signature: 'void eStreamPackLoader::InternalLoadStreamingEntry(eStreamingPackLoadTable *loading_table, eStreamingPack *streaming_pack, eStreamingEntry *streaming_entry)',
    hint: 'Around line 336 in src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp. Initial match 95.4%. In target, streaming_pack is preserved in r29, while compiled uses r28. Also notice flag test and bitwise operations around lines 347-350. Adjusting local pointer variables declarations and temporary naming aligns register allocation.',
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
    '  Virtual Address: ' + (c.virtual_address || 'unknown') + '\n' +
    '  Signature: ' + (c.signature || 'unknown') + '\n' +
    '  Hint: ' + (c.hint || 'None') + '\n\n' +
    'WORKTREE SETUP & EXECUTION RULES:\n\n' +
    '## Step 0 — Setup environment\n' +
    'Run immediately in your worktree root:\n' +
    '  rm -rf orig\n' +
    '  cp -r /home/samuelcaldas/repos/nfsmw/orig orig\n' +
    '  mkdir -p build\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n' +
    '  python3 configure.py\n' +
    '  ninja  (quick build check to ensure build works)\n\n' +
    '## Step 1 — Context inspection\n' +
    'Inspect function context and initial diff:\n' +
    '  python3 tools/decomp-context.py -u "' + c.unit + '" -f "' + c.symbol + '" --no-ghidra\n' +
    '  python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n\n' +
    '## Step 2 — Read implementation\n' +
    'Read ' + c.source_file + ' around ' + c.demangled + '.\n\n' +
    '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
    'Iterate on matching:\n' +
    'a. Study differences in python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'b. Apply hints and adjust register allocation, local variable ordering, types, loop bounds.\n' +
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

log('Starting Batch 18: AllocVectorSpace/FreeVectorSpace, InitAtSegment, GetLoadingPriority, InternalLoadStreamingEntry')

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
    '   - **Source**: ...\n' +
    '   - **Address**: `0x...`\n' +
    '   - **Size**: N bytes\n' +
    '   - **Match**: X.X%\n' +
    '   - **Signature**:\n' +
    '     ```cpp\n' +
    '     ...\n' +
    '     ```\n' +
    '   - **Description**: ...\n\n' +
    '3. Read docs/decompilation_status_ledger.md\n' +
    '4. Add/update the status of each function to **[Completed & Merged]** under its subsystem.\n' +
    '5. Update header summary in docs/decompilation_status_ledger.md to mention Batch 18.\n' +
    '6. Commit the docs:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: document Batch 18 decompiled functions (@nfs1)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
    'Return string summary of updated documentation files.'
  )
}

return {
  total_candidates: 4,
  succeeded: succeeded.length,
  merged: mergedFunctions.length,
  merged_functions: mergedFunctions,
}
