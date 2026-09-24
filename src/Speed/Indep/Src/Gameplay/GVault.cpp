#include "Speed/Indep/Src/Gameplay/GVault.h"

/**
 * @brief Gets the name of the vault.
 */
const char *GVault::GetName() const {
    return this->mName;
}

/**
 * @brief Gets the attribute vault.
 */
Attrib::Vault *GVault::GetAttribVault() const {
    return this->mVault;
}

/**
 * @brief Gets the object count in the vault.
 */
unsigned int GVault::GetObjectCount() const {
    return this->mObjectCount;
}

/**
 * @brief Gets the memory footprint of the vault.
 */
unsigned int GVault::GetFootprint() const {
    return this->mDataSize + this->mField_0x24 + this->mField_0x30;
}

/**
 * @brief Gets the data offset of the vault.
 */
unsigned int GVault::GetDataOffset() const {
    return this->mDataOffset;
}

/**
 * @brief Gets the data size of the vault.
 */
unsigned int GVault::GetDataSize() const {
    return this->mDataSize;
}

/**
 * @brief Gets the load data offset of the vault.
 */
unsigned int GVault::GetLoadDataOffset() const {
    return this->mLoadDataOffset;
}

/**
 * @brief Gets the load data size of the vault.
 */
unsigned int GVault::GetLoadDataSize() const {
    return this->mLoadDataSize;
}

/**
 * @brief Reports whether the vault is resident.
 * @return True if resident; otherwise false.
 */
bool GVault::IsResident() const {
    return (this->mFlags & 1) != 0;
}

/**
 * @brief Reports whether the vault is transient.
 * @return True if transient; otherwise false.
 */
bool GVault::IsTransient() const {
    return (this->mFlags & 1) == 0;
}

/**
 * @brief Reports whether the vault is a race bin.
 * @return True if race bin; otherwise false.
 */
bool GVault::IsRaceBin() const {
    return (this->mFlags & 2) != 0;
}

/**
 * @brief Sets the race bin flag on the vault.
 */
void GVault::SetRaceBin() {
    this->mFlags |= 2;
}
