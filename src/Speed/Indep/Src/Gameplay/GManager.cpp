#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Gameplay/GUserIncludes.h"
#include "Speed/Indep/Src/Generated/AttribSys/Classes/gameplay.h"
#include "Speed/Indep/Src/Interfaces/SimEntities/IPlayer.h"
#include "Speed/Indep/bWare/Inc/bMemory.hpp"

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

/**
 * @brief Allocates icon buffer storage.
 */
void GManager::AllocateIcons() {
    this->mNumIcons = 0;
    this->mNumVisibleIcons = 0;
    this->mIcons = new GIcon *[200];
}

/**
 * @brief Releases the icon buffer storage.
 */
void GManager::ReleaseIcons() {
    delete[] this->mIcons;
    this->mNumIcons = 0;
    this->mNumVisibleIcons = 0;
    this->mIcons = NULL;
}

/**
 * @brief Frees all allocated icons.
 */
void GManager::FreeAllIcons() {
    while (this->mNumIcons != 0) {
        this->FreeIconAt(0);
    }
}

/**
 * @brief Collects visible icons and orders them by distance from the player.
 * @param iconArray Destination array for the visible icon pointers.
 * @param player Player used to calculate icon distance, or NULL to preserve order.
 * @return Number of visible icons copied to the destination array.
 */
int GManager::GatherVisibleIcons(GIcon **iconArray, IPlayer *player) {
    struct IconSort {
        GIcon *mIcon;
        int mDist;

        static int Compare(const void *a, const void *b) {
            const IconSort *left = static_cast<const IconSort *>(a);
            const IconSort *right = static_cast<const IconSort *>(b);
            return left->mDist - right->mDist;
        }
    };

    UMath::Vector3 playerPos = UMath::Vector3::kZero;
    ISimable *simable = NULL;
    IconSort iconSort[200];
    int numOnMap;
    if (player != NULL) {
        simable = player->GetSimable();
    }
    if (simable != NULL) {
        const UMath::Vector3 &position = simable->GetPosition();
        float positionX = position.x;
        float positionY = position.y;
        float positionZ = position.z;
        playerPos.y = -positionX;
        playerPos.x = positionZ;
        playerPos.z = positionY;
    }

    numOnMap = 0;
    for (unsigned int onIcon = 0; onIcon < this->mNumVisibleIcons; ++onIcon) {
        GIcon *icon = this->mIcons[onIcon];
        bool isIconVisible = icon->IsFlagSet(1) && icon->IsFlagSet(2);
        if (isIconVisible) {
            iconSort[numOnMap].mIcon = icon;
            if (simable != NULL) {
                iconSort[numOnMap].mDist =
                    static_cast<int>(UMath::DistanceSquarexz(icon->GetPosition(), playerPos));
            } else {
                iconSort[numOnMap].mDist = 0;
            }
            ++numOnMap;
        }
    }

    if (simable != NULL) {
        qsort(iconSort, numOnMap, sizeof(IconSort), IconSort::Compare);
    }
    for (int onCopy = 0; onCopy < numOnMap; ++onCopy) {
        iconArray[onCopy] = iconSort[onCopy].mIcon;
    }
    return numOnMap;
}

/**
 * @brief Releases milestone storage buffer.
 */
void GManager::ReleaseMilestones() {
    delete[] this->mMilestones;
    this->mMilestones = NULL;
    this->mNumMilestones = 0;
}

/**
 * @brief Releases speed trap storage buffer.
 */
void GManager::ReleaseSpeedTraps() {
    delete[] this->mSpeedTraps;
    this->mSpeedTraps = NULL;
    this->mNumSpeedTraps = 0;
}

/**
 * @brief Finds an available slot for a binary vault, unloading current if necessary.
 * @return Index of the available binary vault slot (always 0).
 */
unsigned int GManager::GetAvailableBinSlot() {
    if (this->mBinVaultInSlot[0] != NULL) {
        this->mBinVaultInSlot[0]->Unload();
        this->mBinVaultInSlot[0] = NULL;
    }
    return 0;
}

/**
 * @brief Finds an available slot for a race vault, unloading current if necessary.
 * @return Index of the available race vault slot (always 0).
 */
