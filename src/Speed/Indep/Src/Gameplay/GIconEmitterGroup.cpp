#include "GIcon.h"

/**
 * @brief Clears the icon's emitter when its emitter group is deleted.
 * @param obj Icon associated with the emitter group.
 * @param group Emitter group being deleted.
 */
void GIcon::NotifyEmitterGroupDelete(void *obj, EmitterGroup *group) {
    GIcon *icon = static_cast<GIcon *>(obj);
    if (icon->mEmitter == group) {
        icon->mEmitter = 0;
    }
}
