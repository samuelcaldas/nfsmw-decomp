#include "Speed/Indep/Src/Gameplay/GMarker.h"

/**
 * @brief Gets the gameplay object type for this marker.
 * @return The marker gameplay object type (kGameplayObjType_Marker).
 */
GameplayObjType GMarker::GetType() const {
    return static_cast<GameplayObjType>(3);
}
