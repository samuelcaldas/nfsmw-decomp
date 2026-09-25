/**
 * @file nfs5-batch15-workflow.js
 * @brief Batch 15 parallel matching decompilation workflow for nfs5 strictly using decomp-worker (gemini-3.5-flash-lite).
 *
 * Targets (6 concurrent worker agents across 6 distinct units with zero overlap):
 * 1. FEngine::Update(long, unsigned int) (99.77% match, 776B) - Unit: zFEng
 * 2. WCollisionMgr::FindFaceInCInst (99.92% match, 1,436B) - Unit: zWorld2
 * 3. AIPursuit::AssignClosestOffsets (99.67% match, 1,684B) - Unit: zAI
 * 4. CarLoader::SetMemoryPoolSize(int) (97.37% match, 304B) - Unit: zWorld
 * 5. EAGL4::DynamicLoader::Release(void) (91.09% match, 220B) - Unit: zEagl4Anim
 * 6. __InitMatrices(void) (97.95% match, 508B) - Unit: zEcstasy
 */

export const meta = {
  name: 'nfsmw-parallel-decomp-batch15-nfs5',
  description: 'Batch 15 parallel decompilation for nfs5 (6 agents): zFEng, zWorld2, zAI, zWorld, zEagl4Anim & zEcstasy strictly using decomp-worker (gemini-3.5-flash-lite)',
  phases: [
    { title: 'Decomp-Pool', detail: '6 concurrent worker agents on distinct candidate functions across 6 unconflicted units' },
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
    demangled: 'FEngine::Update(long, unsigned int)',
    symbol: 'Update__7FEnginelUi',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 776,
    match: 99.77,
    source_file: 'src/Speed/Indep/Src/FEng/FEngine.cpp',
    virtual_address: '0x80185f38',
    signature: 'void FEngine::Update(const i32 tDeltaTicks, uint32 lock)',
    extra_instructions:
      'Inspect FEngine::Update in src/Speed/Indep/Src/FEng/FEngine.cpp (around line 277-347).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d Update__7FEnginelUi\n' +
      'Currently at 99.77% match (194 instructions, 776 bytes). Only 2 bytes difference!\n' +
      'At offset 6278-6290: target has slwi r30, r9, 2 and li r31, 0; current has slwi r31, r9, 2 and li r30, 0.\n' +
      'Notice r30 and r31 are swapped between the joypad/button loop indexing variables.\n' +
      'Adjust local variable declaration order or loop scope to fix register allocation and reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'WCollisionMgr::FindFaceInCInst(UMath::Matrix4 const &, UMath::Vector3 const &, WCollisionInstance const &, WCollisionTri &, float &)',
    symbol: 'FindFaceInCInst__13WCollisionMgrRCQ25UMath7Matrix4RCQ25UMath7Vector3RC18WCollisionInstanceR13WCollisionTriRf',
    unit: 'main/Speed/Indep/SourceLists/zWorld2',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld2.o',
    size: 1436,
    match: 99.92,
    source_file: 'src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp',
    virtual_address: '0x802f0818',
    signature: 'bool WCollisionMgr::FindFaceInCInst(const UMath::Matrix4 &vectorMat, const UMath::Vector3 &endPt, const WCollisionInstance &cInst, WCollisionTri &retFace, float &retDist)',
    extra_instructions:
      'Inspect FindFaceInCInst in src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp (around lines 275-345).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zWorld2 -d "FindFaceInCInst__13WCollisionMgrRCQ25UMath7Matrix4RCQ25UMath7Vector3RC18WCollisionInstanceR13WCollisionTriRf"\n' +
      'Currently at 99.92% match (359 instructions, 1436 bytes). Only 1 instruction difference!\n' +
      'At offset 3e88-3e90 and 3f7c-3f84: register order for pointers r26, r27, r28 is swapped:\n' +
      'Target: addi r26, r1, 0x98; addi r28, r1, 0xa8; addi r27, r1, 0xb8\n' +
      'Current: addi r28, r1, 0x98; addi r27, r1, 0xa8; addi r26, r1, 0xb8\n' +
      'Adjust order of local matrix/vector variables to align r26/r27/r28 and achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'AIPursuit::AssignClosestOffsets(...)',
    symbol: 'AssignClosestOffsets__9AIPursuitRQ33UTL3Stdt6vector2ZQ25UMath7Vector3Z19_type_AIVector3ListRQ33UTL3Stdt6vector2ZP10IPursuitAIZ16_type_AIPursuersRQ33UTL3Stdt6vector2ZQ29AIPursuit15FormationTargetZ27_type_AIFormationTargetListb',
    unit: 'main/Speed/Indep/SourceLists/zAI',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zAI.o',
    size: 1684,
    match: 99.67,
    source_file: 'src/Speed/Indep/Src/AI/Common/AIPursuit.cpp',
    virtual_address: '0x80031760',
    signature: 'void AIPursuit::AssignClosestOffsets(Vector3List &copRelativePositions, Pursuers &assignCopList, FormationTargetList &formationOffsets, bool information)',
    extra_instructions:
      'Inspect AIPursuit::AssignClosestOffsets in src/Speed/Indep/Src/AI/Common/AIPursuit.cpp (lines 1102-1205).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zAI -d "AssignClosestOffsets__9AIPursuitRQ33UTL3Stdt6vector2ZQ25UMath7Vector3Z19_type_AIVector3ListRQ33UTL3Stdt6vector2ZP10IPursuitAIZ16_type_AIPursuersRQ33UTL3Stdt6vector2ZQ29AIPursuit15FormationTargetZ27_type_AIFormationTargetListb"\n' +
      'Currently at 99.67% match (421 instructions, 1684 bytes).\n' +
      'At line 1204: target has mr r9, r29; cmpwi r29, 0; bgt; whereas current has mr. r9, r28; bgt.\n' +
      'Adjust loop variable decrement / branch condition to match target comparison and achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'CarLoader::SetMemoryPoolSize(int)',
    symbol: 'SetMemoryPoolSize__9CarLoaderi',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld.o',
    size: 304,
    match: 97.37,
    source_file: 'src/Speed/Indep/Src/World/CarLoader.cpp',
    virtual_address: '0x802dd360',
    signature: 'void CarLoader::SetMemoryPoolSize(int size)',
    extra_instructions:
      'Inspect CarLoader::SetMemoryPoolSize in src/Speed/Indep/Src/World/CarLoader.cpp (lines 515-550).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zWorld -d SetMemoryPoolSize__9CarLoaderi\n' +
      'Currently at 97.37% match (77 instructions, 304 bytes).\n' +
      'Target instruction sequence around line 543-544:\n' +
      '  lis r6, $LC1043@ha\n' +
      '  addi r6, r6, $LC1043@l\n' +
      '  stw r0, CarLoaderMemoryPoolNumber@l(r29)\n' +
      '  bl bInitMemoryPool\n' +
      'In our code, stw CarLoaderMemoryPoolNumber happens before computing r6.\n' +
      'Reorder statements so that assignment to CarLoaderMemoryPoolNumber immediately precedes the bInitMemoryPool call to achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'EAGL4::DynamicLoader::Release(void)',
    symbol: 'Release__Q25EAGL413DynamicLoader',
    unit: 'main/Speed/Indep/SourceLists/zEagl4Anim',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEagl4Anim.o',
    size: 220,
    match: 91.09,
    source_file: 'src/Speed/Indep/Src/EAGL4Anim/eagl4supportdlopen.cpp',
    virtual_address: '0x8008e88c',
    signature: 'void DynamicLoader::Release()',
    extra_instructions:
      'Inspect DynamicLoader::Release in src/Speed/Indep/Src/EAGL4Anim/eagl4supportdlopen.cpp (lines 77-105).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEagl4Anim -d Release__Q25EAGL413DynamicLoader\n' +
      'Currently at 91.09% match (58 instructions, 220 bytes).\n' +
      'Target does:\n' +
      '  mr r31, r3; lwz r30, 0(r31)\n' +
      'And target does direct EAGL4Free(this->mLoader, 0x430) without redundant null check (delete adds a null check).\n' +
      'Call EAGL4Free directly and zero this->mLoader to eliminate redundant branch and achieve 100.0% PERFECT MATCH!',
  },
  {
    demangled: '__InitMatrices(void)',
    symbol: '__InitMatrices__Fv',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEcstasy.o',
    size: 508,
    match: 97.95,
    source_file: 'src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp',
    virtual_address: '0x801026d0',
    signature: 'void __InitMatrices(void)',
    extra_instructions:
      'Inspect __InitMatrices in src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp (lines 680-695).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEcstasy -d __InitMatrices__Fv\n' +
      'Currently at 97.95% match (128 instructions, 508 bytes).\n' +
      'At lines 688-690: floating point calculation sequence for orthographic scaling factors.\n' +
      'Refine expression grouping and intermediate float variables to align instruction order and achieve 100.0% PERFECT MATCH!',
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
    '## Step 3 — Anti-Slop Guardrails Check\n' +
    '- Ensure 100.0% match parity is achieved strictly via correct control flow, types, and compiler idioms.\n' +
    '- Prohibit shortcut anti-patterns: no forced register hacks, no pointer offset arithmetic bypassing DWARF struct definitions (*(type*)((char*)p + offset)), no arbitrary renaming, no redundant redeclarations or unnecessary casts.\n\n' +
    '## Step 4 — Iterative refinement (up to 8 rounds)\n' +
    'Iterate on matching:\n' +
    'a. Study differences in python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'b. Adjust register allocation, local variable ordering, types, loop bounds, condition checks.\n' +
    'c. Compile unit: ninja ' + c.unit_obj + '\n' +
    'd. Re-check diff and percentage: python3 tools/decomp-diff.py -u "' + c.unit + '" -d "' + c.symbol + '"\n' +
    'Stop when 100.0% match is reached or highest possible match is achieved without regressions.\n\n' +
    '## Step 5 — Docstring\n' +
    'Ensure concise Doxygen docstring precedes the function:\n' +
    '  /**\n' +
    '   * @brief <summary>.\n' +
    '   */\n\n' +
    '## Step 6 — Regression verification\n' +
    '  ninja changes\n' +
    'MUST report 0 regressions (or only improvements to your unit).\n' +
    'If any regression occurs, revert problematic edits.\n\n' +
    '## Step 7 — Commit on branch\n' +
    '  git add -u\n' +
    '  git commit -m "match(' + c.unit.split('/').pop() + '): decompile ' + c.demangled + '\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>"\n\n' +
    '## Step 8 — Structured report\n' +
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

log('Starting Batch 15 for nfs5: Spawning 6 agents inside workflow per round across zFEng, zWorld2, zAI, zWorld, zEagl4Anim, and zEcstasy strictly using decomp-worker (gemini-3.5-flash-lite)')

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
