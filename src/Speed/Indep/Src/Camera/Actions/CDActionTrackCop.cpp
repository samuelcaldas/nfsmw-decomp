#include "Speed/Indep/Src/Camera/Actions/CDActionTrackCop.hpp"

/**
 * @brief Resets track cop action state.
 */
void CDActionTrackCop::Reset() {
}

/**
 * @brief Sets special parameter for track cop action.
 */
void CDActionTrackCop::SetSpecial(float) {
}

/**
 * @brief Handles attachment callback for track cop action.
 */
void CDActionTrackCop::OnAttached(IAttachable *) {
}

/**
 * @brief Gets attachments list for track cop action.
 * @return Pointer to attachable list.
 */
const IAttachable::List *CDActionTrackCop::GetAttachments() const {
    return this->mAttachments;
}
