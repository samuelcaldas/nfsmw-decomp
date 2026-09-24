export const meta = {
  name: 'nfsmw-parallel-decomp-batch22',
  description: 'Batch 22 parallel decompilation: AssignClosestOffsets (zAI), SetMemoryPoolSize (zWorld), GetLoadingPriority (zTrack), FoundEntry (zFe), NotificationMessage (zFeOverlay), UpdateParticles (zEcstasy)',
  phases: [
    { title: 'Decomp-P1', detail: 'Trio 1: AssignClosestOffsets (zAI), SetMemoryPoolSize (zWorld), GetLoadingPriority (zTrack)' },
    { title: 'Decomp-P2', detail: 'Trio 2: FoundEntry (zFe), NotificationMessage (zFeOverlay), UpdateParticles (zEcstasy)' },
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

const TRIO_1 = [
  {
    demangled: 'AIPursuit::AssignClosestOffsets',
    symbol: 'AssignClosestOffsets__9AIPursuitRQ33UTL3Stdt6vector2ZQ25UMath7Vector3Z19_type_AIVector3ListRQ33UTL3Stdt6vector2ZP10IPursuitAIZ16_type_AIPursuersRQ33UTL3Stdt6vector2ZQ29AIPursuit15FormationTargetZ27_type_AIFormationTargetListb',
    unit: 'main/Speed/Indep/SourceLists/zAI',
    size: 1684,
    match: 99.67,
    source_file: 'src/Speed/Indep/Src/AI/Common/AIPursuit.cpp',
    virtual_address: '0x8002E2C0',
    signature: 'void AIPursuit::AssignClosestOffsets(UTL::Std::vector<UMath::Vector3, _type_AIVector3List> &offsets, UTL::Std::vector<IPursuitAI *, _type_AIPursuers> &pursuers, UTL::Std::vector<AIPursuit::FormationTarget, _type_AIFormationTargetList> &targets, bool flag)',
    hint: 'Around line 1103 in src/Speed/Indep/Src/AI/Common/AIPursuit.cpp. Initial match is 99.67%. In lines 1134-1140 and 1204: lis r28 vs r29 for float constants and loop counter r29/r28 in subi/mr. Adjust variable declaration order and loop index variable usage so r28 receives the float constant and r29 the loop counter.',
  },
  {
    demangled: 'CarLoader::SetMemoryPoolSize',
    symbol: 'SetMemoryPoolSize__9CarLoaderi',
    unit: 'main/Speed/Indep/SourceLists/zWorld',
    size: 304,
    match: 97.37,
    source_file: 'src/Speed/Indep/Src/World/CarLoader.cpp',
    virtual_address: '0x80267E1C',
    signature: 'void CarLoader::SetMemoryPoolSize(int size)',
    hint: 'Around line 515 in src/Speed/Indep/Src/World/CarLoader.cpp. Initial match is 97.37%. Around line 544: target has addi r6, r6, "Cars" scheduled BEFORE stw r0, CarLoaderMemoryPoolNumber. In decompiled code stw r0 is emitted before addi r6 because of CarLoaderMemoryPoolNumber = pool in argument list. Reorder evaluation of "Cars" and CarLoaderMemoryPoolNumber assignment to achieve 100.0% match.',
  },
  {
    demangled: 'TrackStreamer::GetLoadingPriority',
    symbol: 'GetLoadingPriority__13TrackStreamerP21TrackStreamingSectionP22StreamingPositionEntryb',
    unit: 'main/Speed/Indep/SourceLists/zTrack',
    size: 708,
    match: 97.25,
    source_file: 'src/Speed/Indep/Src/World/TrackStreamer.cpp',
    virtual_address: '0x80256460',
    signature: 'int TrackStreamer::GetLoadingPriority(TrackStreamingSection *section, StreamingPositionEntry *pos, bool flag)',
    hint: 'Around line 2147 in src/Speed/Indep/Src/World/TrackStreamer.cpp. Initial match is 97.25%. Differences are fmr f30 vs f31, float register allocation, and intermediate calculations for angle and priority. Reorder local float variables to match target register assignment.',
  },
]

const TRIO_2 = [
  {
    demangled: 'MemcardCallbacks::FoundEntry',
    symbol: 'FoundEntry__16MemcardCallbacksPCQ211RealmcIface9EntryInfo',
    unit: 'main/Speed/Indep/SourceLists/zFe',
    size: 512,
    match: 97.97,
    source_file: 'src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp',
    virtual_address: '0x80139CFC',
    signature: 'void MemcardCallbacks::FoundEntry(const RealmcIface::EntryInfo *info)',
    hint: 'Around line 240 in src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp. Initial match is 97.97%. Around line 263: target has lwz r4, 0(r31), then lis r5, then mr r6, mr r7, then addi r5. Decompiled code loads empty string constant "" into r5 before lwz r4. Adjust argument evaluation or temporary variables to achieve 100.0% match.',
  },
  {
    demangled: 'UIQRCarSelect::NotificationMessage',
    symbol: 'NotificationMessage__13UIQRCarSelectUlP8FEObjectUlUl',
    unit: 'main/Speed/Indep/SourceLists/zFeOverlay',
    size: 5096,
    match: 99.18,
    source_file: 'src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/quickrace/uiQRCarSelect.cpp',
    virtual_address: '0x803A7210',
    signature: 'void UIQRCarSelect::NotificationMessage(unsigned long message, FEObject *object, unsigned long param1, unsigned long param2)',
    hint: 'Around line 408 in src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/quickrace/uiQRCarSelect.cpp. Initial match is 99.18% across 5096 bytes. Early register assignment r26/r27/r28 for arguments and switch case dispatch ordering. Align parameter passing to QRCarSelectBustedManager and switch case layout.',
  },
  {
    demangled: 'EmitterSystem::UpdateParticles',
    symbol: 'UpdateParticles__13EmitterSystemf',
    unit: 'main/Speed/Indep/SourceLists/zEcstasy',
    size: 1820,
    match: 99.08,
    source_file: 'src/Speed/Indep/Src/Ecstasy/EmitterSystem.cpp',
    virtual_address: '0x80111BA0',
    signature: 'void EmitterSystem::UpdateParticles(float dt)',
    hint: 'Around line 975 in src/Speed/Indep/Src/Ecstasy/EmitterSystem.cpp. Initial match is 99.08%. Register r21 vs r20 for this pointer and float constant 0x4330. Using `register EmitterSystem *emitter_system asm("r21") = this;` brings match to 99.2%. Refine further local variable declarations to eliminate remaining register swaps.',
  },
]

function makeDecompPrompt(cand) {
  return `You are an expert GameCube PowerPC C++ matching decompilation engineer.
Decompile and achieve 100.0% binary matching for function '${cand.demangled}' in unit '${cand.unit}'.

Target Details:
- Function Name: ${cand.demangled}
- Mangled Symbol: ${cand.symbol}
- Unit: ${cand.unit}
- Source File: ${cand.source_file}
- Virtual Address: ${cand.virtual_address}
- Size: ${cand.size} bytes
- Signature: ${cand.signature}
- Initial Match: ${cand.match}%
- Specific Matching Hint: ${cand.hint}

Operating Rules:
1. You are running in an isolated git worktree with your own branch.
2. Read the source file around ${cand.demangled} and examine the current implementation.
3. Check the objdiff diff using:
   python3 tools/decomp-diff.py -u ${cand.unit} -d ${cand.symbol}
4. Apply the hint and refine the code in ${cand.source_file}.
5. Compile and verify using:
   ninja build/GOWE69/${cand.unit}.o
   python3 tools/decomp-diff.py -u ${cand.unit} -d ${cand.symbol}
6. Ensure the entire build passes without regression:
   ninja
   ninja changes
7. Ensure clean Doxygen docstrings (brief, param, return).
8. If matched or improved, commit your changes in this worktree:
   git add ${cand.source_file} && git commit -m "match(${cand.unit.split('/').pop()}): decompile ${cand.demangled}"
9. Return the structured output with your final match percentage and branch name.`
}

phase('Decomp-P1')
log('Starting Batch 22 Trio 1: AssignClosestOffsets (zAI), SetMemoryPoolSize (zWorld), GetLoadingPriority (zTrack)')
const p1_results = await parallel(
  TRIO_1.map((cand) => () =>
    agent(makeDecompPrompt(cand), {
      label: `decomp:${cand.demangled.split('::').pop()}`,
      phase: 'Decomp-P1',
      isolation: 'worktree',
      agentType: 'decomp-worker',
      schema: DECOMP_SCHEMA,
    })
  )
)

phase('Decomp-P2')
log('Starting Batch 22 Trio 2: FoundEntry (zFe), NotificationMessage (zFeOverlay), UpdateParticles (zEcstasy)')
const p2_results = await parallel(
  TRIO_2.map((cand) => () =>
    agent(makeDecompPrompt(cand), {
      label: `decomp:${cand.demangled.split('::').pop()}`,
      phase: 'Decomp-P2',
      isolation: 'worktree',
      agentType: 'decomp-worker',
      schema: DECOMP_SCHEMA,
    })
  )
)

const all_candidates = [...p1_results, ...p2_results].filter(Boolean)
log(`Batch 22 parallel decompilation finished with ${all_candidates.length} candidate reports.`)

return {
  candidates: all_candidates,
}
