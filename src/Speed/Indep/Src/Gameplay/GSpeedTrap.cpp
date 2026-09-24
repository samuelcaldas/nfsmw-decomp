#include "Speed/Indep/Src/Gameplay/GSpeedTrap.h"

GSpeedTrap::GSpeedTrap()
    : mFlags(0),
      mBinNumber(0),
      mSpeedTrapKey(0),
      mCameraMarkerKey(0),
      mRequiredValue(0.0f),
      mRecordedValue(0.0f) {
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
