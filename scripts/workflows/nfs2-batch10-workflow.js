export const meta = {
  name: 'nfs2-batch10-decomp',
  description: 'Batch 10 decompilation for @nfs2 units: bASin (zBWare), FEPackageReader::ReadObjectChunk (zFEng), SFXCTL_Physics::UpdateMixerOutputs (zEAXSound), CarLoader::SetMemoryPoolSize (zWorld)',
  phases: [
    { title: 'Decomp', detail: 'Parallel decompilation workers in isolated worktrees' },
    { title: 'Merge', detail: 'Sequential merge of completed branches into main' },
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

const CANDIDATES = [
  {
    demangled: 'bASin',
    symbol: 'bASin__Ff',
    unit: 'main/Speed/Indep/SourceLists/zBWare',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zBWare.o',
    size: 336,
    match: 92.32,
    source_file: 'src/Speed/Indep/bWare/Src/bMath.cpp',
    virtual_address: '0x8005D0A0',
    signature: 'bAngle bASin(float x)',
    description: 'Fast arcsine function using binary search, table lookup, and linear interpolation.',
    hint: 'Currently 92.3% match. In bMath.cpp, differences are register allocation between r8 and r10 and temporary variable order. Align register assignments and loop counter to reach 100.0%.',
  },
  {
    demangled: 'FEPackageReader::ReadObjectChunk',
    symbol: 'ReadObjectChunk__15FEPackageReader',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 964,
    match: 96.67,
    source_file: 'src/Speed/Indep/Src/FEng/FEPackageReader.cpp',
    virtual_address: '0x8018C1B0',
    signature: 'bool FEPackageReader::ReadObjectChunk()',
    description: 'Parses frontend object chunks, button mappings, message responses, and hierarchy nodes.',
    hint: 'Currently 96.7% match. In FEPackageReader.cpp, differences are register allocation and endian swap macro expansion order. Adjust temporary variables in chunk iteration to reach 100.0%.',
  },
  {
    demangled: 'SFXCTL_Physics::UpdateMixerOutputs',
    symbol: 'UpdateMixerOutputs__14SFXCTL_Physics',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound.o',
    size: 1212,
    match: 98.22,
    source_file: 'src/Speed/Indep/Src/EAXSound/sfxctl/SFXCTL_Physics.cpp',
    virtual_address: '0x800BFFC8',
    signature: 'void SFXCTL_Physics::UpdateMixerOutputs()',
    description: 'Calculates physics audio mixer levels, vehicle velocities, and Doppler volume scaling.',
    hint: 'Currently 98.2% match. Differences are inlined magnitude calculations where float 0.0f constant register allocation differs. Align local variable order for Doppler scaling.',
  },
  {
    demangled: 'CarLoader::SetMemoryPoolSize',
    symbol: 'SetMemoryPoolSize__9CarLoaderi',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld.o',
    size: 304,
    match: 97.37,
    source_file: 'src/Speed/Indep/Src/World/CarLoader.cpp',
    virtual_address: '0x802DD360',
    signature: 'void CarLoader::SetMemoryPoolSize(int size)',
    description: 'Allocates, sizes, and initializes the dedicated dynamic memory pool for vehicle models and textures.',
    hint: 'Currently 97.4% match. The only difference is instruction order around stw r0, CarLoaderMemoryPoolNumber and bInitMemoryPool call. Move the assignment right before the call to hit 100.0%.',
  },
]

log('Starting Batch 10 parallel decomp for ' + CANDIDATES.length + ' candidates across @nfs2 units')

phase('Decomp')
const decompResults = await parallel(CANDIDATES.map((c) => () =>
  agent(
    'You are a GOWE69 decompilation specialist. Your worktree is already set up — work in it directly.\n\n' +
    'ASSIGNED FUNCTION:\n' +
    '  Demangled: ' + c.demangled + '\n' +
    '  Symbol (mangled): ' + c.symbol + '\n' +
    '  Unit: ' + c.unit + '\n' +
    '  Unit Object: ' + c.unit_obj + '\n' +
    '  Current match: ' + c.match + '%\n' +
    '  Size: ' + c.size + ' bytes\n' +
    '  Source file: ' + c.source_file + '\n' +
    '  Hint: ' + c.hint + '\n\n' +
    'WORKFLOW (follow exactly):\n\n' +
    '## Step 0 — Setup environment\n' +
    'Run:\n' +
    '  mkdir -p build orig/GOWE69 && \\\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/compilers build/compilers && \\\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/ppc_binutils build/ppc_binutils && \\\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/build/tools build/tools && \\\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/orig/GOWE69/NFSMWRELEASE.ELF orig/GOWE69/NFSMWRELEASE.ELF && \\\n' +
    '  ln -sfn /home/samuelcaldas/repos/nfsmw/orig/GOWE69/sys orig/GOWE69/sys && \\\n' +
    '  python3 configure.py\n\n' +
    '## Step 1 — Understand context\n' +
    'Run:\n' +
    '  python3 tools/decomp-context.py -u "' + c.unit + '" -f "' + c.symbol + '" --no-ghidra\n\n' +
    '## Step 2 — Read source\n' +
    'Read ' + c.source_file + ' and locate the function implementation.\n\n' +
    '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
    'For each round:\n' +
    'a. Inspect the diff:\n' +
    '     python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'b. Identify mismatch patterns and adjust C++ code:\n' +
    '   - Register allocation differences (order of local variables, caching in locals)\n' +
    '   - Instruction scheduling (order of operations or temporary assignments)\n' +
    '   - Type signedness and explicit casts\n' +
    '   - Dead-code avoidance or volatile memory barriers\n' +
    'c. Compile unit: ninja ' + c.unit_obj + '\n' +
    'd. Check new match percentage with tools/decomp-diff.py\n\n' +
    'Stop when you reach 100.0% match OR have exhausted 8 rounds.\n\n' +
    '## Step 4 — Docstring\n' +
    'Ensure the function has a Doxygen docstring:\n' +
    '  /**\n' +
    '   * @brief <summary>.\n' +
    '   */\n\n' +
    '## Step 5 — Regression check\n' +
    '  ninja ' + c.unit_obj + '\n' +
    'If errors: git restore . and report failure.\n\n' +
    '## Step 6 — Commit (only if clean and match improved or maintained)\n' +
    '  git add -u\n' +
    '  git commit -m "match: ' + c.demangled + ' (' + c.unit + ')\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
    '## Step 7 — Report\n' +
    'Get branch: git rev-parse --abbrev-ref HEAD\n\n' +
    'Return structured result with all required fields.',
    {
      phase: 'Decomp',
      label: 'decomp:' + c.demangled.replace(/.*::/, '').slice(0, 20),
      schema: DECOMP_SCHEMA,
      isolation: 'worktree',
      agentType: 'decomp-worker',
    }
  )
))

const succeeded = decompResults.filter(Boolean).filter(r => r.success)
const failed = decompResults.filter(Boolean).filter(r => !r.success)
log('Decomp done: ' + succeeded.length + ' succeeded, ' + failed.length + ' failed')
for (const f of failed) {
  log('  FAILED: ' + f.function_name + ' — ' + (f.notes || 'no notes'))
}

phase('Merge')
const mergedFunctions = []
for (const result of succeeded) {
  log('Merging: ' + result.function_name + ' from branch ' + result.branch_name)
  const mr = await agent(
    'Merge a completed decompilation branch into main. Do this carefully and sequentially.\n\n' +
    'Branch: ' + result.branch_name + '\n' +
    'Function: ' + result.function_name + '\n' +
    'Unit: ' + result.unit + '\n\n' +
    'CRITICAL: Git worktree lock rules apply. Execute all commands in the main repository root:\n' +
    'Steps:\n' +
    '1. cd /home/samuelcaldas/repos/nfsmw\n' +
    '2. git fetch origin\n' +
    '3. git pull --rebase origin main\n' +
    '4. git merge --no-ff ' + result.branch_name + '\n' +
    '   (If conflict: resolve by keeping the decompiled version, then: git add -A && git merge --continue)\n' +
    '5. ninja -j2 (verify build passes)\n' +
    '6. ninja changes (verify no regressions)\n' +
    '7. If clean:\n' +
    '   - git push origin main\n' +
    '   - git branch -d ' + result.branch_name + ' || true\n' +
    '   - Report success with merge commit: git rev-parse HEAD\n' +
    '8. If regressions:\n' +
    '   - git reset --hard HEAD^\n' +
    '   - Report failure with details\n\n' +
    'Return: success, function_name, merge_commit, notes',
    {
      phase: 'Merge',
      label: 'merge:' + result.function_name.replace(/.*::/, '').slice(0, 20),
      schema: MERGE_SCHEMA,
    }
  )
  if (mr && mr.success) {
    mergedFunctions.push({ ...result, merge_commit: mr.merge_commit })
    log('  Merged: ' + result.function_name)
  } else {
    log('  Merge FAILED: ' + result.function_name + ' — ' + (mr ? mr.notes : 'null'))
  }
}

log('Merged ' + mergedFunctions.length + ' functions into main')

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
    'Update decompilation documentation for newly merged functions.\n\n' +
    'Merged functions this batch:\n' + fnList + '\n\n' +
    'Tasks:\n' +
    '1. cd /home/samuelcaldas/repos/nfsmw\n' +
    '2. git fetch origin\n' +
    '3. git pull --rebase origin main\n' +
    '4. Read docs/decompiled_functions.md\n' +
    '5. For each function, add or update an entry in the appropriate ## section.\n' +
    '   Follow the EXACT style of existing entries:\n' +
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
    '6. Read docs/decompilation_status_ledger.md\n' +
    '7. Update section 1 to record each function as [Completed & Merged].\n\n' +
    '8. Commit and push:\n' +
    '   git add docs/decompiled_functions.md docs/decompilation_status_ledger.md\n' +
    '   git commit -m "docs: document Batch 10 decompiled functions (@nfs2)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n' +
    '   git pull --rebase origin main\n' +
    '   git push origin main',
    {
      phase: 'Docs',
      label: 'docs:update',
    }
  )
}

return {
  batch_candidates: CANDIDATES.length,
  succeeded: succeeded.length,
  failed: failed.length,
  merged: mergedFunctions.length,
  functions: mergedFunctions.map(r => r.function_name),
}
