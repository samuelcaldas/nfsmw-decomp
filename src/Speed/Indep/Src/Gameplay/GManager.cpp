#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Gameplay/GUserIncludes.h"
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
 * @brief Retrieves the milestone at the specified index.
 * @param index Zero-based index of the milestone.
 * @return Pointer to the milestone record.
 */
GMilestone *GManager::GetMilestone(unsigned int index) {
    return &this->mMilestones[index];
}

/**
 * @brief Finds the first milestone matching filter criteria.
 * @param availOnly If true, filters for milestones that are available or done pending escape.
 * @param binNumber Bin number to match, or 0 to match any bin.
 * @return Pointer to first matching milestone, or NULL if none.
 */
GMilestone *GManager::GetFirstMilestone(bool availOnly, unsigned int binNumber) {
    return this->GetNextMilestone(this->mMilestones - 1, availOnly, binNumber);
}

/**
 * @brief Finds the next milestone matching filter criteria.
 * @param current Current milestone to advance from.
 * @param availOnly If true, filters for milestones that are available or done pending escape.
 * @param binNumber Bin number to match, or 0 to match any bin.
 * @return Pointer to next matching milestone, or NULL if none.
 */
GMilestone *GManager::GetNextMilestone(GMilestone *current, bool availOnly, unsigned int binNumber) {
    while (++current < &this->mMilestones[this->mNumMilestones]) {
        if (availOnly && (current->mState < 2 || current->mState > 3)) {
            continue;
        }
        if (binNumber != 0 && current->mBinNumber != binNumber) {
            continue;
        }
        return current;
    }
    return NULL;
}

/**
 * @brief Unlocks all milestones belonging to the specified bin.
 * @param binNumber The bin number whose milestones should be unlocked.
 */
void GManager::EnableBinMilestones(unsigned int binNumber) {
    for (GMilestone *milestone = this->GetFirstMilestone(false, binNumber); milestone != NULL;
         milestone = this->GetNextMilestone(milestone, false, binNumber)) {
        milestone->Unlock();
    }
}

/**
 * @brief Returns the number of configured speed traps.
 * @return The number of speed trap records managed by the gameplay manager.
 */
unsigned int GManager::GetNumSpeedTraps() {
    return this->mNumSpeedTraps;
}

/**
 * @brief Retrieves the speed trap at the specified index.
 * @param index Zero-based index of the speed trap.
 * @return Pointer to the speed trap record.
 */
GSpeedTrap *GManager::GetSpeedTrap(unsigned int index) {
    return &this->mSpeedTraps[index];
}

/**
 * @brief Finds the first speed trap matching filter criteria.
 * @param activeOnly If true, filters for active speed traps.
 * @param binNumber Bin number to match, or 0 to match any bin.
 * @return Pointer to first matching speed trap, or NULL if none.
 */
GSpeedTrap *GManager::GetFirstSpeedTrap(bool activeOnly, unsigned int binNumber) {
    return this->GetNextSpeedTrap(this->mSpeedTraps - 1, activeOnly, binNumber);
}

/**
 * @brief Finds the next speed trap matching filter criteria.
 * @param current Current speed trap to advance from.
 * @param activeOnly If true, filters for active speed traps.
 * @param binNumber Bin number to match, or 0 to match any bin.
 * @return Pointer to next matching speed trap, or NULL if none.
 */
GSpeedTrap *GManager::GetNextSpeedTrap(GSpeedTrap *current, bool activeOnly, unsigned int binNumber) {
    while (++current < &this->mSpeedTraps[this->mNumSpeedTraps]) {
        if (activeOnly && !current->GetIsActive()) {
            continue;
        }
        if (binNumber != 0 && current->mBinNumber != binNumber) {
            continue;
        }
        return current;
    }
    return NULL;
}

/**
 * @brief Unlocks and activates all speed traps belonging to the specified bin.
 * @param binNumber The bin number whose speed traps should be enabled.
 */
void GManager::EnableBinSpeedTraps(unsigned int binNumber) {
    for (GSpeedTrap *speedTrap = this->GetFirstSpeedTrap(false, binNumber); speedTrap != NULL;
         speedTrap = this->GetNextSpeedTrap(speedTrap, false, binNumber)) {
        speedTrap->Unlock();
        speedTrap->Activate();
    }
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

/**
 * @brief Saves milestone records to the destination buffer.
 * @param dest Destination buffer to receive milestone records.
 * @return Number of milestone records saved.
 */
unsigned int GManager::SaveMilestones(GMilestone *dest) {
    GMemCpy(dest, this->mMilestones, this->mNumMilestones * sizeof(GMilestone));
    return this->mNumMilestones;
}

/**
 * @brief Saves speed trap records to the destination buffer.
 * @param dest Destination buffer to receive speed trap records.
 * @return Number of speed trap records saved.
 */
unsigned int GManager::SaveSpeedTraps(GSpeedTrap *dest) {
    GMemCpy(dest, this->mSpeedTraps, this->mNumSpeedTraps * sizeof(GSpeedTrap));
    return this->mNumSpeedTraps;
}
