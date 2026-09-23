# Decompiled Functions Ledger

This document tracks matched functions in Need for Speed: Most Wanted (GameCube `GOWE69`), providing architectural context, function signatures, Doxygen specifications, addresses, and ProDG GCC 2.95 compiler idioms required for matching.

---

## 1. Frontend Subsystem (`zFe`, `zFe2`, `zFeOverlay`, `zFEng`)

### `FEngine::UpdateMouseState`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEngine.cpp`
- **Virtual Address**: `0x80186E48`
- **Size**: 728 bytes (182 instructions)
- **Matching State**: 97.47% match
- **Signature**:
  ```cpp
  void FEngine::UpdateMouseState(FEPackage *pkg, FEObjectMouseState *state, float mx, float my);
  ```
- **Description**: Refined and documented FEngine::UpdateMouseState in zFEng unit, handling frontend mouse pointer position and state updates.

---

### `FEngine::Update`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEngine.cpp`
- **Virtual Address**: `0x80185F38`
- **Size**: 776 bytes (194 instructions)
- **Matching State**: 97.98% match
- **Signature**:
  ```cpp
  void FEngine::Update(const i32 tDeltaTicks, uint32 lock);
  ```
- **Description**: Successfully decompiled FEngine::Update to 97.98% match with clean compilation and Doxygen docstring, driving frontend UI rendering ticks and input state synchronization.

---

