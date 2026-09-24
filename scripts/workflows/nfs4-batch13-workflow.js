export const meta = {
  name: 'nfs4-batch13-decomp',
  description: 'Batch 13 parallel decompilation for nfs4 (zGameplay): GRaceStatus::SetIsLoading, GRaceBin::GetCompletedChallenges, GRaceStatus::EnterSuddenDeath, GRaceBin::GetAwardedRaceWins, GRaceStatus::SetTaskTime, GRaceStatus::SetActivelyRacing',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GRaceStatus::SetIsLoading & GRaceBin::GetCompletedChallenges' },
    { title: 'Decomp-2', detail: 'Pair 2: GRaceStatus::EnterSuddenDeath & GRaceBin::GetAwardedRaceWins' },
    { title: 'Decomp-3', detail: 'Pair 3: GRaceStatus::SetTaskTime & GRaceStatus::SetActivelyRacing' },
    { title: 'Merge', detail: 'Sequential merge of feature branches into main' },
    { title: 'Docs', detail: 'Update docs/decompiled_functions.md and docs/decompilation_status_ledger.md' },
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
    demangled: 'GRaceStatus::SetIsLoading',
    symbol: 'SetIsLoading__11GRaceStatusb',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b13-gracestatus-setisloading',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    line: 334,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.h line 334, change the inline definition `void SetIsLoading(bool loading) { mIsLoading = loading; };` to declaration `void SetIsLoading(bool loading);`. ' +
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, implement:\n' +
      '/**\n * @brief Sets whether the race status is currently loading.\n * @param loading True if loading, false otherwise.\n */\n' +
      'void GRaceStatus::SetIsLoading(bool loading) {\n    this->mIsLoading = loading;\n}\n',
  },
  {
    demangled: 'GRaceBin::GetCompletedChallenges',
    symbol: 'GetCompletedChallenges__C8GRaceBin',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b13-gracebin-getcompletedchallenges',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    line: 341,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Retrieves the number of challenges completed for this race bin.\n * @return Number of completed challenges.\n */\n' +
      'int GRaceBin::GetCompletedChallenges() const {\n    return this->mStats.mChallengesCompleted;\n}\n' +
      '(loads halfword at offset 0x18: lhz r3, 0x18(r3); blr).',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'GRaceStatus::EnterSuddenDeath',
    symbol: 'EnterSuddenDeath__11GRaceStatus',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b13-gracestatus-entersuddendeath',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    line: 523,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.h line 523, change the inline definition `void EnterSuddenDeath() { mSuddenDeathMode = true; }` to declaration `void EnterSuddenDeath();`. ' +
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, implement:\n' +
      '/**\n * @brief Enters sudden death mode.\n */\n' +
      'void GRaceStatus::EnterSuddenDeath() {\n    this->mSuddenDeathMode = true;\n}\n',
  },
  {
    demangled: 'GRaceBin::GetAwardedRaceWins',
    symbol: 'GetAwardedRaceWins__C8GRaceBin',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b13-gracebin-getawardedracewins',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    line: 343,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Retrieves the number of race wins awarded for this race bin.\n * @return Number of awarded race wins.\n */\n' +
      'unsigned short GRaceBin::GetAwardedRaceWins() const {\n    return this->mStats.mRacesWon;\n}\n' +
      '(loads halfword at offset 0x1a: lhz r3, 0x1a(r3); blr).',
  },
]

const CANDIDATES_PAIR3 = [
  {
    demangled: 'GRaceStatus::SetTaskTime',
    symbol: 'SetTaskTime__11GRaceStatusf',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b13-gracestatus-settasktime',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    line: 567,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.h line 567, change the inline definition `void SetTaskTime(float seconds) { mTaskTime = seconds; }` to declaration `void SetTaskTime(float seconds);`. ' +
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, implement:\n' +
      '/**\n * @brief Sets the task time for the race status.\n * @param seconds Duration in seconds.\n */\n' +
      'void GRaceStatus::SetTaskTime(float seconds) {\n    this->mTaskTime = seconds;\n}\n',
  },
  {
    demangled: 'GRaceStatus::SetActivelyRacing',
    symbol: 'SetActivelyRacing__11GRaceStatusb',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b13-gracestatus-setactivelyracing',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    line: 575,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.h line 575, change the inline definition `void SetActivelyRacing(bool racing) { mActivelyRacing = racing; }` to declaration `void SetActivelyRacing(bool racing);`. ' +
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, implement:\n' +
      '/**\n * @brief Sets whether the race is actively occurring.\n * @param racing True if actively racing, false otherwise.\n */\n' +
      'void GRaceStatus::SetActivelyRacing(bool racing) {\n    this->mActivelyRacing = racing;\n}\n',
  },
]

