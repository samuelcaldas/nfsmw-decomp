#ifndef GVAULT_H
#define GVAULT_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

class GVault {
  public:
    bool IsLoaded() const;
    void LoadSyncTransient();
};

#endif
