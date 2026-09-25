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

/**
 * @brief Clears the particle effect slot matching the deleted emitter group.
 * @param obj   Opaque pointer to the GTrigger instance.
 * @param group EmitterGroup that is being deleted.
 */
void GTrigger::NotifyEmitterGroupDelete(void *obj, EmitterGroup *group) {
    GTrigger *trigger = reinterpret_cast<GTrigger *>(obj);
    unsigned int i = 0;
    do {
        if (trigger->mParticleEffect[i] == group) {
            trigger->mParticleEffect[i] = nullptr;
        }
        i++;
    } while (i < 2);
}