### `UIOptionsScreen::NotificationMessage`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/options/uiOptionsScreen.cpp`
- **Virtual Address**: `0x8011B76C` (`2148644716`)
- **Size**: 1,408 bytes (352 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void UIOptionsScreen::NotificationMessage(u32 msg, FEObject *pobj, u32 param1, u32 param2);
  ```
- **Description**: Handles pad input events (`__PAD_BACK__`, `__PAD_BUTTON5__`, triggers, `__PAD_START__`), dialog confirmation responses, and package lifecycle messages (`FEHASH_EXITCOMPLETE`). Manages settings dirty state, controller port mappings, audio volume updates, and option menu redrawing.
- **Compiler Details**: ProDG GCC 2.95 generates a binary decision tree for sparse switch statements. Matching required structured jump labels matching the exact instruction dispatch order for `msg` comparisons.

---

### `MemcardCallbacks::FoundEntry`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp`
- **Virtual Address**: `0x80139CFC`
- **Size**: 512 bytes
- **Matching State**: 98.0% match
- **Signature**:
  ```cpp
  void MemcardCallbacks::FoundEntry(const RealmcIface::EntryInfo *info);
  ```
- **Description**: Decompiled and matched MemcardCallbacks::FoundEntry (98.0% match) handling memory card entry discovery callbacks during save/load operations.

---

### `QuickRaceUnlocker::IsPerfPackageUnlocked`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp`
- **Virtual Address**: `0x80179E20` (`2149031456`)
- **Size**: 140 bytes (35 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool QuickRaceUnlocker::IsPerfPackageUnlocked(eUnlockFilters filter, Physics::Upgrades::Type pkg_type, int level, int player, bool backroom);
  ```
- **Description**: Evaluates whether a performance upgrade package is available in Quick Race mode. Checks the global cheat/unlock override flag `UnlockAllThings` before querying underlying unlockable records.
- **Compiler Details**: Decompiled using early guard validation on `UnlockAllThings` followed by bitwise OR assignment `answer = answer | QuickRaceUnlocker::IsUnlockableUnlocked(...)` to preserve exact register allocation across `r28` through `r31`.

---

### `CareerUnlocker::IsPerfPackageUnlocked`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp`
- **Virtual Address**: `0x8017A8F8` (`2149034232`)
- **Size**: 136 bytes (34 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool CareerUnlocker::IsPerfPackageUnlocked(eUnlockFilters filter, Physics::Upgrades::Type pkg_type, int level, bool backroom);
  ```
- **Description**: Evaluates whether a performance package is unlocked in single-player career mode, factoring in career progression and `UnlockAllThings`.
- **Compiler Details**: Employs identical control-flow structure to `QuickRaceUnlocker` with 4 parameters instead of 5, matching instruction-for-instruction.

---

### `cFrontendDatabase::GetMilestoneIconHash`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Database/FEDatabase.cpp`
- **Virtual Address**: `0x80162528` (`2148934760`)
- **Size**: 724 bytes (181 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  uint32 cFrontendDatabase::GetMilestoneIconHash(uint32 type, bool isMilestone);
  ```
- **Description**: Resolves the texture hash associated with a milestone or challenge event icon. Maps milestone hashes (bounties, infractions, pursuits, speed traps) to their corresponding front-end texture identifiers.
- **Compiler Details**: GCC 2.95 generates a contiguous jump table. Partitioning no-icon cases into return-0 vs. break after case `0xCA9AFDF0` achieved exact byte-for-byte binary equality.

---

### `Minimap::Update`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/HUD/FeMinimap.cpp`
- **Virtual Address**: `0x80144FFC` (`2148814560`)
- **Size**: 616 bytes (154 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void Minimap::Update(IPlayer *player);
  ```
- **Description**: Updates HUD minimap position, orientation, track alignment, and player blips. Computes vehicle world coordinates and orientation, checks splitscreen and exploring/racing minimap preferences, and handles speed clamp bounds.
- **Compiler Details**: Retains single store target for `MinimapRotateWithPlayer` across splitscreen guard and `mode == 0` check by preserving intermediate `mode` assignment.

---

### `SplashScreen::NotificationMessage`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Loading/FESplashScreen.cpp`
- **Virtual Address**: `0x80159E5C` (`2148900188`)
- **Size**: 628 bytes (157 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void SplashScreen::NotificationMessage(u32 msg, FEObject *obj, u32 param1, u32 param2);
  ```
- **Description**: Handles notifications, screen tick timeouts, pad inputs, and transitions for the splash screen. Enforces movie and total timeout thresholds, verifies track streaming permanent file status, and triggers attract mode via `BootFlowManager`.
- **Compiler Details**: Pre-calculates `CalculateLastJoyEventTime()` before boolean evaluation to keep `timed_out` in volatile register `r7` and separate `bAttract` in `r11`, avoiding non-volatile register spilling to `r30` and maintaining the exact 0x28-byte stack frame.

---

### `CarCustomizeManager::IsCategoryNew`
- **Unit**: `main/Speed/Indep/SourceLists/zFeOverlay`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/customize/CustomizeManager.cpp`
- **Virtual Address**: `0x803B2044` (`2151383108`)
- **Size**: 1,248 bytes (312 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool CarCustomizeManager::IsCategoryNew(uint32 cat);
  ```
- **Description**: Checks whether any unlockable item or subcategory within a vehicle customization category is marked as new.
- **Compiler Details**: Required bitwise OR (`answer = answer | UnlockSystem::IsUnlockableNew(...)`) rather than short-circuit logical OR (`||`) to prevent premature branching and generate the exact normalization sequence (`0 != 0` in `r9`, return value in `r0`, `or r3, r9, r0`).

---

### `UIQRCarSelect::NotificationMessage`
- **Unit**: `main/Speed/Indep/SourceLists/zFeOverlay`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/quickrace/uiQRCarSelect.cpp`
- **Virtual Address**: `0x803AB4A4`
- **Size**: 5,096 bytes (1,274 instructions)
- **Matching State**: 99.18% match
- **Signature**:
  ```cpp
  void UIQRCarSelect::NotificationMessage(u32 msg, FEObject *pobj, u32 param1, u32 param2);
  ```
- **Description**: Handles notification messages for the Quick Race car selection screen.

---

### `UIQRCarSelect::SetupForPlayer`
- **Unit**: `main/Speed/Indep/SourceLists/zFeOverlay`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/quickrace/uiQRCarSelect.cpp`
- **Virtual Address**: `0x8016DC10`
- **Size**: 324 bytes (81 instructions)
- **Matching State**: 95.93% match
- **Signature**:
  ```cpp
  void UIQRCarSelect::SetupForPlayer(int player);
  ```
- **Description**: Sets up the car selection state for the specified player, resolving selectable cars, filtered lists, career cars, and initializing default selected vehicle.

---

### `FEPackageManager::GetBasePkgName`
- **Unit**: `main/Speed/Indep/SourceLists/zFeOverlay`
- **Source File**: `src/Speed/Indep/Src/Frontend/FEPackageManager.cpp`
- **Virtual Address**: `0x80183F1C`
- **Size**: 100 bytes (25 instructions)
- **Matching State**: 93.60% match
- **Signature**:
  ```cpp
  const char *FEPackageManager::GetBasePkgName(const char *pkg_name);
  ```
- **Description**: Extracts the base package name from a given package path or filename string by scanning backwards for directory separator `/` or `\\`.

---

### `UIWidgetMenu::Scroll`
- **Unit**: `main/Speed/Indep/SourceLists/zFeOverlay`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Common/feUIWidgetMenu.cpp`
- **Virtual Address**: `0x801452D8`
- **Size**: 536 bytes (134 instructions)
- **Matching State**: 97.01% match
- **Signature**:
  ```cpp
  void UIWidgetMenu::Scroll(eScrollDir dir);
  ```
- **Description**: Scrolls the UI widget menu in the specified direction, updating focus, widget animations, and UI sound effects.

---

### `UIQRChallengeSeries::NotificationMessage`
- **Unit**: `main/Speed/Indep/SourceLists/zFeOverlay`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/quickrace/uiQRChallengeSeries.cpp`
- **Virtual Address**: `0x8016B610`
- **Size**: 676 bytes (169 instructions)
- **Matching State**: 97.69% match
- **Signature**:
  ```cpp
  void UIQRChallengeSeries::NotificationMessage(u32 msg, FEObject *obj, u32 param1, u32 param2);
  ```
- **Description**: Handles UI notifications, button clicks, and pad messages for the challenge series screen, delegating base messages to ArrayScrollerMenu.

---

### `DebugCarCustomizeScreen::NotificationMessage`
- **Unit**: `main/Speed/Indep/SourceLists/zFeOverlay`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/customize/DebugCarCustomize.cpp`
- **Virtual Address**: `0x801646E4`
- **Size**: 1,064 bytes (266 instructions)
- **Matching State**: 98.40% match
- **Signature**:
  ```cpp
  void DebugCarCustomizeScreen::NotificationMessage(u32 msg, FEObject *pobj, u32 param1, u32 param2);
  ```
- **Description**: Handles notification messages and pad controls for the debug car customization menu, navigating car types, parts lists, and cycling debug car options.

---

## 2. Audio Subsystem (`zEAXSound`, `zEAXSound2`)

### `EAXCommon::Play`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound`
- **Source File**: `src/Speed/Indep/Src/EAXSound/EAXFrontEnd.cpp`
- **Virtual Address**: `0x800ADA44`
- **Size**: 492 bytes (123 instructions)
- **Matching State**: 96.83% match
- **Signature**:
  ```cpp
  int EAXCommon::Play(eMenuSoundTriggers etrigger);
  ```
- **Description**: Decompiled and matched EAXCommon::Play function in zEAXSound unit, managing menu sound trigger playback.

---

### `SFXCTL_Physics::UpdateMixerOutputs`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound`
- **Source File**: `src/Speed/Indep/Src/EAXSound/sfxctl/SFXCTL_Physics.cpp`
- **Virtual Address**: `0x800BFFC8`
- **Size**: 1,212 bytes (303 instructions)
- **Matching State**: 98.22% match
- **Signature**:
  ```cpp
  void SFXCTL_Physics::UpdateMixerOutputs();
  ```
- **Description**: Updates physics mixer outputs for EAX sound based on vehicle speed, RPM, wheels on ground, and POV.

---

### `NFSMixMapState::CreateMixCtls`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/Dynamic_Mixer/NFSMixMapState.cpp`
- **Virtual Address**: `0x800F0058` (`2148466744`)
- **Size**: 448 bytes (112 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void NFSMixMapState::CreateMixCtls();
  ```
- **Description**: Parses packed variable-length control records from the dynamic mixer state header, resolves curve tables and scale arrays, assigns processing pointers, computes initial decibel-to-Q15 ratios, and tracks control counts.
- **Compiler Details**: Utilizes PowerPC register aliases (`register stMixCtlSharedData *psdata asm("r11")`, `register int nOffset asm("r3")`) and an inline memory barrier (`asm volatile("" : : : "memory");`) to guide instruction scheduling across Q15 conversion without spilling to stack.

---

### `SFX_Common::MsgPlayMiscSound`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/SFX_Common.cpp`
- **Virtual Address**: `0x800D36C4`
- **Size**: 780 bytes
- **Matching State**: 97.26% match
- **Signature**:
  ```cpp
  void SFX_Common::MsgPlayMiscSound(const MMiscSound &message);
  ```
- **Description**: Decompiled SFX_Common::MsgPlayMiscSound with 97.26% match and Doxygen docstring, processing miscellaneous sound event messages for audio playback.

---

### `GinsuSynthesis::HandlePacketRelease`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/Ginsu/ginsusynth.cpp`
- **Virtual Address**: `0x800EB9F0`
- **Size**: 1,936 bytes (484 instructions)
- **Matching State**: 98.93% match
- **Signature**:
  ```cpp
  void GinsuSynthesis::HandlePacketRelease(short *);
  ```
- **Description**: Processes packet audio release and synthesizes granular playback buffers.

---

## 3. Gameplay Subsystem (`zGameplay`)

### `GManager::GetInGameplay`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/SourceLists/zGameplay.cpp`
- **Virtual Address**: `0x801AE288` (`2149243240`)
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool GManager::GetInGameplay() const;
  ```
- **Description**: Returns `mInGameplay` flag indicating whether the game simulation is actively running in real-time gameplay.

---

### `GManager::GetNumMilestones`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/SourceLists/zGameplay.cpp`
- **Virtual Address**: `0x801B079C` (`2149252732`)
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GManager::GetNumMilestones();
  ```
- **Description**: Returns the count of milestones registered in the active gameplay session.

---

### `GManager::GetNumSpeedTraps`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/SourceLists/zGameplay.cpp`
- **Virtual Address**: `0x801B09CC` (`2149253292`)
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GManager::GetNumSpeedTraps();
  ```
- **Description**: Returns the count of speed trap records loaded in the current race session.

---

### `GRaceStatus::OnRemovedVehicleCache`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x8019F324` (`2149181956`)
- **Size**: 4 bytes (1 instruction)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::OnRemovedVehicleCache(IVehicle *);
  ```
- **Description**: Handles notification when a vehicle is removed from the cache. Implemented as a leaf stub returning void (`blr`).

---

### `GRaceStatus::SetRaceContext`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x8019F328` (`2149181960`)
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::SetRaceContext(GRace::Context context);
  ```
- **Description**: Assigns the race context for the active race event to `mRaceContext` (`stw r4, 0x1aa8(r3); blr`).

---

### `GRaceStatus::GetRacerCount`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x8019F4C8` (`2149182376`)
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  int GRaceStatus::GetRacerCount() const;
  ```
- **Description**: Retrieves the count of racers participating in the current event from `mRacerCount` (`lwz r3, 0x1a9c(r3); blr`).

---

### `GRaceStatus::AddAvailableEventToMap`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801A0268` (`2149185864`)
- **Size**: 4 bytes (1 instruction)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::AddAvailableEventToMap(GRuntimeInstance *, GRuntimeInstance *);
  ```
- **Description**: Adds an available event trigger and associated activity to the world map display. Implemented as a leaf stub returning void (`blr`).

---

### `GRaceStatus::AddSpeedTrapToMap`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801A026C` (`2149185868`)
- **Size**: 4 bytes (1 instruction)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::AddSpeedTrapToMap(GRuntimeInstance *);
  ```
- **Description**: Adds a speed trap trigger instance to the world map display. Implemented as a leaf stub returning void (`blr`).

---

## 4. World Subsystem (`zWorld`)

### `CarRenderInfo::UpdateLightStateTextures`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld`
- **Source File**: `src/Speed/Indep/Src/World/CarRender.cpp`
- **Virtual Address**: `0x802CAA44`
- **Size**: 1,068 bytes (267 instructions)
- **Matching State**: 96.21% match
- **Signature**:
  ```cpp
  void CarRenderInfo::UpdateLightStateTextures();
  ```
- **Description**: Decompiled and documented CarRenderInfo::UpdateLightStateTextures matching 96.21% of original assembly with zero regressions, updating vehicle light state textures.

---

### `CarLoader::SetMemoryPoolSize`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld`
- **Source File**: `src/Speed/Indep/Src/World/CarLoader.cpp`
- **Virtual Address**: `0x802DD360`
- **Size**: 304 bytes (76 instructions)
- **Matching State**: 97.37% match
- **Signature**:
  ```cpp
  void CarLoader::SetMemoryPoolSize(int size);
  ```
- **Description**: Configures car loader memory pool size with Doxygen documentation and verified matching state.

---

### `CarRenderInfo::DrawKeithProjShadow`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld`
- **Source File**: `src/Speed/Indep/Src/World/CarRender.cpp`
- **Virtual Address**: `0x802C9BC0` (`2150430496`)
- **Size**: 1,692 bytes (423 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CarRenderInfo::DrawKeithProjShadow(eView *view, const bVector3 *position, bMatrix4 *localWorld, bMatrix4 *worldLocal, bMatrix4 *biasedIdentity, int body_lod);
  ```
- **Description**: Computes and renders the projected car shadow volume mesh onto ground collision surfaces. Handles world-to-local and local-to-world geometry transformations, collision face querying via `FindClosestFace` and `HeightAtPoint`, shadow volume extrusion, ground polygon clipping, vertex coloring/translucency falloff based on height above ground, and triangle fan/strip rendering into the view.
- **Compiler Details**: Emits PowerPC paired single SIMD instructions (`psq_st`, `psq_l`) for 3D vector transformations. Exact match required separating vertex truncation and decrement across discrete expressions (`int nv = nVert; nv &= ~1; for (i = 0; i < nv - 1; i += 2)`) to guide GCC 2.95 instruction selection to emit `clrrwi r9, r9, 1` and `addi r9, r9, -1` with `cmpw r30, r9`, matching the original binary control flow and register allocation without spilling to the stack.

---

### `CarPartCuller::CullParts`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld`
- **Source File**: `src/Speed/Indep/Src/World/CarRender.cpp`
- **Size**: 836 bytes (209 instructions)
- **Matching State**: 99.4% match (Non-matching / high match)
- **Signature**:
  ```cpp
  void CarPartCuller::CullParts(bVector3 *camera_eye, bAngle stang);
  ```
- **Description**: Evaluates visibility planes to cull hidden vehicle body parts (tires, brakes, side parts, underbody) from rendering based on camera position and steering angle adjustments.

---

## 6. AI Subsystem (`zAI`)

### `AICopManager::UpdatePursuits`
- **Unit**: `main/Speed/Indep/SourceLists/zAI`
- **Source File**: `src/Speed/Indep/Src/AI/Activities/AICopManager.cpp`
- **Virtual Address**: `0x8000C47C`
- **Size**: 2,516 bytes (629 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void AICopManager::UpdatePursuits();
  ```
- **Description**: Iterates through active cop and pursuit vehicles, updates pursuit state, manages vehicle removal on destruction or roadblock completion, increments police statistics when enabled by race parameters, and coordinates pursuit dispatching.
- **Compiler Details**: Exact 100% binary match achieved following ProDG GCC 2.95 calling conventions and control-flow ordering.

---

### `AIPursuit::AssignClosestOffsets`
- **Unit**: `main/Speed/Indep/SourceLists/zAI`
- **Source File**: `src/Speed/Indep/Src/AI/Common/AIPursuit.cpp`
- **Virtual Address**: `unknown`
- **Size**: 1,684 bytes
- **Matching State**: 99.67% match
- **Signature**:
  ```cpp
  void AIPursuit::AssignClosestOffsets(Vector3List &copRelativePositions, Pursuers &assignCopList, FormationTargetList &formationOffsets, bool information);
  ```
- **Description**: Decompiled and refined AIPursuit::AssignClosestOffsets to 99.67% match in zAI unit.

---

## 7. Physics Subsystem (`zPhysics`, `zPhysicsBehaviors`)

### `Physics::Info::ShiftPoints`
- **Unit**: `main/Speed/Indep/SourceLists/zPhysics`
- **Source File**: `src/Speed/Indep/Src/Physics/PhysicsInfo.cpp`
- **Virtual Address**: `0x80224CB8`
- **Size**: 824 bytes
- **Matching State**: 90.41% match
- **Signature**:
  ```cpp
  bool Physics::Info::ShiftPoints(const Attrib::Gen::transmission &, const Attrib::Gen::engine &, const Attrib::Gen::induction &, float *, float *, unsigned int);
  ```
- **Description**: Decompiled and matched Physics::Info::ShiftPoints to 90.41% accuracy with precise expression grouping and conditional structure for vehicle transmission shifting point calculations.

---

### `SuspensionSimple::Tire::UpdateLoaded`
- **Unit**: `main/Speed/Indep/SourceLists/zPhysicsBehaviors`
- **Source File**: `src/Speed/Indep/Src/Physics/Behaviors/SuspensionSimple.cpp`
- **Size**: 1,972 bytes
- **Matching State**: 98.9% match
- **Signature**:
  ```cpp
  float SuspensionSimple::Tire::UpdateLoaded(float lat_vel, float fwd_vel, float body_speed, float load, float dT, float drag_reduction);
  ```
- **Description**: Updates loaded tire physics behavior including lateral and longitudinal forces, braking torque application, slip calculation, and normal load integration during vehicle simulation ticks.

---

### `SuspensionTraffic::Tire::UpdateLoaded`
- **Unit**: `main/Speed/Indep/SourceLists/zPhysicsBehaviors`
- **Source File**: `src/Speed/Indep/Src/Physics/Behaviors/SuspensionTraffic.cpp`
- **Virtual Address**: `0x8024B310`
- **Size**: 856 bytes
- **Matching State**: 97.21% match
- **Signature**:
  ```cpp
  void SuspensionTraffic::Tire::UpdateLoaded(float lat_vel, float fwd_vel, float load, float dT);
  ```
- **Description**: Decompiled SuspensionTraffic::Tire::UpdateLoaded function to 97.21% match parity, handling traffic vehicle tire simulation and load calculations.

---

## 8. Track Subsystem (`zTrack`)

### `RegionQuery::CalculateRegionInfo`
- **Unit**: `main/Speed/Indep/SourceLists/zTrack`
- **Source File**: `src/Speed/Indep/Src/World/WeatherMan.cpp`
- **Virtual Address**: `0x802C1640`
- **Size**: 1,208 bytes (302 instructions)
- **Matching State**: 99.9% match
- **Signature**:
  ```cpp
  int RegionQuery::CalculateRegionInfo(eView *view, RegionType regionKind, int InFE);
  ```
- **Description**: Evaluates region weather, fog parameters, and lighting configuration for the specified view and region type. Manages fog color overrides, distance fog falloff, power, and start positions, updating cache state when modified.
- **Compiler Details**: High-fidelity matching achieved following ProDG GCC 2.95 floating-point and register allocation rules.

---

### `TrackStreamer::GetLoadingPriority`
- **Unit**: `main/Speed/Indep/SourceLists/zTrack`
- **Source File**: `src/Speed/Indep/Src/World/TrackStreamer.cpp`
- **Virtual Address**: `unknown`
- **Size**: 708 bytes
- **Matching State**: 97.01% match
- **Signature**:
  ```cpp
  int TrackStreamer::GetLoadingPriority(TrackStreamingSection *section, StreamingPositionEntry *position_entry, bool calculating_jettison);
  ```
- **Description**: Calculates a streaming section's loading priority for a player position.

---

## 8. Collision Subsystem (`zWorld2`)

### `WCollisionMgr::FindFaceInCInst`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld2`
- **Source File**: `src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp`
- **Virtual Address**: `0x802F0818`
- **Size**: 1,436 bytes (359 instructions)
- **Matching State**: 99.92% match
- **Signature**:
  ```cpp
  bool WCollisionMgr::FindFaceInCInst(const UMath::Matrix4 &, const UMath::Vector3 &, WCollisionInstance const &, WCollisionTri &, float &);
  ```
- **Description**: Finds the nearest collision face intersected by a transformed segment against a collision instance. Evaluates strip spheres, orthogonal inverse matrix transformations, ray-strip intersection, and distance thresholds to locate the closest colliding triangle.

---

### `WRoadNav::InitAtSegment`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld2`
- **Source File**: `src/Speed/Indep/Src/World/Common/WRoadNetwork.cpp`
- **Virtual Address**: `0x8030183C`
- **Size**: 816 bytes (204 instructions)
- **Matching State**: 99.0% match
- **Signature**:
  ```cpp
  void WRoadNav::InitAtSegment(short segInd, char laneInd, float timeStep);
  ```
- **Description**: Initializes road navigation network at the specified segment index, lane index, and time step.

---

## 9. Ecstasy / Particle Subsystem (`zEcstasy`)

### `EmitterSystem::UpdateParticles`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `src/Speed/Indep/Src/Ecstasy/EmitterSystem.cpp`
- **Size**: 1,820 bytes (455 instructions)
- **Matching State**: 99.1% match
- **Signature**:
  ```cpp
  void EmitterSystem::UpdateParticles(float dt);
  ```
- **Description**: Advances all active emitter particles by one simulation step. Handles culling expired particles, updating position, velocity, and acceleration based on drag and gravity attributes, compressing vectors, evaluating particle lifetime and alpha curves, and applying basis rotations and color transformations.

---

### `__InitMatrices`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp`
- **Virtual Address**: `0x801026D0`
- **Size**: 508 bytes (127 instructions)
- **Matching State**: 97.95% match
- **Signature**:
  ```cpp
  void __InitMatrices(void);
  ```
- **Description**: Verified __InitMatrices in zEcstasy unit at 97.95% match with Doxygen docstring and clean regression test.

---

## 10. Foundation / Math Subsystem (`zBWare`)

### `bASin`
- **Unit**: `main/Speed/Indep/SourceLists/zBWare`
- **Source File**: `src/Speed/Indep/bWare/Src/bMath.cpp`
- **Virtual Address**: `0x8005D0A0`
- **Size**: 336 bytes (84 instructions)
- **Matching State**: 97.08% match
- **Signature**:
  ```cpp
  bAngle bASin(float x);
  ```
- **Description**: Decompiled and matched bASin function in zBWare unit computing arcsine for angular calculations.

---

### `bATan`
- **Unit**: `main/Speed/Indep/SourceLists/zBWare`
- **Source File**: `src/Speed/Indep/bWare/Src/bMath.cpp`
- **Virtual Address**: `0x8005D1F0`
- **Size**: 328 bytes (82 instructions)
- **Matching State**: 97.0% match
- **Signature**:
  ```cpp
  bAngle bATan(float x, float y);
  ```
- **Description**: Decompiled bATan to 97.0% match parity in zBWare unit computing arctangent for angular calculations.
