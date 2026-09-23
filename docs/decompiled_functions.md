# Decompiled Functions Ledger

This document tracks matched functions in Need for Speed: Most Wanted (GameCube `GOWE69`), providing architectural context, function signatures, Doxygen specifications, addresses, and ProDG GCC 2.95 compiler idioms required for matching.

---

## 1. Animation Subsystem (`zAnim`, `zAnim0`)

### `CAnimPlayer::Init`
- **Unit**: `main/Speed/Indep/SourceLists/zAnim0`
- **Source File**: `src/Speed/Indep/Src/Animation/AnimPlayer.cpp`
- **Virtual Address**: `0x8004B3B4`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool CAnimPlayer::Init()
  ```
- **Description**: Initializes the animation player subsystem, returning true on successful setup.

---

### `CAnimPlayer::GetWorldAnimScene`
- **Unit**: `main/Speed/Indep/SourceLists/zAnim`
- **Source File**: `src/Speed/Indep/Src/Animation/AnimPlayer.cpp`
- **Virtual Address**: `0x8004B434`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  CAnimWorldScene *CAnimPlayer::GetWorldAnimScene()
  ```
- **Description**: Returns a pointer to the active world animation scene instance.

---

### `GetType__13CAnimProperty`
- **Unit**: `main/Speed/Indep/SourceLists/zAnim`
- **Source File**: `src/Speed/Indep/Src/Animation/AnimScene.cpp`
- **Virtual Address**: `0x8004BC74`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  eAnimProperty CAnimProperty::GetType()
  ```
- **Description**: Retrieves the property type identifier for the animation property.

---

### `SetEnabled__13CAnimPropertyb`
- **Unit**: `main/Speed/Indep/SourceLists/zAnim`
- **Source File**: `/home/samuelcaldas/repos/nfsmw/.claude/worktrees/wf_0f4a6bda-d09-4/src/Speed/Indep/Src/Animation/AnimScene.cpp`
- **Virtual Address**: `0x8004BC7C`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CAnimProperty::SetEnabled(bool enabled)
  ```
- **Description**: Enables or disables the animation property evaluation state.

---

### `CAnimScene::GetHandle`
- **Unit**: `main/Speed/Indep/SourceLists/zAnim`
- **Source File**: `src/Speed/Indep/Src/Animation/AnimScene.cpp`
- **Virtual Address**: `0x8004BE48`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  int CAnimScene::GetHandle()
  ```
- **Description**: Returns the unique runtime handle assigned to the animation scene instance.

---

### `__static_initialization_and_destruction_0`
- **Unit**: `main/Speed/Indep/SourceLists/zAnim`
- **Source File**: `src/Speed/Indep/Src/Animation/AnimWorldTypes.hpp`
- **Virtual Address**: `0x8004FE18`
- **Size**: 588 bytes
- **Matching State**: 100.0% match (completes `zAnim` unit at 315/315 functions, 100.0%)
- **Signature**:
  ```cpp
  static void __static_initialization_and_destruction_0(int __initialize_p, int __priority);
  ```
- **Description**: Module-level static initialization routine for `zAnim.cpp`. Evaluates global static hashes `WAM_*` (`WAM_START_TRIGGER`, `WAM_STOP_TRIGGER`, `WAM_FIRST_FRAME`, `WAM_LAST_FRAME`, `WAM_SOUND_TRIGGER_START`, `WAM_SOUND_TRIGGER_STOP`, `WAM_NIS_GENERIC_CONTROL_MSG`, `WAM_FWD_REV_TRACK_CONTROL_MSG`) and float conversion scales when `__initialize_p` is 1 and `__priority` is 0xFFFF. Const qualification on static hashes marks expressions as read-only, prompting ProDG GCC 2.95 tree-to-RTL to allocate callee-saved registers (`r30..r23`) across function calls and hoisting `lis` loads into floating-point division pipeline stalls for 100.0% machine-code match.

---

## 2. Frontend Subsystem (`zFe`, `zFe2`, `zFeOverlay`, `zFEng`)

### `FEQuaternion::operator*`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEMath.h`
- **Virtual Address**: `0x801906F0`
- **Size**: 212 bytes
- **Matching State**: 89.1% match
- **Signature**:
  ```cpp
  FEQuaternion operator*(const FEQuaternion &q1);
  ```
- **Description**: Decompiled and documented FEQuaternion::operator* in zFEng unit with 89.1% match rate.

---

