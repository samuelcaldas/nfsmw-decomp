#include "Speed/Indep/Src/Camera/Actions/CDActionDrive.hpp"

/**
 * @brief Resets drive camera action state.
 */
void CDActionDrive::Reset() {
}

/**
 * @brief Sets special parameter for drive camera action.
 * @param val Special parameter value.
 */
void CDActionDrive::SetSpecial(float val) {
}

/**
 * @brief Returns camera mover for drive camera action.
 * @return Pointer to camera mover.
 */
CameraMover *CDActionDrive::GetMover() {
    return this->mMover;
}

/**
 * @brief Handles attachment callback for drive camera action.
 */
void CDActionDrive::OnAttached(IAttachable *) {
}

/**
 * @brief Returns attachments list for drive camera action.
 * @return Pointer to attachments list.
 */
const IAttachable::List *CDActionDrive::GetAttachments() const {
    return this->mAttachments;
}
