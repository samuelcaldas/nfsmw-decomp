#include "Speed/Indep/Src/Gameplay/GRaceDatabase.h"

const char GRaceDatabase::sDDayRaces[5][8] = {"16.1.0", "16.2.2", "16.2.3", "16.1.1", "16.2.1"};

/**
 * @brief Forces instantiation of GRaceBin methods.
 */
static unsigned short ForceGRaceBinInstantiation(const GRaceBin *bin) {
    return bin->GetAwardedRaceWins();
}
