#include "Speed/Indep/Src/Camera/Actions/CDActionShowcase.hpp"

/**
 * @brief Resets showcase action.
 */
void CDActionShowcase::Reset() {
}

/**
 * @brief Sets special parameter for showcase action.
 */
void CDActionShowcase::SetSpecial(float) {
}

/**
 * @brief Handles attachment notification.
 */
void CDActionShowcase::OnAttached(IAttachable *) {
}

/**
 * @brief Gets attachments list for showcase action.
 * @return Pointer to attachable list.
 */
const IAttachable::List *CDActionShowcase::GetAttachments() const {
    return this->mAttachments;
}
