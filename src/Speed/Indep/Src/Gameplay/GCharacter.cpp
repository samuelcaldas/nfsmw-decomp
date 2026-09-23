#include "Speed/Indep/Src/Gameplay/GCharacter.h"
#include "Speed/Indep/Src/Sim/SimAttachable.h"

/**
 * @brief Attaches a COM object to the character attachments.
 */
bool GCharacter::Attach(UTL::COM::IUnknown *object) {
    return this->mAttachments->Attach(object);
}

/**
 * @brief Detaches a COM object from the character attachments.
 */
bool GCharacter::Detach(UTL::COM::IUnknown *object) {
    return this->mAttachments->Detach(object);
}

/**
 * @brief Checks if a COM object is attached.
 */
bool GCharacter::IsAttached(const UTL::COM::IUnknown *object) const {
    return this->mAttachments->IsAttached(object);
}

/**
 * @brief Returns the character attachments list.
 */
const IAttachable::List *GCharacter::GetAttachments() const {
    return &this->mAttachments->GetList();
}
