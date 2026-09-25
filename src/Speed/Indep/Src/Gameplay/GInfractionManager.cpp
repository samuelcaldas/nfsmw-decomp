#include "GInfractionManager.h"

/**
 * @brief Initializes the infraction state and pursuit flags.
 */
GInfractionManager::GInfractionManager() {
    mInfractions = 0;
    mNumThisPursuit = 0;
    mSpeeding = false;
    mDrivingRecklessly = false;
    mRacing = false;
}

/**
 * @brief Clears infraction state when a new pursuit starts.
 */
void GInfractionManager::PursuitStarted() {
    ClearInfractions();
}

/**
 * @brief Counts the set bits in the current infraction mask.
 * @return The number of infractions that occurred.
 */
unsigned int GInfractionManager::GetNumInfractions() {
    unsigned int total;
    unsigned int infracts;

    infracts = mInfractions;
    total = 0;
    while (infracts != 0) {
        total += infracts & 1;
        infracts >>= 1;
    }
    return total;
}

/**
 * @brief Checks whether the specified infraction has been reported.
 * @param infraction Infraction bit to test.
 * @return True if the infraction bit is set.
 */
bool GInfractionManager::DidInfractionOccur(InfractionType infraction) {
    return (mInfractions & infraction) != 0;
}
