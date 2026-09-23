#include "Speed/Indep/Src/Gameplay/GRaceDatabase.h"

const char GRaceDatabase::sDDayRaces[5][8] = {"16.1.0", "16.2.2", "16.2.3", "16.1.1", "16.2.1"};

/**
 * @brief Forces instantiation of GRaceBin methods.
 */
static unsigned short ForceGRaceBinInstantiation(const GRaceBin *bin) {
    return bin->GetAwardedRaceWins();
}

/**
 * @brief Returns the total count of registered races.
 * @return Sum of static and dynamic race counts.
 */
unsigned int GRaceDatabase::GetRaceCount() {
    return this->mRaceCountStatic + this->mRaceCountDynamic;
}

/**
 * @brief Returns the total count of race bins.
 * @return Count of race bins.
 */
unsigned int GRaceDatabase::GetBinCount() {
    return this->mBinCount;
}

/**
 * @brief Returns the race bin at the specified index.
 * @param index Array index of the requested race bin.
 * @return Pointer to the requested race bin.
 */
GRaceBin *GRaceDatabase::GetBin(unsigned int index) {
    return &this->mBins[index];
}

/**
 * @brief Returns the startup race custom object.
 * @return Pointer to the startup race custom object.
 */
GRaceCustom *GRaceDatabase::GetStartupRace() {
    return this->mStartupRace;
}

/**
 * @brief Returns the startup race context.
 * @return Race context for the startup race.
 */
GRace::Context GRaceDatabase::GetStartupRaceContext() {
    return this->mStartupRaceContext;
}