### `FEngine::UpdateMouseState`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEngine.cpp`
- **Virtual Address**: `0x80186E48`
- **Size**: 728 bytes (182 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void FEngine::UpdateMouseState(FEPackage *pkg, FEObjectMouseState *state, float mx, float my);
  ```
- **Description**: Decompiled FEngine::UpdateMouseState to 100.0% matching parity by caching cFEng::Get() locally to align instruction order and register allocation.

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

### `FEPackageReader::ReadObjectChunk`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEPackageReader.cpp`
- **Virtual Address**: `0x8018C1B0`
- **Size**: 964 bytes
- **Matching State**: 96.7% match
- **Signature**:
  ```cpp
  bool FEPackageReader::ReadObjectChunk();
  ```
- **Description**: Decompiled and refined FEPackageReader::ReadObjectChunk in zFEng unit, parsing object chunks during frontend package loading.

---

### `FEListBox::ScrollSelection`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEListBox.cpp`
- **Virtual Address**: `0x80184188`
- **Size**: 1104 bytes
- **Matching State**: 96.5% match
- **Signature**:
  ```cpp
  void FEListBox::ScrollSelection(i32 lColumnNum, i32 lRowNum);
  ```
- **Description**: Decompiled and matched FEListBox::ScrollSelection to 96.5% with Doxygen documentation added, managing list box item selection scrolling.

---

### `FEGameInterface::UnloadUnreferencedLibrary`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/FEng/FEGameInterface.h`
- **Virtual Address**: `0x8013EE78`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual bool UnloadUnreferencedLibrary(FEPackage *pPackage = nullptr);
  ```
- **Description**: Frontend game interface method to unload unreferenced library packages, returning false by default.

---

### `cFEng::FindPackage`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/FEngInterfaces/FEngInterface.cpp`
- **Virtual Address**: `unknown`
- **Size**: 156 bytes
- **Matching State**: 91.79% match
- **Signature**:
  ```cpp
  FindPackage__5cFEngPCc
  ```
- **Description**: Decompiled cFEng::FindPackage achieving 91.79% match parity.

---

### `cFEng::PushErrorPackage`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/FEngInterfaces/FEngInterface.cpp`
- **Virtual Address**: `unknown`
- **Size**: 332 bytes
- **Matching State**: 96.81% match
- **Signature**:
  ```cpp
  void cFEng::PushErrorPackage(const char *pPackageName, int pArg, u32 ControlMask);
  ```
- **Description**: Matched cFEng::PushErrorPackage in unit main/Speed/Indep/SourceLists/zFe.

---

### `MoviePlayer_Play`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MoviePlayer/MoviePlayer.cpp`
- **Virtual Address**: `0x80135DBC`
- **Size**: 72 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void MoviePlayer_Play(void);
  ```
- **Description**: Decompiled MoviePlayer_Play to 100.0% match with clean C++ logic without register asm overrides.

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

### `EAXTunerCar::UpdateRotation`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound`
- **Source File**: `src/Speed/Indep/Src/EAXSound/EAXTunerCar.cpp`
- **Virtual Address**: `0x800AE864`
- **Size**: 40 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  int EAXTunerCar::UpdateRotation();
  ```
- **Description**: Successfully decompiled EAXTunerCar::UpdateRotation with 100% byte and register parity for GameCube (GOWE69) target.

---

### `EAXSound::GetCurMusicVolume`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound`
- **Source File**: `src/Speed/Indep/Src/EAXSound/EAXSound.cpp`
- **Virtual Address**: `0x800A6DAC`
- **Size**: 52 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  float EAXSound::GetCurMusicVolume();
  ```
- **Description**: Decompiled EAXSound::GetCurMusicVolume matching 100% byte-for-byte.

---

### `AssignAudioStreamHandle`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound`
- **Source File**: `src/Speed/Indep/Src/EAXSound/Stream/EAXS_StreamManager.cpp`
- **Virtual Address**: `0x800B604C`
- **Size**: 16 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void AssignAudioStreamHandle(uintptr_t realstrmhandle);
  ```
- **Description**: Successfully decompiled AssignAudioStreamHandle with 100.0% binary match.

---

### `EAXCommon::Play`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound`
- **Source File**: `src/Speed/Indep/Src/EAXSound/EAXFrontEnd.cpp`
- **Virtual Address**: `0x800ADA44`
- **Size**: 492 bytes (123 instructions)
- **Matching State**: 96.8% match
- **Signature**:
  ```cpp
  int EAXCommon::Play(eMenuSoundTriggers etrigger);
  ```
- **Description**: Decompiled and refined EAXCommon::Play with 96.8% match parity in zEAXSound unit.

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

### `CARSFX_PreColWoosh::MsgBarrier`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/CARSFX/CARSFX_PreColWoosh.cpp`
- **Virtual Address**: `0x800DC378`
- **Size**: 140 bytes
- **Matching State**: 94.29% match
- **Signature**:
  ```cpp
  void CARSFX_PreColWoosh::MsgBarrier(const MAudioReflection &message);
  ```
- **Description**: Refined CARSFX_PreColWoosh::MsgBarrier with Doxygen docstring and verified build matching 94.29%.

---

### `CARSFX_RoadNoise::Play`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/CARSFX/CARSFX_Roadnoise.cpp`
- **Virtual Address**: `unknown`
- **Size**: 392 bytes
- **Matching State**: 94.94% match
- **Signature**:
  ```cpp
  void CARSFX_RoadNoise::Play(FXROADNOISE_LOOP ID, int side);
  ```
- **Description**: Decompiled CARSFX_RoadNoise::Play to 94.94% match parity with Doxygen docstring and robust implementation.

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
- **Matching State**: 99.4% match
- **Signature**:
  ```cpp
  void SFX_Common::MsgPlayMiscSound(const MMiscSound &message);
  ```
- **Description**: Decompiled SFX_Common::MsgPlayMiscSound with 99.4% match and Doxygen docstring, processing miscellaneous sound event messages for audio playback.

---

### `SFXObj_PFEATrax::GenMusicType`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/CARSFX/SFXObj_Pathfinder.cpp`
- **Virtual Address**: `0x800E410C`
- **Size**: 244 bytes
- **Matching State**: 57.1% match
- **Signature**:
  ```cpp
  eMUSIC_TYPE SFXObj_PFEATrax::GenMusicType();
  ```
- **Description**: Decompiled SFXObj_PFEATrax::GenMusicType in zEAXSound2, determining music type based on vehicle audio tracking and pathfinder state.

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

### `GinsuSynthData::BindToData`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/Ginsu/ginsudata.cpp`
- **Virtual Address**: `0x8001ff18`
- **Size**: 340 bytes
- **Matching State**: 95.87% match
- **Signature**:
  ```cpp
  bool GinsuSynthData::BindToData(void *ptr);
  ```
- **Description**: Successfully matched GinsuSynthData::BindToData in zEAXSound2 unit.

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

### `GRaceStatus::RefreshBinWhileInGame`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x8019DE28`
- **Size**: 12 bytes (3 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::RefreshBinWhileInGame();
  ```
- **Description**: Refreshes the current race bin while in game by setting `mQueueBinChange` to true.

---

### `GRaceStatus::StopMasterTimer`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x8019EC08`
- **Size**: 36 bytes (9 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::StopMasterTimer();
  ```
- **Description**: Stops the race master timer instance (`mRaceMasterTimer.Stop()`).

---

### `GRaceStatus::EnableBinBarriers`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x8019DDFC`
- **Size**: 44 bytes (11 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::EnableBinBarriers();
  ```
- **Description**: Enables the race bin barriers if a race bin is active.

---

### `GRaceStatus::SetRaceActivity`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x8019F2A4`
- **Size**: 56 bytes (14 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::SetRaceActivity(GActivity *activity);
  ```
- **Description**: Sets the current race activity and resolves its race parameters from the database.

---

### `GRaceStatus::DisableBarriers`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x8019F36C`
- **Size**: 60 bytes (15 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::DisableBarriers();
  ```
- **Description**: Disables barriers, redoes topology and scenery groups, and resets race segments.

---

### `GRaceDatabase::SimulateDDayComplete`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `unknown`
- **Size**: 4 bytes
- **Matching State**: 100% match
- **Signature**:
  ```cpp
  void GRaceDatabase::SimulateDDayComplete();
  ```
- **Description**: Successfully decompiled GRaceDatabase::SimulateDDayComplete with 100% match (4 bytes).

---

### `LuaMessageDeliveryInfo::GetActivity`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Lua/LuaPostOffice.h`
- **Virtual Address**: `0x801BBD2C`
- **Size**: 8 bytes
- **Matching State**: 100% match
- **Signature**:
  ```cpp
  virtual struct GActivity *GetActivity() const override;
  ```
- **Description**: Decompiled and matched LuaMessageDeliveryInfo::GetActivity method (100.0% match).

---

### `GVault::GetAttribVault & GRaceBin::GetAwardedRaceWins`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GVault.h`
- **Virtual Address**: `0x801B3F60`
- **Size**: 16 bytes
- **Matching State**: 100% match
- **Signature**:
  ```cpp
  Attrib::Vault *GVault::GetAttribVault() const;
  unsigned short GRaceBin::GetAwardedRaceWins() const;
  ```
- **Description**: Implemented GVault::GetAttribVault and GRaceBin::GetAwardedRaceWins with proper documentation and instantiation helpers in zGameplay unit.

---

### `GRuntimeInstance::SetConnectionBuffer & GetConnectionCount`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRuntimeInstance.cpp`
- **Virtual Address**: `0x8019A3C0`
- **Size**: 24 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRuntimeInstance::SetConnectionBuffer(ConnectedInstance *buffer, unsigned int maxConnections);
  unsigned short GRuntimeInstance::GetConnectionCount() const;
  ```
- **Description**: Decompiled GRuntimeInstance::SetConnectionBuffer and GetConnectionCount achieving 100% match.

---

### `GCharacter::GetAttachments`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GCharacter.cpp`
- **Virtual Address**: `0x801BC2F4`
- **Size**: 116 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  Sim::Attachments *GCharacter::GetAttachments() const;
  ```
- **Description**: Successfully decompiled GCharacter::Attach, Detach, IsAttached, and GetAttachments with 100.0% byte and assembly match.

---

## 4. World Subsystem (`zWorld`)

### `CarRenderInfo::UpdateWheelYRenderOffset`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld`
- **Source File**: `src/Speed/Indep/Src/World/CarRender.cpp`
- **Virtual Address**: `0x802C9FB8`
- **Size**: 876 bytes
- **Matching State**: 95.2% match
- **Signature**:
  ```cpp
  void CarRenderInfo::UpdateWheelYRenderOffset();
  ```
- **Description**: Refactored and documented CarRenderInfo::UpdateWheelYRenderOffset in zWorld unit (95.2% match).

---

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
- **Virtual Address**: `0x802C72F4`
- **Size**: 836 bytes (209 instructions)
- **Matching State**: 99.4% match
- **Signature**:
  ```cpp
  void CarPartCuller::CullParts(bVector3 *camera_eye, bAngle stang);
  ```
- **Description**: Refined CarPartCuller::CullParts to 99.4% match parity in zWorld unity unit.

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

### `PhysicsObject::GetEntity`
- **Unit**: `main/Speed/Indep/SourceLists/zPhysics`
- **Source File**: `src/Speed/Indep/Src/Physics/Common/PhysicsObject.cpp`
- **Virtual Address**: `0x8022D794`
- **Size**: 8 bytes
- **Matching State**: 99.5% match
- **Signature**:
  ```cpp
  Sim::IEntity *GetEntity() const;
  ```
- **Description**: Successfully implemented PhysicsObject::GetEntity and related inline physics object getters with Doxygen docstrings.

---

### `PhysicsObject::GetPlayer`
- **Unit**: `main/Speed/Indep/SourceLists/zPhysics`
- **Source File**: `src/Speed/Indep/Src/Physics/PhysicsObject.h`
- **Virtual Address**: `unknown`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  struct IPlayer *GetPlayer() const;
  ```
- **Description**: Decompiled PhysicsObject::GetPlayer to 100.0% match by adding 4-byte base padding in PhysicsObject.h.

---

### `VehicleSystem::Init`
- **Unit**: `main/Speed/Indep/SourceLists/zPhysics`
- **Source File**: `src/Speed/Indep/Src/Physics/Common/VehicleSystem.cpp`
- **Virtual Address**: `0x8021CAC0`
- **Size**: 36 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void Init();
  ```
- **Description**: Successfully decompiled VehicleSystem::Init with 100.0% match parity.

---

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
- **Matching State**: 97.6% match
- **Signature**:
  ```cpp
  void SuspensionTraffic::Tire::UpdateLoaded(float lat_vel, float fwd_vel, float load, float dT);
  ```
- **Description**: Decompiled SuspensionTraffic::Tire::UpdateLoaded to 97.6% match using register r30 for constant addressing across VU0_Atan2 calls.

---

## 8. Track Subsystem (`zTrack`)

### `TrackStreamer::BuildHoleMovements`
- **Unit**: `main/Speed/Indep/SourceLists/zTrack`
- **Source File**: `src/Speed/Indep/Src/World/TrackStreamer.cpp`
- **Virtual Address**: `0x802B9E98`
- **Size**: 1992 bytes
- **Matching State**: 89.82% match
- **Signature**:
  ```cpp
  int TrackStreamer::BuildHoleMovements(HoleMovement *hole_movements, int max_movements, int filler_method, int largest_free, int *pamount_moved, int max_amount_to_move);
  ```
- **Description**: Decompiled and documented TrackStreamer::BuildHoleMovements in zTrack unit with 89.82% match.

---

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
- **Virtual Address**: `0x802BC0A4`
- **Size**: 708 bytes
- **Matching State**: 97.01% match
- **Signature**:
  ```cpp
  int TrackStreamer::GetLoadingPriority(TrackStreamingSection *section, StreamingPositionEntry *position_entry, bool calculating_jettison);
  ```
- **Description**: Calculates a streaming section's loading priority for a player position.

---

### `RenderVisibleSectionBoundary`
- **Unit**: `main/Speed/Indep/SourceLists/zTrack`
- **Source File**: `src/Speed/Indep/Src/World/Scenery.cpp`
- **Virtual Address**: `unknown`
- **Size**: 888 bytes
- **Matching State**: 95.43% match
- **Signature**:
  ```cpp
  void RenderVisibleSectionBoundary(VisibleSectionBoundary *boundary, eView *view);
  ```
- **Description**: Renders visible section boundaries in the track scenery subsystem.

---

### `TrackStreamer::DetermineStreamingSections`
- **Unit**: `main/Speed/Indep/SourceLists/zTrack`
- **Source File**: `src/Speed/Indep/Src/World/TrackStreamer.cpp`
- **Virtual Address**: `unknown`
- **Size**: 420 bytes
- **Matching State**: 76.45% match
- **Signature**:
  ```cpp
  void TrackStreamer::DetermineStreamingSections();
  ```
- **Description**: Inspected and verified TrackStreamer::DetermineStreamingSections in zTrack unit with 76.45% match.

---

## 8. Collision Subsystem (`zWorld2`)

### `WRoadNav::UpdateOccludedPosition`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld2`
- **Source File**: `src/Speed/Indep/Src/World/Common/WRoadNetwork.cpp`
- **Virtual Address**: `unknown`
- **Size**: 4368 bytes
- **Matching State**: 98.12% match
- **Signature**:
  ```cpp
  void WRoadNav::UpdateOccludedPosition(bool arg1);
  ```
- **Description**: Decompiled and refined WRoadNav::UpdateOccludedPosition in zWorld2 unit

---

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

### `WRoadNav::CookieTrailCurvature`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld2`
- **Source File**: `src/Speed/Indep/Src/World/Common/WRoadNetwork.cpp`
- **Virtual Address**: `0x80304A70`
- **Size**: 1,284 bytes
- **Matching State**: 95.94% match
- **Signature**:
  ```cpp
  float WRoadNav::CookieTrailCurvature(const UMath::Vector3 &car_position, const UMath::Vector3 &car_velocity);
  ```
- **Description**: Computes road curvature along the cookie trail ahead of the vehicle based on current position and velocity vectors.

---

### `WRoadNav::HolePunchAvoidables`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld2`
- **Source File**: `src/Speed/Indep/Src/World/Common/WRoadNetwork.cpp`
- **Virtual Address**: `unknown`
- **Size**: 2,980 bytes
- **Matching State**: 94.94% match
- **Signature**:
  ```cpp
  void WRoadNav::HolePunchAvoidables(NavCookie *cookies, int num_cookies, float current_offset, float delta_offset);
  ```
- **Description**: Decompiled and matched WRoadNav::HolePunchAvoidables in zWorld2 unit with 94.94% match rate and 2,980 bytes size.

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

### `EmitterSystem::Render`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `src/Speed/Indep/Src/Ecstasy/EmitterSystem.cpp`
- **Virtual Address**: `0x8011290C`
- **Size**: 696 bytes
- **Matching State**: 94.54% match
- **Signature**:
  ```cpp
  void EmitterSystem::Render(eView *view);
  ```
- **Description**: Renders particle emitter systems within the ecstasy graphics/particle engine pipeline for the given view.

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

### `InternalLoadingHeaderPhase2Callback`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp`
- **Virtual Address**: `0x800F61E4`
- **Size**: 308 bytes
- **Matching State**: 94.19% match
- **Signature**:
  ```cpp
  void eStreamPackLoader::InternalLoadingHeaderPhase2Callback(void *callback_param, int error_status, void *callback_param2);
  ```
- **Description**: Decompiled and matched eStreamPackLoader::InternalLoadingHeaderPhase2Callback in zEcstasy unit, handling stream package header phase 2 loading callbacks.

---

### `eStreamPackLoader::CreateStreamingPack`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp`
- **Virtual Address**: `0x800F5F30`
- **Size**: 372 bytes
- **Matching State**: 92.31% match
- **Signature**:
  ```cpp
  eStreamingPack *eStreamPackLoader::CreateStreamingPack(const char *filename, void (*callback_function)(void *), void *callback_param, int memory_pool_num);
  ```
- **Description**: Decompiled eStreamPackLoader::CreateStreamingPack with 92.31% matching assembly parity.

---

### `InternalLoadStreamingEntry`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp`
- **Virtual Address**: `unknown`
- **Size**: 440 bytes
- **Matching State**: 95.41% match
- **Signature**:
  ```cpp
  void eStreamPackLoader::InternalLoadStreamingEntry(eStreamingPackLoadTable *loading_table, eStreamingPack *streaming_pack, eStreamingEntry *streaming_entry);
  ```
- **Description**: Decompiled eStreamPackLoader::InternalLoadStreamingEntry to 95.41% match.

---

## 10. Foundation Subsystem (`zBWare`)

### `fDeterminant`
- **Unit**: `main/Speed/Indep/SourceLists/zBWare`
- **Source File**: `src/Speed/Indep/bWare/Src/bMatrix.cpp`
- **Virtual Address**: `0x8005D604`
- **Size**: 448 bytes
- **Matching State**: 69.04% match
- **Signature**:
  ```cpp
  float fDeterminant(bMatrix4 *m);
  ```
- **Description**: Decompiled fDeterminant in zBWare unit with Doxygen docstring.


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
- **Source File**: `/home/samuelcaldas/repos/nfsmw/.claude/worktrees/wf_4d25ea9b-05c-1/src/Speed/Indep/bWare/Src/bMath.cpp`
- **Virtual Address**: `0x8005D1F0`
- **Size**: 328 bytes (82 instructions)
- **Matching State**: 98.05% match
- **Signature**:
  ```cpp
  bAngle bATan(float x, float y);
  ```
- **Description**: Matched bATan function in zBWare unit with 98.05% parity.

---

## 11. Camera Subsystem (`zCamera`)

### `CameraAI::Director::JumpStart`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/CameraAI.cpp`
- **Virtual Address**: `0x80069C7C`
- **Size**: 20 bytes (5 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CameraAI::Director::JumpStart(float time);
  ```
- **Description**: Starts jump camera sequence by scaling the given duration by 4/3 (`time * 1.3333334f`) and storing into `mJumpTime` (offset `0x2B8`).

---

### `CameraAI::Director::EndJumping`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/CameraAI.cpp`
- **Virtual Address**: `0x80069C90`
- **Size**: 40 bytes (10 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CameraAI::Director::EndJumping();
  ```
- **Description**: Ends the jumping camera sequence if the jump timer (`mJumpTime`) is below 1.0s, resetting it to -1.0f.

---

### `CameraAI::Director::EndPursuitStart`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/CameraAI.cpp`
- **Virtual Address**: `0x80069E6C`
- **Size**: 40 bytes (10 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CameraAI::Director::EndPursuitStart();
  ```
- **Description**: Ends pursuit start camera sequence if pursuit timer (`mPursuitStartTime`, offset `0x2B4`) is below 2.0s, resetting it to -1.0f.

---

### `CameraAI::MaybeKillPursuitCam`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/CameraAI.cpp`
- **Virtual Address**: `0x8006A664`
- **Size**: 44 bytes (11 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CameraAI::MaybeKillPursuitCam(unsigned int id);
  ```
- **Description**: Cancels or ends active pursuit start camera sequence for the specified view ID by querying `FindDirector(id)` and calling `EndPursuitStart()`.

---

### `CameraAI::MaybeKillJumpCam`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/CameraAI.cpp`
- **Virtual Address**: `0x8006AE84`
- **Size**: 44 bytes (11 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CameraAI::MaybeKillJumpCam(unsigned int id);
  ```
- **Description**: Cancels or ends active jump camera sequence for the specified view ID by querying `FindDirector(id)` and calling `EndJumping()`.

---

### `CameraAI::Reset`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/CameraAI.cpp`
- **Virtual Address**: `0x8006A2C8`
- **Size**: 732 bytes
- **Matching State**: 94.1% match
- **Signature**:
  ```cpp
  void CameraAI::Reset();
  ```
- **Description**: Decompiled CameraAI::Director methods & CameraAI::Reset in zCamera unit.

---

### `CDActionIce::Reset`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/Actions/CDActionIce.cpp`
- **Virtual Address**: `0x800709E8`
- **Size**: 12 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CDActionIce::Reset();
  ```
- **Description**: Decompiled CDActionIce methods (Reset, SetSpecial, OnAttached) with 100% match.

---

### `CDActionShowcase::Reset & CDActionTrackCar::Reset`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/Actions/CDActionShowcase.cpp`
- **Virtual Address**: `unknown`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CDActionShowcase::Reset();
  void CDActionShowcase::OnAttached(IAttachable *);
  void CDActionTrackCar::Reset();
  void CDActionTrackCar::OnAttached(IAttachable *);
  ```
- **Description**: Decompiled Reset and OnAttached methods for CDActionShowcase and CDActionTrackCar in zCamera unit with 100% match.

---

### `Dynamics::Articulation::Joint::Owns`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `0x80087A78`
- **Size**: 40 bytes (10 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool Dynamics::Articulation::Joint::Owns(const Dynamics::IEntity *entity) const;
  ```
- **Description**: Determines whether the joint owns the specified entity by checking against Lever A and Lever B entities.
- **Compiler Details**: Logical OR with separate return paths (`if (entity == this->mLeverA.GetEntity() || entity == this->mLeverB.GetEntity()) return true; return false;`) reproduces the exact sequence of loads, comparisons, conditional branches, and dual return blocks.

---

### `Dynamics::Articulation::Resolve`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `0x80087748`
- **Size**: 72 bytes (18 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void Dynamics::Articulation::Resolve();
  ```
- **Description**: Iterates through the active global articulation joints list (`bTList<Joint> Joints`) and resolves constraints on each joint.

---

### `Dynamics::Collision::Friction::GetForce`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp`
- **Virtual Address**: `0x80083680`
- **Size**: 336 bytes (84 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  Dynamics::Collision::Friction::State Dynamics::Collision::Friction::GetForce(const UVector3 &p, float impulse, const UVector3 &n, UVector3 &Ff) const;
  ```
- **Description**: Computes static vs dynamic friction force response given collision contact point, impulse magnitude, and contact surface normal.

---

### `Dynamics::Collision::Moment` Setters (`SetInertia`, `SetMass`, `SetCG`)
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp`
- **Virtual Address**: `0x80083C24`, `0x80083C40`, `0x80083C58`
- **Size**: 28 bytes, 24 bytes, 28 bytes
- **Matching State**: 100.0% match
- **Signatures**:
  ```cpp
  void Dynamics::Collision::Moment::SetInertia(const UMath::Vector3 &inertiaP);
  void Dynamics::Collision::Moment::SetMass(float mass);
  void Dynamics::Collision::Moment::SetCG(const UMath::Vector3 &cg);
  ```
- **Description**: Configures inertial tensor, mass (with reciprocal `mMassInv`), and center of gravity vector for rigid body moment calculations.

---

### `Dynamics::Collision::Geometry::FindIntersection` & `BoxVsSphere`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Geometry.cpp`
- **Virtual Address**: `0x8008A630`, `0x8008A604`
- **Size**: 124 bytes, 44 bytes
- **Matching State**: 100.0% match
- **Signatures**:
  ```cpp
  bool Dynamics::Collision::Geometry::FindIntersection(const Geometry *A, const Geometry *B, Geometry *result);
  bool Dynamics::Collision::Geometry::BoxVsSphere(const Geometry *A, const Geometry *B, Geometry *result);
  ```
- **Description**: Dispatches intersection tests between geometric primitives via static function pointer jump table (`algos.3467`); delegates `BoxVsSphere` symmetrically to `SphereVsBox`.

---

### `Dynamics::Collision::Geometry::Move` & Constructors
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Geometry.cpp`
- **Virtual Address**: `0x80089314`, `0x80089320`, `0x80089350`
- **Size**: 12 bytes, 48 bytes, 72 bytes
- **Matching State**: 100.0% match
- **Signatures**:
  ```cpp
  Dynamics::Collision::Geometry::Geometry();
  Dynamics::Collision::Geometry::Geometry(const UMath::Matrix4 &orient, const UMath::Vector3 &position, const UMath::Vector3 &dimension, Shape shape, const UMath::Vector3 &delta);
  void Dynamics::Collision::Geometry::Move(const UMath::Vector3 &deltaP);
  ```
- **Description**: Initializes and translates collision geometry instances by updating position and motion delta vectors.

---

### `Dynamics::Articulation` Debug Draw Stubs
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `0x8008797C`, `0x8008837C`, `0x80088F68`
- **Size**: 4 bytes each (1 instruction: `blr`)
- **Matching State**: 100.0% match
- **Signatures**:
  ```cpp
  void Dynamics::Articulation::Joint::OnDebugDraw();
  void Dynamics::Articulation::Lever::OnDebugDraw();
  void Dynamics::Articulation::Constraint::OnDebugDraw();
  ```
- **Description**: Empty virtual debug rendering stubs establishing vtable layouts for articulation classes.

---

### `Dynamics::Articulation` Joint & Articulation Lifecycle Methods
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `0x80087610`, `0x80087668`, `0x800876E4`, `0x80087790`, `0x80087820`, `0x800878A0`, `0x80087980`
- **Size**: 88 bytes, 124 bytes, 100 bytes, 144 bytes, 128 bytes, 220 bytes, 248 bytes
- **Matching State**: 100.0% match
- **Signatures**:
  ```cpp
  void Dynamics::Articulation::Constrain(HJOINT handle, IEntity *entity, const UMath::Matrix4 &orient, float minTheta, float maxTheta, const UMath::Vector3 &post, eConstraint type);
  bool Dynamics::Articulation::IsJoined(const IEntity *A, const IEntity *B);
  bool Dynamics::Articulation::IsJoined(const IEntity *entity);
  HJOINT Dynamics::Articulation::Create(IEntity *female, const UMath::Vector3 &female_arm, IEntity *male, const UMath::Vector3 &male_arm, eJointFlags flags);
  void Dynamics::Articulation::Release(IEntity *entity);
  Dynamics::Articulation::Joint::Joint(IEntity *female, const UMath::Vector3 &female_arm, IEntity *male, const UMath::Vector3 &male_arm, eJointFlags flags);
  Dynamics::Articulation::Joint::~Joint();
  ```
- **Description**: Complete articulation lifecycle management: joint creation, query, release, constraint attachment, and destruction with 100% binary matching parity.

---

### `Dynamics::Collision::Geometry::SphereVsSphere`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Geometry.cpp`
- **Virtual Address**: `0x8008A4B8`
- **Size**: 332 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool Dynamics::Collision::Geometry::SphereVsSphere(const Geometry *A, const Geometry *B, Geometry *result);
  ```
- **Description**: Decompiled Dynamics::Collision::Geometry::SphereVsSphere to 100.0% byte and register parity.

---

### `Dynamics::Articulation::Joint::AddConstraint`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `unknown`
- **Size**: 272 bytes
- **Matching State**: 84.7% match
- **Signature**:
  ```cpp
  void Joint::AddConstraint(IEntity *entity, const UMath::Matrix4 &orient, float minTheta, float maxTheta, const UMath::Vector3 &post, eConstraint type);
  ```
- **Description**: Decompiled Dynamics::Articulation::Joint::AddConstraint with 84.7% match parity in zDynamics unit.

---

### `Dynamics::Collision::Moment::Moment`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp`
- **Virtual Address**: `0x800837D0`
- **Size**: 440 bytes
- **Matching State**: 50.6% match
- **Signature**:
  ```cpp
  Moment::Moment(const UMath::Matrix4 &orientation, float mass, const UMath::Vector3 &inertia, const UMath::Vector3 &cg, const UMath::Vector3 &linearVel, const UMath::Vector3 &angularVel, const UMath::Vector3 &position);
  ```
- **Description**: Implemented Dynamics::Collision::Moment::Moment constructor in Collision.cpp with 50.6% match and full build verification.

---

### `Dynamics::Articulation::Constraint::Constraint`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `0x80088490`
- **Size**: 416 bytes
- **Matching State**: 36.3% match
- **Signature**:
  ```cpp
  Constraint::Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type);
  ```
- **Description**: Implemented Dynamics::Articulation::Constraint::Constraint and Joint::AddConstraint in Articulation.cpp.

