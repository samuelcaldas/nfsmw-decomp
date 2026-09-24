export const meta = {
  name: 'nfs4-batch12-decomp',
  description: 'Batch 12 parallel decompilation for nfs4 (zGameplay): GCharacter::GetSpawnedVehicle, GRaceCustom::GetRaceActivity, GRaceCustom::SetReversed, GRaceCustom::SetNumOpponents, GMarker::GetType, GTrigger::GetType',
  phases: [
    { title: 'Decomp-1', detail: 'Pair 1: GCharacter::GetSpawnedVehicle & GRaceCustom::GetRaceActivity' },
    { title: 'Decomp-2', detail: 'Pair 2: GRaceCustom::SetReversed & GRaceCustom::SetNumOpponents' },
    { title: 'Decomp-3', detail: 'Pair 3: GMarker::GetType & GTrigger::GetType' },
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
    demangled: 'GCharacter::GetSpawnedVehicle',
    symbol: 'GetSpawnedVehicle__C10GCharacter',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b12-gchar-getspawnedvehicle',
    source_file: 'src/Speed/Indep/Src/Gameplay/GCharacter.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GCharacter.h',
    line: 462,
    extra_instructions: 'Original line: GCharacter.cpp line 462. Implement IVehicle *GCharacter::GetSpawnedVehicle() const { return this->mVehicle; }. Add concise Doxygen docstring.',
  },
  {
    demangled: 'GRaceCustom::GetRaceActivity',
    symbol: 'GetRaceActivity__C11GRaceCustom',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b12-gracecustom-getraceactivity',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    line: 1815,
    extra_instructions: 'Original line: GRaceDatabase.cpp line 1815. In GRaceDatabase.cpp, implement GActivity *GRaceCustom::GetRaceActivity() const { return this->mActivity; } (loads pointer at offset 0x14: lwz r3, 0x14(r3); blr). Check member names in GRaceStatus.h/GRaceParameters. Add concise Doxygen docstring.',
  },
]

const CANDIDATES_PAIR2 = [
  {
    demangled: 'GRaceCustom::SetReversed',
    symbol: 'SetReversed__11GRaceCustomb',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b12-gracecustom-setreversed',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    line: 1862,
    extra_instructions: 'Original line: GRaceDatabase.cpp line 1862. In GRaceDatabase.cpp, implement void GRaceCustom::SetReversed(bool isReverseDir) { this->mDirection = isReverseDir; } (stores r4 to offset 0x1c: stw r4, 0x1c(r3); blr). Check member names in GRaceStatus.h/GRaceParameters. Add concise Doxygen docstring.',
  },
  {
    demangled: 'GRaceCustom::SetNumOpponents',
    symbol: 'SetNumOpponents__11GRaceCustomi',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b12-gracecustom-setnumopponents',
    source_file: 'src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GRaceStatus.h',
    line: 1897,
    extra_instructions: 'Original line: GRaceDatabase.cpp line 1897. In GRaceDatabase.cpp, implement void GRaceCustom::SetNumOpponents(int numOpponents) { this->mNumOpponents = numOpponents; } (stores r4 to offset 0x18: stw r4, 0x18(r3); blr). Check member names in GRaceStatus.h/GRaceParameters. Add concise Doxygen docstring.',
  },
]

const CANDIDATES_PAIR3 = [
  {
    demangled: 'GMarker::GetType',
    symbol: 'GetType__C7GMarker',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b12-gmarker-gettype',
    source_file: 'src/Speed/Indep/Src/Gameplay/GMarker.h',
    header_file: 'src/Speed/Indep/Src/Gameplay/GMarker.h',
    line: 20,
    extra_instructions: 'Original line: GMarker.h line 20. In GMarker.h, implement unsigned int (or GRuntimeInstance::Type) GetType() const override { return 3; } (loads immediate 3: li r3, 3; blr). Add concise Doxygen docstring.',
  },
  {
    demangled: 'GTrigger::GetType',
    symbol: 'GetType__C8GTrigger',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b12-gtrigger-gettype',
    source_file: 'src/Speed/Indep/Src/Gameplay/GTrigger.h',
    header_file: 'src/Speed/Indep/Src/Gameplay/GTrigger.h',
    line: 35,
    extra_instructions: 'Original line: GTrigger.h line 35. In GTrigger.h, implement unsigned int (or GRuntimeInstance::Type) GetType() const override { return 5; } (loads immediate 5: li r3, 5; blr). Add concise Doxygen docstring.',
  },
]

