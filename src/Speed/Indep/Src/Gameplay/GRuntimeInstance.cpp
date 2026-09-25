#include "Speed/Indep/Src/Gameplay/GRuntimeInstance.h"
#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Gameplay/GMarker.h"
#include "Speed/Indep/Src/Gameplay/GTrigger.h"
#include "Speed/Indep/Src/Gameplay/GReflected.h"
#include "Speed/Indep/Src/Gameplay/GActivity.h"
#include "Speed/Indep/Src/Gameplay/GCharacter.h"
#include <stl/_algo.h>

GRuntimeInstance *GRuntimeInstance::sRingListHead[kGameplayObjType_Count] = {
    nullptr, nullptr, nullptr, nullptr, nullptr, nullptr
};

/**
 * @brief Constructs a new GRuntimeInstance.
 * @param key Attribute key.
 * @param type Gameplay object type.
 */
GRuntimeInstance::GRuntimeInstance(const Attrib::Key &key, GameplayObjType type)
    : Attrib::Gen::gameplay(key, 0, nullptr),
      mFlags(0),
      mNumConnected(0),
      mConnected(nullptr),
      mPrev(nullptr),
      mNext(nullptr) {
    this->AddToTypeList(type);
    GManager::Get().RegisterInstance(this);
    this->mFlags |= kFlag_Registered;
}

/**
 * @brief Destroys the GRuntimeInstance.
 */
GRuntimeInstance::~GRuntimeInstance() {
    GManager::Get().UnregisterInstance(this);
    this->DisconnectInstances();
    this->RemoveFromTypeList();
    this->mFlags &= ~kFlag_Registered;
}

/**
 * @brief Sets the connection buffer for runtime instance linkages.
 * @param buffer Pointer to the connected instance storage array.
 * @param maxConnections Maximum capacity of the connection buffer.
 */
void GRuntimeInstance::SetConnectionBuffer(ConnectedInstance *buffer, unsigned int maxConnections) {
    this->mConnected = buffer;
    this->mNumConnected = 0;
}

/**
 * @brief Allocates dynamic connection buffer for instances.
 * @param numConnections Number of connections to allocate.
 */
void GRuntimeInstance::AllocateConnectionBuffer(unsigned int numConnections) {
    this->mConnected = new ConnectedInstance[numConnections];
    this->mNumConnected = 0;
    this->mFlags |= kFlag_DynamicConnectionBuffer;
}

/**
 * @brief Connects to another runtime instance.
 * @param key Attribute key of target instance.
 * @param index Connection slot index.
 * @param instance Target runtime instance pointer.
 */
void GRuntimeInstance::ConnectToInstance(const unsigned int &key, int index, GRuntimeInstance *instance) {
    unsigned int packedKey = this->MakePackedKey(key, index);
    ConnectedInstance &conn = this->mConnected[this->mNumConnected++];
    conn.mIndexedKey = packedKey;
    conn.mInstance = instance;
}

/**
 * @brief Sorts and locks the connection array for fast binary search.
 */
void GRuntimeInstance::LockConnections() {
    _STL::sort(this->mConnected, this->mConnected + this->mNumConnected);
    this->mFlags |= kFlag_ConnectionsLocked;
}

/**
 * @brief Finds a connected instance using binary search on the packed key.
 * @param key Attribute key.
 * @param index Connection slot index.
 * @return Pointer to connected instance, or nullptr if not found.
 */
GRuntimeInstance *GRuntimeInstance::GetConnectedInstance(const unsigned int &key, int index) const {
    unsigned int packedKey = this->MakePackedKey(key, index);
    int lower = 0;
    int upper = this->mNumConnected - 1;
    while (lower <= upper) {
        int middle = (lower + upper) >> 1;
        ConnectedInstance *conn = &this->mConnected[middle];
        if (packedKey > conn->mIndexedKey) {
            lower = middle + 1;
        } else if (packedKey < conn->mIndexedKey) {
            upper = middle - 1;
        } else {
            return conn->mInstance;
        }
    }
    return nullptr;
}

/**
 * @brief Resets all connections and unlocks the connection buffer.
 */
void GRuntimeInstance::ResetConnections() {
    this->mNumConnected = 0;
    this->mFlags &= ~kFlag_ConnectionsLocked;
}

/**
 * @brief Disconnects all instances and frees dynamic buffer if allocated.
 */
void GRuntimeInstance::DisconnectInstances() {
    if ((this->mFlags & kFlag_DynamicConnectionBuffer) != 0) {
        delete[] this->mConnected;
        this->mFlags &= ~kFlag_DynamicConnectionBuffer;
    }
    this->mConnected = nullptr;
    this->mNumConnected = 0;
    this->mFlags &= ~kFlag_ConnectionsLocked;
}

/**
 * @brief Packs a 24-bit attribute key and an 8-bit index into a single 32-bit key.
 * @param key Attribute key.
 * @param index Connection slot index.
 * @return 32-bit packed key.
 */