unsigned int GManager::GetAvailableRaceSlot() {
    if (this->mRaceVaultInSlot[0] != NULL) {
        this->mRaceVaultInSlot[0]->Unload();
        this->mRaceVaultInSlot[0] = NULL;
    }
    return 0;
}

/**
 * @brief Loads the core gameplay vault into resident memory.
 * @param packImage Pointer to the vault pack image.
 */
void GManager::LoadCoreVault(AttribVaultPackImage *packImage) {
    this->FindVault(GMANAGER_COREVAULT)->LoadResident(packImage);
}

/**
 * @brief Unloads the core gameplay vault.
 */
void GManager::UnloadCoreVault() {
    this->FindVault(GMANAGER_COREVAULT)->Unload();
}

/**
 * @brief Releases allocated streaming slot buffers and temporary load data.
 */
void GManager::ReleaseStreamingBuffers() {
    if (this->mStreamedBinSlots != NULL) {
        delete[] this->mStreamedBinSlots;
        this->mStreamedBinSlots = NULL;
    }
    if (this->mStreamedRaceSlots != NULL) {
        delete[] this->mStreamedRaceSlots;
        this->mStreamedRaceSlots = NULL;
    }
    if (this->mTempLoadData != NULL) {
        delete[] this->mTempLoadData;
        this->mTempLoadData = NULL;
    }
}

/**
 * @brief Unloads all transient vaults and frees the transient memory pool.
 */
void GManager::UnloadTransientVaults() {
    for (unsigned int i = 0; i < this->mVaultCount; ++i) {
        GVault *vault = &this->mVaults[i];
        if (vault->IsTransient()) {
            vault->Unload();
        }
    }
    bCloseMemoryPool(this->mTransientPoolNumber);
    bFree(this->mTransientPoolMemory);
    this->mTransientPoolMemory = NULL;
    this->mTransientPoolNumber = 0;
}

/**
 * @brief Destroys all gameplay vaults and releases associated buffers.
 */
void GManager::DestroyVaults() {
    if (this->mVaults != NULL) {
        for (unsigned int i = 0; i < this->mVaultCount; ++i) {
            this->mVaults[i].~GVault();
        }
        this->mVaultCount = 0;
        bFree(this->mVaults);
        this->mVaults = NULL;
    }
    if (this->mVaultNameStrings != NULL) {
        delete[] this->mVaultNameStrings;
        this->mVaultNameStrings = NULL;
    }
}

/**
 * @brief Allocates storage buffer for persistent and session object state.
 */
void GManager::AllocateObjectStateStorage() {
    int flags = GetVirtualMemoryAllocParams();
    void *buffer = bMalloc(0x4000, flags);
    this->mObjectStateBuffer = (uint8 *)buffer;
    this->mObjectStateBufferSize = 0x4000;
    this->mObjectStateBufferFree = (uint8 *)buffer;
}

/**
 * @brief Releases storage buffer for object state.
 */
void GManager::ReleaseObjectStateStorage() {
    this->mPersistentStateBlocks.clear();
    this->mSessionStateBlocks.clear();
    if (this->mObjectStateBuffer != NULL) {
        bFree(this->mObjectStateBuffer);
    }
    this->mObjectStateBufferFree = NULL;
    this->mObjectStateBufferSize = 0;
}

/**
 * @brief Clears all session state blocks and defragments storage.
 */
void GManager::ClearAllSessionData() {
    this->mSessionStateBlocks.clear();
    this->DefragObjectStateStorage();
}

/**
 * @brief Releases the key-to-instance hash map and resets table properties.
 */
void GManager::ReleaseInstanceMap() {
    if (this->mKeyToInstanceMap != NULL) {
        bFree(this->mKeyToInstanceMap);
        this->mKeyToInstanceMap = NULL;
    }
    this->mInstanceHashTableSize = 0;
    this->mInstanceHashTableMask = 0;
}

/**
 * @brief Resets all event timers.
 */
void GManager::ResetTimers() {
    for (unsigned int i = 0; i < 8; ++i) {
        this->mTimers[i].Reset();
    }
}

/**
 * @brief Updates all event timers by the elapsed delta time.
 * @param dT Delta time in seconds.
 */
void GManager::UpdateTimers(float dT) {
    for (unsigned int i = 0; i < 8; ++i) {
        this->mTimers[i].Update(dT);
    }
}

/**
 * @brief Serializes timer information into the destination array.
 * @param dest Destination array of saved timer info structures.
 * @return Number of timers serialized (8).
 */
