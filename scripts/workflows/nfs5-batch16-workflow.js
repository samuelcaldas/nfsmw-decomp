/**
 * @file nfs5-batch16-workflow.js
 * @brief Batch 16 parallel matching decompilation workflow for nfs5 strictly using decomp-worker (gemini-3.5-flash-lite).
 *
 * Targets (6 concurrent worker agents across 5 distinct units with zero overlap):
 * 1. FEMessageResponse::FindConditionBranchTarget(unsigned long) const (99.58% match, 144B) - Unit: zFEng
 * 2. AICopManager::UpdatePursuits (100.0% match, 2516B) - Unit: zAI
 * 3. CarPartCuller::CullParts(bVector3 *, unsigned short) (99.35% match, 836B) - Unit: zWorld
 * 4. FEPackageReader::ReadObjectChunk (99.02% match, 964B) - Unit: zFEng
 * 5. EmitterSystem::UpdateParticles(float) (99.08% match, 1820B) - Unit: zEcstasy
 * 6. WCollisionMgr::FindFaceInCInst (99.92% match, 1436B) - Unit: zWorld2
 */

export const meta = {
  name: 'nfsmw-parallel-decomp-batch16-nfs5',
  description: 'Batch 16 parallel decompilation for nfs5 (6 agents): zFEng, zAI, zWorld, zEcstasy & zWorld2 strictly using decomp-worker (gemini-3.5-flash-lite)',
  phases: [
    { title: 'Decomp-Pool', detail: '6 concurrent worker agents on distinct candidate functions across 5 unconflicted units' },
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
    demangled: 'FEMessageResponse::FindConditionBranchTarget(unsigned long) const',
    symbol: 'FindConditionBranchTarget__C17FEMessageResponseUl',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 144,
    match: 99.58,
    source_file: 'src/Speed/Indep/Src/FEng/FEMessageResponse.cpp',
    virtual_address: '0x80185414',
    signature: 'u32 FEMessageResponse::FindConditionBranchTarget(u32 Index) const',
    extra_instructions:
      'Inspect FindConditionBranchTarget in src/Speed/Indep/Src/FEng/FEMessageResponse.cpp (lines 94-121).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d FindConditionBranchTarget__C17FEMessageResponseUl\n' +
      'Currently at 99.58% match (36 instructions, 144 bytes).\n' +
      'Notice line 101 has an explicit register keyword / asm clobber violation: register int Nest asm("r10") = 1;\n' +
      'Target has mr r11, r3; lwz r3, 0x10(r11) whereas compiled has mr r9, r3; lwz r3, 0x10(r9).\n' +
      'Replace the asm clobber with canonical C++ declaration to allow GCC 2.95 to assign r11 naturally and reach 100.0% PERFECT MATCH!',
  },
  {
    demangled: 'AICopManager::UpdatePursuits',
    symbol: 'UpdatePursuits__12AICopManager',
    unit: 'main/Speed/Indep/SourceLists/zAI',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zAI.o',
    size: 2516,
    match: 100.0,
    source_file: 'src/Speed/Indep/Src/AI/Common/AICopManager.cpp',
    virtual_address: '0x8000C47C',
    signature: 'void AICopManager::UpdatePursuits()',
    extra_instructions:
      'Inspect AICopManager::UpdatePursuits in src/Speed/Indep/Src/AI/Common/AICopManager.cpp (lines 1836-1981).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zAI -d UpdatePursuits__12AICopManager\n' +
      'Currently at 100.0% match (629 instructions, 2516 bytes) with only a register swap:\n' +
      'Target has lis r25, 0x4330 and lis r26, VehicleClass::CHOPPER@ha, while compiled has lis r26, 0x4330 and lis r25, VehicleClass::CHOPPER@ha.\n' +
      'Reorder local variable usage/declarations in the loop to align r25 and r26 perfectly and achieve 100.0% binary parity!',
  },
  {
    demangled: 'CarPartCuller::CullParts(bVector3 *, unsigned short)',
    symbol: 'CullParts__13CarPartCullerP8bVector3Us',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zWorld.o',
    size: 836,
    match: 99.35,
    source_file: 'src/Speed/Indep/Src/World/CarPartCuller.cpp',
    virtual_address: '0x802C72F4',
    signature: 'void CarPartCuller::CullParts(bVector3 *viewPos, unsigned short viewAngle)',
    extra_instructions:
      'Inspect CarPartCuller::CullParts in src/Speed/Indep/Src/World/CarPartCuller.cpp (lines 269-351).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zWorld -d CullParts__13CarPartCullerP8bVector3Us\n' +
      'Currently at 99.35% match (209 instructions, 836 bytes).\n' +
      'Notice r17 vs r18: 0x4330 vs culldiv@ha, and early scheduling of li r9, 0.\n' +
      'Reorder local variables and adjust the conditional structure to match target assembly sequence!',
  },
  {
    demangled: 'FEPackageReader::ReadObjectChunk',
    symbol: 'ReadObjectChunk__15FEPackageReader',
    unit: 'main/Speed/Indep/SourceLists/zFEng',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zFEng.o',
    size: 964,
    match: 99.02,
    source_file: 'src/Speed/Indep/Src/FEng/FEPackageReader.cpp',
    virtual_address: '0x8018C1B0',
    signature: 'void FEPackageReader::ReadObjectChunk()',
    extra_instructions:
      'Inspect FEPackageReader::ReadObjectChunk in src/Speed/Indep/Src/FEng/FEPackageReader.cpp (lines 252-341).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zFEng -d ReadObjectChunk__15FEPackageReader\n' +
      'Currently at 99.02% match (241 instructions, 964 bytes).\n' +
      'Differences are temporary register assignments during endian swaps (r0 vs r11 / r10).\n' +
      'Refine the chunk iteration expressions to match target compiler scheduling!',
  },
  {
    demangled: 'EmitterSystem::UpdateParticles(float)',
    symbol: 'UpdateParticles__13EmitterSystemf',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    unit_obj: 'build/GOWE69/src/Speed/Indep/SourceLists/zEcstasy.o',
    size: 1820,
    match: 99.08,
    source_file: 'src/Speed/Indep/Src/Ecstasy/EmitterSystem.cpp',
    virtual_address: '0x80111BA0',
    signature: 'void EmitterSystem::UpdateParticles(float delta_time)',
    extra_instructions:
      'Inspect EmitterSystem::UpdateParticles in src/Speed/Indep/Src/Ecstasy/EmitterSystem.cpp (lines 975-1109).\n' +
      'Check diff: python3 tools/decomp-diff.py -u main/Speed/Indep/SourceLists/zEcstasy -d UpdateParticles__13EmitterSystemf\n' +
      'Currently at 99.08% match (456 instructions, 1820 bytes).\n' +
      'Registers r20 vs r21, f25 vs f26 in particle updating loop.\n' +
      'Adjust local variable declaration order and intermediate float expressions to reach higher assembly match!',
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
      'Currently at 99.92% match (359 instructions, 1436 bytes).\n' +
      'At offset 3e88-3e90 and 3f7c-3f84: register order for pointers r26, r27, r28 is swapped:\n' +
      'Target: addi r26, r1, 0x98; addi r28, r1, 0xa8; addi r27, r1, 0xb8\n' +
      'Current: addi r28, r1, 0x98; addi r27, r1, 0xa8; addi r26, r1, 0xb8\n' +
      'Adjust order of local matrix/vector variables to align r26/r27/r28 and achieve 100.0% PERFECT MATCH!',
  },
]

