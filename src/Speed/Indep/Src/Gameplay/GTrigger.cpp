#include "GTrigger.h"

GameplayObjType GTrigger::GetType() const {
    return kGameplayObjType_Trigger;
}

/**
 * @brief Copies the trigger's world position into the output vector.
 * @param pos Receives the x/y/z coordinates from the world trigger bounding box.
 */
void GTrigger::GetPosition(UMath::Vector3 &pos) {
    pos = *reinterpret_cast<const UMath::Vector3 *>(&this->mWorldTrigger.fPosRadius);
}