function makeDecompPrompt(candidate) {
  return (
    `Your assignment is to decompile ${candidate.demangled} (${candidate.symbol}) in ${candidate.unit} to 100.0% binary parity.\n\n` +
    `CRITICAL WORKTREE & BUILD RULES:\n` +
    `1. Create and switch to your dedicated git worktree:\n` +
    `   git worktree add .worktrees/${candidate.branch_name} -b ${candidate.branch_name}\n` +
    `   cd .worktrees/${candidate.branch_name}\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/orig orig\n` +
    `   mkdir -p build\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n` +
    `   python3 configure.py\n` +
    `   ninja\n\n` +
    `TDD CYCLE:\n` +
    `2. RED PHASE: Verify current diff:\n` +
    `   python3 tools/decomp-diff.py -u ${candidate.unit} -d ${candidate.symbol}\n` +
    `3. IMPLEMENTATION:\n` +
    `   Target file: ${candidate.source_file}\n` +
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
log('Phase 1: Starting decompilation of Pair 1 (GCharacter::GetSpawnedVehicle & GRaceCustom::GetRaceActivity)')
const resultsPair1 = await parallel(
  CANDIDATES_PAIR1.map(cand => () =>
    agent(makeDecompPrompt(cand), {
      phase: 'Decomp-1',
      label: `decomp:${cand.branch_name}`,
      schema: DECOMP_SCHEMA,
    })
  )
)

// ----------------------------------------------------
// PHASE 2: PAIR 2 DECOMPILATION (2 parallel agents)
// ----------------------------------------------------
phase('Decomp-2')
log('Phase 2: Starting decompilation of Pair 2 (GRaceCustom::SetReversed & GRaceCustom::SetNumOpponents)')
const resultsPair2 = await parallel(
  CANDIDATES_PAIR2.map(cand => () =>
    agent(makeDecompPrompt(cand), {
      phase: 'Decomp-2',
      label: `decomp:${cand.branch_name}`,
      schema: DECOMP_SCHEMA,
    })
  )
)

// ----------------------------------------------------
// PHASE 3: PAIR 3 DECOMPILATION (2 parallel agents)
// ----------------------------------------------------
phase('Decomp-3')
log('Phase 3: Starting decompilation of Pair 3 (GMarker::GetType & GTrigger::GetType)')
const resultsPair3 = await parallel(
  CANDIDATES_PAIR3.map(cand => () =>
    agent(makeDecompPrompt(cand), {
      phase: 'Decomp-3',
      label: `decomp:${cand.branch_name}`,
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
  `Update docs/decompiled_functions.md and docs/decompilation_status_ledger.md for Batch 12.\n\n` +
  `Decompiled functions in Batch 12:\n` +
  `1. GCharacter::GetSpawnedVehicle (zGameplay) - 100.0% match\n` +
  `2. GRaceCustom::GetRaceActivity (zGameplay) - 100.0% match\n` +
  `3. GRaceCustom::SetReversed (zGameplay) - 100.0% match\n` +
  `4. GRaceCustom::SetNumOpponents (zGameplay) - 100.0% match\n` +
  `5. GMarker::GetType (zGameplay) - 100.0% match\n` +
  `6. GTrigger::GetType (zGameplay) - 100.0% match\n\n` +
  `STEPS:\n` +
  `1. Read docs/decompiled_functions.md and add technical entries for each decompiled function under Gameplay subsystem.\n` +
  `2. Read docs/decompilation_status_ledger.md and record each function as [Completed & Merged] under Section 1 (Gameplay Subsystem).\n` +
  `3. Commit documentation updates:\n` +
  `   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n` +
  `   git commit -m "docs: document Batch 12 decompiled functions in ledger and specs\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n` +
  `4. Push changes: git pull --rebase origin main && git push origin main\n\n` +
  `Return string summary of updated documentation.`
)

return {
  batch: 12,
  total_candidates: allCandidates.length,
  decomp_successes: successfulCandidates.length,
  merged_count: mergeResults.filter(r => r && r.success).length,
  docs_result: docsResult,
}
