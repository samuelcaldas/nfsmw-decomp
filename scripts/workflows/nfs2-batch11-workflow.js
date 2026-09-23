export const meta = {
  name: 'nfs2-batch11-decomp',
  description: 'Batch 11 decompilation for @nfs2 units: EAXTunerCar::UpdateRotation (zEAXSound), FEPackageCommand::~FEPackageCommand (zFEng), fDeterminant (zBWare), CarRenderInfo::UpdateLightStateTextures (zWorld)',
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
    demangled: 'EAXTunerCar::UpdateRotation',
    symbol: 'UpdateRotation__11EAXTunerCar',
    unit: 'main/Speed/Indep/SourceLists/zEAXSound',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEAXSound.o',
    size: 40,
    match: 80.0,
    source_file: 'src/Speed/Indep/Src/EAXSound/EAXTunerCar.cpp',
    virtual_address: '0x800AE864',
    signature: 'int EAXTunerCar::UpdateRotation()',
    description: 'Updates vehicle sound engine rotation state and bounds it to 1024 (0x400).',
    hint: 'Currently 80.0% match (40 bytes). The assembly differs by exactly one instruction scheduling order: stw r0, 0xc0(r11) must emit AFTER mr r3, r9 rather than before it. Adjust local variable sequencing and compiler barrier so mr r3, r9 occurs before stw r0, 0xc0(r11) to reach 100.0%.',
  },
  {
    demangled: 'FEPackageCommand::~FEPackageCommand',
    symbol: '_._16FEPackageCommand',
    diff_filter: 'FEPackageCommand',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 32,
    match: 50.0,
    source_file: 'src/Speed/Indep/Src/FEng/FEngine.h',
    virtual_address: '0x80190DB4',
    signature: 'FEPackageCommand::~FEPackageCommand()',
    description: 'Destructor for frontend package command nodes.',
    hint: 'Currently 50.0% match (32 bytes). In FEngine.h, the destructor emits virtual table store instructions (lis r9, vtable; stw r9, 8(r11)) before calling FENode::~FENode, whereas the target binary directly calls FENode::~FENode without assigning the vtable pointer. Inspect destructor virtual qualification or inline non-virtual destructor pattern to achieve 100.0%.',
  },
  {
    demangled: 'fDeterminant',
    symbol: 'fDeterminant__FP8bMatrix4',
    diff_filter: 'fDeterminant',
    unit: 'main/Speed/Indep/SourceLists/zBWare',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zBWare.o',
    size: 448,
    match: 69.0,
    source_file: 'src/Speed/Indep/bWare/Src/bMatrix.cpp',
    virtual_address: '0x8005D604',
    signature: 'float fDeterminant(bMatrix4 *m)',
    description: 'Calculates the 4x4 matrix determinant using 2x2 and 3x3 cofactors and paired-single SIMD optimizations.',
    hint: 'Currently 69.0% match (448 bytes). Stack frame size is currently 0x68 saving f20-f31, but the target binary stack frame is 0x60 saving f21-f31 (11 registers). Reorder the calculation of 2x2 sub-determinants and temporary variables to reduce register pressure so f20 is not spilled, aligning with the 0x60 frame and pushing match >90%.',
  },
  {
    demangled: 'CarRenderInfo::UpdateLightStateTextures',
    symbol: 'UpdateLightStateTextures__13CarRenderInfo',
    diff_filter: 'UpdateLightStateTextures',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld.o',
    size: 1068,
    match: 96.2,
    source_file: 'src/Speed/Indep/Src/World/CarRender.cpp',
    virtual_address: '0x802CAA44',
    signature: 'void CarRenderInfo::UpdateLightStateTextures()',
    description: 'Updates headlight, taillight, and brakelight texture hashes and replacement tables.',
    hint: 'Currently 96.2% match (1068 bytes). The compiled code accesses ReplaceHeadlightHash[1] via direct offset 0x15cc(r3), whereas target uses indexed load (slwi r8, r8, 2; lwzx r7, r11, r8) via variable indexing (e.g. state = lights_always_on ? 1 : 0). Adjust the local variable index to retain variable indexing rather than constant folding to hit 100.0%.',
  },
]

log('Starting Batch 11 parallel decomp for ' + CANDIDATES.length + ' candidates across @nfs2 units')

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
    '## Step 1 — Inspect current diff\n' +
    'Run:\n' +
    '  python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + (c.diff_filter || c.demangled) + '"\n\n' +
    '## Step 2 — Read source\n' +
    'Read ' + c.source_file + ' and locate the function implementation.\n\n' +
    '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
    'For each round:\n' +
    'a. Inspect the diff:\n' +
    '     python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + (c.diff_filter || c.demangled) + '"\n' +
    'b. Identify mismatch patterns and adjust C++ code:\n' +
    '   - Register allocation differences (order of local variables, caching in locals)\n' +
    '   - Instruction scheduling (order of operations or temporary assignments)\n' +
    '   - Stack frame sizing (reduce temporaries to avoid extra register saves)\n' +
    '   - Array indexing vs direct offsets\n' +
    'c. Compile unit: ninja ' + c.unit_obj + '\n' +
    'd. Check new match percentage with tools/decomp-diff.py\n\n' +
    'Stop when you reach 100.0% match OR have exhausted 8 rounds.\n\n' +
    '## Step 4 — Docstring\n' +
    'Ensure the function has a clear Doxygen docstring:\n' +
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
    '   git commit -m "docs: document Batch 11 decompiled functions (@nfs2)\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n' +
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
