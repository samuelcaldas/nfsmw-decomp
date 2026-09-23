#include "Speed/Indep/Src/Gameplay/GCharacter.h"
#include "Speed/Indep/Src/Sim/SimAttachable.h"

// -----------------------------------------------------------------------------
// GCharacter implementation
// -----------------------------------------------------------------------------

// Padding lines to align constructor to line 36
// Line 8
// Line 9
// Line 10
// Line 11
// Line 12
// Line 13
// Line 14
// Line 15
// Line 16
// Line 17
// Line 18
// Line 19
// Line 20
// Line 21
// Line 22
// Line 23
// Line 24
// Line 25
// Line 26
// Line 27
// Line 28
// Line 29
// Line 30
// Line 31
// Line 32
/**
 * @brief Constructs a GCharacter runtime instance with default spawn properties.
 * @param triggerKey The attribute key identifying this character.
 */
GCharacter::GCharacter(const Attrib::Key &triggerKey)
    : GRuntimeInstance(triggerKey, kGameplayObjType_Character),
      UTL::COM::Object(1),
      IAttachable(this),
      mSpawnPos(UMath::Vector3::kZero),
      mState(1),
      mFlags(0),
      mCreateAttemptsMade(0),
      mSpawnDir(UMath::Vector3::kZero),
      mSpawnSpeed(0.0f),
      mTargetPos(UMath::Vector3::kZero),
      mVehicle(NULL),
      mTargetDir(UMath::Vector3::kZero)
{ this->mAttachments = new Sim::Attachments(this); }

// Line 52
// Line 53
GCharacter::~GCharacter() {
    delete this->mAttachments;
}

// Line 58
void GCharacter::OnAttached(IAttachable *pOther) {


    IVehicle *vehicle;

    if (pOther->QueryInterface(&vehicle)) {
        this->mVehicle = vehicle;
    }
}
