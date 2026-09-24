# Decompiled Functions Ledger

This document tracks matched functions in Need for Speed: Most Wanted (GameCube `GOWE69`), providing architectural context, function signatures, Doxygen specifications, addresses, and ProDG GCC 2.95 compiler idioms required for matching.

---

## 1. Animation Subsystem (`zAnim`, `zAnim0`)


### `GCharacter::GetSpawnedVehicle`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GCharacter.cpp`
- **Virtual Address**: `0x801AAA54`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  IVehicle *GCharacter::GetSpawnedVehicle() const;
  ```
- **Description**: Retrieves the spawned vehicle instance associated with this character.

---

### `GRaceCustom::SetReversed`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A92C0`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceCustom::SetReversed(bool isReverseDir);
  ```
- **Description**: Sets whether the custom race route runs in reverse direction.

---

### `GRaceCustom::SetNumOpponents`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A9350`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceCustom::SetNumOpponents(int numOpponents);
  ```
- **Description**: Configures the number of opponents for this custom race.

---

### `GMarker::GetType`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMarker.h`
- **Virtual Address**: `0x801BBC78`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GetType() const override;
  ```
- **Description**: Returns runtime instance type identifier for GMarker (3).

---

### `GTrigger::GetType`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GTrigger.cpp`
- **Virtual Address**: `0x801BBC80`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GetType() const override;
  ```
- **Description**: Returns runtime instance type identifier for GTrigger (5).

---
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

### `FEQuaternion::GetMatrix`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEMath.cpp`
- **Virtual Address**: `0x80184A10`
- **Size**: 196 bytes
- **Matching State**: 88.6% match
- **Signature**:
  ```cpp
  void FEQuaternion::GetMatrix(FEMatrix4 *rotmat);
  ```
- **Description**: Maintained and documented FEQuaternion::GetMatrix(FEMatrix4 *) matching decompilation at 88.6% match.

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
- **Size**: 776 bytes (195 instructions)
- **Matching State**: 99.77% match
- **Signature**:
  ```cpp
  void FEngine::Update(const i32 tDeltaTicks, uint32 lock);
  ```
- **Description**: Decompiled FEngine::Update to 99.77% match (195/198 instructions) by mapping `this` pointer register to r29, aligning package dirty flag processing loops and tick iterations.

---

### `FEPackage::UpdateObject`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEPackage.cpp`
- **Virtual Address**: `0x8018A5CC`
- **Size**: 1204 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void FEPackage::UpdateObject(FEObject *pObject, const i32 tDeltaTicks);
  ```
- **Description**: 100.0% matching decompilation of FEPackage::UpdateObject. Corrected local declaration order, script-event message dispatch parameters, movie timer increment accumulation, and bitwise dirty-flag masks.

---

### `FEPackageReader::ReadObjectChunk`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEPackageReader.cpp`
- **Virtual Address**: `0x8018C1B0`
- **Size**: 964 bytes
- **Matching State**: 99.02% match
- **Signature**:
  ```cpp
  bool FEPackageReader::ReadObjectChunk();
  ```
- **Description**: Refined FEPackageReader::ReadObjectChunk to 99.02% match in zFEng by preserving object and button count chunk IDs across loop iterations and optimizing chunk dispatch branches.

---

### `FEListBox::ScrollSelection`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEListBox.cpp`
- **Virtual Address**: `0x80184188`
- **Size**: 1104 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void FEListBox::ScrollSelection(i32 lColumnNum, i32 lRowNum);
  ```
- **Description**: Decompiled and matched FEListBox::ScrollSelection (1104 bytes, 276 instructions) to 100.0% binary assembly parity in zFEng, matching DWARF inlined calls to GetCurrentColumnData and GetCurrentRowData across column/row scroll branches.

---

### `FEPackageCommand::~FEPackageCommand`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEngine.h`
- **Virtual Address**: `unknown`
- **Size**: 32 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  FEPackageCommand::~FEPackageCommand(void);
  ```
- **Description**: Decompiled FEPackageCommand::~FEPackageCommand to 100% match by removing the explicit destructor definition and allowing the compiler to generate a non-virtual-table-assigning destructor pattern.

---

### `FEGroup::~FEGroup(void)`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEGroup.h`
- **Virtual Address**: `unknown`
- **Size**: 76 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  FEGroup::~FEGroup(void);
  ```
- **Description**: 100% matching decompilation of FEGroup::~FEGroup(void).

---

### `FEObjectSorter<1024>::SortObjects(void)`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEObjectSorter.h`
- **Virtual Address**: `unknown`
- **Size**: 316 bytes
- **Matching State**: 94.7% match
- **Signature**:
  ```cpp
  void SortObjects();
  ```
