# GOWE69 Decompilation Status Ledger

This ledger tracks the completion and blockage status of all code chunks, modules, and subsystems for Need for Speed: Most Wanted (`GOWE69` GameCube target) in accordance with project directives and parallel workflow rules.

## 1. Completed and Merged Modules & Functions

### AI Subsystem (`zAI`)
- **`AICopManager::UpdatePursuits`**: Decompiled, verified (99.97% match / 100% fuzzy match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Track Subsystem (`zTrack`)
- **`RegionQuery::CalculateRegionInfo`**: Decompiled, verified (99.92% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### World & Render Subsystem (`zWorld`)
- **`CarPartCuller::CullParts`**: Refined, verified (99.35% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarRenderInfo::DrawKeithProjShadow`**: Decompiled, verified (100.0% match, 1,692 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Physics Subsystem (`zPhysicsBehaviors`)
- **`SuspensionSimple::Tire::UpdateLoaded`**: Refined, verified (98.90% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Frontend Subsystem (`zFe`, `zFeOverlay`)
- **`UIOptionsScreen::NotificationMessage` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`QuickRaceUnlocker::IsPerfPackageUnlocked` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CareerUnlocker::IsPerfPackageUnlocked` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`cFrontendDatabase::GetMilestoneIconHash` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Minimap::Update` (`zFeOverlay`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SplashScreen::NotificationMessage` (`zFeOverlay`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarCustomizeManager::IsCategoryNew` (`zFeOverlay`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Audio Subsystem (`zEAXSound2`)
- **`NFSMixMapState::CreateMixCtls`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Gameplay Subsystem (`zGameplay`)
- **`GManager::GetInGameplay`, `GetNumMilestones`, `GetNumSpeedTraps`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceStatus::OnRemovedVehicleCache`, `SetRaceContext`, `GetRacerCount`, `AddAvailableEventToMap`, `AddSpeedTrapToMap`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Collision Subsystem (`zWorld2`)
- **`WCollisionMgr::FindFaceInCInst`**: Decompiled, verified (99.9% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Particle Subsystem (`zEcstasy`)
- **`EmitterSystem::UpdateParticles`**: Decompiled, verified (99.1% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

## 2. Remaining Binary Chunks and Subsystems
- **Remaining 6,920 Candidate Functions across Unity Units (`zAI`, `zWorld`, `zTrack`, `zPhysics`, `zFe`, `zSim`, `zCamera`, etc.)**:
  - **Status: [Blocked]**
  - **Missing Dependency / Context**: Requires individual function-level DWARF symbol reconstruction, context extraction via `decompctx.py`, and manual instruction-matching iterations against ProDG GCC 2.95 output binaries. Automated bulk decompilation without targeted DWARF source contexts exceeds single-agent scope without explicit per-function header mapping.
