export const meta = {
  name: 'nfsmw-parallel-decomp-batch13-nfs5',
  description: 'Batch 13 parallel decompilation for nfs5 (6 agents): sgetpvol, sstgetpv, zEcstasy, zFEng & zEagl4Anim strictly using decomp-worker (gemini-3.5-flash-lite)',
  phases: [
    { title: 'Decomp-Pool', detail: '6 concurrent worker agents on distinct candidate functions across 5 units' },
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

const CANDIDATES = [
  {
    demangled: 'SNDCTRL_getprogvol',
    symbol: 'SNDCTRL_getprogvol',
    unit: 'main/Speed/Indep/Libs/snd/9/source/library/cmn/sgetpvol',
    unit_obj: 'build/GOWE69/src/Speed/Indep/Libs/snd/9/source/library/cmn/sgetpvol.o',
    size: 148,
    match: 91.5,
    source_file: 'src/Speed/Indep/Libs/snd/9/source/library/cmn/sgetpvol.c',
    virtual_address: '0x803A3190',
    signature: 'int SNDCTRL_getprogvol(int shandle)',
    extra_instructions:
      'Inspect SNDCTRL_getprogvol in src/Speed/Indep/Libs/snd/9/source/library/cmn/sgetpvol.c (lines 3-13).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/Libs/snd/9/source/library/cmn/sgetpvol -d SNDCTRL_getprogvol\n' +
      'Currently at 91.5% match (37 instructions, 148 bytes).\n' +
      'Target rodata has float 127.0f at lbl_80415154. The volume scale converts normalized 0.0-1.0 float to 0-127 MIDI integer volume:\n' +
      '  vol = SNDI_ftoifast(sndgs.chan[voice].programmedVol * 127.0f);\n' +
      'Update the multiplication by 127.0f to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'SNDSTRM_getprogvol',
    symbol: 'SNDSTRM_getprogvol',
    unit: 'main/Speed/Indep/Libs/snd/9/source/library/cmn/sstgetpv',
    unit_obj: 'build/GOWE69/src/Speed/Indep/Libs/snd/9/source/library/cmn/sstgetpv.o',
    size: 152,
    match: 91.7,
    source_file: 'src/Speed/Indep/Libs/snd/9/source/library/cmn/sstgetpv.c',
    virtual_address: '0x803A3224',
    signature: 'int SNDSTRM_getprogvol(int sndstreamhandle)',
    extra_instructions:
      'Inspect SNDSTRM_getprogvol in src/Speed/Indep/Libs/snd/9/source/library/cmn/sstgetpv.c (lines 3-17).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/Libs/snd/9/source/library/cmn/sstgetpv -d SNDSTRM_getprogvol\n' +
      'Currently at 91.7% match (38 instructions, 152 bytes).\n' +
      'Like sgetpvol, line 16 needs multiplication by 127.0f:\n' +
      '  return SNDI_ftoifast(pssc->sourceChannelState[0].vol * 127.0f);\n' +
      'Update the multiplication by 127.0f to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'eInitTextures()',
    symbol: 'eInitTextures__Fv',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEcstasy.o',
    size: 76,
    match: 69.4,
    source_file: 'src/Speed/Indep/Src/Ecstasy/Texture.cpp',
    virtual_address: '0x800FBB2C',
    signature: 'void eInitTextures(void)',
    extra_instructions:
      'Inspect eInitTextures in src/Speed/Indep/Src/Ecstasy/Texture.cpp (lines 38-41).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEcstasy -d eInitTextures__Fv\n' +
      'Currently at 69.4% match (19 instructions, 76 bytes).\n' +
      'Target assembly shows:\n' +
      '  li r3, 0x20\n' +
      '  cmpwi r3, 0x1c\n' +
      '  li r3, 0x1c\n' +
      '  ble 0x72e0\n' +
      '  li r3, 0x20\n' +
      'In original code, size is 32 (0x20) and compared against 28 (0x1c) using bMax(size, 28) or sizeof(TexturePack):\n' +
      '  int size = 32; // or sizeof(TexturePack)\n' +
      '  TexturePackSlotPool = bNewSlotPool(bMax(size, 28), 128, "TexturePackSlotPool", 0);\n' +
      'Adjust variable assignment and arguments to reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'FEMessageResponse::FindConditionBranchTarget(unsigned long) const',
    symbol: 'FindConditionBranchTarget__C17FEMessageResponseUl',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 144,
    match: 63.1,
    source_file: 'src/Speed/Indep/Src/FEng/FEMessageResponse.cpp',
    virtual_address: '0x8018A4F4',
    signature: 'u32 FEMessageResponse::FindConditionBranchTarget(u32 Index) const',
    extra_instructions:
      'Inspect FindConditionBranchTarget in src/Speed/Indep/Src/FEng/FEMessageResponse.cpp (lines 95-119).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d FindConditionBranchTarget__C17FEMessageResponseUl\n' +
      'Currently at 63.1% match (42 instructions, 144 bytes).\n' +
      'Target flow has early exit:\n' +
      '  if (Index == Count - 1) return Count;\n' +
      '  int Nest = 1;\n' +
      '  do {\n' +
      '    Index++;\n' +
      '    switch (pResponseList[Index].ResponseID) {\n' +
      '      case MR_IfScriptEquals:\n' +
      '      case MR_IfScriptNotEquals:\n' +
      '        Nest++;\n' +
      '        break;\n' +
      '      case MR_Else:\n' +
      '        if (Nest == 1) Nest = 0;\n' +
      '        break;\n' +
      '      case MR_EndIf:\n' +
      '        Nest--;\n' +
      '        break;\n' +
      '    }\n' +
      '  } while (Index < Count && Nest != 0);\n' +
      '  return Index;\n' +
      'Refactor control flow to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'FEQuaternion::operator*(FEQuaternion const &)',
    symbol: '__ml__12FEQuaternionRC12FEQuaternion',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 212,
    match: 89.1,
    source_file: 'src/Speed/Indep/Src/FEng/FEMath.h',
    virtual_address: '0x801906F0',
    signature: 'FEQuaternion FEQuaternion::operator*(const FEQuaternion &q1)',
    extra_instructions:
      'Inspect FEQuaternion::operator* in src/Speed/Indep/Src/FEng/FEMath.h (lines 60-67).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d "__ml__12FEQuaternionRC12FEQuaternion"\n' +
      'Currently at 89.1% match (54 instructions, 212 bytes).\n' +
      'Target order computes qRet.w components during the initial loads:\n' +
      '  qRet.w = q1.w * w - (q1.x * x + q1.y * y + q1.z * z);\n' +
      'Adjust statement ordering or intermediate variable expressions to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'EAGL4Anim::MemoryPoolManager::NewBlockAux(unsigned int)',
    symbol: 'NewBlockAux__Q29EAGL4Anim17MemoryPoolManagerUi',
    unit: 'main/Speed/Indep/SourceLists/zEagl4Anim',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEagl4Anim.o',
    size: 84,
    match: 88.57,
    source_file: 'src/Speed/Indep/Src/EAGL4Anim/MemoryPoolManager.cpp',
    virtual_address: '0x80231534',
    signature: 'void *EAGL4Anim::MemoryPoolManager::NewBlockAux(size_t size)',
    extra_instructions:
      'Inspect MemoryPoolManager::NewBlockAux in src/Speed/Indep/Src/EAGL4Anim/MemoryPoolManager.cpp (lines 77-89).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEagl4Anim -d NewBlockAux__Q29EAGL4Anim17MemoryPoolManagerUi\n' +
      'Currently at 88.57% match (22 instructions, 84 bytes).\n' +
      'The diff shows the memory allocation block:\n' +
      '  Target reads gMemoryPoolFree, stores idx at 0(gMemoryPoolFree), re-reads gMemoryPoolFree, adds offset, and computes return value (r3 = gMemoryPoolFree + 4) before storing updated gMemoryPoolFree.\n' +
      'Adjust local variable sequencing to achieve 100.0% PERFECT MATCH!',
  },
]

function makePrompt(c) {
  return (
    'You are a GOWE69 decompilation specialist working in an isolated worktree following TDD principles.\n\n' +
    'ASSIGNED TARGET:\n' +
    '  Demangled: ' + c.demangled + '\n' +
    '  Symbol (mangled): ' + c.symbol + '\n' +
    '  Unit: ' + c.unit + '\n' +
    '  Unit Object: ' + c.unit_obj + '\n' +
    '  Initial match: ' + c.match + '%\n' +
    '  Size: ' + c.size + ' bytes\n' +
    '  Virtual address: ' + (c.virtual_address || 'unknown') + '\n' +
    '  Primary source: ' + c.source_file + '\n' +
    '  Signature: ' + (c.signature || '') + '\n' +
    (c.extra_instructions ? '  Guidance: ' + c.extra_instructions + '\n\n' : '\n') +
    'WORKTREE SETUP & EXECUTION RULES:\n\n' +
    '## Step 0 — Setup environment symlinks & baseline\n' +
    'Run immediately in your worktree root:\n' +
    '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/orig orig\n' +
    '  mkdir -p build/GOWE69\n' +
    '  cp /home/samuelcaldas/source/repos/nfsmw/build/GOWE69/baseline.json build/GOWE69/baseline.json\n' +
    '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/tools build/tools\n' +
    '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/compilers build/compilers\n' +
    '  ln -sfn /home/samuelcaldas/source/repos/nfsmw/build/ppc_binutils build/ppc_binutils\n' +
    '  python3 configure.py\n' +
    '  ninja ' + c.unit_obj + '  (quick build check to ensure unit compiles)\n\n' +
    '## Step 1 — Context inspection & TDD Failing Verification\n' +
    'Check diff: python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'Confirm where the mismatches exist before making edits.\n\n' +
    '## Step 2 — Read implementation\n' +
    'Read ' + c.source_file + ' around ' + c.demangled + '.\n\n' +
    '## Step 3 — Iterative refinement (up to 8 rounds)\n' +
    'Iterate on matching:\n' +
    'a. Study differences in python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'b. Adjust register allocation, local variable ordering, types, loop bounds, condition checks.\n' +
    'c. Compile unit: ninja ' + c.unit_obj + '\n' +
    'd. Re-check diff and percentage: python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
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
    'Return structured result with all required schema fields:\n' +
    '- success: boolean (true if improved match or reached 100% without regressions)\n' +
    '- function_name: demangled function name\n' +
    '- unit: unit name\n' +
    '- branch_name: current branch name\n' +
    '- match_percentage: final match percentage achieved\n' +
    '- source_file: source file path\n' +
    '- virtual_address: virtual address\n' +
    '- size_bytes: function size in bytes\n' +
    '- signature: function signature\n' +
    '- description: brief summary of work\n' +
    '- notes: additional details'
  )
}

log('Starting Batch 13 for nfs5: Spawning 6 agents inside workflow per round across sgetpvol, sstgetpv, zEcstasy, zFEng, and zEagl4Anim strictly using decomp-worker (gemini-3.5-flash-lite)')

phase('Decomp-Pool')
const results = await parallel(CANDIDATES.map(c => () =>
  agent(makePrompt(c), {
    phase: 'Decomp-Pool',
    label: 'decomp:' + c.demangled.replace(/.*::/, '').replace(/\(.*/, '').slice(0, 20),
    schema: DECOMP_SCHEMA,
    isolation: 'worktree',
    agentType: 'decomp-worker',
  })
))

const succeeded = results.filter(Boolean).filter(r => r.success)
const failed = results.filter(Boolean).filter(r => !r.success)
log('Decomp pool finished: ' + succeeded.length + ' succeeded, ' + failed.length + ' failed')

return {
  total_candidates: CANDIDATES.length,
  succeeded: succeeded.length,
  failed: failed.length,
  results: results.filter(Boolean),
}