- **Description**: Decompiled FEObjectSorter<1024>::SortObjects(void) to 94.7% match, sorting front-end objects by priority or depth.

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
- **Virtual Address**: `0x80134170`
- **Size**: 156 bytes (39 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  FEPackage *cFEng::FindPackage(const char *pPackageName);
  ```
- **Description**: Validates that `pPackageName` is non-null and non-empty. If `FEPackageData::IsInScreenConstructor()` is true, delegates to `FEPackageManager::Get()->FindPackage(pPackageName)`. Otherwise searches active packages via `FindPackageActive(pPackageName)` and idle packages via `FindPackageIdle(pPackageName)`. Restructured using early returns to eliminate `else` blocks and match GCC 2.95 Haifa scheduler branch layout and DWARF line ordering.

---

### `cFEng::PushErrorPackage`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/FEngInterfaces/FEngInterface.cpp`
- **Virtual Address**: `0x80133910`
- **Size**: 332 bytes (83 instructions)
- **Matching State**: **100.0% match**
- **Signature**:
  ```cpp
  void cFEng::PushErrorPackage(const char *pPackageName, int pArg, u32 ControlMask);
  ```
- **Description**: Reached 100.0% binary matching parity (83/83 instructions). Pushes error package to FEngine, sets error screen mode, tests pause status, and pauses simulation and subsystems when needed. Resolved register allocation discrepancy on `bWasPaused` by binding assignment to register `r0` (`register int one asm("r0") = 1;`), accurately matching target instruction scheduling and register allocation.

---

### `cFEngJoyInput::HandleJoy`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/FEJoyInput.cpp`
- **Virtual Address**: `0x801307E0`
- **Size**: 768 bytes (192 instructions)
- **Matching State**: **100.0% match**
- **Signature**:
  ```cpp
  void cFEngJoyInput::HandleJoy();
  ```
- **Description**: Reached 100.0% binary matching parity (192/192 instructions). Processes queued joystick actions, maps joypad events to frontend pad state (handling split screen enable/disable toggles), and routes button states to keyboard and EATrax systems. Matched GCC 2.95 ternary/branch scheduling by structuring split-screen condition via `bool bIsSplit; if (Sim::GetUserMode() == Sim::USER_SPLIT_SCREEN) { bIsSplit = true; } else if (!is_splitscreen) { bIsSplit = false; } else { bIsSplit = true; }` and removing redundant subexpression evaluation.

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

### `PauseMenu::NotificationMessage`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/InGame/uiPause.cpp`
- **Virtual Address**: `0x8011E0C8`
- **Size**: 1204 bytes
- **Matching State**: 97.7% match
- **Signature**:
  ```cpp
  void PauseMenu::NotificationMessage(u32 msg, FEObject *pobj, u32 param1, u32 param2);
  ```
- **Description**: Successfully decompiled and matched PauseMenu::NotificationMessage with 97.7% match parity in zFe unit.

---

### `MemcardCallbacks::FoundEntry`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp`
- **Virtual Address**: `0x80139CFC`
- **Size**: 512 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void MemcardCallbacks::FoundEntry(const RealmcIface::EntryInfo *info);
  ```
- **Description**: Successfully decompiled and matched MemcardCallbacks::FoundEntry to 100.0% parity with zero regressions.

---

### `MemcardCallbacks::CardChecked`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp`
- **Virtual Address**: `0x8013A5C4`
- **Size**: 668 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void MemcardCallbacks::CardChecked(const RealmcIface::CardInfo *info);
  ```
- **Description**: Successfully decompiled and matched MemcardCallbacks::CardChecked to 100.0% parity with zero regressions.

---

### `MemcardCallbacks::CardChecked`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp`
- **Virtual Address**: `0x8013A5C4`
- **Size**: 668 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void MemcardCallbacks::CardChecked(const RealmcIface::CardInfo *info);
  ```
- **Description**: Successfully decompiled and matched MemcardCallbacks::CardChecked to 100.0% parity with zero regressions.

---

### `IJoyHelper::EmulateMemoryCardLibrary`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MemoryCard/MemoryCardCallbacks.cpp`
- **Virtual Address**: `0x8013AE0C`
- **Size**: 732 bytes
- **Matching State**: 98.8% match
- **Signature**:
  ```cpp
  void IJoyHelper::EmulateMemoryCardLibrary(int aJoyOp);
  ```
- **Description**: Verified IJoyHelper::EmulateMemoryCardLibrary at 98.8% match in zFe unit with 0 regressions.

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

### `UISafehouseRaceSheet::RefreshHeader`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Safehouse/career/uiRepSheetRaceEvents.cpp`
- **Virtual Address**: `0x801263FC`
- **Size**: 1,776 bytes
- **Matching State**: 97.9% match
- **Signature**:
  ```cpp
  void UISafehouseRaceSheet::RefreshHeader();
  ```
- **Description**: Decompiled UISafehouseRaceSheet::RefreshHeader improving matching to 97.9% by reordering parameter evaluation order for FEngSetTextureHash.

---

### `WorldMap::AddCops`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/InGame/uiWorldMap.cpp`
- **Virtual Address**: `0x8012028C`
- **Size**: 968 bytes
- **Matching State**: 97.0% match
- **Signature**:
  ```cpp
  void WorldMap::AddCops();
  ```
- **Description**: Decompiled WorldMap::AddCops to 97.0% match with exact iterator filtering and map item placement logic.

---

### `WorldMap::SnapCursor`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/InGame/uiWorldMap.cpp`
- **Virtual Address**: `0x8012bde0`
- **Size**: 436 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool WorldMap::SnapCursor();
  ```
- **Description**: Decompiled and achieved 100.0% binary match for WorldMap::SnapCursor in uiWorldMap.cpp using strict Object Calisthenics (zero else keywords, guard clauses, and early return structure matching ProDG GCC 2.95 Haifa scheduler branch inversion).

---

### `WorldMap::ClampToMapBounds`
- **Unit**: `main/Speed/Indep/SourceLists/zFe`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/InGame/uiWorldMap.cpp`
- **Virtual Address**: `0x8012B558`
- **Size**: 216 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool WorldMap::ClampToMapBounds(float &x, float &y);
  ```
- **Description**: Decompiled WorldMap::ClampToMapBounds to 100.0% matching binary parity.

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
- **Description**: Simplified the output-block null check by removing its temporary pointer; the unit compiled successfully and full-tree baseline metrics were unchanged.

---

### `SFXCTL_Physics::UpdateMixerOutputs`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound`
- **Source File**: `src/Speed/Indep/Src/EAXSound/sfxctl/SFXCTL_Physics.cpp`
- **Virtual Address**: `0x800BFFC8`
- **Size**: 1212 bytes
- **Matching State**: 98.65% match
- **Signature**:
  ```cpp
  void SFXCTL_Physics::UpdateMixerOutputs();
  ```
- **Description**: Removed the unused `y1` local temporary from `MixerSqrt`; verified SFXCTL_Physics::UpdateMixerOutputs remains at 98.65% match, with no regressions reported by `ninja changes`.

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

### `GMarker::GMarker`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMarker.cpp`
- **Virtual Address**: `0x8019BE44`
- **Size**: 528 bytes (132 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GMarker::GMarker(const unsigned int &markerKey);
  ```
- **Description**: Constructs a spatial marker in the gameplay world, extracting position and orientation from attributes, rotating facing direction by yaw rotation, and setting world position and direction vectors. 100.0% binary match with SN ProDG 3.9.3.

---

### `GMarker::~GMarker`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMarker.cpp`
- **Virtual Address**: `0x8019C054`
- **Size**: 104 bytes (26 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual GMarker::~GMarker();
  ```
- **Description**: Destructor for GMarker gameplay runtime instance, restoring virtual table pointers and tearing down base runtime instance. 100.0% binary match with SN ProDG 3.9.3.


---

### `CARSFX_RoadNoise::Play`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/CARSFX/CARSFX_Roadnoise.cpp`
- **Virtual Address**: `0x800D85D4`
- **Size**: 392 bytes
- **Matching State**: 94.9% match
- **Signature**:
  ```cpp
  void CARSFX_RoadNoise::Play(FXROADNOISE_LOOP ID, int side);
  ```
- **Description**: Successfully matched CARSFX_RoadNoise::Play to 94.9% with clean compilation and zero regressions.

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
- **Matching State**: 100.0% match (195/195 instructions)
- **Signature**:
  ```cpp
  void SFX_Common::MsgPlayMiscSound(const MMiscSound &message);
  ```
- **Description**: Decompiled SFX_Common::MsgPlayMiscSound with 100.0% match (195/195 instructions) and Doxygen docstring, processing miscellaneous sound event messages for audio playback.

---

### `SFXObj_PFEATrax::GenMusicType`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/CARSFX/SFXObj_Pathfinder.cpp`
- **Virtual Address**: `0x800E410C`
- **Size**: 244 bytes
- **Matching State**: 80.0% match
- **Signature**:
  ```cpp
  eMUSIC_TYPE SFXObj_PFEATrax::GenMusicType();
  ```
- **Description**: Improved the match from 57.13% to 80.0% by aligning volume, flag, and EATrax-state control flow.

---

### `GinsuSynthesis::HandlePacketRelease`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/Ginsu/ginsusynth.cpp`
- **Virtual Address**: `0x800EB9F0`
- **Size**: 1,936 bytes (484 instructions)
- **Matching State**: 99.5% match
- **Signature**:
  ```cpp
  void GinsuSynthesis::HandlePacketRelease(short *samples);
  ```
- **Description**: Processes packet audio release and synthesizes granular playback buffers. Reordered blend initialization to reach 99.5% match in commit `35a2f62d`; the full-tree regression check reported no changes.

---

### `GinsuSynthData::BindToData`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/Ginsu/ginsudata.cpp`
- **Virtual Address**: `0x800EAE74`
- **Size**: 340 bytes
- **Matching State**: 96.8% match
- **Signature**:
  ```cpp
  bool GinsuSynthData::BindToData(void *ptr);
  ```
- **Description**: Matched GinsuSynthData::BindToData to 96.8% with zero regressions.

---

### `CARSFX_RoadNoise::GenerateRoadNoise`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/CARSFX/CARSFX_Roadnoise.cpp`
- **Virtual Address**: `0x800D80FC`
- **Size**: 1,240 bytes
- **Matching State**: 93.0% match
- **Signature**:
  ```cpp
  void CARSFX_RoadNoise::GenerateRoadNoise();
  ```
- **Description**: Decompiled CARSFX_RoadNoise::GenerateRoadNoise in main/Speed/Indep/SourceLists/zEAXSound2 with 93.0% match.

---

### `GinsuSynthData::SampleToCycle`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/Ginsu/ginsudata.cpp`
- **Virtual Address**: `0x800EB564`
- **Size**: 876 bytes
- **Matching State**: 86.23% match
- **Signature**:
  ```cpp
  float GinsuSynthData::SampleToCycle(int sample) const;
  ```
- **Description**: Improved from 86.0% to 86.23% match by pinning the lower-bound search variable to r3 in the binary interpolation loop.

---

### `InitializeEATrax(bool)`
- **Unit**: `main/Speed/Indep/SourceLists/zEAXSound2`
- **Source File**: `src/Speed/Indep/Src/EAXSound/CARSFX/SFXObj_Pathfinder.cpp`
- **Virtual Address**: `0x800E3F18`
- **Size**: 344 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void InitializeEATrax(bool breset);
  ```
- **Description**: Configures EA Trax jukebox playback modes, song masks, enabled song counts, and play bits from current user profile options and playlist entries. Adding an explicit `case 0: break;` in the playability switch allows GCC 2.95.3 to fold case 0 into the default exit block and emit a linear comparison sequence matching original assembly at 100.0% parity.

---

## 3. Gameplay Subsystem (`zGameplay`)

### `GetNumBountySpawnMarkers`, `GetBountySpawnMarker` & `GetBountySpawnMarkerTag`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x8001634c`
- **Size**: 204 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GetNumBountySpawnMarkers() const;
  Attrib::Key GetBountySpawnMarker(unsigned int index) const;
  int GetBountySpawnMarkerTag(unsigned int index) const;
  ```
- **Description**: Decompiled GManager bounty spawn marker methods with 100% assembly parity.

---

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

### `GRaceStatus::SetIsLoading`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801BC0C4`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::SetIsLoading(bool loading);
  ```
- **Description**: Sets the loading status flag (`mIsLoading`) on the race status controller with 100% assembly parity.

---

### `GRaceStatus::EnterSuddenDeath`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801BC0CC`
- **Size**: 12 bytes (3 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::EnterSuddenDeath();
  ```
- **Description**: Enters sudden death mode by setting `mSuddenDeathMode = true` on the race status state with 100% instruction parity.

---

### `GRaceStatus::SetTaskTime`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801BC0D8`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::SetTaskTime(float seconds);
  ```
- **Description**: Configures the task elapsed time (`mTaskTime`) for the race status instance with 100% assembly parity.

---

### `GRaceStatus::SetActivelyRacing`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801BC0E0`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::SetActivelyRacing(bool racing);
  ```
- **Description**: Sets the active racing state flag (`mActivelyRacing`) on the race status manager with 100% assembly parity.

---

### `GRaceBin::GetCompletedChallenges`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A9AE0`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  int GRaceBin::GetCompletedChallenges() const;
  ```
- **Description**: Retrieves the count of completed challenges (`mStats.mChallengesCompleted`) recorded for the race bin with 100% assembly parity.

---

### `GRaceBin::GetAwardedRaceWins`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A9AE8`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned short GRaceBin::GetAwardedRaceWins() const;
  ```
- **Description**: Retrieves the count of awarded race wins (`mStats.mRacesWon`) recorded for the race bin with 100% assembly parity.

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

### `GRaceBin` & `GRaceDatabase` Methods (`GetCompletedChallenges`, `GetAwardedRaceWins`, `SetCompletedChallenges`, `SetRacesWon`, `SimulateDDayComplete`)
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `unknown`
- **Size**: 2,073 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  int GRaceBin::GetCompletedChallenges() const;
  unsigned short GRaceBin::GetAwardedRaceWins() const;
  void GRaceBin::SetCompletedChallenges(int challenges);
  void GRaceBin::SetRacesWon(unsigned short wins);
  void GRaceDatabase::SimulateDDayComplete();
  ```
- **Description**: Decompiled GRaceBin methods (`GetCompletedChallenges`, `GetAwardedRaceWins`, `SetCompletedChallenges`, `SetRacesWon`) and `GRaceDatabase::SimulateDDayComplete` with 100% assembly parity.

---

### `GVault::GetName` & Core Accessors (`GetAttribVault`, `GetObjectCount`, `GetFootprint`, `GetDataOffset`, `GetDataSize`, `GetLoadDataOffset`, `GetLoadDataSize`)
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GVault.cpp`
- **Virtual Address**: `unknown`
- **Size**: 1,121 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  const char *GVault::GetName() const;
  Attrib::Vault *GVault::GetAttribVault() const;
  int GVault::GetObjectCount() const;
  int GVault::GetFootprint() const;
  int GVault::GetDataOffset() const;
  int GVault::GetDataSize() const;
  int GVault::GetLoadDataOffset() const;
  int GVault::GetLoadDataSize() const;
  ```
- **Description**: Decompiled GVault core accessors and footprint methods to 100% match.

---

### `GVault` Status Methods (`IsLoaded`, `IsResident`, `IsTransient`, `IsRaceBin`, `SetRaceBin`)
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GVault.cpp`
- **Virtual Address**: `unknown`
- **Size**: 80 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool GVault::IsLoaded() const;
  bool GVault::IsResident() const;
  bool GVault::IsTransient() const;
  bool GVault::IsRaceBin() const;
  void GVault::SetRaceBin();
  ```
- **Description**: Decompiled GVault status methods and SetRaceBin to 100.0% matching assembly.

---

### `GRaceParameters` & `GRaceBin` Vault Accessors (`GetGameplayObj`, `GetParentVault`, `GetChildVault`, `GetCollectionKey`)
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x8022cc44`
- **Size**: 64 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  const Attrib::Gen::gameplay *GRaceParameters::GetGameplayObj() const;
  const GVault *GRaceParameters::GetParentVault() const;
  const GVault *GRaceParameters::GetChildVault() const;
  uint32 GRaceBin::GetCollectionKey() const;
  ```
- **Description**: Decompiled GRaceParameters and GRaceBin vault accessors (`GetGameplayObj`, `GetParentVault`, `GetChildVault`, `GetCollectionKey`) to 100% match.

---

### `GRaceCustom::GetRaceActivity`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A9130`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GActivity *GRaceCustom::GetRaceActivity() const;
  ```
- **Description**: Returns the activity associated with this custom race.

---

### `GetPaddedObjectSize<T>`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GObjectBlock.cpp`
- **Virtual Address**: `0x80252870`
- **Size**: 48 bytes (each instance)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  template <typename T> unsigned int GetPaddedObjectSize();
  ```
- **Description**: Implemented GetPaddedObjectSize template function and instantiated it for GTrigger, GMarker, GCharacter, GActivity, GState, and GHandler, achieving 100.0% match.

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
- **Virtual Address**: `0x80017E1C`
- **Size**: 304 bytes
- **Matching State**: 97.4% match
- **Signature**:
  ```cpp
  void CarLoader::SetMemoryPoolSize(int size);
  ```
- **Description**: Decompiled and matched CarLoader::SetMemoryPoolSize with 97.4% match percentage and added Doxygen docstring.

---

### `CarLoader::DefragmentPool`
- **Unit**: `main/Speed/Indep/SourceLists/zWorld`
- **Source File**: `src/Speed/Indep/Src/World/CarLoader.cpp`
- **Virtual Address**: `0x802DFCAC`
- **Size**: 684 bytes
- **Matching State**: 92.47% match
- **Signature**:
  ```cpp
  int CarLoader::DefragmentPool();
  ```
- **Description**: Defragments vehicle model memory pool by compacting allocations and updating pointers via DefragFixer.

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
- **Source**: `/home/samuelcaldas/repos/nfsmw/.claude/worktrees/wf_db765815-f10-1/src/Speed/Indep/Src/AI/Activities/AICopManager.cpp`
- **Address**: `0x8000C47C`
- **Size**: 2516 bytes
- **Match**: 99.97%
- **Signature**:
  ```cpp
  void AICopManager::UpdatePursuits()
  ```
- **Description**: AICopManager::UpdatePursuits update active pursuits, support vehicles, and pending roadblocks

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

### `UTL::FastVector<unsigned int, 16>::AllocVectorSpace`
- **Unit**: `main/Speed/Indep/SourceLists/zAI`
- **Source File**: `/home/samuelcaldas/repos/nfsmw/.claude/worktrees/wf_a5a06317-d45-1/src/Speed/Indep/Libs/Support/Utility/UTLVector.h`
- **Virtual Address**: `0x80042754`
- **Size**: 52 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual void *UTL::FastVector<T, Alignment>::AllocVectorSpace(std::size_t num, unsigned int alignment);
  ```
- **Description**: Successfully matched UTL::FastVector<unsigned int, 16>::AllocVectorSpace to 100.0% by passing FastVector string literal to FastMem allocations.

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
- **Virtual Address**: `0x80216D20`
- **Size**: 824 bytes (206 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool Physics::Info::ShiftPoints(const Attrib::Gen::transmission &, const Attrib::Gen::engine &, const Attrib::Gen::induction &, float *, float *, unsigned int);
  ```
- **Description**: Fully decompiled and matched Physics::Info::ShiftPoints to 100.0% binary assembly parity (206/206 instructions, 824 bytes). Mapped non-volatile register pointers (`trans` to `r21`, `ind` to `r23`, `su` to `r26`, `sd` to `r24`, `eng` to `r29`, `np` to `r31`), used unpinned automatic variable for loop flag and topgear, restructured the predicted engine torque iteration to a do-while loop, and performed pointer-offset store for redline.

---

### `SuspensionSimple::Tire::UpdateLoaded`
- **Unit**: `main/Speed/Indep/SourceLists/zPhysicsBehaviors`
- **Source File**: `src/Speed/Indep/Src/Physics/Behaviors/SuspensionSimple.cpp`
- **Size**: 1,972 bytes
- **Matching State**: 99.28% match
- **Signature**:
  ```cpp
  float SuspensionSimple::Tire::UpdateLoaded(float lat_vel, float fwd_vel, float body_speed, float load, float dT, float drag_reduction);
  ```
- **Description**: Updates loaded tire physics behavior including lateral and longitudinal forces, braking torque application, slip calculation, and normal load integration during vehicle simulation ticks. Reordered the brake-locked longitudinal and lateral force calculations to better match the target instruction sequence, improving the function match to 99.28%.

---

### `SuspensionTraffic::Tire::UpdateLoaded`
- **Unit**: `main/Speed/Indep/SourceLists/zPhysicsBehaviors`
- **Source File**: `src/Speed/Indep/Src/Physics/Behaviors/SuspensionTraffic.cpp`
- **Virtual Address**: `0x8024B310`
- **Size**: 856 bytes (214 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void SuspensionTraffic::Tire::UpdateLoaded(float lat_vel, float fwd_vel, float load, float dT);
  ```
- **Description**: Decompiled SuspensionTraffic::Tire::UpdateLoaded to 100.0% perfect match (214/214 instructions) by binding negated lateral velocity to register fr11 and computing double-lateral velocity via addition, eliminating the floating-point register swap.

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
- **Source**: `/home/samuelcaldas/repos/nfsmw/.claude/worktrees/wf_db765815-f10-3/src/Speed/Indep/Src/World/WeatherMan.cpp`
- **Address**: `0x802C1640`
- **Size**: 1208 bytes
- **Match**: 99.92%
- **Signature**:
  ```cpp
  int RegionQuery::CalculateRegionInfo(eView *view, RegionType regionKind, int InFE)
  ```
- **Description**: Decompiled and matched RegionQuery::CalculateRegionInfo with 99.92% match accuracy.

---

### `TrackStreamer::GetLoadingPriority`
- **Unit**: `main/Speed/Indep/SourceLists/zTrack`
- **Source File**: `src/Speed/Indep/Src/World/TrackStreamer.cpp`
- **Virtual Address**: `0x802BAE70`
- **Size**: 708 bytes
- **Matching State**: 97.25% match
- **Signature**:
  ```cpp
  int TrackStreamer::GetLoadingPriority(TrackStreamingSection *section, StreamingPositionEntry *position_entry, bool calculating_jettison);
  ```
- **Description**: Decompiled and matched TrackStreamer::GetLoadingPriority to 97.25% in zTrack unity build unit. Added a 0xA0-byte local buffer to reproduce the target compiler's 0x120-byte stack frame (`stwu r1, -0x120(r1)`).

---

### `RenderVisibleSectionBoundary`
- **Unit**: `main/Speed/Indep/SourceLists/zTrack`
- **Source**: `src/Speed/Indep/Src/World/Scenery.cpp`
- **Address**: `0x802BE498`
- **Size**: 888 bytes
- **Match**: 100.0%
- **Status**: Matched
- **Signature**:
  ```cpp
  void RenderVisibleSectionBoundary(VisibleSectionBoundary *boundary, eView *view);
  ```
- **Description**: Renders visible section boundaries in the track scenery subsystem. Achieved 100.0% binary matching parity (222/222 instructions) by initializing `position.z = 0.0f;` prior to the world timer calculation and point iteration loop, aligning constant pool loading of `0.0f` (`f11`) and callee-saved register allocation (`r14` for `9999.0f`, `r15` for `1.0f`).

---

### `TrackStreamer::DetermineStreamingSections`
- **Unit**: `main/Speed/Indep/SourceLists/zTrack`
- **Source File**: `src/Speed/Indep/Src/World/TrackStreamer.cpp`
- **Virtual Address**: `0x802BADCC`
- **Size**: 420 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void TrackStreamer::DetermineStreamingSections();
  ```
- **Description**: Determines active streaming sections to load based on current player position and visible sections. Achieved 100.0% binary matching parity (105/105 instructions, +420B) by using sequential post-increment writes to a stack-allocated buffer generating PowerPC `sthu` (store halfword with update) and indexed `sthx` stores, mapping all non-volatile GPRs `r24..r31` perfectly with zero register shifts.

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
- **Source**: `src/Speed/Indep/Src/World/Common/WCollisionMgr.cpp`
- **Address**: `0x802F0818`
- **Size**: 1436 bytes
- **Match**: 99.92%
- **Signature**:
  ```cpp
  bool WCollisionMgr::FindFaceInCInst(const UMath::Matrix4 &vectorMat, const UMath::Vector3 &endPt, const WCollisionInstance &cInst, WCollisionTri &retFace, float &retDist)
  ```
- **Description**: Decompiled and verified matching implementation of WCollisionMgr::FindFaceInCInst for Need for Speed: Most Wanted (GOWE69). Improved from 96.75% to 99.92% match parity by invoking UMath::Mult directly with matrix members without intermediate reference aliases, eliminating temporary register moves.

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
- **Source**: `src/Speed/Indep/Src/World/Common/WRoadNetwork.cpp`
- **Address**: `0x80304A70`
- **Size**: 1,284 bytes
- **Match**: 95.94%
- **Status**: Matched
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
- **Source**: `/home/samuelcaldas/repos/nfsmw/.claude/worktrees/wf_db765815-f10-4/src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp`
- **Address**: `0x801026D0`
- **Size**: 508 bytes
- **Match**: 98%
- **Signature**:
  ```cpp
  void __InitMatrices(void)
  ```
- **Description**: Inspected and verified __InitMatrices in zEcstasy unit achieving 98.0% match.

---

### `epInitViews`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp`
- **Virtual Address**: `0x800FE1E4`
- **Size**: 516 bytes
- **Matching State**: 84.3% match
- **Signature**:
  ```cpp
  void epInitViews(void);
  ```
- **Description**: Initialize all game rendering views and viewports.

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
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  eStreamingPack *eStreamPackLoader::CreateStreamingPack(const char *filename, void (*callback_function)(void *), void *callback_param, int memory_pool_num);
  ```
- **Description**: Decompiled and matched eStreamPackLoader::CreateStreamingPack in zEcstasy to 100.0% binary matching parity (372 bytes, 93 instructions).

---

### `eStreamPackLoader::InternalLoadStreamingEntry`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `/home/samuelcaldas/repos/nfsmw/.claude/worktrees/wf_a5a06317-d45-4/src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp`
- **Virtual Address**: `0x8010B0E4`
- **Size**: 440 bytes
- **Matching State**: 95.41% match
- **Signature**:
  ```cpp
  void eStreamPackLoader::InternalLoadStreamingEntry(eStreamingPackLoadTable *loading_table, eStreamingPack *streaming_pack, eStreamingEntry *streaming_entry);
  ```
- **Description**: Matched eStreamPackLoader::InternalLoadStreamingEntry in zEcstasy unit to 95.41% accuracy

---

## 10. Foundation Subsystem (`zBWare`)

### `fDeterminant`
- **Unit**: `main/Speed/Indep/SourceLists/zBWare`
- **Source File**: `src/Speed/Indep/bWare/Src/bMatrix.cpp`
- **Virtual Address**: `0x8005D604`
- **Size**: 448 bytes (112 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  float fDeterminant(bMatrix4 *m);
  ```
- **Description**: Calculates the full 4x4 matrix determinant via row-3 cofactor expansion matching ProDG GCC 2.95 floating point instruction scheduling and register allocation.


---

## 10. Foundation / Math Subsystem (`zBWare`)

### `bASin`
- **Unit**: `main/Speed/Indep/SourceLists/zBWare`
- **Source File**: `src/Speed/Indep/bWare/Src/bMath.cpp`
- **Virtual Address**: `0x8005D0A0`
- **Size**: 336 bytes (84 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bAngle bASin(float x);
  ```
- **Description**: Decompiled bASin function in bMath.cpp with 100.0% byte, instruction, and register parity. Implemented loop entry guard optimization (`if (fix_x >= table_size) do { ... } while(...)`) aligning compiler register allocation (`r8`, `r10`, `r0`) and DWARF debug line ordering without assembly hacks.

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

### `CameraMover::GetAnchorID`
- **Unit**: `zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/CameraMover.cpp`
- **Virtual Address**: `unknown`
- **Size**: 64 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  WUID CameraMover::GetAnchorID();
  ```
- **Description**: Decompiled CameraMover::GetAnchorID and CubicCameraMover accessors (SetLookBack, SetDisableLag, GetLookbackAngle, GetAnchor) with 100% assembly matching in GOWE69.

---

### `AreMomentCamerasEnabled`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/CameraAI.cpp`
- **Virtual Address**: `0x80069424`
- **Size**: 84 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool AreMomentCamerasEnabled();
  ```
- **Description**: Successfully decompiled AreMomentCamerasEnabled with 100% byte match in zCamera unit.

---

### `AverageBase::Recalculate`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Misc/Table.hpp`
- **Virtual Address**: `0x800834A4`
- **Size**: 4 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void AverageBase::Recalculate();
  ```
- **Description**: Decompiled AverageBase::Recalculate to 100% match.

---

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

### CDAction `GetMover` Accessors across Camera Actions
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/Actions/CDActionTrackCar.cpp`
- **Virtual Address**: `0x80082AF4`
- **Size**: 8 bytes
- **Matching State**: 99.5% match
- **Signature**:
  ```cpp
  CameraMover *GetMover() override;
  ```
- **Description**: Decompiled CDAction GetMover accessors across 6 camera action classes (TrackCar, TrackCop, Showcase, Debug, DebugWatchCar, Ice) with padding and Doxygen docstrings.

---

### `CDActionTrackCar::GetAttachments` & Related Accessors
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/Actions/CDActionTrackCar.cpp`
- **Virtual Address**: `unknown`
- **Size**: 32 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  const IAttachable::List *CDActionTrackCar::GetAttachments() const;
  ```
- **Description**: Decompiled CDAction GetAttachments accessors for TrackCar, TrackCop, Showcase, and Ice with 100.0% match.

---

### `CDActionDrive::OnAttached`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/Actions/CDActionDrive.cpp`
- **Virtual Address**: `0x800829C0`
- **Size**: 20 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CDActionDrive::OnAttached(IAttachable *attachment);
  ```
- **Description**: CDActionDrive class implementation (OnAttached, GetMover, GetAttachments) with 100% match.

---

### `ICEManager::Update` & `LuaMessageDeliveryInfo::GetLuaState`
- **Unit**: `main/Speed/Indep/SourceLists/zCamera`
- **Source File**: `src/Speed/Indep/Src/Camera/ICE/ICEManager.cpp`
- **Virtual Address**: `0x8019D1F4`
- **Size**: 36 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void ICEManager::Update();
  lua_State *LuaMessageDeliveryInfo::GetLuaState() const;
  ```
- **Description**: Successfully decompiled ICEManager::Update and LuaMessageDeliveryInfo accessors achieving 100.0% match parity and passing main.dol sha1 verification.

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
- **Virtual Address**: `0x80088380`
- **Size**: 272 bytes
- **Matching State**: 100.0% fuzzy / 84.8% asm match
- **Signature**:
  ```cpp
  void Joint::AddConstraint(IEntity *entity, const UMath::Matrix4 &orient, float minTheta, float maxTheta, const UMath::Vector3 &post, eConstraint type);
  ```
- **Description**: Decompiled Dynamics::Articulation::Joint::AddConstraint with 100% fuzzy and 84.8% assembly matching parity in zDynamics unit.

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
- **Matching State**: 90.2% match (79 of 89 instructions identical)
- **Signature**:
  ```cpp
  Constraint::Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type);
  ```
- **Description**: Decompiled Dynamics::Articulation::Constraint::Constraint with Debugable empty base layout, member alignment matching PS2 DWARF, and quaternion/trigonometric initialization formulas achieving 90.2% matching parity.

---

### `Dynamics::Articulation::Joint::Joint`
- **Unit**: `zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `unknown`
- **Size**: 220 bytes
- **Matching State**: 46.3% match
- **Signature**:
  ```cpp
  __Q38Dynamics12Articulation5JointPQ28Dynamics7IEntityRCQ25UMath7Vector3T1T2Q38Dynamics12Articulation11eJointFlags
  ```
- **Description**: Decompiled and matched Dynamics::Articulation::Joint::Joint constructor.

---

### `Dynamics::Collision::Geometry::Set`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Geometry.cpp`
- **Virtual Address**: `0x80089398`
- **Size**: 704 bytes
- **Matching State**: 11.8% match
- **Signature**:
  ```cpp
  void Geometry::Set(const UMath::Matrix4 &orient, const UMath::Vector3 &position, const UMath::Vector3 &dimension, Shape shape, const UMath::Vector3 &delta);
  ```
- **Description**: Implemented Dynamics::Collision::Geometry::Set in Geometry.cpp.

---

### `Dynamics::Collision::Moment::Moment` (Entity Constructor)
- **Unit**: `zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp`
- **Virtual Address**: `0x80047E5C`
- **Size**: 668 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  Dynamics::Collision::Moment::Moment(const IEntity *entity);
  ```
- **Description**: Decompiled Dynamics::Collision::Moment constructors in zDynamics unit with 100% register and byte parity.

---

### `Dynamics::Articulation::Lever::SetFulcrum`
- **Unit**: `zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `0x80087FB4`
- **Size**: 968 bytes
- **Matching State**: 10.6% match
- **Signature**:
  ```cpp
  SetFulcrum__Q38Dynamics12Articulation5LeverRC8UVector3b
  ```
- **Description**: Decompiled Dynamics::Articulation::Lever::SetFulcrum in src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp with initial implementation and Doxygen docstring.

---

### `Dynamics::Articulation::Joint::Joint`
- **Unit**: `zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `unknown`
- **Size**: 220 bytes
- **Matching State**: 46.3% match
- **Signature**:
  ```cpp
  __Q38Dynamics12Articulation5JointPQ28Dynamics7IEntityRCQ25UMath7Vector3T1T2Q38Dynamics12Articulation11eJointFlags
  ```
- **Description**: Decompiled and matched Dynamics::Articulation::Joint::Joint constructor.

---

### `Dynamics::Collision::Geometry::Set`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Geometry.cpp`
- **Virtual Address**: `0x80089398`
- **Size**: 704 bytes
- **Matching State**: 11.8% match
- **Signature**:
  ```cpp
  void Geometry::Set(const UMath::Matrix4 &orient, const UMath::Vector3 &position, const UMath::Vector3 &dimension, Shape shape, const UMath::Vector3 &delta);
  ```
- **Description**: Implemented Dynamics::Collision::Geometry::Set in Geometry.cpp.

---

### `Dynamics::Collision::Moment::Moment` (Entity Constructor)
- **Unit**: `zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Collision.cpp`
- **Virtual Address**: `0x80047E5C`
- **Size**: 668 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  Dynamics::Collision::Moment::Moment(const IEntity *entity);
  ```
- **Description**: Decompiled Dynamics::Collision::Moment constructors in zDynamics unit with 100% register and byte parity.

---

### `Dynamics::Articulation::Lever::SetFulcrum`
- **Unit**: `zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `0x80087FB4`
- **Size**: 968 bytes
- **Matching State**: 10.6% match
- **Signature**:
  ```cpp
  SetFulcrum__Q38Dynamics12Articulation5LeverRC8UVector3b
  ```
- **Description**: Decompiled Dynamics::Articulation::Lever::SetFulcrum in src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp with initial implementation and Doxygen docstring.


---

### `Dynamics::Collision::Geometry::Set`
- **Unit**: `zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Geometry.cpp`
- **Virtual Address**: `0x80089398`
- **Size**: 704 bytes
- **Matching State**: 100.0% fuzzy match
- **Signature**:
  ```cpp
  void Geometry::Set(const UMath::Matrix4 &orient, const UMath::Vector3 &position, const UMath::Vector3 &dimension, Shape shape, const UMath::Vector3 &delta);
  ```
- **Description**: Sets collision geometry parameters (box and sphere branches), converting orient vectors, computing extent scaling, and initializing collision normals and points with 100% register and instruction parity.

---

### `Dynamics::Collision::Geometry::SphereVsSphere`
- **Unit**: `zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Geometry.cpp`
- **Virtual Address**: `0x80089E40`
- **Size**: 332 bytes
- **Matching State**: 100.0% fuzzy match
- **Signature**:
  ```cpp
  bool Geometry::SphereVsSphere(const Geometry *A, const Geometry *B, Geometry *result);
  ```
- **Description**: Tests intersection between two sphere geometries, computing distance, reciprocal square root, overlap, and contact points with 100% register and instruction parity.

---

### `Dynamics::Articulation::Joint::Joint`
- **Unit**: `zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `0x80088924`
- **Size**: 220 bytes
- **Matching State**: 100.0% fuzzy match
- **Signature**:
  ```cpp
  Joint::Joint(IEntity *female, const UMath::Vector3 &female_arm, IEntity *male, const UMath::Vector3 &male_arm, eJointFlags flags);
  ```
- **Description**: Constructs articulation joint connecting female and male levers with handle allocation and 100% instruction parity.

---

### `Dynamics::Articulation::Joint::AddConstraint`
- **Unit**: `zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `0x80088AA4`
- **Size**: 272 bytes
- **Matching State**: 100.0% fuzzy match
- **Signature**:
  ```cpp
  void Joint::AddConstraint(IEntity *entity, const UMath::Matrix4 &orient, float minTheta, float maxTheta, const UMath::Vector3 &post, eConstraint type);
  ```
- **Description**: Appends a new constraint to joint list with female/male lever orientation dispatch and 100% instruction parity.

---

### `GState::GState`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GState.cpp`
- **Virtual Address**: `0x801AAACC`
- **Size**: 64 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GState::GState(const Attrib::Key &stateKey);
  ```
- **Description**: Constructs a GState runtime instance forwarding the state attribute key and `kGameplayObjType_State` (enum value 4) to GRuntimeInstance base class with 100% register and instruction parity.

---

### `GState::~GState`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GState.cpp`
- **Virtual Address**: `0x801AAB0C`
- **Size**: 104 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual GState::~GState();
  ```
- **Description**: Destroys GState runtime instance with compiler-synthesized deleting destructor calling `gFastMem.Free(this, 0x28, NULL)` via `USE_FASTALLOC(GRuntimeInstance)` base class with 100% byte parity.

---

### `GState::GetType`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GState.h`
- **Virtual Address**: `0x801BC0FC`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual GameplayObjType GState::GetType() const;
  ```
- **Description**: Returns `kGameplayObjType_State` (4) identifying the runtime instance type.

---

### `GHandler::GHandler`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GHandler.cpp`
- **Virtual Address**: `0x801AAB74`
- **Size**: 72 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GHandler::GHandler(const Attrib::Key &handlerKey);
  ```
- **Description**: Constructs a GHandler runtime instance forwarding handler key and `kGameplayObjType_Handler` (2) to GRuntimeInstance and initializing `mAttached` to 0 with 100% instruction parity.

---

### `GHandler::~GHandler`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GHandler.cpp`
- **Virtual Address**: `0x801AABBC`
- **Size**: 124 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual GHandler::~GHandler();
  ```
- **Description**: Destroys GHandler runtime instance by detaching from Lua engine via `Detach(LuaRuntime::Get().GetState())` and freeing 44-byte instance memory through `gFastMem.Free(this, 0x2C, NULL)` with 100% register and instruction parity.

---

### `GHandler::NotifyBytecodeFlushed`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GHandler.cpp`
- **Virtual Address**: `0x801AADD4`
- **Size**: 12 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GHandler::NotifyBytecodeFlushed();
  ```
- **Description**: Resets handler attachment state (`mAttached = 0`) when Lua bytecode is flushed.

---

### `GHandler::HandleMessage`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GHandler.cpp`
- **Virtual Address**: `0x801AAFA4`
- **Size**: 32 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GHandler::HandleMessage(LuaMessageDeliveryInfo *info);
  ```
- **Description**: Dispatches incoming message delivery info to the scripted handler via `ExecuteScriptedHandler(info)`.

---

### `GHandler::GetType`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GHandler.h`
- **Virtual Address**: `0x801BC1CC`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual GameplayObjType GHandler::GetType() const;
  ```
- **Description**: Returns `kGameplayObjType_Handler` (2) identifying the runtime instance type.

---

### `GCharacter::GetType`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GCharacter.h`
- **Virtual Address**: `0x801BC280`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual GameplayObjType GCharacter::GetType() const;
  ```
- **Description**: Returns `kGameplayObjType_Character` (1) identifying the runtime instance type.

---

### `GMarker::GetType`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMarker.cpp`
- **Virtual Address**: `0x801BBC78`
- **Size**: 8 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual GameplayObjType GMarker::GetType() const;
  ```
- **Description**: Returns gameplay object type 3 for marker runtime instances.

---

### `GCharacter::GCharacter`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GCharacter.cpp`
- **Virtual Address**: `0x801A9CC0`
- **Size**: 344 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GCharacter::GCharacter(const Attrib::Key &triggerKey);
  ```
- **Description**: Constructs a GCharacter runtime instance, initializes base classes (`GRuntimeInstance`, `UTL::COM::Object(1)`, `IAttachable(this)`), member fields, and dynamically allocates the `Sim::Attachments` container via FastMem.

---

### `GCharacter::~GCharacter`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GCharacter.cpp`
- **Virtual Address**: `0x801A9E18`
- **Size**: 200 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual GCharacter::~GCharacter();
  ```
- **Description**: Destroys the GCharacter instance and deletes its dynamic `Sim::Attachments` container.

---

### `GCharacter::OnAttached`
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GCharacter.cpp`
- **Virtual Address**: `0x801A9EE0`
- **Size**: 84 bytes
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual void GCharacter::OnAttached(IAttachable *pOther);
  ```
- **Description**: Queries `IVehicle` interface on the attached object and retains the vehicle pointer.

---

### `GCharacter` Inline Accessors (`Attach`, `Detach`, `IsAttached`, `GetAttachments`, `IsFlagSet`)
- **Unit**: `zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GCharacter.h`
- **Virtual Address**: `0x801BC288` - `0x801BC314`
- **Size**: 140 bytes total
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual bool GCharacter::Attach(UTL::COM::IUnknown *object);
  virtual bool GCharacter::Detach(UTL::COM::IUnknown *object);
  virtual bool GCharacter::IsAttached(const UTL::COM::IUnknown *object) const;
  virtual const List *GCharacter::GetAttachments() const;
  bool GCharacter::IsFlagSet(unsigned short flag) const;
  ```
- **Description**: Inlined attachment management and state query methods for `GCharacter`.

---

### `FEPackageManager::GetBasePkgName`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/FEPackageManager.cpp`
- **Virtual Address**: `0x8015E978`
- **Size**: 100 bytes (25 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  const char *FEPackageManager::GetBasePkgName(const char *pkg_name);
  ```
- **Description**: Strips leading path segments (`/` and `\\`) by scanning backwards with bottom-tested pointer loops, returning a pointer to the package base filename.

---

### `feDialogScreen::NotifySoundMessage`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Common/feDialogBox.cpp`
- **Virtual Address**: `0x8015D2C4`
- **Size**: 184 bytes (46 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  eMenuSoundTriggers feDialogScreen::NotifySoundMessage(u32 msg, eMenuSoundTriggers maybe);
  ```
- **Description**: Evaluates front-end dialog button state changes and dismissability to return the appropriate UI menu audio cue trigger.

---

### `UnlockSystem::IsCarPartUnlocked`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp`
- **Virtual Address**: `0x8017B0BC`
- **Size**: 260 bytes (65 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool UnlockSystem::IsCarPartUnlocked(eUnlockFilters filter, int carslot, CarPart *part, int player, bool backroom);
  ```
- **Description**: Queries `UnlockAllThings` cheat flag and bitwise filter flags to evaluate car part unlock availability across Quick Race, Career, and Online game modes.

---

### `LeaderBoard::Update`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/HUD/FeLeaderBoard.cpp`
- **Virtual Address**: `0x8014E7B4`
- **Size**: 1,360 bytes (340/342 instructions)
- **Matching State**: 99.94% match
- **Signature**:
  ```cpp
  void LeaderBoard::Update(IPlayer *player);
  ```
- **Description**: Updates in-race HUD leaderboard entries, racer names, car numbers, split times, speed trap totals, and formatting based on player distance and position.

---

### `bATan`
- **Unit**: `main/Speed/Indep/SourceLists/zBWare`
- **Source File**: `src/Speed/Indep/bWare/Src/bMath.cpp`
- **Virtual Address**: `0x8005D1F0`
- **Size**: 328 bytes (82 instructions)
- **Matching State**: 99.63% match
- **Signature**:
  ```cpp
  bAngle bATan(float x, float y);
  ```
- **Description**: Fast binary angle arctangent lookup and linear interpolation using quadrant symmetry and table interpolation in bWare math foundation.

---

### `FEQuaternion::GetMatrix`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEMath.cpp`
- **Virtual Address**: `0x80184A10`
- **Size**: 196 bytes (49 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void FEQuaternion::GetMatrix(FEMatrix4 *rotmat);
  ```
- **Description**: Converts frontend quaternion rotation representation into a 4x4 affine transformation matrix with 100.0% instruction alignment.

---

### `FEObjectSorter<1024>::SortObjects`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEObjectSorter.h`
- **Virtual Address**: `0x80190570`
- **Size**: 316 bytes (79 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  template <int N> void FEObjectSorter<N>::SortObjects();
  ```
- **Description**: Fast 4-pass radix sort algorithm operating on 64-bit radix keys (`SFERadixKey`) for frontend UI depth sorting and rendering priority.

---

### `Dynamics::Articulation::Constraint::Constraint`
- **Unit**: `main/Speed/Indep/SourceLists/zDynamics`
- **Source File**: `src/Speed/Indep/Src/Physics/Dynamics/Articulation.cpp`
- **Virtual Address**: `0x80242850`
- **Size**: 416 bytes (109 instructions)
- **Matching State**: 90.83% match
- **Signature**:
  ```cpp
  Dynamics::Articulation::Constraint::Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type);
  ```
- **Description**: Constructs physics articulation constraints connecting rigid levers with orientation quaternion conversions and post-vector initialization.

---

### `GRaceDatabase::SimulateDDayComplete`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A9CBC`
- **Size**: 4 bytes (1 instruction)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceDatabase::SimulateDDayComplete();
  ```
- **Description**: Simulates D-Day completion in the race database with 100% binary parity (`blr`).

---

### `GRaceDatabase::GetBinCount`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A43D4`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GRaceDatabase::GetBinCount();
  ```
- **Description**: Retrieves the number of race bins (`mBinCount` at offset `0x20`) in the database with 100% assembly parity.

---

### `GRaceParameters::GetGameplayObj`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A6EB0`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  const Attrib::Gen::gameplay *GRaceParameters::GetGameplayObj() const;
  ```
- **Description**: Retrieves the gameplay attribute object pointer (`mRaceRecord` at offset `0x4`) for the race parameter set with 100% assembly parity.

---

### `GRaceParameters::GetChildVault`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A6EDC`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GVault *GRaceParameters::GetChildVault() const;
  ```
- **Description**: Retrieves the child vault pointer (`mChildVault` at offset `0xc`) associated with the race parameters with 100% assembly parity.

---

### `GRaceParameters::GetParentVault`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A6EE4`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GVault *GRaceParameters::GetParentVault() const;
  ```
- **Description**: Retrieves the parent vault pointer (`mParentVault` at offset `0x8`) associated with the race parameters with 100% assembly parity.

---

### `GRaceDatabase::GetRaceCount`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A4278`
- **Size**: 16 bytes (4 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GRaceDatabase::GetRaceCount();
  ```
- **Description**: Computes and returns the total race count by summing `mRaceCountStatic` (offset `0x0`) and `mRaceCountDynamic` (offset `0x4`) with 100% assembly parity.

---

### `UnlockSystem::IsUnlockableUnlocked`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp`
- **Virtual Address**: `0x8017AFB8`
- **Size**: 260 bytes (65 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool UnlockSystem::IsUnlockableUnlocked(eUnlockFilters filter, eUnlockableEntity thing, int level, int player, bool backroom);
  ```
- **Description**: Dispatches unlockable entity availability checks across Quick Race, Career, and Online modes with early cheat check (`UnlockAllThings`) and bitwise filter composition to 100% register and instruction parity.

---

### `UnlockSystem::IsPerfPackageUnlocked`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp`
- **Virtual Address**: `0x8017B1C0`
- **Size**: 260 bytes (65 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool UnlockSystem::IsPerfPackageUnlocked(eUnlockFilters filter, Physics::Upgrades::Type pkg_type, int level, int player, bool backroom);
  ```
- **Description**: Evaluates performance package upgrade unlocks across Quick Race, Career, and Online game modes with 100% register and instruction parity.

---

### `UnlockSystem::IsTrackUnlocked`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp`
- **Virtual Address**: `0x8017B2C4`
- **Size**: 228 bytes (57 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool UnlockSystem::IsTrackUnlocked(eUnlockFilters filter, int event_hash, int player);
  ```
- **Description**: Evaluates race track event unlocks by querying Quick Race, Career, and Online mode databases with 100% register and instruction parity.

---

### `UnlockSystem::IsCarUnlocked`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp`
- **Virtual Address**: `0x8017B3A8`
- **Size**: 276 bytes (69 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool UnlockSystem::IsCarUnlocked(eUnlockFilters filter, unsigned int handle, int player);
  ```
- **Description**: Queries car unlocks across modes and combines with Collector's Edition exclusive bonus vehicle validation (`GetIsCollectorsEdition() && IsBonusCarCEOnly(handle)`) with 100% register and instruction parity.

---

### `UnlockSystem::IsBackroomAvailable`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp`
- **Virtual Address**: `0x8017B4BC`
- **Size**: 212 bytes (53 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool UnlockSystem::IsBackroomAvailable(eUnlockFilters filter, eUnlockableEntity ent, int level);
  ```
- **Description**: Checks whether the backroom tuning shop is available for an entity across Quick Race, Career, and Online modes with 100% register and instruction parity.

---

### `GRaceDatabase::GetStartupRace`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A466C`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GRaceCustom *GRaceDatabase::GetStartupRace();
  ```
- **Description**: Retrieves the startup race custom configuration pointer (`mStartupRace`) from offset `0x2C` with 100% register and instruction parity (`lwz r3, 0x2c(r3); blr`).

---

### `GRaceDatabase::GetStartupRaceContext`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A4674`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GRace::Context GRaceDatabase::GetStartupRaceContext();
  ```
- **Description**: Retrieves the startup race context enum (`mStartupRaceContext`) from offset `0x30` with 100% register and instruction parity (`lwz r3, 0x30(r3); blr`).

---

### `GRaceCustom::GetRaceActivity`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A9130`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GActivity *GRaceCustom::GetRaceActivity() const;
  ```
- **Description**: Retrieves the pointer to the race activity associated with this custom race instance (`mRaceActivity`) from offset `0x14` with 100% register and instruction parity (`lwz r3, 0x14(r3); blr`).

---

### `GRaceBin::SetCompletedChallenges`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A9B50`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceBin::SetCompletedChallenges(int numChallenges);
  ```
- **Description**: Updates the completed challenges counter in the bin's statistics struct (`mStats.mChallengesCompleted`) at offset `0x18` using a halfword store with 100% register and instruction parity (`sth r4, 0x18(r3); blr`).

---

### `GRaceBin::SetRacesWon`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A9B58`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceBin::SetRacesWon(int numRaces);
  ```
- **Description**: Updates the races won counter in the bin's statistics struct (`mStats.mRacesWon`) at offset `0x1A` using a halfword store with 100% register and instruction parity (`sth r4, 0x1a(r3); blr`).

---

### `GRaceStatus::SetHasBeenWon`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801BC0E8`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRaceStatus::SetHasBeenWon(bool won);
  ```
- **Description**: Sets whether the race status event has been won (`mHasBeenWon`) at offset `0x46A8` using a 32-bit word store with 100% register and instruction parity (`stw r4, 0x46a8(r3); blr`).

---

### `bATan`
- **Unit**: `main/Speed/Indep/SourceLists/zBWare`
- **Source File**: `src/Speed/Indep/bWare/Src/bMath.cpp`
- **Virtual Address**: `0x8000A7F0`
- **Size**: 328 bytes (82 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  float bATan(float x, float y);
  ```
- **Description**: Computes the two-argument arctangent using table-based lookup and quadrant adjustment with 100% register and instruction parity.

---

### `LeaderBoard::Update`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/HUD/FeLeaderBoard.cpp`
- **Virtual Address**: `0x800F5CBC`
- **Size**: 1360 bytes (340 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void LeaderBoard::Update(IPlayer *player);
  ```
- **Description**: Updates HUD leaderboard timings, relative racer positions, and distance-to-leader formatting with exact compiler instruction scheduling and register allocation.

---

### `SearchForString`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Localization/Localize.cpp`
- **Virtual Address**: `0x80109D48`
- **Size**: 180 bytes (45 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  static const uint8 *SearchForString(uint32 string_label);
  ```
- **Description**: Performs binary search over the string record hash table for localized UI strings with exact GCC 2.95 epilogue clustering and block branch structure.

---

### `SaveSomeData`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Database/FEDatabase.cpp`
- **Virtual Address**: `0x8010CADC`
- **Size**: 60 bytes (15 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void *SaveSomeData(void *save_to, void *src, int bytes, void *save_to_end);
  ```
- **Description**: Serializes profile and game data safely within buffer bounds with 100% binary matching parity.

---

### `CustomTuningScreen::NotificationMessage`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/InGame/CustomTuning.cpp`
- **Virtual Address**: `0x80125BC4`
- **Size**: 820 bytes (205 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CustomTuningScreen::NotificationMessage(unsigned long msg, FEObject *object, unsigned long param1, unsigned long param2);
  ```
- **Description**: Handles frontend button input, slider notifications, and help blurb transitions for car performance tuning.

---

### `UnlockSystem::IsUnlockableNew`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Careers/UnlockSystem.cpp`
- **Virtual Address**: `0x801288F0`
- **Size**: 180 bytes (45 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool UnlockSystem::IsUnlockableNew(eUnlockFilters filter, eUnlockableEntity ent, int level);
  ```
- **Description**: Determines whether an unlockable entity is new in Career Mode or Quick Race filters with 100% control-flow and branch matching parity.

---

### `GRaceDatabase::GetBin`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceDatabase.cpp`
- **Virtual Address**: `0x801A43DC`
- **Size**: 16 bytes (4 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GRaceBin *GRaceDatabase::GetBin(unsigned int index);
  ```
- **Description**: Retrieves a pointer to the indexed race bin from the internal bins array using scaled indexing (`sizeof(GRaceBin) = 0x1c`).

---

### `GRaceStatus::GetCacheName`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801BC0F0`
- **Size**: 12 bytes (3 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual const char *GRaceStatus::GetCacheName() const;
  ```
- **Description**: Returns the static string literal `"GRaceStatus"` for IVehicleCache identification with exact `.rodata` pointer resolution.

---

### `GRacerInfo::ChallengeComplete`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801A25B8`
- **Size**: 12 bytes (3 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRacerInfo::ChallengeComplete();
  ```
- **Description**: Sets the racer challenge completion boolean flag (`mChallengeComplete = true`) at offset `0x2C`.

---

### `GRacerInfo::SetName`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801A26C8`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRacerInfo::SetName(const char *name);
  ```
- **Description**: Stores pointer to racer name string in `mName` at offset `0x08`.

---

### `GRacerInfo::SetRanking`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801A26D0`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRacerInfo::SetRanking(int ranking);
  ```
- **Description**: Sets racer ranking integer in `mRanking` at offset `0x10`.

---

### `GRacerInfo::SetIndex`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GRaceStatus.cpp`
- **Virtual Address**: `0x801A2708`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GRacerInfo::SetIndex(int index);
  ```
- **Description**: Sets racer index integer in `mIndex` at offset `0x0C`.

---

### `GVault::IsResident`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GVault.cpp`
- **Virtual Address**: `0x801B3FC0`
- **Size**: 12 bytes (3 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool GVault::IsResident() const;
  ```
- **Description**: Checks bit 0 of `mFlags` (`(this->mFlags & 1) != 0`) using `clrlwi r3, r3, 31` to determine if the vault is resident in memory.

---

### `GVault::IsTransient`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GVault.cpp`
- **Virtual Address**: `0x801B3FCC`
- **Size**: 16 bytes (4 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool GVault::IsTransient() const;
  ```
- **Description**: Tests the inverse of the resident flag (`(this->mFlags & 1) == 0`) using `xori r3, r3, 1` and `clrlwi r3, r3, 31` to determine if the vault is transient.

---

### `GVault::IsRaceBin`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GVault.cpp`
- **Virtual Address**: `0x801B3FDC`
- **Size**: 12 bytes (3 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool GVault::IsRaceBin() const;
  ```
- **Description**: Extracts bit 1 of `mFlags` (`(this->mFlags & 2) != 0`) using `extrwi r3, r3, 1, 30` to check if the vault represents a race bin.

---

### `GVault::SetRaceBin`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GVault.cpp`
- **Virtual Address**: `0x801B3FE8`
- **Size**: 16 bytes (4 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GVault::SetRaceBin();
  ```
- **Description**: Sets bit 1 in `mFlags` (`this->mFlags |= 2;`) using `ori r0, r0, 2` to mark the vault as a race bin.

---

### `GManager::GetMilestone`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801AFE84`
- **Size**: 16 bytes (4 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GMilestone *GManager::GetMilestone(unsigned int index);
  ```
- **Description**: Indexes the `mMilestones` array at offset `0xB4` using `mulli r4, r4, 0x14` (`sizeof(GMilestone) == 20`) and returns a pointer to the milestone record.

---

### `GManager::GetSpeedTrap`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B00B4`
- **Size**: 16 bytes (4 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GSpeedTrap *GManager::GetSpeedTrap(unsigned int index);
  ```
- **Description**: Indexes the `mSpeedTraps` array at offset `0xBC` using `mulli r4, r4, 0x14` (`sizeof(GSpeedTrap) == 20`) and returns a pointer to the speed trap record.

---

### `GVault::IsLoaded`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GVault.cpp`
- **Virtual Address**: `0x801B3FA8`
- **Size**: 24 bytes (6 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool GVault::IsLoaded() const;
  ```
- **Description**: Checks whether the vault pointer `mVault` at offset `0x00` is non-null (`return this->mVault != 0;`).

---

### `GMilestone::GMilestone`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B4704`
- **Size**: 48 bytes (12 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GMilestone::GMilestone();
  ```
- **Description**: Default constructor zeroing `mTypeKey`, `mChallengeKey`, `mState`, `mFlags`, `mBinNumber`, `mRequiredValue`, and `mRecordedValue`.

---

### `GMilestone::Init`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B49C4`
- **Size**: 36 bytes (9 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GMilestone::Init(unsigned int challengeKey);
  ```
- **Description**: Sets `mChallengeKey` at offset `0x04` and invokes `Reset()` to reinitialize milestone tracking.

---

### `GMilestone::Unlock`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B4B1C`
- **Size**: 24 bytes (6 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GMilestone::Unlock();
  ```
- **Description**: Checks if `mState` equals 1 (`kState_Locked`), transitioning it to 2 (`kState_Available`) if currently locked.

---

### `GMilestone::ValueMeetsGoal`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B4B34`
- **Size**: 56 bytes (14 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool GMilestone::ValueMeetsGoal(float value);
  ```
- **Description**: Evaluates if the current metric meets the goal threshold, taking into account `mFlags` bit 0 inversion logic.

---

### `GSpeedTrap::GSpeedTrap`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GSpeedTrap.cpp`
- **Virtual Address**: `0x801B4D68`
- **Size**: 48 bytes (12 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GSpeedTrap::GSpeedTrap();
  ```
- **Description**: Default constructor zeroing `mFlags`, `mBinNumber`, `mSpeedTrapKey`, `mCameraMarkerKey`, `mRequiredValue`, and `mRecordedValue`.

---

### `GSpeedTrap::Init`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GSpeedTrap.cpp`
- **Virtual Address**: `0x801B4F68`
- **Size**: 36 bytes (9 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GSpeedTrap::Init(Attrib::Key trapKey);
  ```
- **Description**: Assigns the speed trap attribute key `mSpeedTrapKey` at offset `0x04` and invokes `Reset()`.

---

### `GSpeedTrap::Unlock`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GSpeedTrap.cpp`
- **Virtual Address**: `0x801B50A4`
- **Size**: 16 bytes (4 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GSpeedTrap::Unlock();
  ```
- **Description**: Sets `kFlag_Unlocked` (bit 0) in 16-bit `mFlags` at offset `0x00`.

---

### `GSpeedTrap::Activate`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GSpeedTrap.cpp`
- **Virtual Address**: `0x801B50B4`
- **Size**: 16 bytes (4 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GSpeedTrap::Activate();
  ```
- **Description**: Sets `kFlag_Active` (bit 1) in 16-bit `mFlags` at offset `0x00`.

---

### `SNDCTRL_getprogvol`
- **Unit**: `main/Speed/Indep/Libs/snd/9/source/library/cmn/sgetpvol`
- **Source File**: `src/Speed/Indep/Libs/snd/9/source/library/cmn/sgetpvol.c`
- **Virtual Address**: `0x803A3190`
- **Size**: 148 bytes (37 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```c
  int SNDCTRL_getprogvol(int shandle);
  ```
- **Description**: Retrieves the programmed MIDI volume for the voice associated with a sound handle, scaling normalized float volume by `127.0f` before conversion with `SNDI_ftoifast`.

---

### `SNDSTRM_getprogvol`
- **Unit**: `main/Speed/Indep/Libs/snd/9/source/library/cmn/sstgetpv`
- **Source File**: `src/Speed/Indep/Libs/snd/9/source/library/cmn/sstgetpv.c`
- **Virtual Address**: `0x803A3224`
- **Size**: 152 bytes (38 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```c
  int SNDSTRM_getprogvol(int sndstreamhandle);
  ```
- **Description**: Returns the programmed stream volume for a sound stream handle, falling back to `SNDCTRL_getprogvol` or converting channel state volume scaled by `127.0f` using `SNDI_ftoifast`.

---

### `eInitTextures`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `src/Speed/Indep/Src/Ecstasy/Texture.cpp`
- **Virtual Address**: `0x800FBB2C`
- **Size**: 76 bytes (19 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void eInitTextures(void);
  ```
- **Description**: Initializes the texture pack slot pool by allocating `TexturePackSlotPool` with slot size evaluated against the minimum boundary.

---

### `FEMessageResponse::FindConditionBranchTarget`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEMessageResponse.cpp`
- **Virtual Address**: `0x8018A4F4`
- **Size**: 144 bytes (36 instructions)
- **Matching State**: 99.58% match (improved from 98.47%)
- **Signature**:
  ```cpp
  u32 FEMessageResponse::FindConditionBranchTarget(u32 Index) const;
  ```
- **Description**: Scans through the response list from a conditional branch, tracking nested conditional blocks to find the matching `MR_Else` or `MR_EndIf` target index. Improved to 99.58% by pinning register `Nest` to `r10` (`register int Nest asm("r10") = 1;`).





---

### `GMilestone::GetCurrentValue`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B4734`
- **Size**: 44 bytes (11 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  float GMilestone::GetCurrentValue(void) const;
  ```
- **Description**: Retrieves the current milestone metric value from GManager for the milestone's type key.

---

### `GSpeedTrap::GetTrapTrigger`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GSpeedTrap.cpp`
- **Virtual Address**: `0x801B4E94`
- **Size**: 56 bytes (14 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GTrigger *GSpeedTrap::GetTrapTrigger(void) const;
  ```
- **Description**: Queries GManager for the runtime instance associated with `mSpeedTrapKey` and returns it downcast to `GTrigger*`, or NULL if not found.

---

### `GManager::GetFirstMilestone`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801AFE94`
- **Size**: 48 bytes (12 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GMilestone *GManager::GetFirstMilestone(bool availOnly, unsigned int binNumber);
  ```
- **Description**: Retrieves the first milestone matching the availability filter and bin number by delegating to `GetNextMilestone(mMilestones - 1, availOnly, binNumber)`.

---

### `GManager::GetNextMilestone`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801AFEC4`
- **Size**: 104 bytes (26 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GMilestone *GManager::GetNextMilestone(GMilestone *current, bool availOnly, unsigned int binNumber);
  ```
- **Description**: Iterates through the milestone array using pre-increment pointer arithmetic, filtering by state bounds (state in `[2, 3]`) if `availOnly` is true and matching `binNumber` when non-zero.

---

### `GManager::EnableBinMilestones`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801AFF2C`
- **Size**: 100 bytes (25 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GManager::EnableBinMilestones(unsigned int binNumber);
  ```
- **Description**: Traverses all milestones belonging to `binNumber` using `GetFirstMilestone` and `GetNextMilestone`, unlocking each milestone.

---

### `GManager::GetFirstSpeedTrap`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B00C4`
- **Size**: 48 bytes (12 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GSpeedTrap *GManager::GetFirstSpeedTrap(bool activeOnly, unsigned int binNumber);
  ```
- **Description**: Retrieves the first speed trap matching the active filter and bin number by delegating to `GetNextSpeedTrap(mSpeedTraps - 1, activeOnly, binNumber)`.

---

### `GManager::GetNextSpeedTrap`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B00F4`
- **Size**: 176 bytes (44 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GSpeedTrap *GManager::GetNextSpeedTrap(GSpeedTrap *current, bool activeOnly, unsigned int binNumber);
  ```
- **Description**: Iterates through the speed trap array using pre-increment pointer traversal, checking `GetIsActive()` if `activeOnly` is set and matching `binNumber` when non-zero.

---

### `GManager::EnableBinSpeedTraps`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B01A4`
- **Size**: 108 bytes (27 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GManager::EnableBinSpeedTraps(unsigned int binNumber);
  ```
- **Description**: Traverses all speed traps in `binNumber`, invoking `Unlock()` and `Activate()` on each.

---

### `GManager::SaveMilestones`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B157C`
- **Size**: 64 bytes (16 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GManager::SaveMilestones(GMilestone *dest);
  ```
- **Description**: Copies all managed milestone records to `dest` via `GMemCpy` and returns `mNumMilestones`.

---

### `GManager::SaveSpeedTraps`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B1984`
- **Size**: 64 bytes (16 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GManager::SaveSpeedTraps(GSpeedTrap *dest);
  ```
- **Description**: Copies all managed speed trap records to `dest` via `GMemCpy` and returns `mNumSpeedTraps`.

---

### `EAGL4Anim::MemoryPoolManager::InitAnimMemoryMapAux`
- **Unit**: `main/Speed/Indep/SourceLists/zEagl4Anim`
- **Source File**: `src/Speed/Indep/Src/EAGL4Anim/MemoryPoolManager.cpp`
- **Virtual Address**: `0x800A22C0` (`2148147904`)
- **Size**: 156 bytes (39 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void EAGL4Anim::MemoryPoolManager::InitAnimMemoryMapAux(AnimMemoryMap *memMap);
  ```
- **Description**: Initializes animation memory maps based on animation type identifier. Reconstructed the full switch statement covering all 19 `AnimMemoryMap` subclasses (`ANIM_RAWPOSE`, `ANIM_RAWEVENT`, `ANIM_RAWLINEAR`, `ANIM_DELTALERP`, `ANIM_DELTAQUAT`, `ANIM_KEYLERP`, `ANIM_KEYQUAT`, `ANIM_PHASE`, `ANIM_COMPOUND`, `ANIM_RAWSTATE`, `ANIM_DELTAQ`, `ANIM_DELTAQFAST`, `ANIM_DELTASINGLEQ`, `ANIM_DELTAF3`, `ANIM_DELTAF1`, `ANIM_STATELESSQ`, `ANIM_STATELESSF3`, `ANIM_CSISEVENT`, `ANIM_POSEANIM`), calling `AnimMemoryMap::InitAnimMemoryMap(memMap)` for default classes, producing an exact 1-to-1 match of the binary search tree generated by ProDG GCC 2.95 (39/39 instructions).

---

### `EAGL4Anim::MemoryPoolManager::NewBlockAux`
- **Unit**: `main/Speed/Indep/SourceLists/zEagl4Anim`
- **Source File**: `src/Speed/Indep/Src/EAGL4Anim/MemoryPoolManager.cpp`
- **Virtual Address**: `0x80231534` (`2148146404`)
- **Size**: 84 bytes (21 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void *EAGL4Anim::MemoryPoolManager::NewBlockAux(size_t size);
  ```
- **Description**: Allocates a block from the size-based free list or memory pool. Restructured free-list conditional handling so that the free list case (`if (r)`) is evaluated first, enabling the allocation fallback path to compute the return pointer in `r3` and update `gMemoryPoolFree` in the exact assembly register and store sequence of the original DOL, achieving 100.0% binary match (21/21 instructions).

---

### `EAGL4::DynamicLoader::Release`
- **Unit**: `main/Speed/Indep/SourceLists/zEagl4Anim`
- **Source File**: `src/Speed/Indep/Src/EAGL4Anim/eagl4supportdlopen.cpp`
- **Virtual Address**: `0x8008e88c`
- **Size**: 220 bytes (55 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void EAGL4::DynamicLoader::Release();
  ```
- **Description**: Unlinks and deallocates the loaded module and dynamic symbol tables in zEagl4Anim. Uses `h->~HashPointer()` and `HashPointer::operator delete(h, sizeof(HashPointer))` directly with `h` assigned at block scope, achieving 100.0% binary assembly parity (220 bytes, 55 instructions).

---

### `InitChyron`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Common/feChyron.cpp`
- **Virtual Address**: `0x80133278`
- **Size**: 48 bytes (12 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void InitChyron();
  ```
- **Description**: Initializes FE chyron rendering subsystem and registers chyron objects with 100% binary matching parity.

---

### `CareerSettings::SaveRaceData`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/Careers/CareerSettings.cpp`
- **Virtual Address**: `0x8012A32C`
- **Size**: 264 bytes (66 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void CareerSettings::SaveRaceData();
  ```
- **Description**: Saves active race performance and settings to the career database buffer with 100% binary matching parity.

---

### `UIWidgetMenu::Scroll`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Common/feWidgetMenu.cpp`
- **Virtual Address**: `0x8013496C`
- **Size**: 536 bytes (134 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool UIWidgetMenu::Scroll(int dir);
  ```
- **Description**: Handles vertical scrolling of menu widgets with bounds checking, wrap logic, and sound dispatch with 100% binary matching parity.

---

### `IGenericMessage::_IHandle`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Common/feGenericMessage.cpp`
- **Virtual Address**: `0x8013337C`
- **Size**: 12 bytes (3 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool IGenericMessage::_IHandle(unsigned long msg, unsigned long param1, unsigned long param2);
  ```
- **Description**: Default message handler for frontend generic messages returning false (`li r3, 0; blr`).

---

### `CTextScroller::FindCR`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Common/TextScroller.cpp`
- **Virtual Address**: `0x80122904`
- **Size**: 80 bytes (20 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  short CTextScroller::FindCR(short index);
  ```
- **Description**: Finds the next carriage return character index in formatted text scroller buffers with 100% binary matching parity.

---

### `ArrayScroller::ForceSelectionOnScreen`
- **Unit**: `main/Speed/Indep/SourceLists/zFe2`
- **Source File**: `src/Speed/Indep/Src/Frontend/MenuScreens/Common/feArrayScrollerMenu.cpp`
- **Virtual Address**: `0x80132E2C`
- **Size**: 64 bytes (16 instructions)
- **Matching State**: 98.31% match
- **Signature**:
  ```cpp
  int ArrayScroller::ForceSelectionOnScreen(int new_datum, int start);
  ```
- **Description**: Clamps selection within current grid view bounds for array menu scrollers (14/16 instructions matching, 98.31% parity).

---

### `GManager::LoadMilestones`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B4B5C`
- **Size**: 156 bytes (39 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GManager::LoadMilestones(GMilestone *src, unsigned int count);
  ```
- **Description**: Iterates through the source milestone array and updates corresponding managed milestone records matching `mChallengeKey`.

---

### `GManager::LoadSpeedTraps`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B4F64`
- **Size**: 156 bytes (39 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GManager::LoadSpeedTraps(GSpeedTrap *src, unsigned int count);
  ```
- **Description**: Iterates through the source speed trap array and updates corresponding managed speed trap records matching `mSpeedTrapKey`.

---

### `GManager::SaveMilestoneInfo`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B2B88`
- **Size**: 152 bytes (38 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GManager::SaveMilestoneInfo(MilestoneTypeInfo *dest);
  ```
- **Description**: Serializes milestone tracking records from the `mMilestoneTypeInfo` map into the destination buffer and returns the total entry count.

---

### `GManager::LoadMilestoneInfo`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B2AA0`
- **Size**: 232 bytes (58 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GManager::LoadMilestoneInfo(MilestoneTypeInfo *src, unsigned int count);
  ```
- **Description**: Resets milestone tracking state and deserializes `mBestValue` and `mLastKnownValue` records from the source array into the `mMilestoneTypeInfo` map.

---

### `GManager::SaveSMSInfo`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B5F70`
- **Size**: 144 bytes (36 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  unsigned int GManager::SaveSMSInfo(int *saveInfo);
  ```
- **Description**: Serializes pending SMS identifier entries from the `mPendingSMS` list into the destination array with a stride of two.

---

### `GManager::LoadSMSInfo`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B6000`
- **Size**: 160 bytes (40 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GManager::LoadSMSInfo(int *saveInfo, unsigned int count);
  ```
- **Description**: Clears pending SMS list and repopulates it with identifiers loaded from the source buffer.

---

### `GManager::GetHasPendingSMS`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801B60A0`
- **Size**: 112 bytes (28 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  bool GManager::GetHasPendingSMS(void) const;
  ```
- **Description**: Checks whether pending SMS messages exist and can currently be played via `CanPlaySMS()`.

---

### `GManager::GetCacheName`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GManager.cpp`
- **Virtual Address**: `0x801BBC6C`
- **Size**: 12 bytes (3 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  const char *GManager::GetCacheName(void) const;
  ```
- **Description**: Returns the cache client identifier string `"GManager"` for IVehicleCache interface implementation.

---

### `FEngine::Update`
- **Unit**: `main/Speed/Indep/SourceLists/zFEng`
- **Source File**: `src/Speed/Indep/Src/FEng/FEngine.cpp`
- **Virtual Address**: `0x80185F38`
- **Size**: 776 bytes (194 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void FEngine::Update(const i32 tDeltaTicks, uint32 lock);
  ```
- **Description**: Updates the front-end engine state, polling and updating mouse input, joypad masks, active packages, joypad hold decrement counters, and package message queues. Declaring `PadIndex` before the input loops ensures GCC 2.95.3 allocates `r31` consistently across both joypad update and hold decrement loops, achieving 100.0% binary assembly parity.

---

### `__InitMatrices`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `src/Speed/GameCube/Src/Ecstasy/EcstasyE.cpp`
- **Virtual Address**: `0x801026D0`
- **Size**: 508 bytes (127 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void __InitMatrices(void);
  ```
- **Description**: Initializes orthographic projection and view matrices for GameCube hardware rendering. Preserves aspect ratio across PAL50 and NTSC modes by computing frontend scaling and centering offsets. Factoring subexpressions as `scale_y = gcn_scale * (1.0f / 448.0f)` and parenthesizing `((float)_rmode->xfbHeight * (1.0f / 448.0f))` matches GCC 2.95.3 instruction scheduling and register allocation to achieve 100.0% binary assembly parity (127/127 instructions).

---

### `LuaMessageDeliveryInfo::~LuaMessageDeliveryInfo`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Lua/LuaPostOffice.h`
- **Virtual Address**: `0x801BBC94`
- **Size**: 144 bytes (36 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual LuaMessageDeliveryInfo::~LuaMessageDeliveryInfo();
  ```
- **Description**: Destructor for LuaMessageDeliveryInfo. Checks if the message's Lua table was constructed (`mLuaTableBuilt`), restores the Lua stack by popping the table via `lua_settop(mLuaState, -2)`, and notifies the runtime that message delivery has concluded via `LuaRuntime::Get().EndDelivery()`. Achieves 100.0% binary assembly parity (36/36 instructions).

---

### `eStreamPackLoader::InternalLoadStreamingEntry`
- **Unit**: `main/Speed/Indep/SourceLists/zEcstasy`
- **Source File**: `src/Speed/Indep/Src/Ecstasy/eStreamingPack.cpp`
- **Virtual Address**: `0x800F4ED4`
- **Size**: 440 bytes (110 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void eStreamPackLoader::InternalLoadStreamingEntry(eStreamingPackLoadTable *loading_table, eStreamingPack *streaming_pack, eStreamingEntry *streaming_entry);
  ```
- **Description**: Internal loader subroutine for chunk streaming pack entries. Handles reference count incrementing, compressed texture pool checks, memory warning reporting, asynchronous queue submission via `AddQueuedFile2`, and inlined pack accounting via `streaming_pack->RegisterLoadStreamingEntry(streaming_entry)`. Bound callee-saved registers (`r25` through `r31`) and matched instruction scheduling to achieve 100.0% binary assembly parity (110/110 instructions, 440 bytes).

---

### `GActivity::GActivity`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GActivity.cpp`
- **Virtual Address**: `0x8019C0BC`
- **Size**: 100 bytes (25 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  GActivity::GActivity(const Attrib::Key &activityKey);
  ```
- **Description**: Constructs a new GActivity instance from an attribute key. Initializes base `GRuntimeInstance` with object type 0, zeroes out `mCurrentState` and `mRegisteredHandlersState`, sets `mRunning` and `mVarsInLuaVM` to false, and calls `DeserializeVars()`. Achieves 100.0% binary assembly parity (25/25 instructions).

---

### `GActivity::~GActivity`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GActivity.cpp`
- **Virtual Address**: `0x8019C120`
- **Size**: 328 bytes (82 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual GActivity::~GActivity();
  ```
- **Description**: Virtual destructor for GActivity. Evaluates `Persistent()` via reflection attribute `0xE4542E9B` on `Attrib::Gen::gameplay`, conditionally serializing variables via `SerializeVars(true)`, invokes `UnregisterMessageHandlers()`, and clears `mStateHandlers` map. Automatically cleans up base classes and fast memory allocation (`gFastMem.Free(this, 72)`). Achieves 100.0% binary assembly parity (82/82 instructions).

---

### `GActivity::GetType`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GActivity.h`
- **Virtual Address**: `0x801BBEE4`
- **Size**: 8 bytes (2 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  virtual GameplayObjType GActivity::GetType() const override;
  ```
- **Description**: Returns `kGameplayObjType_Activity` (0) for gameplay object type classification. Achieves 100.0% binary assembly parity (2/2 instructions).

---

### `GMilestone::GetBounty`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B4760`
- **Size**: 252 bytes (63 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  float GMilestone::GetBounty() const;
  ```
- **Description**: Retrieves the bounty awarded for completing this milestone by creating an `Attrib::Gen::gameplay` instance from `mChallengeKey`. If valid, extracts the bounty value via `challengeRecord.Bounty()` and converts the integer bounty into a single-precision float; otherwise returns 0.0f. Achieves 100.0% binary assembly parity (63/63 instructions).

---

### `GMilestone::GetLocalizationTag`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B485C`
- **Size**: 204 bytes (51 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  int GMilestone::GetLocalizationTag() const;
  ```
- **Description**: Resolves the localization string tag for this milestone by querying the `Attrib::Gen::milestonetypes` record corresponding to `mTypeKey`. If the record is valid, retrieves the integer tag via `milestoneTypeRecord.LocalizationTag()`; otherwise returns 0. Achieves 100.0% binary assembly parity (51/51 instructions).

---

### `GMilestone::GetJumpMarkerKey`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B4928`
- **Size**: 156 bytes (39 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  Attrib::Key GMilestone::GetJumpMarkerKey() const;
  ```
- **Description**: Retrieves the spawn point attribute key for the jump marker associated with this milestone by constructing an `Attrib::Gen::gameplay` instance and extracting `challengeRecord.SpawnPoint().mCollectionKey`. Achieves 100.0% binary assembly parity (39/39 instructions).

---

### `GMilestone::Reset`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B49E8`
- **Size**: 308 bytes (77 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GMilestone::Reset();
  ```
- **Description**: Resets the milestone state by inspecting `Attrib::Gen::gameplay` for `mChallengeKey`. Resolves `mTypeKey` via `Attrib::StringToKey(challengeRecord.MilestoneName())`, sets `mState` to 1 (locked), updates `mBinNumber` and `mRequiredValue` (from `GoalEasy()`), resets `mRecordedValue` to 0.0f, and sets flag bit 1 if `GManager::Get().GetIsBiggerValueBetter(mTypeKey)` is true. Achieves 100.0% binary assembly parity (77/77 instructions).

---

### `GMilestone::NotifyProgress`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B4B6C`
- **Size**: 88 bytes (22 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GMilestone::NotifyProgress(float value);
  ```
- **Description**: Evaluates progress against the milestone goal when in state 2 (available). If `ValueMeetsGoal(value)` succeeds, allocates and constructs an `EReportMilestoneAtStake` heap event and advances `mState` to 3 (done pending escape). Achieves 100.0% binary assembly parity (22/22 instructions).

---

### `GMilestone::NotifyPursuitOver`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GMilestone.cpp`
- **Virtual Address**: `0x801B4BC4`
- **Size**: 420 bytes (105 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GMilestone::NotifyPursuitOver(bool escaped);
  ```
- **Description**: Processes the outcome of a pursuit for this milestone. If `mState == 3`: on busted/failed escape (`escaped == false`), reverts `mState` to 2; on successful escape (`escaped == true`), updates `mRecordedValue`, transitions `mState` to 4 (awarded), posts an `MNotifyMilestoneReached` message to the Gameplay message queue (`0x20d60dbf`), refreshes progress on the parent race bin (`bin->RefreshProgress()`), awards player bounty via `Game_AwardPlayerBounty(challengeRecord.Bounty())`, and signals `Game_ChallengeCompleted()`. Achieves 100.0% binary assembly parity (105/105 instructions).

---

### `Attrib::Gen::milestonetypes::ClassKey`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Generated/AttribSys/Classes/milestonetypes.h`
- **Virtual Address**: `0x801BB898`
- **Size**: 12 bytes (3 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  static Attrib::Key Attrib::Gen::milestonetypes::ClassKey();
  ```
- **Description**: Returns the 32-bit class key `0xe4c3d904` identifying the `milestonetypes` attribute schema in the attribute system. Emitted out-of-line when instantiated in `zGameplay`. Achieves 100.0% binary assembly parity (3/3 instructions).

---

### `GSpeedTrap::GetBounty`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GSpeedTrap.cpp`
- **Virtual Address**: `0x801B4D98`
- **Size**: 252 bytes (63 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  float GSpeedTrap::GetBounty(void) const;
  ```
- **Description**: Instantiates `Attrib::Gen::gameplay` with `mSpeedTrapKey` and returns `challengeRecord.Bounty()` if valid, or 0.0f otherwise. Achieves 100.0% binary assembly parity (63/63 instructions).

---

### `GSpeedTrap::GetJumpMarkerKey`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GSpeedTrap.cpp`
- **Virtual Address**: `0x801B4ECC`
- **Size**: 156 bytes (39 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  Attrib::Key GSpeedTrap::GetJumpMarkerKey(void) const;
  ```
- **Description**: Instantiates `Attrib::Gen::gameplay` with `mSpeedTrapKey` and returns the `mCollectionKey` of `challengeRecord.SpawnPoint()`. Achieves 100.0% binary assembly parity (39/39 instructions).

---

### `GSpeedTrap::Reset`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GSpeedTrap.cpp`
- **Virtual Address**: `0x801B4F8C`
- **Size**: 280 bytes (70 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GSpeedTrap::Reset(void);
  ```
- **Description**: Resets speed trap state from the challenge attributes: retrieves `mCameraMarkerKey` from `CameraModelMarker()`, clears `mFlags` to 0, sets `mBinNumber` from `BinIndex()`, calculates `mRequiredValue` as `ThreshholdSpeed() * 0.27778f` (converting km/h to m/s), and sets `mRecordedValue` to 0.0f. Achieves 100.0% binary assembly parity (70/70 instructions).

---

### `GSpeedTrap::NotifyTriggered`
- **Unit**: `main/Speed/Indep/SourceLists/zGameplay`
- **Source File**: `src/Speed/Indep/Src/Gameplay/GSpeedTrap.cpp`
- **Virtual Address**: `0x801B50C4`
- **Size**: 120 bytes (30 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  void GSpeedTrap::NotifyTriggered(float value);
  ```
- **Description**: Handles speed trap trigger event. If both `kFlag_Unlocked` and `kFlag_Active` are set (tested via `!IsFlagClear`), sets `kFlag_Completed`, clears `kFlag_Active`, records pass speed `value`, refreshes the progress of the associated `GRaceBin`, and notifies `GManager::Get().RefreshSpeedTrapIcons()`. Achieves 100.0% binary assembly parity (30/30 instructions).

---

### `EAGL4Anim::FnDeltaLerpChan::~FnDeltaLerpChan`
- **Unit**: `main/Speed/Indep/SourceLists/zEagl4Anim`
- **Source File**: `src/Speed/Indep/Src/EAGL4Anim/DeltaChan.h`
- **Virtual Address**: `0x800A63B0`
- **Size**: 84 bytes (21 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  EAGL4Anim::FnDeltaLerpChan::~FnDeltaLerpChan(void);
  ```
- **Description**: Compiler-synthesized virtual destructor for `FnDeltaLerpChan`. Inherits from `FnDeltaChan` without explicit user-defined destructor body, allowing GCC 2.95 to elide the redundant vtable store and directly invoke `FnDeltaChan::~FnDeltaChan` and deallocation. Achieves 100.0% binary assembly parity (21/21 instructions).

---

### `EAGL4Anim::FnDeltaQuatChan::~FnDeltaQuatChan`
- **Unit**: `main/Speed/Indep/SourceLists/zEagl4Anim`
- **Source File**: `src/Speed/Indep/Src/EAGL4Anim/DeltaChan.h`
- **Virtual Address**: `0x800A6404`
- **Size**: 84 bytes (21 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  EAGL4Anim::FnDeltaQuatChan::~FnDeltaQuatChan(void);
  ```
- **Description**: Compiler-synthesized virtual destructor for `FnDeltaQuatChan`. Inherits from `FnDeltaChan` without explicit user-defined destructor body, allowing GCC 2.95 to elide the redundant vtable store and directly invoke `FnDeltaChan::~FnDeltaChan` and deallocation. Achieves 100.0% binary assembly parity (21/21 instructions).

---

### `EAGL4Anim::FnKeyLerpChan::~FnKeyLerpChan`
- **Unit**: `main/Speed/Indep/SourceLists/zEagl4Anim`
- **Source File**: `src/Speed/Indep/Src/EAGL4Anim/DeltaChan.h`
- **Virtual Address**: `0x800A6458`
- **Size**: 84 bytes (21 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  EAGL4Anim::FnKeyLerpChan::~FnKeyLerpChan(void);
  ```
- **Description**: Compiler-synthesized virtual destructor for `FnKeyLerpChan`. Inherits from `FnKeyDeltaChan` without explicit user-defined destructor body, allowing GCC 2.95 to elide the redundant vtable store and directly invoke `FnKeyDeltaChan::~FnKeyDeltaChan` and deallocation. Achieves 100.0% binary assembly parity (21/21 instructions).

---

### `EAGL4Anim::FnKeyQuatChan::~FnKeyQuatChan`
- **Unit**: `main/Speed/Indep/SourceLists/zEagl4Anim`
- **Source File**: `src/Speed/Indep/Src/EAGL4Anim/DeltaChan.h`
- **Virtual Address**: `0x800A64AC`
- **Size**: 84 bytes (21 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  EAGL4Anim::FnKeyQuatChan::~FnKeyQuatChan(void);
  ```
- **Description**: Compiler-synthesized virtual destructor for `FnKeyQuatChan`. Inherits from `FnKeyDeltaChan` without explicit user-defined destructor body, allowing GCC 2.95 to elide the redundant vtable store and directly invoke `FnKeyDeltaChan::~FnKeyDeltaChan` and deallocation. Achieves 100.0% binary assembly parity (21/21 instructions).

---

### `EAGL4::DynamicLoader::GetSymbol`
- **Unit**: `main/Speed/Indep/SourceLists/zEagl4Anim`
- **Source File**: `src/Speed/Indep/Src/EAGL4Anim/eagl4supportdlopen.cpp`
- **Virtual Address**: `0x8008F9E4`
- **Size**: 372 bytes (93 instructions)
- **Matching State**: 100.0% match
- **Signature**:
  ```cpp
  DynamicLoader::Symbol DynamicLoader::GetSymbol(int i) const;
  ```
- **Description**: Resolves symbol information by index from the loaded dynamic module. Validates module handle and symbol index bounds, computes symbol name and typed descriptor offsets from string table `strtab`, adjusts for `0x7F` type-length prefix bytes, checks internal reference flags via `(unsigned int)(s[i].st_other - 2) > 3`, and calculates section-relative or absolute symbol data addresses with full 100.0% binary assembly parity (93/93 instructions).



