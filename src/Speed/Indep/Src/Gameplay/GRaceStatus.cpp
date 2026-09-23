#include "Speed/Indep/Src/Gameplay/GRaceStatus.h"

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