function makeDecompPrompt(candidate) {
  return (
    `Your assignment is to decompile ${candidate.demangled} (${candidate.symbol}) in ${candidate.unit} to 100.0% binary parity.\n\n` +
    `CRITICAL WORKTREE & BUILD RULES:\n` +
    `1. Create and switch to your dedicated git worktree from repo root:\n` +
    `   git worktree add .worktrees/${candidate.branch_name} -b ${candidate.branch_name}\n` +
    `   cd .worktrees/${candidate.branch_name}\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/orig orig\n` +
    `   mkdir -p build\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n` +
    `   python3 configure.py\n` +
    `   mkdir -p build/GOWE69 && cp /home/samuelcaldas/source/repos/nfsmw/build/GOWE69/baseline.json build/GOWE69/baseline.json 2>/dev/null || true\n` +
    `   ninja\n\n` +
    `TDD CYCLE:\n` +
    `2. RED PHASE: Verify current diff:\n` +
    `   python3 tools/decomp-diff.py -u ${candidate.unit} -d ${candidate.symbol}\n` +
    `3. IMPLEMENTATION:\n` +
    `   Target file: ${candidate.source_file}\n` +
    `   Header file: ${candidate.header_file}\n` +
    `   ${candidate.extra_instructions}\n` +
    `4. GREEN PHASE: Verify matching & regressions:\n` +
    `   ninja\n` +
    `   python3 tools/decomp-diff.py -u ${candidate.unit} -d ${candidate.symbol}\n` +
    `   ninja changes  # MUST report 0 regressions against baseline\n\n` +
    `5. COMMIT:\n` +
    `   git add -u\n` +
    `   git commit -m "match(${candidate.unit.split('/').pop()}): decompile ${candidate.demangled} (100.0%)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n` +
    `Return JSON matching schema with success=true, match_percentage, etc.`
  )
}

function makeMergePrompt(candidate) {
  return (
    `Merge branch ${candidate.branch_name} into main.\n\n` +
    `STEPS:\n` +
    `1. In repository root:\n` +
    `   git checkout main\n` +
    `   git fetch origin\n` +
    `   git pull --rebase origin main\n` +
    `   git merge --no-ff ${candidate.branch_name} -m "Merge branch '${candidate.branch_name}'\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n` +
    `   If a conflict occurs, resolve it cleanly by keeping both function declarations/definitions, stage with git add -A, and commit with git commit --no-edit.\n` +
    `2. Verify build and regressions:\n` +
    `   ninja\n` +
    `   ninja changes\n` +
    `3. Clean up worktree and branch:\n` +
    `   git worktree remove .worktrees/${candidate.branch_name} --force 2>/dev/null || true\n` +
    `   git branch -d ${candidate.branch_name}\n\n` +
    `Return JSON with success=true and merge_commit hash.`
  )
}

// ----------------------------------------------------
// PHASE 1: PAIR 1 DECOMPILATION (2 parallel agents)
// ----------------------------------------------------
phase('Decomp-1')
log('Phase 1: Starting decompilation of Pair 1 (GRaceStatus::SetIsLoading & GRaceBin::GetCompletedChallenges)')
const resultsPair1 = await parallel(
  CANDIDATES_PAIR1.map(cand => () =>
    agent(makeDecompPrompt(cand), {
      phase: 'Decomp-1',
      label: `decomp:${cand.branch_name}`,
      agentType: 'decomp-worker',
      schema: DECOMP_SCHEMA,
    })
  )
)

