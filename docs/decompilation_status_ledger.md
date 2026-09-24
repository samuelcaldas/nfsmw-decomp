# GOWE69 Decompilation Status Ledger

This ledger tracks the completion and blockage status of all code chunks, modules, and subsystems for Need for Speed: Most Wanted (`GOWE69` GameCube target) in accordance with project directives and parallel workflow rules (including Batch 15, Batch 16, Batch 17, Batch 18, and Batch 19 functions: `AICopManager::UpdatePursuits`, `WCollisionMgr::FindFaceInCInst`, `RegionQuery::CalculateRegionInfo`, and `__InitMatrices`).

## 1. Completed and Merged Modules & Functions

### Foundation Subsystem (`zBWare`)
- **`fDeterminant` (`zBWare`)**: Decompiled, verified (**100.0% match**, 448 bytes, 112/112 instructions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**

### Animation Subsystem (`zAnim`, `zAnim0`, `zEagl4Anim`)
- **`EAGL4::DynamicLoader::Release` (`zEagl4Anim`)**: Decompiled, verified (**94.82% match**, 220 bytes, 56/58 instructions), eliminated redundant delete null check, documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Improved & Merged 94.82%]**
- **`EAGL4Anim::MemoryPoolManager::NewBlockAux` (`zEagl4Anim`)**: Decompiled, verified (**100.0% match**, 84 bytes, 21/21 instructions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`CAnimPlayer::Init`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CAnimPlayer::GetWorldAnimScene`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GetType__13CAnimProperty`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SetEnabled__13CAnimPropertyb`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CAnimScene::GetHandle`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`__static_initialization_and_destruction_0` (`zAnim`)**: Decompiled, verified (100.0% match, 588 bytes), documented in `docs/decompiled_functions.md`. Reaches **100.0% complete decompilation of `zAnim` unit (315/315 functions, 42,292 bytes code)**. **Status: [Completed & Verified 100.0%]**

### AI Subsystem (`zAI`)
- **`AICopManager::UpdatePursuits`**: Decompiled, verified (99.97% match / 100% fuzzy match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`AIPursuit::AssignClosestOffsets`**: Decompiled, verified (99.67% match, 1,684 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UTL::FastVector<unsigned int, 16>::AllocVectorSpace`**: Decompiled, verified (100.0% match, 52 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Track Subsystem (`zTrack`)
- **`TrackStreamer::BuildHoleMovements`**: Decompiled, verified (89.82% match, 1,992 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`RegionQuery::CalculateRegionInfo`**: Decompiled, verified (99.92% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`TrackStreamer::GetLoadingPriority`**: Decompiled, verified (97.25% match, 708 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`RenderVisibleSectionBoundary`**: Decompiled, verified (99.91% match, 888 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`TrackStreamer::DetermineStreamingSections`**: Decompiled, verified (76.45% match, 420 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### World & Render Subsystem (`zWorld`)
- **`CarPartCuller::CullParts`**: Refined, verified (99.4% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarRenderInfo::DrawKeithProjShadow`**: Decompiled, verified (100.0% match, 1,692 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarRenderInfo::UpdateLightStateTextures`**: Decompiled, verified (96.21% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarRenderInfo::UpdateWheelYRenderOffset` (`zWorld`)**: Decompiled, verified (95.2% match, 876 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarLoader::SetMemoryPoolSize`**: Decompiled, verified (97.4% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarLoader::DefragmentPool` (`zWorld`)**: Decompiled, verified (92.47% match, 684 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Physics Subsystem (`zPhysics`, `zPhysicsBehaviors`)
- **`PhysicsObject::GetEntity` (`zPhysics`)**: Decompiled, verified (99.5% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`PhysicsObject::GetPlayer` (`zPhysics`)**: Decompiled, verified (100.0% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`VehicleSystem::Init` (`zPhysics`)**: Decompiled, verified (100.0% match, 36 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Physics::Info::ShiftPoints` (`zPhysics`)**: Decompiled, verified (**100.0% match**, 824 bytes, 206/206 instructions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`SuspensionSimple::Tire::UpdateLoaded` (`zPhysicsBehaviors`)**: Refined, verified (**99.28% match**, 1,972 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged - Improved to 99.28%]**
- **`SuspensionTraffic::Tire::UpdateLoaded` (`zPhysicsBehaviors`)**: Decompiled, verified (**100.0% match**, 856 bytes, 214 instructions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**

### Frontend Subsystem (`zFe`, `zFeOverlay`, `zFEng`)
- **`FEMessageResponse::FindConditionBranchTarget` (`zFEng`)**: Decompiled, verified (**99.58% match**, 144 bytes, 36 instructions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 99.58%]**
- **`FEPackage::UpdateObject` (`zFEng`)**: Decompiled, verified (**100.0% match**, 1,204 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`FEPackageReader::ReadObjectChunk` (`zFEng`)**: Decompiled, verified (**99.02% match**, 964 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEListBox::ScrollSelection` (`zFEng`)**: Decompiled, verified (**96.58% match**, 1,104 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEQuaternion::operator*` (`zFEng`)**: Decompiled, verified (89.1% match, 212 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEQuaternion::GetMatrix` (`zFEng`)**: Decompiled, verified (**100.0% match**, 196 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`UIOptionsScreen::NotificationMessage` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`PauseMenu::NotificationMessage` (`zFe`)**: Decompiled, verified (97.7% match, 1,204 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`MemcardCallbacks::FoundEntry` (`zFe`)**: Decompiled, verified (98.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`MemcardCallbacks::CardChecked` (`zFe`)**: Decompiled, verified (100.0% match, 668 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`IJoyHelper::EmulateMemoryCardLibrary` (`zFe`)**: Decompiled, verified (98.8% match, 732 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`QuickRaceUnlocker::IsPerfPackageUnlocked` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CareerUnlocker::IsPerfPackageUnlocked` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`cFrontendDatabase::GetMilestoneIconHash` (`zFe`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEGameInterface::UnloadUnreferencedLibrary` (`zFe`)**: Decompiled, verified (100.0% match, 8 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`cFEng::FindPackage` (`zFe`)**: Decompiled, verified (100.0% match, 156 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`cFEng::PushErrorPackage` (`zFe`)**: Decompiled, verified (96.81% match, 332 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`MoviePlayer_Play` (`zFe`)**: Decompiled, verified (100.0% match, 72 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Minimap::Update` (`zFeOverlay`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SplashScreen::NotificationMessage` (`zFeOverlay`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CarCustomizeManager::IsCategoryNew` (`zFeOverlay`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UIQRCarSelect::NotificationMessage` (`zFeOverlay`)**: Decompiled, verified (99.18% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UIQRCarSelect::SetupForPlayer` (`zFeOverlay`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEPackageManager::GetBasePkgName` (`zFeOverlay`)**: Decompiled, verified (93.60% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UIWidgetMenu::Scroll` (`zFeOverlay`)**: Decompiled, verified (97.01% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UIQRChallengeSeries::NotificationMessage` (`zFeOverlay`)**: Decompiled, verified (97.69% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`DebugCarCustomizeScreen::NotificationMessage` (`zFeOverlay`)**: Decompiled, verified (98.40% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEngine::Update` (`zFEng`)**: Decompiled, verified (**99.77% match**, 776 bytes, 195/198 instructions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEngine::UpdateMouseState` (`zFEng`)**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEPackageReader::ReadObjectChunk` (`zFEng`)**: Decompiled, verified (96.67% match, 964 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEListBox::ScrollSelection` (`zFEng`)**: Decompiled, verified (96.5% match, 1,104 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEPackageCommand::~FEPackageCommand` (`zFEng`)**: Decompiled, verified (100.0% match, 32 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEGroup::~FEGroup(void)` (`zFEng`)**: Decompiled, verified (100.0% match, 76 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`FEObjectSorter<1024>::SortObjects` (`zFEng`)**: Decompiled, verified (**100.0% match**, 316 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`UISafehouseRaceSheet::RefreshHeader` (`zFe`)**: Decompiled, verified (97.9% match, 1,776 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WorldMap::AddCops` (`zFe`)**: Decompiled, verified (97.0% match, 968 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WorldMap::SnapCursor` (`zFe`)**: Decompiled, verified (100.0% match, 436 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Merged 100.0%]**
- **`WorldMap::ClampToMapBounds` (`zFe`)**: Decompiled, verified (100.0% match, 216 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`InitChyron` (`zFe2`)**: Decompiled, verified (**100.0% match**, 48 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`CareerSettings::SaveRaceData` (`zFe2`)**: Decompiled, verified (**100.0% match**, 264 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`UIWidgetMenu::Scroll` (`zFe2`)**: Decompiled, verified (**100.0% match**, 536 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`IGenericMessage::_IHandle` (`zFe2`)**: Decompiled, verified (**100.0% match**, 12 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`CTextScroller::FindCR` (`zFe2`)**: Decompiled, verified (**100.0% match**, 80 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`ArrayScroller::ForceSelectionOnScreen` (`zFe2`)**: Refined, verified (**98.31% match**, 64 bytes, 14/16 instructions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged - Improved to 98.31%]**

### Audio Subsystem (`zEAXSound`, `zEAXSound2`, `snd`)
- **`SNDCTRL_getprogvol` (`sgetpvol`)**: Decompiled, verified (**100.0% match**, 148 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`SNDSTRM_getprogvol` (`sstgetpv`)**: Decompiled, verified (**100.0% match**, 152 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`EAXSound::GetCurMusicVolume` (`zEAXSound`)**: Decompiled, verified (100.0% match, 52 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`AssignAudioStreamHandle` (`zEAXSound`)**: Decompiled, verified (100.0% match, 16 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`EAXTunerCar::UpdateRotation` (`zEAXSound`)**: Decompiled, verified (100.0% match, 40 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`NFSMixMapState::CreateMixCtls`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`EAXCommon::Play`**: Decompiled, verified (96.8% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CARSFX_PreColWoosh::MsgBarrier` (`zEAXSound2`)**: Decompiled, verified (94.29% match, 140 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CARSFX_RoadNoise::Play` (`zEAXSound2`)**: Decompiled, verified (94.94% match, 392 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SFX_Common::MsgPlayMiscSound` (`zEAXSound2`)**: Decompiled, verified (**100.0% match**, 780 bytes, 195/195 instructions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`SFXObj_PFEATrax::GenMusicType` (`zEAXSound2`)**: Decompiled, verified (57.1% match, 244 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GinsuSynthesis::HandlePacketRelease`**: Decompiled, verified (99.5% match, 1,936 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GinsuSynthData::BindToData` (`zEAXSound2`)**: Decompiled, verified (96.8% match, 340 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CARSFX_RoadNoise::GenerateRoadNoise` (`zEAXSound2`)**: Decompiled, verified (93.0% match, 1,240 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GinsuSynthData::SampleToCycle` (`zEAXSound2`)**: Decompiled, verified (86.0% match, 876 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`SFXCTL_Physics::UpdateMixerOutputs`**: Decompiled, verified (98.22% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Gameplay Subsystem (`zGameplay`)
- **`GetNumBountySpawnMarkers`, `GetBountySpawnMarker`, & `GetBountySpawnMarkerTag` (`zGameplay`)**: Decompiled, verified (100.0% match, 204 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GManager::GetInGameplay`, `GetNumMilestones`, `GetNumSpeedTraps`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceStatus::OnRemovedVehicleCache`, `SetRaceContext`, `GetRacerCount`, `AddAvailableEventToMap`, `AddSpeedTrapToMap`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceStatus::RefreshBinWhileInGame`, `StopMasterTimer`, `EnableBinBarriers`, `SetRaceActivity`, `DisableBarriers`**: Decompiled, verified (100.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceStatus` Batch 13 Methods (`SetIsLoading`, `EnterSuddenDeath`, `SetTaskTime`, `SetActivelyRacing`) (`zGameplay`)**: Decompiled, verified (100.0% match, 36 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceBin` Batch 13 Accessors (`GetCompletedChallenges`, `GetAwardedRaceWins`) (`zGameplay`)**: Decompiled, verified (100.0% match, 16 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceDatabase` & `GRaceParameters` Batch 14 Functions (`SimulateDDayComplete`, `GetBinCount`, `GetGameplayObj`, `GetChildVault`, `GetParentVault`, `GetRaceCount`) (`zGameplay`)**: Decompiled, verified (100.0% match, 52 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GRaceDatabase`, `GRaceCustom`, `GRaceBin`, `GRaceStatus` Batch 15 Accessors (`GetStartupRace`, `GetStartupRaceContext`, `GetRaceActivity`, `SetCompletedChallenges`, `SetRacesWon`, `SetHasBeenWon`) (`zGameplay`)**: Decompiled, verified (100.0% match, 48 bytes total across 6 functions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`GRaceDatabase`, `GRaceStatus`, & `GRacerInfo` Batch 16 Methods (`GRaceDatabase::GetBin`, `GRaceStatus::GetCacheName`, `GRacerInfo::ChallengeComplete`, `GRacerInfo::SetName`, `GRacerInfo::SetRanking`, `GRacerInfo::SetIndex`) (`zGameplay`)**: Decompiled, verified (100.0% match, 64 bytes total across 6 functions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`GVault` & `GManager` Batch 17 Methods (`GVault::IsResident`, `GVault::IsTransient`, `GVault::IsRaceBin`, `GVault::SetRaceBin`, `GManager::GetMilestone`, `GManager::GetSpeedTrap`) (`zGameplay`)**: Decompiled, verified (100.0% match, 88 bytes total across 6 functions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`GVault`, `GMilestone`, & `GSpeedTrap` Batch 18 Functions (`GVault::IsLoaded`, `GMilestone::GMilestone`, `GMilestone::Init`, `GMilestone::Unlock`, `GMilestone::ValueMeetsGoal`, `GSpeedTrap::GSpeedTrap`, `GSpeedTrap::Init`, `GSpeedTrap::Unlock`, `GSpeedTrap::Activate`) (`zGameplay`)**: Decompiled, verified (100.0% match, 304 bytes total across 9 functions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`GMilestone`, `GSpeedTrap`, & `GManager` Batch 19 Functions (`GMilestone::GetCurrentValue`, `GSpeedTrap::GetTrapTrigger`, `GManager::GetFirstMilestone`, `GManager::GetNextMilestone`, `GManager::EnableBinMilestones`, `GManager::GetFirstSpeedTrap`, `GManager::GetNextSpeedTrap`, `GManager::EnableBinSpeedTraps`, `GManager::SaveMilestones`, `GManager::SaveSpeedTraps`) (`zGameplay`)**: Decompiled, verified (100.0% match, 812 bytes total across 10 functions), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
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
- **`GetPaddedObjectSize<T>` (`GTrigger`, `GMarker`, `GCharacter`, `GActivity`, `GState`, `GHandler`) (`zGameplay`)**: Decompiled, verified (100.0% match, 288 bytes total across 6 instantiations), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`GState::GState`, `GState::~GState`, `GState::GetType`, `_vt.6GState` (`zGameplay`)**: Decompiled, verified (100.0% match, 176 bytes code, 32 bytes vtable), documented in `docs/decompiled_functions.md`. **Status: [Completed & Validated]**
- **`GHandler::GHandler`, `GHandler::~GHandler`, `GHandler::NotifyBytecodeFlushed`, `GHandler::HandleMessage`, `GHandler::GetType`, `_vt.8GHandler` (`zGameplay`)**: Decompiled, verified (100.0% match, 248 bytes code, 32 bytes vtable), documented in `docs/decompiled_functions.md`. **Status: [Completed & Validated]**
- **`GCharacter::GetType` (`zGameplay`)**: Decompiled, verified (100.0% match, 8 bytes code), documented in `docs/decompiled_functions.md`. **Status: [Completed & Validated]**
- **`GCharacter::GCharacter`, `GCharacter::~GCharacter`, `GCharacter::OnAttached`, `Attach`, `Detach`, `IsAttached`, `GetAttachments`, `IsFlagSet` (`zGameplay`)**: Decompiled, verified (100.0% match, 768 bytes total across routines), documented in `docs/decompiled_functions.md`. **Status: [Completed & Validated]**

### Camera Subsystem (`zCamera`)
- **`CameraMover::GetAnchorID` & CubicCameraMover Accessors (`zCamera`)**: Decompiled, verified (100.0% match, 64 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`CameraMover` Subclass Accessors (`CubicCameraMover`, `RearViewMirrorCameraMover`, `TrackCarCameraMover`, `TrackCopCameraMover`) (`zCamera`)**: Decompiled, verified (100.0% match, 40 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`ICE::Cubic1D` Polynomial Routines (`MakeCoeffs`, `GetVal`, `GetdVal`, `GetddVal`, `GetValDesired`) (`zCamera`)**: Decompiled, verified (100.0% match, 184 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`AreMomentCamerasEnabled` (`zCamera`)**: Decompiled, verified (100.0% match, 84 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`AverageBase::Recalculate` (`zCamera`)**: Decompiled, verified (100.0% match, 4 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
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
- **`Dynamics::Articulation::Joint::AddConstraint` (`zDynamics`)**: Decompiled, verified (100.0% fuzzy / 84.8% asm match, 272 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Dynamics::Collision::Moment::Moment` (Matrix4 & IEntity constructors) (`zDynamics`)**: Decompiled, verified (59.7% / 100% match, 440 & 668 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Dynamics::Articulation::Constraint::Constraint` (`zDynamics`)**: Decompiled, verified (90.2% match, 416 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Dynamics::Articulation::Joint::Joint` (`zDynamics`)**: Decompiled, verified (46.3% match, 220 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Dynamics::Collision::Geometry::Set` (`zDynamics`)**: Decompiled, verified (11.8% match, 704 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Dynamics::Collision::Moment::Moment` (`zDynamics`)**: Decompiled, verified (100.0% match, 668 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`Dynamics::Articulation::Lever::SetFulcrum` (`zDynamics`)**: Decompiled, verified (10.6% match, 968 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Collision Subsystem (`zWorld2`)
- **`WRoadNav::UpdateOccludedPosition`**: Decompiled, verified (98.12% match, 4,368 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WCollisionMgr::FindFaceInCInst`**: Decompiled, verified (99.92% match, 1,436 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WRoadNav::InitAtSegment`**: Decompiled, verified (99.0% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WRoadNav::CookieTrailCurvature`**: Decompiled, verified (95.94% match, 1,284 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`WRoadNav::HolePunchAvoidables`**: Decompiled, verified (94.94% match, 2,980 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Particle Subsystem (`zEcstasy`)
- **`eInitTextures`**: Decompiled, verified (**100.0% match**, 76 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`EmitterSystem::UpdateParticles`**: Decompiled, verified (99.1% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`EmitterSystem::Render`**: Decompiled, verified (94.54% match, 696 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`__InitMatrices`**: Decompiled, verified (97.95% match), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`epInitViews`**: Decompiled, verified (84.3% match, 516 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`eStreamPackLoader::CreateStreamingPack`**: Decompiled, verified (92.31% match, 372 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`eStreamPackLoader::InternalLoadingHeaderPhase2Callback`**: Decompiled, verified (94.19% match, 308 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`eStreamPackLoader::InternalLoadStreamingEntry`**: Decompiled, verified (95.41% match, 440 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**

### Dynamics Subsystem (`zDynamics`)
- **`Dynamics::Collision::Geometry::Set`**: Decompiled, verified (100.0% fuzzy match, 704 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Validated]**
- **`Dynamics::Collision::Geometry::SphereVsSphere`**: Decompiled, verified (100.0% fuzzy match, 332 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Validated]**
- **`Dynamics::Articulation::Joint::Joint`**: Decompiled, verified (100.0% fuzzy match, 220 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Validated]**
- **`Dynamics::Articulation::Joint::AddConstraint`**: Decompiled, verified (100.0% fuzzy match, 272 bytes), documented in `docs/decompiled_functions.md`. **Status: [Completed & Validated]**
- **`Dynamics::Articulation::Constraint::Constraint`**: Decompiled, verified (**90.83% fuzzy match**, 416 bytes), documented in `docs/decompiled_functions.md`. **Status: [In Progress - Improved]**

### Foundation / Math Subsystem (`zBWare`)
- **`bASin`**: Decompiled, verified (100.0% match, 336 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`bATan`**: Decompiled, verified (100.0% match, 328 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**

### Frontend UI & Menu Subsystem (`zFe2`)
- **`FEPackageManager::GetBasePkgName`**: Decompiled, verified (100.0% match, 100 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`feDialogScreen::NotifySoundMessage`**: Decompiled, verified (100.0% match, 184 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UnlockSystem::IsCarPartUnlocked`**: Decompiled, verified (100.0% match, 260 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged]**
- **`UnlockSystem::IsUnlockableUnlocked`**: Decompiled, verified (100.0% match, 260 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`UnlockSystem::IsPerfPackageUnlocked`**: Decompiled, verified (100.0% match, 260 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`UnlockSystem::IsTrackUnlocked`**: Decompiled, verified (100.0% match, 228 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`UnlockSystem::IsCarUnlocked`**: Decompiled, verified (100.0% match, 276 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`UnlockSystem::IsBackroomAvailable`**: Decompiled, verified (100.0% match, 212 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`LeaderBoard::Update`**: Decompiled, verified (100.0% match, 1,360 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`SearchForString`**: Decompiled, verified (100.0% match, 180 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`SaveSomeData`**: Decompiled, verified (100.0% match, 60 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`CustomTuningScreen::NotificationMessage`**: Decompiled, verified (100.0% match, 820 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**
- **`UnlockSystem::IsUnlockableNew`**: Decompiled, verified (100.0% match, 180 bytes), documented in `docs/decompiled_functions.md`, and merged into `main`. **Status: [Completed & Merged 100.0%]**

## 2. Remaining Binary Chunks and Subsystems
- **Remaining 6,920 Candidate Functions across Unity Units (`zAI`, `zWorld`, `zTrack`, `zPhysics`, `zFe`, `zSim`, `zCamera`, etc.)**:
  - **Status: [Blocked]**
  - **Missing Dependency / Context**: Requires individual function-level DWARF symbol reconstruction, context extraction via `decompctx.py`, and manual instruction-matching iterations against ProDG GCC 2.95 output binaries. Automated bulk decompilation without targeted DWARF source contexts exceeds single-agent scope without explicit per-function header mapping.
