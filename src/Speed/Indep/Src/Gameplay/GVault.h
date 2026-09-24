#ifndef GVAULT_H
#define GVAULT_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

namespace Attrib { class Vault; }
class AttribVaultPackImage;

class GVault {
  public:
    Attrib::Vault *mVault; // offset 0x0
    const char *mName; // offset 0x4
    unsigned int mFlags; // offset 0x8
    unsigned int mPad0c; // offset 0xc
    unsigned int mDataOffset; // offset 0x10
    unsigned int mDataSize; // offset 0x14
    unsigned int mLoadDataOffset; // offset 0x18
    unsigned int mLoadDataSize; // offset 0x1c
    unsigned int mPad20; // offset 0x20
    unsigned int mField_0x24; // offset 0x24
    unsigned int mPad28; // offset 0x28
    unsigned int mPad2c; // offset 0x2c
    unsigned int mField_0x30; // offset 0x30
    unsigned int mObjectCount; // offset 0x34
    unsigned int mPad38; // offset 0x38
    unsigned int mPad3c; // offset 0x3c

    ~GVault();


    /**
     * @brief Gets the name of the vault.
     */
    const char *GetName() const;

    /**
     * @brief Gets the attribute vault.
     */
    Attrib::Vault *GetAttribVault() const;

    /**
     * @brief Gets the object count in the vault.
     */
    unsigned int GetObjectCount() const;

    /**
     * @brief Gets the memory footprint of the vault.
     */
    unsigned int GetFootprint() const;

    /**
     * @brief Gets the data offset of the vault.
     */
    unsigned int GetDataOffset() const;

    /**
     * @brief Gets the data size of the vault.
     */
    unsigned int GetDataSize() const;

    /**
     * @brief Gets the load data offset of the vault.
     */
    unsigned int GetLoadDataOffset() const;

    /**
     * @brief Gets the load data size of the vault.
     */
    unsigned int GetLoadDataSize() const;

    bool IsLoaded() const;
    bool IsResident() const;
    bool IsTransient() const;
    bool IsRaceBin() const;
    void SetRaceBin();
    void LoadSyncTransient();
    void LoadResident(AttribVaultPackImage *image);
    void Unload();
};

#endif