unsigned int GManager::SaveTimerInfo(SavedTimerInfo *dest) {
    for (unsigned int i = 0; i < 8; ++i) {
        this->mTimers[i].Serialize(&dest[i]);
    }
    return 8;
}

/**
 * @brief Deserializes timer information from the source array.
 * @param src Source array of saved timer info structures.
 * @param count Number of timers to load.
 */
void GManager::LoadTimerInfo(SavedTimerInfo *src, unsigned int count) {
    for (unsigned int i = 0; i < count; ++i) {
        this->mTimers[i].Deserialize(&src[i]);
    }
}

/**
 * @brief Stops the timer matching the specified name.
 * @param timerName Name of the timer to kill.
 */
void GManager::KillTimer(const char *timerName) {
    uint32 hash = bStringHash(timerName);
    for (unsigned int i = 0; i < 8; ++i) {
        GEventTimer *timer = &this->mTimers[i];
        if (hash == timer->GetNameHash()) {
            timer->Stop();
            break;
        }
    }
}

/**
 * @brief Configures and starts a timer with the given name and interval.
 * @param timerName Name of the timer to set.
 * @param interval Timer duration in seconds.
 * @return True if a timer slot was configured and started; otherwise false.
 */
bool GManager::SetTimer(const char *timerName, float interval) {
    uint32 hash = bStringHash(timerName);
    for (int i = 0; i < 8; ++i) {
        GEventTimer *timer = &this->mTimers[i];
        if (hash == timer->GetNameHash()) {
            timer->Stop();
            timer->SetInterval(interval);
            timer->Start();
            return true;
        }
    }
    for (int i = 0; i < 8; ++i) {
        GEventTimer *timer = &this->mTimers[i];
        if (!timer->IsRunning()) {
            timer->SetName(timerName);
            timer->SetInterval(interval);
            timer->Start();
            return true;
        }
    }
    return false;
}

/**
 * @brief Starts the activity associated with the given race bin if not already running.
 * @param bin Pointer to the race bin.
 */
void GManager::StartBinActivity(GRaceBin *bin) {
    if (bin != NULL) {
        GActivity *activity = (GActivity *)GManager::mObj->FindInstance(bin->GetCollectionKey());
        if (!activity->mRunning) {
            activity->Run();
        }
    }
}

/**
 * @brief Suspends all active race bin activities and serializes their state.
 */
void GManager::SuspendAllBinActivities() {
    for (unsigned int i = 0; ; ++i) {
        if (i >= GRaceDatabase::mObj->GetBinCount()) {
            break;
        }
        GRaceBin *bin = GRaceDatabase::mObj->GetBin(i);
        if (bin != NULL) {
            GActivity *activity = (GActivity *)GManager::mObj->FindInstance(bin->GetCollectionKey());
            if (activity != NULL && activity->mRunning) {
                activity->SerializeVars(false);
                activity->Suspend();
            }
        }
    }
}

/**
 * @brief Prepares gameplay by initializing the startup race if a restart event is set.
 */
void GManager::PreBeginGameplay() {
    if (this->mRestartEventHash != 0) {
        GRaceParameters *raceParams = GRaceDatabase::mObj->GetRaceFromHash(this->mRestartEventHash);
        GRaceCustom *customRace = GRaceDatabase::mObj->AllocCustomRace(raceParams);
        GRaceDatabase::mObj->SetStartupRace(customRace, GRace::kRaceContext_Career);
        GRaceDatabase::mObj->FreeCustomRace(customRace);
        this->mRestartEventHash = 0;
    }
}

/**
 * @brief Notification hook called when collision packs are loaded or unloaded.
 * @param sectionNumber Section identifier.
 * @param isLoaded True if the pack was loaded; false if unloaded.
 */
void GManager::NotifyCollisionPackLoaded(int sectionNumber, bool isLoaded) {
    if (Exists()) {
        if (isLoaded) {
            mObj->SpawnSectionIcons(sectionNumber);
        } else {
            mObj->UnspawnSectionIcons(sectionNumber);
        }
    }
}

/**
 * @brief Unspawns all active gameplay characters.
 */
void GManager::UnspawnAllCharacters() {
    while (this->mActiveCharacters.size() != 0) {
        this->mActiveCharacters.front()->Unspawn();
    }
    this->mActiveCharacters.clear();
}

