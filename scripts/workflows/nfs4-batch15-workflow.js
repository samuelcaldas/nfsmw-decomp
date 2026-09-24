export const meta = {
  name: 'nfs4-batch15-decomp',
  description: 'Batch 15 parallel decompilation for nfs4 (zGameplay): GRaceDatabase::GetStartupRace, GRaceDatabase::GetStartupRaceContext, GRaceCustom::GetRaceActivity, GRaceBin::SetCompletedChallenges, GRaceBin::SetRacesWon, GRaceStatus::SetHasBeenWon',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GRaceDatabase::GetStartupRace & GRaceDatabase::GetStartupRaceContext' },
    { title: 'Decomp-2', detail: 'Pair 2: GRaceCustom::GetRaceActivity & GRaceBin::SetCompletedChallenges' },
    { title: 'Decomp-3', detail: 'Pair 3: GRaceBin::SetRacesWon & GRaceStatus::SetHasBeenWon' },
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

const CANDIDATES_PAIR1 = [
  {
    demangled: 'GRaceDatabase::GetStartupRace',
    symbol: 'GetStartupRace__13GRaceDatabase',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b15-gracedatabase-getstartuprace',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A466C',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Retrieves the startup race configuration.\n * @return Pointer to startup race custom instance.\n */\n' +
      'GRaceCustom *GRaceDatabase::GetStartupRace() {\n    return this->mStartupRace;\n}\n' +
      '(loads mStartupRace at offset 0x2C: lwz r3, 0x2c(r3); blr, 8 bytes).',
  },
  {
    demangled: 'GRaceDatabase::GetStartupRaceContext',
    symbol: 'GetStartupRaceContext__13GRaceDatabase',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b15-gracedatabase-getstartupracecontext',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A4674',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Retrieves the startup race context.\n * @return Race context identifier.\n */\n' +
      'GRace::Context GRaceDatabase::GetStartupRaceContext() {\n    return this->mStartupRaceContext;\n}\n' +
      '(loads mStartupRaceContext at offset 0x30: lwz r3, 0x30(r3); blr, 8 bytes).',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'GRaceCustom::GetRaceActivity',
    symbol: 'GetRaceActivity__C11GRaceCustom',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b15-gracecustom-getraceactivity',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    virtual_address: '0x801A9130',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Retrieves the race activity associated with this custom race.\n * @return Pointer to race activity.\n */\n' +
      'GActivity *GRaceCustom::GetRaceActivity() const {\n    return this->mRaceActivity;\n}\n' +
      '(loads mRaceActivity at offset 0x14: lwz r3, 0x14(r3); blr, 8 bytes).',
  },
  {
    demangled: 'GRaceBin::SetCompletedChallenges',
    symbol: 'SetCompletedChallenges__8GRaceBini',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b15-gracebin-setcompletedchallenges',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A9B50',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Sets the number of challenges completed for this race bin.\n * @param numChallenges Number of challenges completed.\n */\n' +
      'void GRaceBin::SetCompletedChallenges(int numChallenges) {\n    this->mStats.mChallengesCompleted = numChallenges;\n}\n' +
      '(stores halfword at offset 0x18: sth r4, 0x18(r3); blr, 8 bytes).',
  },
]

const CANDIDATES_PAIR3 = [
  {
    demangled: 'GRaceBin::SetRacesWon',
    symbol: 'SetRacesWon__8GRaceBini',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b15-gracebin-setraceswon',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A9B58',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Sets the number of races won for this race bin.\n * @param numRaces Number of races won.\n */\n' +
      'void GRaceBin::SetRacesWon(int numRaces) {\n    this->mStats.mRacesWon = numRaces;\n}\n' +
      '(stores halfword at offset 0x1A: sth r4, 0x1a(r3); blr, 8 bytes).',
  },
  {
    demangled: 'GRaceStatus::SetHasBeenWon',
    symbol: 'SetHasBeenWon__11GRaceStatusb',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b15-gracestatus-sethasbeenwon',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    virtual_address: '0x801BC0E8',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.h, ensure declaration in public section:\n' +
      '    void SetHasBeenWon(bool won);\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, right after SetActivelyRacing, implement:\n' +
      '/**\n * @brief Sets whether this event has been won.\n * @param won True if the event has been won.\n */\n' +
      'void GRaceStatus::SetHasBeenWon(bool won) {\n    this->mHasBeenWon = won;\n}\n' +
      '(stores word at offset 0x46A8: stw r4, 0x46a8(r3); blr, 8 bytes).',
  },
]

function makeDecompPrompt(candidate) {
  return (
    `Your assignment is to decompile ${candidate.demangled} (${candidate.symbol}) in ${candidate.unit} to 100.0% binary parity.\n\n` +
    `CRITICAL WORKTREE & BUILD RULES:\n` +
    `1. Create and switch to your dedicated git worktree from repo root (/home/samuelcaldas/source/repos/nfsmw):\n` +
    `   git worktree add .worktrees/${candidate.branch_name} -b ${candidate.branch_name}\n` +
    `   cd .worktrees/${candidate.branch_name}\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/orig orig\n` +
    `   mkdir -p build\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n` +
    `   python3 configure.py\n` +
    `   mkdir -p build/GOWE69 && cp /home/samuelcaldas/source/repos/nfsmw/build/GOWE69/baseline.json build/GOWE69/baseline.json 2>/dev/null || true\n` +
    `   ninja build/GOWE69/src/Speed/Indep/SourceLists/zGameplay.o\n\n` +
    `TDD CYCLE:\n` +
    `2. RED PHASE: Verify current diff:\n` +
    `   python3 tools/decomp-diff.py -u ${candidate.unit} -d ${candidate.symbol}\n` +
    `3. IMPLEMENTATION:\n` +
    `   Target file: ${candidate.source_file}\n` +
    `   Header file: ${candidate.header_file}\n` +
    `   ${candidate.extra_instructions}\n` +
    `4. GREEN PHASE: Verify matching & regressions:\n` +
    `   ninja build/GOWE69/src/Speed/Indep/SourceLists/zGameplay.o\n` +
    `   python3 tools/decomp-diff.py -u ${candidate.unit} -d ${candidate.symbol}\n` +
    `   ninja changes  # MUST report 0 regressions against baseline\n\n` +
    `5. COMMIT:\n` +
    `   git add -u\n` +
    `   git commit -m "match(${candidate.unit.split('/').pop()}): decompile ${candidate.demangled} (100.0%)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n` +
    `Return JSON matching schema with success=true, match_percentage, etc.`
  )
}

// ----------------------------------------------------
// PHASE 1: PAIR 1 DECOMPILATION (2 parallel agents)
// ----------------------------------------------------
phase('Decomp-1')
log('Phase 1: Starting decompilation of Pair 1 (GetStartupRace & GetStartupRaceContext)')
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
log('Phase 2: Starting decompilation of Pair 2 (GetRaceActivity & SetCompletedChallenges)')
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
log('Phase 3: Starting decompilation of Pair 3 (SetRacesWon & SetHasBeenWon)')
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

log(`Batch 15 decompilation completed. Results: ${JSON.stringify(allDecompResults)}`)

return {
  candidates: allCandidates,
  results: allDecompResults,
}
