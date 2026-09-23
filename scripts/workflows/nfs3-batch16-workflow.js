export const meta = {
  name: 'nfsmw-parallel-decomp-batch16-nfs3',
  description: 'Batch 16 decompilation for nfs3: Physics::Info::ShiftPoints (zPhysics), MemcardCallbacks::FoundEntry (zFe), SFX_Common::MsgPlayMiscSound (zEAXSound2), WorldMap::ClampToMapBounds (zFe)',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: Physics::Info::ShiftPoints (zPhysics) & MemcardCallbacks::FoundEntry (zFe)' },
    { title: 'Decomp-2', detail: 'Pair 2: SFX_Common::MsgPlayMiscSound (zEAXSound2) & WorldMap::ClampToMapBounds (zFe)' },
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
    demangled: 'Physics::Info::ShiftPoints',
    symbol: 'ShiftPoints__Q27Physics4InfoRCQ36Attrib3Gen12transmissionRCQ36Attrib3Gen6engineRCQ36Attrib3Gen9inductionPfT4Ui',
    unit: 'main/Speed/Indep/SourceLists/zPhysics',
    size: 824,
    match: 90.4,
    source_file: 'src/Speed/Indep/Src/Physics/PhysicsInfo.cpp',
    virtual_address: '0x80224CB8',
    extra_instructions: 'In src/Speed/Indep/Src/Physics/PhysicsInfo.cpp around line 156-230: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zPhysics -d ShiftPoints__Q27Physics4InfoRCQ36Attrib3Gen12transmissionRCQ36Attrib3Gen6engineRCQ36Attrib3Gen9inductionPfT4Ui. Align boolean condition flags and loop variables around induction boost calculation and gear ratio steps. Match register assignment and floating-point temporary values to eliminate diffs and achieve 100.0% match parity with 0 regressions in ninja changes.',
  },
  {
    demangled: 'MemcardCallbacks::FoundEntry',
    symbol: 'FoundEntry__16MemcardCallbacksPCQ211RealmcIface9EntryInfo',
    unit: 'main/Speed/Indep/SourceLists/zFe',
    size: 512,
    match: 98.0,
    source_file: 'src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp',
    virtual_address: '0x80139CFC',
    extra_instructions: 'In src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp around line 240-271: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe -d FoundEntry__16MemcardCallbacksPCQ211RealmcIface9EntryInfo. Notice the only diff is instruction ordering for UIMemcardBase::AddItem arguments: lis r5, @ha followed by mr r6, r30 and mr r7, r28 before addi r5, r5, @l. Adjust local variable assignment order or function parameter evaluation to match original ProDG scheduling for 100.0% match parity with 0 regressions.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'SFX_Common::MsgPlayMiscSound',
    symbol: 'MsgPlayMiscSound__10SFX_CommonRC10MMiscSound',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound2',
    size: 780,
    match: 99.4,
    source_file: 'src/Speed/Indep/Src/EAXSound/SFX_Common.cpp',
    virtual_address: '0x800D36C4',
    extra_instructions: 'In src/Speed/Indep/Src/EAXSound/SFX_Common.cpp around line 38-65: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEAXSound2 -d MsgPlayMiscSound__10SFX_CommonRC10MMiscSound. Align Csis struct field zeroing and initialization order around Csis::Class::CreateInstance and Csis::ClassHandle::Set calls to reach 100.0% match parity with 0 regressions.',
  },
  {
    demangled: 'WorldMap::ClampToMapBounds',
    symbol: 'ClampToMapBounds__8WorldMapRfT1',
    unit: 'main/Speed/Indep/SourceLists/zFe',
    size: 216,
    match: 93.1,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/InGame/uiWorldMap.cpp',
    virtual_address: '0x8012B558',
    extra_instructions: 'In src/Speed/Indep/Src/Frontend/MenuScreens/InGame/uiWorldMap.cpp around line 609-633: inspect diff using python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFe -d ClampToMapBounds__8WorldMapRfT1. Note that original binary loads negative constants from .rodata and uses fadds (e.g. fadds f13, f13, f0 where f0 is negative float offset), whereas current code uses fsubs. Align expressions to generate fadds and eliminate branch difference to achieve 100.0% binary matching parity with 0 regressions.',
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

log('Starting Batch 16 for nfs3: Physics::Info::ShiftPoints, MemcardCallbacks::FoundEntry, SFX_Common::MsgPlayMiscSound, WorldMap::ClampToMapBounds')

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
    '4. Commit and push documentation changes:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: record Batch 16 decompiled functions in ledger and documentation\n\nCo-Authored-By: Claude Code <noreply@anthropic.com>"\n' +
    '   git push origin main',
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
