export const meta = {
  name: 'nfs4-batch17-decomp',
  description: 'Batch 17 parallel decompilation for nfs4 (zGameplay): GVault::IsResident, GVault::IsTransient, GVault::IsRaceBin, GVault::SetRaceBin, GManager::GetMilestone, GManager::GetSpeedTrap',
  phases: [
    { title: 'Decomp-Parallel', detail: 'Parallel decompilation of GVault group and GManager group in dedicated worktrees' },
  ],
}

const DECOMP_SCHEMA = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    group_name: { type: 'string' },
    unit: { type: 'string' },
    branch_name: { type: 'string' },
    all_matched: { type: 'boolean' },
    decompiled_functions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          demangled: { type: 'string' },
          symbol: { type: 'string' },
          match_percentage: { type: 'number' },
          size_bytes: { type: 'number' },
          virtual_address: { type: 'string' },
        },
        required: ['demangled', 'symbol', 'match_percentage'],
      },
    },
    notes: { type: 'string' },
  },
  required: ['success', 'group_name', 'unit', 'branch_name', 'all_matched'],
}

const WORKERS = [
  {
    group_name: 'GVault Group',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b17-gvault',
    source_file: 'src/Speed/Indep/Src/Gameplay/GVault.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GVault.h',
    instructions:
      'In src/Speed/Indep/Src/Gameplay/GVault.cpp, right after GetLoadDataSize() (at end of file), implement:\n\n' +
      '/**\n' +
      ' * @brief Reports whether the vault is resident.\n' +
      ' * @return True if resident; otherwise false.\n' +
      ' */\n' +
      'bool GVault::IsResident() const {\n' +
      '    return (this->mFlags & 1) != 0;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Reports whether the vault is transient.\n' +
      ' * @return True if transient; otherwise false.\n' +
      ' */\n' +
      'bool GVault::IsTransient() const {\n' +
      '    return (this->mFlags & 1) == 0;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Reports whether the vault is a race bin.\n' +
      ' * @return True if race bin; otherwise false.\n' +
      ' */\n' +
      'bool GVault::IsRaceBin() const {\n' +
      '    return (this->mFlags & 2) != 0;\n' +
      '}\n\n' +
      '/**\n' +
      ' * @brief Sets the race bin flag on the vault.\n' +
      ' */\n' +
      'void GVault::SetRaceBin() {\n' +
      '    this->mFlags |= 2;\n' +
      '}\n\n' +
      'NOTE: If IsTransient generates slightly different code with (this->mFlags & 1) == 0, try !(this->mFlags & 1) or (this->mFlags ^ 1) & 1 to achieve exact match with xori r3, r3, 1; clrlwi r3, r3, 31.\n' +
      'Verify all 4 symbols with decomp-diff.py:\n' +
      '- IsResident__C6GVault (0x801B3FC0, 12B)\n' +
      '- IsTransient__C6GVault (0x801B3FCC, 16B)\n' +
      '- IsRaceBin__C6GVault (0x801B3FDC, 12B)\n' +
      '- SetRaceBin__6GVault (0x801B3FE8, 16B)\n',
    symbols: [
      { demangled: 'GVault::IsResident', symbol: 'IsResident__C6GVault', size: 12, addr: '0x801B3FC0' },
      { demangled: 'GVault::IsTransient', symbol: 'IsTransient__C6GVault', size: 16, addr: '0x801B3FCC' },
      { demangled: 'GVault::IsRaceBin', symbol: 'IsRaceBin__C6GVault', size: 12, addr: '0x801B3FDC' },
      { demangled: 'GVault::SetRaceBin', symbol: 'SetRaceBin__6GVault', size: 16, addr: '0x801B3FE8' },
    ],
  },
  {
    group_name: 'GManager Group',
    unit: 'main/Speed/Indep/SourceLists/zGameplay',
    branch_name: 'nfs4-b17-gmanager',
    source_file: 'src/Speed/Indep/Src/Gameplay/GManager.cpp',
    header_file: 'src/Speed/Indep/Src/Gameplay/GManager.h',
    instructions:
      'In src/Speed/Indep/Src/Gameplay/GManager.cpp:\n' +
      'Directly after GetNumMilestones() (around line 18), implement:\n' +
      '/**\n' +
      ' * @brief Retrieves the milestone at the specified index.\n' +
      ' * @param index Zero-based index of the milestone.\n' +
      ' * @return Pointer to the milestone record.\n' +
      ' */\n' +
      'GMilestone *GManager::GetMilestone(unsigned int index) {\n' +
      '    return &this->mMilestones[index];\n' +
      '}\n\n' +
      'Directly after GetNumSpeedTraps() (around line 30), implement:\n' +
      '/**\n' +
      ' * @brief Retrieves the speed trap at the specified index.\n' +
      ' * @param index Zero-based index of the speed trap.\n' +
      ' * @return Pointer to the speed trap record.\n' +
      ' */\n' +
      'GSpeedTrap *GManager::GetSpeedTrap(unsigned int index) {\n' +
      '    return &this->mSpeedTraps[index];\n' +
      '}\n\n' +
      'Verify both symbols with decomp-diff.py:\n' +
      '- GetMilestone__8GManagerUi (0x801AFE84, 16B)\n' +
      '- GetSpeedTrap__8GManagerUi (0x801B00B4, 16B)\n',
    symbols: [
      { demangled: 'GManager::GetMilestone', symbol: 'GetMilestone__8GManagerUi', size: 16, addr: '0x801AFE84' },
      { demangled: 'GManager::GetSpeedTrap', symbol: 'GetSpeedTrap__8GManagerUi', size: 16, addr: '0x801B00B4' },
    ],
  },
]

