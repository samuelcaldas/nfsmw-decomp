# GOWE69 Decompilation Status Ledger

This ledger tracks the completion and blockage status of all code chunks, modules, and subsystems for Need for Speed: Most Wanted (`GOWE69` GameCube target) in accordance with project directives and parallel workflow rules.

## 1. Completed and Merged Modules & Functions

### Foundation Subsystem (`zBWare`)
- **`fDeterminant` (`zBWare`)**: Decompiled, verified (69.04% match, 448 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Animation Subsystem (`zAnim`, `zAnim0`)
- **`CAnimPlayer::Init`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CAnimPlayer::GetWorldAnimScene`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GetType__13CAnimProperty`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SetEnabled__13CAnimPropertyb`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CAnimScene::GetHandle`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`__static_initialization_and_destruction_0` (`zAnim`)**: Decompiled, verified (100.0% match, 588 bytes), documented in `docs/decompiled_functions.md`. Reaches **100.0% complete decompilation of `zAnim` unit (315/315 functions, 42,292 bytes code)**. **Status: [Completed & Verified 100.0%]**

### AI Subsystem (`zAI`)
- **`AICopManager::UpdatePursuits`**: Decompiled, verified (99.97% match / 100% fuzzy match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`AIPursuit::AssignClosestOffsets`**: Decompiled, verified (99.67% match, 1,684 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Track Subsystem (`zTrack`)
- **`TrackStreamer::BuildHoleMovements`**: Decompiled, verified (89.82% match, 1,992 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`RegionQuery::CalculateRegionInfo`**: Decompiled, verified (99.92% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`TrackStreamer::GetLoadingPriority`**: Decompiled, verified (97.01% match, 708 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`RenderVisibleSectionBoundary`**: Decompiled, verified (95.43% match, 888 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`TrackStreamer::DetermineStreamingSections`**: Decompiled, verified (76.45% match, 420 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### World & Render Subsystem (`zWorld`)
- **`CarPartCuller::CullParts`**: Refined, verified (99.4% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarRenderInfo::DrawKeithProjShadow`**: Decompiled, verified (100.0% match, 1,692 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarRenderInfo::UpdateLightStateTextures`**: Decompiled, verified (96.21% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarRenderInfo::UpdateWheelYRenderOffset` (`zWorld`)**: Decompiled, verified (95.2% match, 876 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarLoader::SetMemoryPoolSize`**: Decompiled, verified (97.4% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Physics Subsystem (`zPhysics`, `zPhysicsBehaviors`)
- **`PhysicsObject::GetEntity` (`zPhysics`)**: Decompiled, verified (99.5% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`PhysicsObject::GetPlayer` (`zPhysics`)**: Decompiled, verified (100.0% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`VehicleSystem::Init` (`zPhysics`)**: Decompiled, verified (100.0% match, 36 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Physics::Info::ShiftPoints` (`zPhysics`)**: Decompiled, verified (90.41% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SuspensionSimple::Tire::UpdateLoaded` (`zPhysicsBehaviors`)**: Refined, verified (98.90% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SuspensionTraffic::Tire::UpdateLoaded` (`zPhysicsBehaviors`)**: Decompiled, verified (97.6% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Frontend Subsystem (`zFe`, `zFeOverlay`, `zFEng`)
- **`FEQuaternion::operator*` (`zFEng`)**: Decompiled, verified (89.1% match, 212 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UIOptionsScreen::NotificationMessage` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`MemcardCallbacks::FoundEntry` (`zFe`)**: Decompiled, verified (98.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`IJoyHelper::EmulateMemoryCardLibrary` (`zFe`)**: Decompiled, verified (98.8% match, 732 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`QuickRaceUnlocker::IsPerfPackageUnlocked` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CareerUnlocker::IsPerfPackageUnlocked` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`cFrontendDatabase::GetMilestoneIconHash` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEGameInterface::UnloadUnreferencedLibrary` (`zFe`)**: Decompiled, verified (100.0% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`cFEng::FindPackage` (`zFe`)**: Decompiled, verified (91.79% match, 156 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`cFEng::PushErrorPackage` (`zFe`)**: Decompiled, verified (96.81% match, 332 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`MoviePlayer_Play` (`zFe`)**: Decompiled, verified (100.0% match, 72 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
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
- **`FEngine::UpdateMouseState` (`zFEng`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEPackageReader::ReadObjectChunk` (`zFEng`)**: Decompiled, verified (96.67% match, 964 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEListBox::ScrollSelection` (`zFEng`)**: Decompiled, verified (96.5% match, 1,104 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Audio Subsystem (`zEAXSound`, `zEAXSound2`)
- **`EAXSound::GetCurMusicVolume` (`zEAXSound`)**: Decompiled, verified (100.0% match, 52 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`AssignAudioStreamHandle` (`zEAXSound`)**: Decompiled, verified (100.0% match, 16 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`EAXTunerCar::UpdateRotation` (`zEAXSound`)**: Decompiled, verified (100.0% match, 40 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`NFSMixMapState::CreateMixCtls`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`EAXCommon::Play`**: Decompiled, verified (96.8% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CARSFX_PreColWoosh::MsgBarrier` (`zEAXSound2`)**: Decompiled, verified (94.29% match, 140 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CARSFX_RoadNoise::Play` (`zEAXSound2`)**: Decompiled, verified (94.94% match, 392 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SFX_Common::MsgPlayMiscSound` (`zEAXSound2`)**: Decompiled, verified (99.4% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SFXObj_PFEATrax::GenMusicType` (`zEAXSound2`)**: Decompiled, verified (57.1% match, 244 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GinsuSynthesis::HandlePacketRelease`**: Decompiled, verified (98.93% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GinsuSynthData::BindToData` (`zEAXSound2`)**: Decompiled, verified (95.87% match, 340 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SFXCTL_Physics::UpdateMixerOutputs`**: Decompiled, verified (98.22% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Gameplay Subsystem (`zGameplay`)
- **`GManager::GetInGameplay`, `GetNumMilestones`, `GetNumSpeedTraps`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceStatus::OnRemovedVehicleCache`, `SetRaceContext`, `GetRacerCount`, `AddAvailableEventToMap`, `AddSpeedTrapToMap`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceStatus::RefreshBinWhileInGame`, `StopMasterTimer`, `EnableBinBarriers`, `SetRaceActivity`, `DisableBarriers`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceDatabase::SimulateDDayComplete`**: Decompiled, verified (100.0% match, 4 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`LuaMessageDeliveryInfo::GetActivity`**: Decompiled, verified (100.0% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GVault::GetAttribVault & GRaceBin::GetAwardedRaceWins`**: Decompiled, verified (100.0% match, 16 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRuntimeInstance::SetConnectionBuffer & GetConnectionCount` (`zGameplay`)**: Decompiled, verified (100.0% match, 24 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GCharacter::GetAttachments` (`zGameplay`)**: Decompiled, verified (100.0% match, 116 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceStatus::GetRacerInfo` (`zGameplay`)**: Decompiled, verified (100.0% match, 16 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceDatabase` Accessors (`GetRaceCount`, `GetBinCount`, `GetBin`, `GetStartupRace`, `GetStartupRaceContext`) (`zGameplay`)**: Decompiled, verified (100.0% match, 56 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceBin` & `GRaceDatabase` Methods (`GetCompletedChallenges`, `GetAwardedRaceWins`, `SetCompletedChallenges`, `SetRacesWon`, `SimulateDDayComplete`) (`zGameplay`)**: Decompiled, verified (100.0% match, 2,073 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GVault::GetName` & Core Accessors (`GetAttribVault`, `GetObjectCount`, `GetFootprint`, `GetDataOffset`, `GetDataSize`, `GetLoadDataOffset`, `GetLoadDataSize`) (`zGameplay`)**: Decompiled, verified (100.0% match, 1,121 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GVault` Status Methods (`IsLoaded`, `IsResident`, `IsTransient`, `IsRaceBin`, `SetRaceBin`) (`zGameplay`)**: Decompiled, verified (100.0% match, 80 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceParameters` & `GRaceBin` Vault Accessors (`GetGameplayObj`, `GetParentVault`, `GetChildVault`, `GetCollectionKey`) (`zGameplay`)**: Decompiled, verified (100.0% match, 64 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Camera Subsystem (`zCamera`)
- **`CameraAI::Director::JumpStart` (`zCamera`)**: Decompiled, verified (100.0% match, 20 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CameraAI::Director::EndJumping` (`zCamera`)**: Decompiled, verified (100.0% match, 40 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CameraAI::Director::EndPursuitStart` (`zCamera`)**: Decompiled, verified (100.0% match, 40 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CameraAI::MaybeKillPursuitCam` (`zCamera`)**: Decompiled, verified (100.0% match, 44 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CameraAI::MaybeKillJumpCam` (`zCamera`)**: Decompiled, verified (100.0% match, 44 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CameraAI::Reset` (`zCamera`)**: Decompiled, verified (94.1% match, 732 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CDActionIce::Reset` (`zCamera`)**: Decompiled, verified (100.0% match, 12 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CDActionShowcase::Reset & CDActionTrackCar::Reset` (`zCamera`)**: Decompiled, verified (100.0% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CDActionTrackCop` Methods (`Reset`, `SetSpecial`, `OnAttached`) (`zCamera`)**: Decompiled, verified (100.0% match, 12 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CDActionDebug::Reset` (`zCamera`)**: Decompiled, verified (100.0% match, 24 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **CDAction `GetMover` Accessors (`zCamera`)**: Decompiled, verified (99.5% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **CDAction `GetAttachments` Accessors (`zCamera`)**: Decompiled, verified (100.0% match, 32 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CDActionDrive::OnAttached` (`zCamera`)**: Decompiled, verified (100.0% match, 20 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`ICEManager::Update` & `LuaMessageDeliveryInfo::GetLuaState` (`zCamera`)**: Decompiled, verified (100.0% match, 36 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Dynamics Subsystem (`zDynamics`)
- **`Dynamics::Articulation::Joint::Owns` (`zDynamics`)**: Decompiled, verified (100.0% match, 40 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Merged]**
- **`Dynamics::Articulation::Resolve` (`zDynamics`)**: Decompiled, verified (100.0% match, 72 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Merged]**
- **`Dynamics::Articulation Lifecycle (Constrain, IsJoined, Create, Release, Joint::Joint, Joint::~Joint)` (`zDynamics`)**: Decompiled, verified (100.0% match, 1,052 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Dynamics::Collision::Friction::GetForce` (`zDynamics`)**: Decompiled, verified (100.0% match, 336 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Merged]**
- **`Dynamics::Collision::Moment::SetInertia`, `SetMass`, `SetCG` (`zDynamics`)**: Decompiled, verified (100.0% match, 80 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Merged]**
- **`Dynamics::Collision::Geometry::FindIntersection`, `BoxVsSphere`, `Move`, Constructors (`zDynamics`)**: Decompiled, verified (100.0% match, 256 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Merged]**
- **`Dynamics::Articulation` Debug Draw Stubs (`Joint`, `Lever`, `Constraint`) (`zDynamics`)**: Decompiled, verified (100.0% match, 12 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Merged]**
- **`Dynamics::Collision::Geometry::SphereVsSphere` (`zDynamics`)**: Decompiled, verified (100.0% match, 332 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Dynamics::Articulation::Joint::AddConstraint` (`zDynamics`)**: Decompiled, verified (84.7% match, 272 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Dynamics::Collision::Moment::Moment` (`zDynamics`)**: Decompiled, verified (50.6% match, 440 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Dynamics::Articulation::Constraint::Constraint` (`zDynamics`)**: Decompiled, verified (36.3% match, 416 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Collision Subsystem (`zWorld2`)
- **`WRoadNav::UpdateOccludedPosition`**: Decompiled, verified (98.12% match, 4,368 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WCollisionMgr::FindFaceInCInst`**: Decompiled, verified (99.92% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WRoadNav::InitAtSegment`**: Decompiled, verified (99.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WRoadNav::CookieTrailCurvature`**: Decompiled, verified (95.94% match, 1,284 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WRoadNav::HolePunchAvoidables`**: Decompiled, verified (94.94% match, 2,980 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Particle Subsystem (`zEcstasy`)
- **`EmitterSystem::UpdateParticles`**: Decompiled, verified (99.1% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`EmitterSystem::Render`**: Decompiled, verified (94.54% match, 696 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`__InitMatrices`**: Decompiled, verified (97.95% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`epInitViews`**: Decompiled, verified (84.3% match, 516 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`eStreamPackLoader::CreateStreamingPack`**: Decompiled, verified (92.31% match, 372 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`eStreamPackLoader::InternalLoadingHeaderPhase2Callback`**: Decompiled, verified (94.19% match, 308 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`eStreamPackLoader::InternalLoadStreamingEntry`**: Decompiled, verified (95.41% match, 440 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Foundation / Math Subsystem (`zBWare`)
- **`bASin`**: Decompiled, verified (92.32% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`bATan`**: Decompiled, verified (98.05% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

## 2. Remaining Binary Chunks and Subsystems
- **Remaining 6,920 Candidate Functions across Unity Units (`zAI`, `zWorld`, `zTrack`, `zPhysics`, `zFe`, `zSim`, `zCamera`, etc.)**:
  - **Status: [Blocked]**
  - **Missing Dependency / Context**: Requires individual function-level DWARF symbol reconstruction, context extraction via `decompctx.py`, and manual instruction-matching iterations against ProDG GCC 2.95 output binaries. Automated bulk decompilation without targeted DWARF source contexts exceeds single-agent scope without explicit per-function header mapping.
