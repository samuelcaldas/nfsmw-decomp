#include "Speed/Indep/Src/Gameplay/GVault.h"
#include "Speed/Indep/Src/Misc/AttribAlloc.h"

// total size: 0x18
class LoggingAttribAllocator : public IAttribAllocator {
  public:
    LoggingAttribAllocator() : mChecksum(0), mAllocCount(0), mAllocBytes(0), mFreeCount(0), mFreeBytes(0) {}

    void LogFree(unsigned int bytes, const char *) {
        mFreeCount++;
        mFreeBytes += bytes;
    }

  protected:
    unsigned int mChecksum;    // offset 0x4, size 0x4
    unsigned int mAllocCount;  // offset 0x8, size 0x4
    unsigned int mAllocBytes;  // offset 0xC, size 0x4
    unsigned int mFreeCount;   // offset 0x10, size 0x4
    unsigned int mFreeBytes;   // offset 0x14, size 0x4
};

// total size: 0x24
class BlockLoadingAttribAllocator : public LoggingAttribAllocator {
  public:
    BlockLoadingAttribAllocator(unsigned char *buffer, unsigned int heapSize, unsigned int targetChecksum)
        : LoggingAttribAllocator(), mAllocPtr(buffer), mAvailBytes(heapSize), mTargetChecksum(targetChecksum) {}

    void *Allocate(unsigned int bytes, const char *name) override;

    /**
     * @brief Returns aligned memory to the available pool and logs the deallocation.
     * @param ptr   Pointer to the memory block (unused).
     * @param bytes Size of the block in bytes; rounded up to 16-byte alignment.
     * @param name  Allocation name tag (unused).
     */
    void Free(void *ptr, unsigned int bytes, const char *name) override;

  protected:
    unsigned char *mAllocPtr;      // offset 0x18, size 0x4
    unsigned int mAvailBytes;      // offset 0x1C, size 0x4
    unsigned int mTargetChecksum;  // offset 0x20, size 0x4
};

/**
 * @brief Returns aligned memory to the available pool and logs the deallocation.
 * @param ptr   Pointer to the memory block (unused).
 * @param bytes Size of the block in bytes; rounded up to 16-byte alignment.
 * @param name  Allocation name tag (unused).
 */
void BlockLoadingAttribAllocator::Free(void *ptr, unsigned int bytes, const char *name) {
    unsigned int aligned = (bytes + 15) & ~15;
    mFreeCount++;
    mFreeBytes += aligned;
    mAvailBytes += aligned;
}

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
 * @brief Reports whether the vault is loaded.
 * @return True if loaded; otherwise false.
 */
bool GVault::IsLoaded() const {
    return this->mVault != 0;
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

/**
 * @brief Synchronously loads this vault through the game manager.
 */
void GVault::LoadSyncTransient() {
    GManager::Get().LoadVaultSync(this);
}
