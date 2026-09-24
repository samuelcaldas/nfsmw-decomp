export const meta = {
  name: 'nfs4-batch14-decomp',
  description: 'Batch 14 parallel decompilation for nfs4 (zGameplay): GRaceDatabase::SimulateDDayComplete, GRaceDatabase::GetBinCount, GRaceParameters::GetGameplayObj, GRaceParameters::GetChildVault, GRaceParameters::GetParentVault, GRaceDatabase::GetRaceCount',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GRaceDatabase::SimulateDDayComplete & GRaceDatabase::GetBinCount' },
    { title: 'Decomp-2', detail: 'Pair 2: GRaceParameters::GetGameplayObj & GRaceParameters::GetChildVault' },
    { title: 'Decomp-3', detail: 'Pair 3: GRaceParameters::GetParentVault & GRaceDatabase::GetRaceCount' },
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
    demangled: 'GRaceDatabase::SimulateDDayComplete',
    symbol: 'SimulateDDayComplete__13GRaceDatabase',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b14-gracedatabase-simulateddaycomplete',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A9CBC',
    size_bytes: 4,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Simulates D-Day completion in the database.\n */\n' +
      'void GRaceDatabase::SimulateDDayComplete() {\n}\n' +
      '(empty function body, compiles to `blr`, 4 bytes).',
  },
  {
    demangled: 'GRaceDatabase::GetBinCount',
    symbol: 'GetBinCount__13GRaceDatabase',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b14-gracedatabase-getbincount',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A43D4',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Retrieves the number of race bins in the database.\n * @return Number of race bins.\n */\n' +
      'unsigned int GRaceDatabase::GetBinCount() {\n    return this->mBinCount;\n}\n' +
      '(loads word at offset 0x20: lwz r3, 0x20(r3); blr, 8 bytes).',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'GRaceParameters::GetGameplayObj',
    symbol: 'GetGameplayObj__C15GRaceParameters',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b14-graceparameters-getgameplayobj',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A6EB0',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Retrieves the gameplay attribute object for this race parameter set.\n * @return Pointer to gameplay attribute object.\n */\n' +
      'const Attrib::Gen::gameplay *GRaceParameters::GetGameplayObj() const {\n    return this->mRaceRecord;\n}\n' +
      '(loads word at offset 0x4: lwz r3, 4(r3); blr, 8 bytes).',
  },
  {
    demangled: 'GRaceParameters::GetChildVault',
    symbol: 'GetChildVault__C15GRaceParameters',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b14-graceparameters-getchildvault',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A6EDC',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Retrieves the child vault associated with these race parameters.\n * @return Pointer to the child vault.\n */\n' +
      'GVault *GRaceParameters::GetChildVault() const {\n    return this->mChildVault;\n}\n' +
      '(loads word at offset 0xc: lwz r3, 0xc(r3); blr, 8 bytes).',
  },
]

const CANDIDATES_PAIR3 = [
  {
    demangled: 'GRaceParameters::GetParentVault',
    symbol: 'GetParentVault__C15GRaceParameters',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b14-graceparameters-getparentvault',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A6EE4',
    size_bytes: 8,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Retrieves the parent vault associated with these race parameters.\n * @return Pointer to the parent vault.\n */\n' +
      'GVault *GRaceParameters::GetParentVault() const {\n    return this->mParentVault;\n}\n' +
      '(loads word at offset 0x8: lwz r3, 8(r3); blr, 8 bytes).',
  },
  {
    demangled: 'GRaceDatabase::GetRaceCount',
    symbol: 'GetRaceCount__13GRaceDatabase',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b14-gracedatabase-getracecount',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.h',
    virtual_address: '0x801A4278',
    size_bytes: 16,
    extra_instructions:
      'In src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp, implement:\n' +
      '/**\n * @brief Retrieves the total count of races across static and dynamic records.\n * @return Total count of races.\n */\n' +
      'unsigned int GRaceDatabase::GetRaceCount() {\n    return this->mRaceCountStatic + this->mRaceCountDynamic;\n}\n' +
      '(loads mRaceCountDynamic at 0x4, mRaceCountStatic at 0x0, adds them, and blr: lwz r0, 4(r3); lwz r3, 0(r3); add r3, r3, r0; blr, 16 bytes).',
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

// ----------------------------------------------------
// PHASE 1: PAIR 1 DECOMPILATION (2 parallel agents)
// ----------------------------------------------------
phase('Decomp-1')
log('Phase 1: Starting decompilation of Pair 1 (SimulateDDayComplete & GetBinCount)')
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
log('Phase 2: Starting decompilation of Pair 2 (GetGameplayObj & GetChildVault)')
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
log('Phase 3: Starting decompilation of Pair 3 (GetParentVault & GetRaceCount)')
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

log(`Decompilation completed. Results: ${JSON.stringify(allDecompResults)}`)

return {
  candidates: allCandidates,
  results: allDecompResults,
}
