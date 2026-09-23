#include "Speed/Indep/Src/Gameplay/GVault.h"

/**
 * @brief Checks if the vault is loaded.
 */
bool GVault::IsLoaded() const {
    return this->mVault != nullptr;
}

/**
 * @brief Checks if the vault is resident.
 */
bool GVault::IsResident() const {
    return (this->mFlags & 1) != 0;
}

/**
 * @brief Checks if the vault is transient.
 */
bool GVault::IsTransient() const {
    return (this->mFlags & 1) == 0;
}

/**
 * @brief Checks if the vault is a race bin.
 */
bool GVault::IsRaceBin() const {
    return (this->mFlags & 2) != 0;
}

/**
 * @brief Sets the race bin flag.
 */
void GVault::SetRaceBin() {
    this->mFlags |= 2;
}

/**
 * @brief Forces instantiation of GVault methods.
 */
static void *ForceGVaultInstantiation(const GVault *vault) {
    return vault->GetAttribVault();
}
