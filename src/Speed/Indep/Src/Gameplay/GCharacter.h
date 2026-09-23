#ifndef GAMEPLAY_GCHARACTER_H
#define GAMEPLAY_GCHARACTER_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

#include "GRuntimeInstance.h"
#include "Speed/Indep/Libs/Support/Utility/UTypes.h"
#include "Speed/Indep/Src/Interfaces/Simables/IVehicle.h"
#include "Speed/Indep/Src/Sim/SimAttachable.h"

// total size: 0x80
class GCharacter : public GRuntimeInstance, public UTL::COM::Object, public IAttachable {
  public:
    /**
     * @brief Constructs a new GCharacter runtime instance.
     * @param triggerKey The attribute key identifying this character.
     */
    GCharacter(const Attrib::Key &triggerKey);

    /**
     * @brief Destroys the GCharacter instance and its attachments.
     */
    ~GCharacter() override;

    /**
     * @brief Gets the gameplay object type for this character.
     * @return The character gameplay object type (kGameplayObjType_Character).
     */
    GameplayObjType GetType() const override {
        return kGameplayObjType_Character;
    }

    /**
     * @brief Callback invoked when another attachable object is attached.
     * @param pOther The attachable object being attached.
     */
    void OnAttached(IAttachable *pOther) override;

    /**
     * @brief Callback invoked when another attachable object is detached.
     * @param pOther The attachable object being detached.
     */
    void OnDetached(IAttachable *pOther) override;

    IVehicle *GetSpawnedVehicle() const;
    const char *GetName() const;
    void Spawn(const UMath::Vector3 &pos, const UMath::Vector3 &dir, class GMarker *marker, float speed);
    void Unspawn();
    void UnspawnWhenOffscreen();
    bool IsSpawned() const;
    bool SpawnPending() const;
    void ReleaseVehicle();
    bool IsNoLongerUseful() const;
    bool AttemptSpawn();

    /**
     * @brief Attaches a COM object to this character's attachments list.
     * @param object The COM object to attach.
     * @return True if attachment was successful.
     */
    bool Attach(UTL::COM::IUnknown *object) override { return this->mAttachments->Attach(object); }

    /**
     * @brief Detaches a COM object from this character's attachments list.
     * @param object The COM object to detach.
     * @return True if detachment was successful.
     */
    bool Detach(UTL::COM::IUnknown *object) override { return this->mAttachments->Detach(object); }

    /**
     * @brief Queries whether a COM object is attached to this character.
     * @param object The COM object to check.
     * @return True if the object is attached.
     */
    bool IsAttached(const UTL::COM::IUnknown *object) const override { return this->mAttachments->IsAttached(object); }

    /**
     * @brief Retrieves the list of attachments for this character.
     * @return Pointer to the attachments list.
     */
    const List *GetAttachments() const override { return &this->mAttachments->GetList(); }

  private:
    UMath::Vector3 mSpawnPos;       // offset 0x40, size 0xC
    uint8 mState;                   // offset 0x4C, size 0x1
    uint8 mFlags;                   // offset 0x4D, size 0x1
    uint16 mCreateAttemptsMade;     // offset 0x4E, size 0x2
    UMath::Vector3 mSpawnDir;       // offset 0x50, size 0xC
    float mSpawnSpeed;              // offset 0x5C, size 0x4
    UMath::Vector3 mTargetPos;      // offset 0x60, size 0xC
    IVehicle *mVehicle;             // offset 0x6C, size 0x4
    UMath::Vector3 mTargetDir;      // offset 0x70, size 0xC
    Sim::Attachments *mAttachments; // offset 0x7C, size 0x4

  public:
    void SetFlag(unsigned short flag, bool set);
    void ClearFlag(unsigned short flag);

    /**
     * @brief Checks if a character state flag is set.
     * @param flag Bitmask flag to check.
     * @return True if the flag bit is set.
     */
    bool IsFlagSet(unsigned short flag) const {
        return (this->mFlags & flag) != 0;
    }
};

DECLARE_CONTAINER_TYPE(ID_GCharacterList);

#endif