/**
 * @brief Unspawns all registered gameplay icons.
 */
void GManager::UnspawnAllIcons() {
    for (unsigned int i = 0; i < this->mNumIcons; ++i) {
        this->mIcons[i]->Unspawn();
    }
}

/**
 * @brief Loads milestone state records from source array.
 * @param src Source milestone array.
 * @param count Number of milestone records to load.
 */
void GManager::LoadMilestones(GMilestone *src, unsigned int count) {
    for (unsigned int i = 0; i < count; ++i) {
        GMilestone *milestone = &src[i];
        for (unsigned int j = 0; j < this->mNumMilestones; ++j) {
            GMilestone *dest = &this->mMilestones[j];
            if (dest->mChallengeKey == milestone->mChallengeKey) {
                *dest = *milestone;
                break;
            }
        }
    }
}

/**
 * @brief Loads speed trap state records from source array.
 * @param src Source speed trap array.
 * @param count Number of speed trap records to load.
 */
void GManager::LoadSpeedTraps(GSpeedTrap *src, unsigned int count) {
    for (unsigned int i = 0; i < count; ++i) {
        GSpeedTrap *speedTrap = &src[i];
        for (unsigned int j = 0; j < this->mNumSpeedTraps; ++j) {
            GSpeedTrap *dest = &this->mSpeedTraps[j];
            if (dest->mSpeedTrapKey == speedTrap->mSpeedTrapKey) {
                *dest = *speedTrap;
                break;
            }
        }
    }
}

/**
 * @brief Saves milestone tracking statistics into destination array.
 * @param dest Destination buffer for milestone type information.
 * @return Number of milestone type records saved.
 */
unsigned int GManager::SaveMilestoneInfo(MilestoneTypeInfo *dest) {
    for (MilestoneInfoMap::iterator it = this->mMilestoneTypeInfo.begin(); it != this->mMilestoneTypeInfo.end(); ++it) {
        *dest = it->second;
        ++dest;
    }
    return this->mMilestoneTypeInfo.size();
}

/**
 * @brief Loads milestone tracking statistics from source array.
 * @param src Source buffer of milestone type information.
 * @param count Number of milestone type records to load.
 */
void GManager::LoadMilestoneInfo(MilestoneTypeInfo *src, unsigned int count) {
    this->ResetMilestoneTrackingInfo();
    for (unsigned int i = 0; i < count; ++i) {
        MilestoneTypeInfo *info = &src[i];
        MilestoneInfoMap::iterator it = this->mMilestoneTypeInfo.find(info->mTypeKey);
        if (it != this->mMilestoneTypeInfo.end()) {
            MilestoneTypeInfo &typeInfo = it->second;
            typeInfo.mBestValue = info->mBestValue;
            typeInfo.mLastKnownValue = info->mLastKnownValue;
        }
    }
}

/**
 * @brief Saves pending SMS message identifiers into destination buffer.
 * @param saveInfo Destination buffer for SMS IDs.
 * @return Number of pending SMS records saved.
 */
unsigned int GManager::SaveSMSInfo(int *saveInfo) {
    int count = this->mPendingSMS.size();
    PendingSMSList::iterator it = this->mPendingSMS.begin();
    for (int i = 0; i < count; i += 2) {
        saveInfo[i] = *it;
        it++;
    }
    return count;
}

/**
 * @brief Loads pending SMS message identifiers from source buffer.
 * @param saveInfo Source buffer containing SMS IDs.
 * @param count Number of pending SMS records to load.
 */
void GManager::LoadSMSInfo(int *saveInfo, unsigned int count) {
    this->mPendingSMS.clear();
    for (unsigned int i = 0; i < count; ++i) {
        this->mPendingSMS.push_back(saveInfo[i]);
    }
}

/**
 * @brief Checks if there are any pending SMS messages eligible to play.
 * @return True if pending SMS messages can be played; otherwise false.
 */
bool GManager::GetHasPendingSMS() const {
    if (this->mPendingSMS.size() != 0) {
        return this->CanPlaySMS();
    }
    return false;
}

/**
 * @brief Gets the name identifier for this vehicle cache client.
 * @return String identifier "GManager".
 */
const char *GManager::GetCacheName() const {
    return "GManager";
}