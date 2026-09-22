# Decompiled Functions Ledger

This document tracks matched functions in Need for Speed: Most Wanted (GameCube `GOWE69`), providing architectural context, function signatures, Doxygen specifications, addresses, and ProDG GCC 2.95 compiler idioms required for matching.

---

## 1. Frontend Subsystem (`zFe`, `zFe2`)

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

## 2. Audio Subsystem (`zEAXSound2`)

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
