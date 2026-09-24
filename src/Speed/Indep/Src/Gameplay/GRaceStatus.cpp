#include "Speed/Indep/Src/Gameplay/GRaceStatus.h"
#include "Speed/Indep/Src/World/WRoadNetwork.h"

extern void RedoTopologyAndSceneryGroups();

/**
 * @brief Handles notification when a vehicle is removed from the cache.
 *
 * @param vehicle Pointer to the vehicle removed from the cache.
 * @return void
 */
void GRaceStatus::OnRemovedVehicleCache(IVehicle *) {
}

/**
 * @brief Sets the race context for the active race.
 *
 * @param context The race context to assign.
 * @return void
 */
void GRaceStatus::SetRaceContext(GRace::Context context) {
    this->mRaceContext = context;
}

/**
 * @brief Sets whether the race status is currently loading.
 * @param loading True if loading, false otherwise.
 * @return void
 */
void GRaceStatus::SetIsLoading(bool loading) {
    this->mIsLoading = loading;
}

/**
 * @brief Sets the task time for the race status.
 * @param seconds Duration in seconds.
 * @return void
 */
void GRaceStatus::SetTaskTime(float seconds) {
    this->mTaskTime = seconds;
}

/**
 * @brief Sets whether the race is actively occurring.
 * @param racing True if actively racing, false otherwise.
 */
void GRaceStatus::SetActivelyRacing(bool racing) {
    this->mActivelyRacing = racing;
}

/**
 * @brief Sets whether this event has been won.
 * @param won True if the event has been won.
 */
void GRaceStatus::SetHasBeenWon(bool won) {
    this->mHasBeenWon = won;
}

/**
 * @brief Retrieves the count of racers participating in the current event.
 *
 * @return int Total number of racers.
 */
int GRaceStatus::GetRacerCount() const {
    return this->mRacerCount;
}

/**
 * @brief Adds an available event trigger and associated activity to the world map.
 *
 * @param trigger Pointer to the event trigger runtime instance.
 * @param activity Pointer to the event activity runtime instance.
 * @return void
 */
void GRaceStatus::AddAvailableEventToMap(GRuntimeInstance *, GRuntimeInstance *) {
}

/**
 * @brief Adds a speed trap trigger instance to the world map display.
 *
 * @param trigger Pointer to the speed trap trigger runtime instance.
 * @return void
 */
void GRaceStatus::AddSpeedTrapToMap(GRuntimeInstance *) {
}

/**
 * @brief Refreshes the current race bin while in game.
 */
void GRaceStatus::RefreshBinWhileInGame() {
    this->mQueueBinChange = true;
}

/**
 * @brief Stops the race master timer.
 */
void GRaceStatus::StopMasterTimer() {
    mRaceMasterTimer.Stop();
}

/**
 * @brief Enables the race bin barriers if a race bin is active.
 */
void GRaceStatus::EnableBinBarriers() {
    if (this->mRaceBin != nullptr) {
        this->mRaceBin->EnableBarriers();
    }
}

/**
 * @brief Disables barriers and resets race segments.
 */
void GRaceStatus::DisableBarriers() {
    RedoTopologyAndSceneryGroups();
    WRoadNetwork::Get().ResetBarriers();
    WRoadNetwork::Get().ResetRaceSegments();
}

/**
 * @brief Returns the racer info for the specified index.
 * @param index Index of the racer in the race status table.
 * @return Reference to the racer info record.
 */
GRacerInfo &GRaceStatus::GetRacerInfo(int index) {
    return this->mRacerInfo[index];
}

/**
 * @brief Enters sudden death mode.
 * @return void
 */
void GRaceStatus::EnterSuddenDeath() {
    this->mSuddenDeathMode = true;
}

