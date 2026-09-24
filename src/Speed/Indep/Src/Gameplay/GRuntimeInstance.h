#ifndef GAMEPLAY_GRUNTIMEINSTANCE_H
#define GAMEPLAY_GRUNTIMEINSTANCE_H

#include "GUserIncludes.h"
#include "Speed/Indep/Libs/Support/Utility/FastMem.h"
#include "Speed/Indep/Src/Generated/AttribSys/Classes/gameplay.h"

// total size: 0x28
class GRuntimeInstance : public Attrib::Gen::gameplay {
  public:
    USE_FASTALLOC(GRuntimeInstance);

    enum Flags {
        kFlag_Registered = 1,
        kFlag_ConnectionsLocked = 2,
        kFlag_DynamicConnectionBuffer = 4,
    };

    struct ConnectedInstance {
        unsigned int mIndexedKey;
        GRuntimeInstance *mInstance;

        bool operator<(const ConnectedInstance &rhs) const {
            return this->mIndexedKey < rhs.mIndexedKey;
        }
    };

    GRuntimeInstance(const Attrib::Key &key, GameplayObjType type);
    virtual ~GRuntimeInstance();

    virtual GameplayObjType GetType() const = 0;

    void SetConnectionBuffer(ConnectedInstance *buffer, unsigned int maxConnections);
    void AllocateConnectionBuffer(unsigned int numConnections);
    void ConnectToInstance(const unsigned int &key, int index, GRuntimeInstance *instance);
    void LockConnections();
    GRuntimeInstance *GetConnectedInstance(const unsigned int &key, int index) const;
    void ResetConnections();
    void DisconnectInstances();
    unsigned int MakePackedKey(unsigned int key, int index) const;
    void AddToTypeList(GameplayObjType type);
    void RemoveFromTypeList();
    unsigned short GetConnectionCount() const;
    GRuntimeInstance *GetConnectionAt(unsigned int index) const;
    bool IsDerivedFromTemplate(unsigned int templateKey) const;
    bool GetPosition(UMath::Vector3 &out);
    bool GetDirection(UMath::Vector3 &out);

    template <class T>
    static T *FindObject(unsigned int key);

    static GRuntimeInstance *sRingListHead[kGameplayObjType_Count];

  private:
    uint16 mFlags;                        // offset 0x14, size 0x2
    uint16 mNumConnected;                 // offset 0x16, size 0x2
    struct ConnectedInstance *mConnected; // offset 0x18, size 0x4
    GRuntimeInstance *mPrev;              // offset 0x1C, size 0x4
    GRuntimeInstance *mNext;              // offset 0x20, size 0x4
};

#endif
