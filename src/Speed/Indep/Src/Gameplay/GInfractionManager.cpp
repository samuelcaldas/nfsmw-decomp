#include "GInfractionManager.h"

/**
 * @brief Checks whether the specified infraction has been reported.
 * @param infraction Infraction bit to test.
 * @return True if the infraction bit is set.
 */
bool GInfractionManager::DidInfractionOccur(InfractionType infraction) {
    return (mInfractions & infraction) != 0;
}
