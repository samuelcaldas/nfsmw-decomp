#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Generated/AttribSys/Classes/gameplay.h"

/**
 * @brief Reports whether gameplay is currently active.
 * @return True when the manager is in gameplay; otherwise false.
 */
bool GManager::GetInGameplay() const {
    return this->mInGameplay;
}

/**
 * @brief Returns the number of configured milestones.
 * @return The number of milestone records managed by the gameplay manager.
 */
unsigned int GManager::GetNumMilestones() {
    return this->mNumMilestones;
}

/**
 * @brief Returns the number of configured speed traps.
 * @return The number of speed trap records managed by the gameplay manager.
 */
unsigned int GManager::GetNumSpeedTraps() {
    return this->mNumSpeedTraps;
}

/**
 * @brief Returns the number of bounty spawn markers.
 * @return The count of available bounty spawn markers.
 */
unsigned int GManager::GetNumBountySpawnMarkers() const {
    return this->mNumBountySpawnPoints;
}

/**
 * @brief Retrieves the bounty spawn marker key at the specified index.
 * @param index Zero-based index of the bounty spawn marker.
 * @return The marker key, or 0 if index is out of bounds.
 */
Attrib::Key GManager::GetBountySpawnMarker(unsigned int index) const {
    if (index < this->mNumBountySpawnPoints) {
        return this->mBountySpawnPoint[index];
    }
    return 0;
}

/**
 * @brief Retrieves the localization tag for a bounty spawn marker.
 * @param index Zero-based index of the bounty spawn marker.
 * @return The localization tag integer value.
 */
int GManager::GetBountySpawnMarkerTag(unsigned int index) const {
    Attrib::Key key = this->GetBountySpawnMarker(index);
    Attrib::Gen::gameplay gameplayObj(key, 0, nullptr);
    return gameplayObj.LocalizationTag();
}
