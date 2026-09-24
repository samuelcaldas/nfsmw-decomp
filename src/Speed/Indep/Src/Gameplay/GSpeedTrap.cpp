#include "Speed/Indep/Src/Gameplay/GSpeedTrap.h"
#include "Speed/Indep/Src/Gameplay/GRaceDatabase.h"
#include "Speed/Indep/Src/Generated/AttribSys/Classes/gameplay.h"

GSpeedTrap::GSpeedTrap()
    : mFlags(0),
      mBinNumber(0),
      mSpeedTrapKey(0),
      mCameraMarkerKey(0),
      mRequiredValue(0.0f),
      mRecordedValue(0.0f) {
}

/**
 * @brief Gets the bounty awarded for completing this speed trap.
 * @return Bounty value in cash/points, or 0.0f if record is invalid.
 */
float GSpeedTrap::GetBounty() const {
    Attrib::Gen::gameplay challengeRecord(this->mSpeedTrapKey, 0, nullptr);
    if (challengeRecord.IsValid()) {
        return challengeRecord.Bounty();
    }
    return 0.0f;
}

/**
 * @brief Retrieves the trigger associated with the speed trap.
 * @return Pointer to GTrigger, or NULL if not found.
 */
GTrigger *GSpeedTrap::GetTrapTrigger() const {
    GRuntimeInstance *instance = GManager::Get().FindInstance(this->mSpeedTrapKey);
    if (instance != NULL) {
        return (GTrigger *)instance;
    }
    return NULL;
}

/**
 * @brief Gets the spawn point jump marker attribute key for this speed trap.
 * @return Attribute key for the jump marker.
 */
Attrib::Key GSpeedTrap::GetJumpMarkerKey() const {
    Attrib::Gen::gameplay challengeRecord(this->mSpeedTrapKey, 0, nullptr);
    return challengeRecord.SpawnPoint().mCollectionKey;
}

/**
 * @brief Initializes the speed trap with the specified trap key.
 * @param trapKey Attribute key for the speed trap.
 */
void GSpeedTrap::Init(Attrib::Key trapKey) {
    this->mSpeedTrapKey = trapKey;
    this->Reset();
}

/**
 * @brief Resets the speed trap state and reloads attributes from the challenge key.
 */
void GSpeedTrap::Reset() {
    Attrib::Gen::gameplay challengeRecord(this->mSpeedTrapKey, 0, nullptr);
    this->mCameraMarkerKey = challengeRecord.CameraModelMarker().mCollectionKey;
    this->mFlags = 0;
    this->mBinNumber = challengeRecord.BinIndex();
    this->mRequiredValue = challengeRecord.ThreshholdSpeed() * 0.27778f;
    this->mRecordedValue = 0.0f;
}

/**
 * @brief Unlocks the speed trap.
 */
void GSpeedTrap::Unlock() {
    this->SetFlag(kFlag_Unlocked);
}

/**
 * @brief Activates the speed trap.
 */
void GSpeedTrap::Activate() {
    this->SetFlag(kFlag_Active);
}

/**
 * @brief Handles trigger activation when a vehicle passes the speed trap.
 * @param value Recorded vehicle speed.
 */
void GSpeedTrap::NotifyTriggered(float value) {
    if (!this->IsFlagClear(kFlag_Unlocked) && !this->IsFlagClear(kFlag_Active)) {
        this->SetFlag(kFlag_Completed);
        this->ClearFlag(kFlag_Active);
        this->mRecordedValue = value;
        GRaceBin *bin = GRaceDatabase::Get().GetBinNumber(this->mBinNumber);
        if (bin != nullptr) {
            bin->RefreshProgress();
        }
        GManager::Get().RefreshSpeedTrapIcons();
    }
}