function makePrompt(worker) {
  return (
    `Your assignment is to decompile the ${worker.group_name} in ${worker.unit} to 100.0% binary parity.\n\n` +
    `CRITICAL WORKTREE & BUILD RULES:\n` +
    `1. Create and switch to your dedicated git worktree from repo root (/home/samuelcaldas/source/repos/nfsmw):\n` +
    `   git worktree add .worktrees/${worker.branch_name} -b ${worker.branch_name}\n` +
    `   cd .worktrees/${worker.branch_name}\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/orig orig\n` +
    `   mkdir -p build\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers\n` +
    `   ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n` +
    `   python3 configure.py\n` +
    `   mkdir -p build/GOWE69 && cp /home/samuelcaldas/source/repos/nfsmw/build/GOWE69/baseline.json build/GOWE69/baseline.json 2>/dev/null || true\n` +
    `   ninja build/GOWE69/src/Speed/Indep/SourceLists/zGameplay.o\n\n` +
    `TDD CYCLE:\n` +
    `2. RED PHASE: Verify current diffs for all symbols:\n` +
    worker.symbols.map(s => `   python3 tools/decomp-diff.py -u ${worker.unit} -d ${s.symbol}`).join('\n') + '\n' +
    `3. IMPLEMENTATION:\n` +
    `   Target file: ${worker.source_file}\n` +
    `   ${worker.instructions}\n` +
    `   DO NOT modify docs/ or markdown files in this worktree (doc updates are handled centrally on main during merge).\n\n` +
    `4. GREEN PHASE: Verify matching & regressions:\n` +
    `   ninja build/GOWE69/src/Speed/Indep/SourceLists/zGameplay.o\n` +
    worker.symbols.map(s => `   python3 tools/decomp-diff.py -u ${worker.unit} -d ${s.symbol}`).join('\n') + '\n' +
    `   ninja changes  # MUST report 0 regressions against baseline\n\n` +
    `5. COMMIT:\n` +
    `   git add ${worker.source_file}\n` +
    `   git commit -m "match(zGameplay): decompile ${worker.group_name} functions (100.0%)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n` +
    `Return JSON matching schema with success=true, all_matched=true, and the list of decompiled functions.`
  )
}

phase('Decomp-Parallel')
log('Phase: Starting parallel decompilation of GVault group and GManager group')
const results = await parallel(
  WORKERS.map(worker => () =>
    agent(makePrompt(worker), {
      phase: 'Decomp-Parallel',
      label: `decomp:${worker.branch_name}`,
      agentType: 'decomp-worker',
      schema: DECOMP_SCHEMA,
    })
  )
)

return { results }
