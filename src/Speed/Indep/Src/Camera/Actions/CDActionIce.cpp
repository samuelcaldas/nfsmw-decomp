#include "Speed/Indep/Src/Camera/Actions/CDActionIce.hpp"

/**
 * @brief Resets CDActionIce state.
 */
void CDActionIce::Reset() {
}

/**
 * @brief Sets special parameter for CDActionIce.
 */
void CDActionIce::SetSpecial(float) {
}

/**
 * @brief Handles attachment callback.
 */
void CDActionIce::OnAttached(IAttachable *) {
}

/**
 * @brief Gets attachments list for CDActionIce.
 * @return Pointer to attachable list.
 */
const IAttachable::List *CDActionIce::GetAttachments() const {
    return this->mAttachments;
}