// ----------------------------------------------------
// PHASE 2: PAIR 2 DECOMPILATION (2 parallel agents)
// ----------------------------------------------------
phase('Decomp-2')
log('Phase 2: Starting decompilation of Pair 2 (GRaceStatus::EnterSuddenDeath & GRaceBin::GetAwardedRaceWins)')
const resultsPair2 = await parallel(
  CANDIDATES_PAIR2.map(cand => () =>
    agent(makeDecompPrompt(cand), {
      phase: 'Decomp-2',
      label: `decomp:${cand.branch_name}`,
      agentType: 'decomp-worker',
      schema: DECOMP_SCHEMA,
    })
  )
)

// ----------------------------------------------------
// PHASE 3: PAIR 3 DECOMPILATION (2 parallel agents)
// ----------------------------------------------------
phase('Decomp-3')
log('Phase 3: Starting decompilation of Pair 3 (GRaceStatus::SetTaskTime & GRaceStatus::SetActivelyRacing)')
const resultsPair3 = await parallel(
  CANDIDATES_PAIR3.map(cand => () =>
    agent(makeDecompPrompt(cand), {
      phase: 'Decomp-3',
      label: `decomp:${cand.branch_name}`,
      agentType: 'decomp-worker',
      schema: DECOMP_SCHEMA,
    })
  )
)

const allDecompResults = [...resultsPair1, ...resultsPair2, ...resultsPair3]
const allCandidates = [...CANDIDATES_PAIR1, ...CANDIDATES_PAIR2, ...CANDIDATES_PAIR3]
const successfulCandidates = allCandidates.filter((cand, i) => allDecompResults[i] && allDecompResults[i].success)

// ----------------------------------------------------
// PHASE 4: SERIALIZED MERGES
// ----------------------------------------------------
phase('Merge')
log(`Phase 4: Merging ${successfulCandidates.length} successful branches sequentially into main`)
const mergeResults = []
for (const cand of successfulCandidates) {
  const mRes = await agent(makeMergePrompt(cand), {
    phase: 'Merge',
    label: `merge:${cand.branch_name}`,
    agentType: 'decomp-worker',
    schema: MERGE_SCHEMA,
  })
  mergeResults.push(mRes)
}

// ----------------------------------------------------
// PHASE 5: DOCUMENTATION & LEDGER UPDATE
// ----------------------------------------------------
phase('Docs')
log('Phase 5: Updating documentation and decompilation status ledger')
const docsResult = await agent(
  `Update docs/decompiled_functions.md and docs/decompilation_status_ledger.md for Batch 13.\n\n` +
  `Decompiled functions in Batch 13:\n` +
  `1. GRaceStatus::SetIsLoading (zGameplay) - 100.0% match\n` +
  `2. GRaceBin::GetCompletedChallenges (zGameplay) - 100.0% match\n` +
  `3. GRaceStatus::EnterSuddenDeath (zGameplay) - 100.0% match\n` +
  `4. GRaceBin::GetAwardedRaceWins (zGameplay) - 100.0% match\n` +
  `5. GRaceStatus::SetTaskTime (zGameplay) - 100.0% match\n` +
  `6. GRaceStatus::SetActivelyRacing (zGameplay) - 100.0% match\n\n` +
  `STEPS:\n` +
  `1. Read docs/decompiled_functions.md and add technical entries for each decompiled function under Gameplay subsystem.\n` +
  `2. Read docs/decompilation_status_ledger.md and record each function as [Completed & Merged] under Section 1 (Gameplay Subsystem).\n` +
  `3. Commit documentation updates:\n` +
  `   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n` +
  `   git commit -m "docs: document Batch 13 decompiled functions in ledger and specs\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n` +
  `4. Push changes: git pull --rebase origin main && git push origin main\n\n` +
  `Return string summary of updated documentation.`
)

return {
  batch: 13,
  total_candidates: allCandidates.length,
  decomp_successes: successfulCandidates.length,
  merged_count: mergeResults.filter(r => r && r.success).length,
  docs_result: docsResult,
}
