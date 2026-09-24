export const meta = {
  name: 'nfs4-batch16-decomp',
  description: 'Batch 16 parallel decompilation for nfs4 (zGameplay): GRaceDatabase::GetBin, GRaceStatus::GetCacheName, GRacerInfo::ChallengeComplete, GRacerInfo::SetName, GRacerInfo::SetRanking, GRacerInfo::SetIndex',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GRaceDatabase::GetBin & GRaceStatus::GetCacheName' },
    { title: 'Decomp-2', detail: 'Pair 2: GRacerInfo::ChallengeComplete & GRacerInfo::SetName' },
    { title: 'Decomp-3', detail: 'Pair 3: GRacerInfo::SetRanking & GRacerInfo::SetIndex' },
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
    demangled: 'GRaceDatabase::GetBin',
    symbol: 'GetBin__13GRaceDatabaseUi',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b16-gracedatabase-getbin',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A43DC',
    size_bytes: 16,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, right after GetBinCount(), implement:\n' +
      '/**\n * @brief Retrieves the race bin at the specified index.\n * @param index Zero-based index of the race bin.\n * @return Pointer to the race bin.\n */\n' +
      'GRaceBin *GRaceDatabase::GetBin(unsigned int index) {\n    return &this->mBins[index];\n}\n' +
      '(mulli r4, r4, 0x1c; lwz r3, 0x24(r3); add r3, r3, r4; blr, 16 bytes).',
  },
  {
    demangled: 'GRaceStatus::GetCacheName',
    symbol: 'GetCacheName__C11GRaceStatus',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b16-gracestatus-getcachename',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    virtual_address: '0x801BC0F0',
    size_bytes: 12,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.h, in public section under // Overrides: IVehicleCache, declare:\n' +
      '    const char *GetCacheName() const override;\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, right after SetHasBeenWon(bool won), implement:\n' +
      '/**\n * @brief Retrieves the cache name for vehicle caching.\n * @return String literal "GRaceStatus".\n */\n' +
      'const char *GRaceStatus::GetCacheName() const {\n    return "GRaceStatus";\n}\n' +
      '(lis r3, lbl_803EC33C@ha; addi r3, r3, lbl_803EC33C@l; blr, 12 bytes).',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'GRacerInfo::ChallengeComplete',
    symbol: 'ChallengeComplete__10GRacerInfo',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b16-gracerinfo-challengecomplete',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    virtual_address: '0x801A25B8',
    size_bytes: 12,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.h, ensure GRacerInfo public declaration:\n' +
      '    void ChallengeComplete();\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, implement:\n' +
      '/**\n * @brief Marks this racer\'s challenge as complete.\n */\n' +
      'void GRacerInfo::ChallengeComplete() {\n    this->mChallengeComplete = true;\n}\n' +
      '(li r0, 1; stw r0, 0x2c(r3); blr, 12 bytes).',
  },
  {
    demangled: 'GRacerInfo::SetName',
    symbol: 'SetName__10GRacerInfoPCc',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b16-gracerinfo-setname',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    virtual_address: '0x801A26C8',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.h, ensure GRacerInfo public declaration has const char *:\n' +
      '    void SetName(const char *name);\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, implement:\n' +
      '/**\n * @brief Sets the name for this racer.\n * @param name Pointer to racer name string.\n */\n' +
      'void GRacerInfo::SetName(const char *name) {\n    this->mName = name;\n}\n' +
      '(stw r4, 8(r3); blr, 8 bytes).',
  },
]

const CANDIDATES_PAIR3 = [
  {
    demangled: 'GRacerInfo::SetRanking',
    symbol: 'SetRanking__10GRacerInfoi',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b16-gracerinfo-setranking',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    virtual_address: '0x801A26D0',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.h, ensure GRacerInfo public declaration:\n' +
      '    void SetRanking(int ranking);\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, implement:\n' +
      '/**\n * @brief Sets the ranking for this racer.\n * @param ranking Racer ranking value.\n */\n' +
      'void GRacerInfo::SetRanking(int ranking) {\n    this->mRanking = ranking;\n}\n' +
      '(stw r4, 0x10(r3); blr, 8 bytes).',
  },
  {
    demangled: 'GRacerInfo::SetIndex',
    symbol: 'SetIndex__10GRacerInfoi',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b16-gracerinfo-setindex',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    virtual_address: '0x801A2708',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.h, ensure GRacerInfo public declaration:\n' +
      '    void SetIndex(int index);\n\n' +
      'In src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp, implement:\n' +
      '/**\n * @brief Sets the index for this racer.\n * @param index Racer index.\n */\n' +
      'void GRacerInfo::SetIndex(int index) {\n    this->mIndex = index;\n}\n' +
      '(stw r4, 0xc(r3); blr, 8 bytes).',
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
    `   DO NOT modify docs/decompiled_functions.md or other doc files in this worktree (doc updates are handled centrally on main during merge).\n` +
    `4. GREEN PHASE: Verify matching & regressions:\n` +
    `   ninja build/GOWE69/src/Speed/Indep/SourceLists/zGameplay.o\n` +
    `   python3 tools/decomp-diff.py -u ${candidate.unit} -d ${candidate.symbol}\n` +
    `   ninja changes  # MUST report 0 regressions against baseline\n\n` +
    `5. COMMIT:\n` +
    `   git add ${candidate.source_file} ${candidate.header_file}\n` +
    `   git commit -m "match(${candidate.unit.split('/').pop()}): decompile ${candidate.demangled} (100.0%)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n` +
    `Return JSON matching schema with success=true, match_percentage, etc.`
  )
}

// ----------------------------------------------------
// PHASE 1: PAIR 1 DECOMPILATION (2 parallel agents)
// ----------------------------------------------------
phase('Decomp-1')
log('Phase 1: Starting decompilation of Pair 1 (GetBin & GetCacheName)')
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
log('Phase 2: Starting decompilation of Pair 2 (ChallengeComplete & SetName)')
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
log('Phase 3: Starting decompilation of Pair 3 (SetRanking & SetIndex)')
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

log(`Batch 16 decompilation completed. Results: ${JSON.stringify(allDecompResults)}`)

return {
  candidates: allCandidates,
  results: allDecompResults,
}