function makeWorkerPrompt(candidate, index) {
  return `You are an expert PowerPC decompilation engineer working on Need for Speed: Most Wanted (GameCube GOWE69, USA Rev 0) compiled with SN Systems ProDG 3.9.3 (GCC 2.95.3).
You are running as worker #${index + 1} strictly using gemini-3.5-flash-lite in an ISOLATED GIT WORKTREE.

TARGET FUNCTION:
- Demangled Name: ${candidate.demangled}
- Mangled Symbol: ${candidate.symbol}
- Unit: ${candidate.unit}
- Unit Object File: ${candidate.unit_obj}
- Source File: ${candidate.source_file}
- Virtual Address: ${candidate.virtual_address}
- Size: ${candidate.size} bytes
- Current Match: ${candidate.match}%
- Target Signature: ${candidate.signature}

SPECIFIC INSTRUCTIONS:
${candidate.extra_instructions}

ANTI-SLOP GUARDRAILS (STRICT COMPLIANCE REQUIRED):
1. NO forced register assembly hacks (e.g. register int foo asm("rX") = ... is STRICTLY FORBIDDEN). If existing code has asm clobbers, REPLACE them with canonical C++ code.
2. NO raw pointer offset arithmetic bypassing DWARF struct definitions.
3. NO arbitrary renaming of existing structures or variables.
4. NO redundant redeclarations or unnecessary casts.
5. All code MUST be idiomatic C++ matching GCC 2.95.3 compiler conventions.

TDD & VERIFICATION PROTOCOL:
1. First, compile the target unit using ninja to verify clean baseline build:
   ninja ${candidate.unit_obj}
2. Run tools/decomp-diff.py with the absolute path to your worktree's compiled object file to inspect the exact assembly mismatch:
   python3 tools/decomp-diff.py -u ${candidate.unit} --base-obj \$(pwd)/${candidate.unit_obj} -d "${candidate.symbol}"
3. Analyze the instruction diff carefully (register allocation order, branch conditions, evaluation order, temporary variables).
4. Edit ${candidate.source_file} adhering strictly to anti-slop guardrails.
5. Recompile:
   ninja ${candidate.unit_obj}
6. Re-check the diff:
   python3 tools/decomp-diff.py -u ${candidate.unit} --base-obj \$(pwd)/${candidate.unit_obj} -d "${candidate.symbol}"
7. Verify zero project regressions against baseline:
   ninja changes
8. If the match improved (or reached 100.0%), format with clang-format -i ${candidate.source_file}, ensure clean build, and return success: true with the updated match percentage.
   If your changes did NOT improve the match or caused any regressions, revert your changes (git checkout -- ${candidate.source_file}) and return success: false so the worktree remains clean.`
}

phase('Decomp-Pool')
log('Starting Batch 16 parallel decompilation with 6 concurrent decomp-worker agents (gemini-3.5-flash-lite)...')

const results = await parallel(
  CANDIDATES.map((candidate, idx) => () =>
    agent(makeWorkerPrompt(candidate, idx), {
      label: `decomp:${candidate.demangled.slice(0, 28)}`,
      phase: 'Decomp-Pool',
      schema: DECOMP_SCHEMA,
      agentType: 'decomp-worker',
      isolation: 'worktree',
    })
  )
)

const successfulMatches = results.filter(Boolean).filter(r => r.success && r.match_percentage > 0)
log(`Batch 16 workflow completed. Successfully improved/matched: ${successfulMatches.length}/${CANDIDATES.length} functions.`)

return {
  total_candidates: CANDIDATES.length,
  successful_matches: successfulMatches.length,
  results: results.filter(Boolean),
}
