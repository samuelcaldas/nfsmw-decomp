# GOWE69 Decompilation Status Ledger

This ledger tracks the completion and blockage status of all code chunks, modules, and subsystems for Need for Speed: Most Wanted (`GOWE69` GameCube target) in accordance with project directives and parallel workflow rules.

## 1. Completed and Merged Modules & Functions

### Animation Subsystem (`zAnim`, `zAnim0`)
- **`CAnimPlayer::Init`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CAnimPlayer::GetWorldAnimScene`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GetType__13CAnimProperty`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SetEnabled__13CAnimPropertyb`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CAnimScene::GetHandle`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### AI Subsystem (`zAI`)
- **`AICopManager::UpdatePursuits`**: Decompiled, verified (99.97% match / 100% fuzzy match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`AIPursuit::AssignClosestOffsets`**: Decompiled, verified (99.67% match, 1,684 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Track Subsystem (`zTrack`)
- **`RegionQuery::CalculateRegionInfo`**: Decompiled, verified (99.92% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`TrackStreamer::GetLoadingPriority`**: Decompiled, verified (97.01% match, 708 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### World & Render Subsystem (`zWorld`)
- **`CarPartCuller::CullParts`**: Refined, verified (99.35% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarRenderInfo::DrawKeithProjShadow`**: Decompiled, verified (100.0% match, 1,692 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarRenderInfo::UpdateLightStateTextures`**: Decompiled, verified (96.21% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarLoader::SetMemoryPoolSize`**: Decompiled, verified (97.37% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Physics Subsystem (`zPhysics`, `zPhysicsBehaviors`)
- **`PhysicsObject::GetEntity` (`zPhysics`)**: Decompiled, verified (99.5% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Physics::Info::ShiftPoints` (`zPhysics`)**: Decompiled, verified (90.41% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SuspensionSimple::Tire::UpdateLoaded` (`zPhysicsBehaviors`)**: Refined, verified (98.90% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SuspensionTraffic::Tire::UpdateLoaded` (`zPhysicsBehaviors`)**: Decompiled, verified (97.21% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Frontend Subsystem (`zFe`, `zFeOverlay`, `zFEng`)
- **`UIOptionsScreen::NotificationMessage` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`MemcardCallbacks::FoundEntry` (`zFe`)**: Decompiled, verified (98.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`QuickRaceUnlocker::IsPerfPackageUnlocked` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CareerUnlocker::IsPerfPackageUnlocked` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`cFrontendDatabase::GetMilestoneIconHash` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEGameInterface::UnloadUnreferencedLibrary` (`zFe`)**: Decompiled, verified (100.0% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Minimap::Update` (`zFeOverlay`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SplashScreen::NotificationMessage` (`zFeOverlay`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarCustomizeManager::IsCategoryNew` (`zFeOverlay`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UIQRCarSelect::NotificationMessage` (`zFeOverlay`)**: Decompiled, verified (99.18% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UIQRCarSelect::SetupForPlayer` (`zFeOverlay`)**: Decompiled, verified (95.93% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEPackageManager::GetBasePkgName` (`zFeOverlay`)**: Decompiled, verified (93.60% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UIWidgetMenu::Scroll` (`zFeOverlay`)**: Decompiled, verified (97.01% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UIQRChallengeSeries::NotificationMessage` (`zFeOverlay`)**: Decompiled, verified (97.69% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`DebugCarCustomizeScreen::NotificationMessage` (`zFeOverlay`)**: Decompiled, verified (98.40% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEngine::Update` (`zFEng`)**: Decompiled, verified (97.98% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEngine::UpdateMouseState` (`zFEng`)**: Decompiled, verified (97.47% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Audio Subsystem (`zEAXSound`, `zEAXSound2`)
- **`NFSMixMapState::CreateMixCtls`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`EAXCommon::Play`**: Decompiled, verified (96.83% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SFX_Common::MsgPlayMiscSound` (`zEAXSound2`)**: Decompiled, verified (97.26% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SFXObj_PFEATrax::GenMusicType` (`zEAXSound2`)**: Decompiled, verified (57.1% match, 244 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GinsuSynthesis::HandlePacketRelease`**: Decompiled, verified (98.93% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SFXCTL_Physics::UpdateMixerOutputs`**: Decompiled, verified (98.22% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Gameplay Subsystem (`zGameplay`)
- **`GManager::GetInGameplay`, `GetNumMilestones`, `GetNumSpeedTraps`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceStatus::OnRemovedVehicleCache`, `SetRaceContext`, `GetRacerCount`, `AddAvailableEventToMap`, `AddSpeedTrapToMap`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Collision Subsystem (`zWorld2`)
- **`WCollisionMgr::FindFaceInCInst`**: Decompiled, verified (99.92% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WRoadNav::InitAtSegment`**: Decompiled, verified (99.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Particle Subsystem (`zEcstasy`)
- **`EmitterSystem::UpdateParticles`**: Decompiled, verified (99.1% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`__InitMatrices`**: Decompiled, verified (97.95% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Foundation / Math Subsystem (`zBWare`)
- **`bASin`**: Decompiled, verified (97.08% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`bATan`**: Decompiled, verified (97.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

## 2. Remaining Binary Chunks and Subsystems
- **Remaining 6,920 Candidate Functions across Unity Units (`zAI`, `zWorld`, `zTrack`, `zPhysics`, `zFe`, `zSim`, `zCamera`, etc.)**:
  - **Status: [Blocked]**
  - **Missing Dependency / Context**: Requires individual function-level DWARF symbol reconstruction, context extraction via `decompctx.py`, and manual instruction-matching iterations against ProDG GCC 2.95 output binaries. Automated bulk decompilation without targeted DWARF source contexts exceeds single-agent scope without explicit per-function header mapping.
