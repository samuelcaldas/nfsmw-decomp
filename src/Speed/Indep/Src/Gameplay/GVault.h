#ifndef GVAULT_H
#define GVAULT_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

namespace Attrib { class Vault; }

class GVault {
  public:
    Attrib::Vault *mVault; // offset 0x0
    void *mPackEntry;      // offset 0x4
    unsigned int mFlags;   // offset 0x8

    /**
     * @brief Returns the attribute vault.
     */
    Attrib::Vault *GetAttribVault() const { return this->mVault; }

    bool IsLoaded() const;
    bool IsResident() const;
    bool IsTransient() const;
    bool IsRaceBin() const;
    void SetRaceBin();
    void LoadSyncTransient();
};

#endif
