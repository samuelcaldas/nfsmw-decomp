#include "Speed/Indep/Src/Camera/Actions/CDActionTrackCar.hpp"

/**
 * @brief Resets track car action.
 */
void CDActionTrackCar::Reset() {
}

/**
 * @brief Sets special parameter for track car action.
 */
void CDActionTrackCar::SetSpecial(float) {
}

/**
 * @brief Handles attachment notification.
 */
void CDActionTrackCar::OnAttached(IAttachable *) {
}

/**
 * @brief Gets attachments list for track car action.
 * @return Pointer to attachable list.
 */
const IAttachable::List *CDActionTrackCar::GetAttachments() const {
    return this->mAttachments;
}