unsigned int GRuntimeInstance::MakePackedKey(unsigned int key, int index) const {
    return (GManager::Get().Get24BitAttributeKey(key) << 8) | (index & 0xFF);
}

/**
 * @brief Adds this instance to the circular doubly-linked list for its type.
 * @param type Gameplay object type.
 */
void GRuntimeInstance::AddToTypeList(GameplayObjType type) {
    if (sRingListHead[type] == nullptr) {
        this->mNext = this;
        this->mPrev = this;
        sRingListHead[type] = this;
    } else {
        this->mNext = sRingListHead[type];
        this->mPrev = sRingListHead[type]->mPrev;
        this->mPrev->mNext = this;
        this->mNext->mPrev = this;
    }
}

/**
 * @brief Removes this instance from its type list ring.
 */
void GRuntimeInstance::RemoveFromTypeList() {
    this->mNext->mPrev = this->mPrev;
    this->mPrev->mNext = this->mNext;
    for (unsigned int i = 0; i <= 5; ++i) {
        if (sRingListHead[i] == this) {
            sRingListHead[i] = (this->mNext != this) ? this->mNext : nullptr;
        }
    }
    this->mNext = nullptr;
    this->mPrev = nullptr;
}

/**
 * @brief Returns the number of currently linked connected instances.
 * @return Count of connected instances.
 */
unsigned short GRuntimeInstance::GetConnectionCount() const {
    return this->mNumConnected;
}

/**
 * @brief Returns the connected instance at a specific index.
 * @param index Array index into connections.
 * @return Connected instance pointer.
 */
GRuntimeInstance *GRuntimeInstance::GetConnectionAt(unsigned int index) const {
    return this->mConnected[index].mInstance;
}

/**
 * @brief Checks if this instance inherits from a specified template key.
 * @param templateKey Attribute template key to test.
 * @return True if derived from the template, false otherwise.
 */
bool GRuntimeInstance::IsDerivedFromTemplate(unsigned int templateKey) const {
    Attrib::Key parent = this->GetParent();
    while (parent != 0) {
        if (parent == templateKey) {
            return true;
        }
        Attrib::Gen::gameplay parentRecord(parent, 0, nullptr);
        parent = parentRecord.GetParent();
    }
    return false;
}

/**
 * @brief Finds a runtime instance of type T by collection key.
 * @param key Collection attribute key.
 * @return Pointer to object of type T, or nullptr if not found.
 */
template <class T>
T *GRuntimeInstance::FindObject(unsigned int key) {
    GameplayObjType type = T::GetTypeStatic();
    GRuntimeInstance *curr = sRingListHead[type];
    while (curr != nullptr) {
        if (curr->GetCollection() == key) {
            return static_cast<T *>(curr);
        }
        curr = curr->mNext;
        if (curr == sRingListHead[type]) {
            break;
        }
    }
    return nullptr;
}

/**
 * @brief Retrieves the spatial position of this instance.
 * @param out Vector to receive position.
 * @return True if position is supported, false otherwise.
 */
bool GRuntimeInstance::GetPosition(UMath::Vector3 &out) {
    switch (this->GetType()) {
        case kGameplayObjType_Marker:
            out = static_cast<const GMarker *>(this)->GetPosition();
            return true;
        case kGameplayObjType_Trigger:
            static_cast<GTrigger *>(this)->GetPosition(out);
            return true;
        default:
            return false;
    }
}

/**
 * @brief Retrieves the spatial facing direction of this instance.
 * @param out Vector to receive direction.
 * @return True if direction is supported, false otherwise.
 */
bool GRuntimeInstance::GetDirection(UMath::Vector3 &out) {
    switch (this->GetType()) {
        case kGameplayObjType_Marker:
            out = static_cast<const GMarker *>(this)->GetDirection();
            return true;
        case kGameplayObjType_Trigger:
            out = static_cast<const GTrigger *>(this)->GetDirection();
            return true;
        default:
            return false;
    }
}

/**
 * @brief Constructs a GCollectionKey from a runtime instance.
 * @param instance Pointer to runtime instance.
 */
GCollectionKey::GCollectionKey(GRuntimeInstance *instance) {
    this->mCollectionKey = (instance != nullptr) ? instance->GetCollection() : 0;
}

/**
 * @brief Resolves this collection key to a runtime instance pointer.
 * @return Pointer to runtime instance, or nullptr if not found.
 */
GCollectionKey::operator GRuntimeInstance *() const {
    return GManager::Get().FindInstance(this->mCollectionKey);
}

template GActivity *GRuntimeInstance::FindObject<GActivity>(unsigned int);
template GCharacter *GRuntimeInstance::FindObject<GCharacter>(unsigned int);
template GMarker *GRuntimeInstance::FindObject<GMarker>(unsigned int);

