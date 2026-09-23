#ifndef DYNAMICS_ARTICULATION_H
#define DYNAMICS_ARTICULATION_H

#include "Speed/Indep/Libs/Support/Utility/FastMem.h"
#include "Speed/Indep/Libs/Support/Utility/UMath.h"
#include "Speed/Indep/Libs/Support/Utility/UStandard.h"
#include "Speed/Indep/Libs/Support/Utility/UVector.h"
#include "Speed/Indep/Src/Physics/Dynamics.h"
#include "Speed/Indep/bWare/Inc/bList.hpp"

namespace Dynamics {
namespace Articulation {

struct HJOINT__ {
    int mUnused;
};
typedef HJOINT__ *HJOINT;

enum eConstraint {
    CONSTRAINT_NONE = 0,
};

enum eJointFlags {
    JF_NONE = 0,
    JF_IMMOBILE_MALE = 1,
    JF_IMMOBILE_FEMALE = 2,
};

struct Quaternion : public UMath::Vector4 {
};

class Lever {
  public:
    Lever() {}
    Lever(IEntity *entity, const UMath::Vector3 &arm, bool immobile)
        : mArm(arm), mEntity(entity), mImmobile(immobile) {}
    virtual void OnDebugDraw();

    const IEntity *GetEntity() const {
        return this->mEntity;
    }

  private:
    int mPad;
    UVector3 mArm;
    IEntity *mEntity;
    int mImmobile;
};

class Constraint {
  public:
    USE_FASTALLOC(Constraint);
    Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type);
    virtual void OnDebugDraw();

  private:
    Quaternion mOrient;
    char mPad0[0x30];
    Lever *mFemale;
    Lever *mMale;
    UVector3 mPost;
    float mMinTheta;
    float mMaxTheta;
    int mFlag;
    eConstraint mType;
};

class Joint : public bTNode<Joint> {
  public:
    USE_FASTALLOC(Joint);
    Joint(IEntity *female, const UMath::Vector3 &female_arm, IEntity *male, const UMath::Vector3 &male_arm, eJointFlags flags);
    ~Joint();
    virtual void OnDebugDraw();

    bool Owns(const IEntity *entity) const;
    void Resolve();
    void AddConstraint(IEntity *entity, const UMath::Matrix4 &orient, float minTheta, float maxTheta, const UMath::Vector3 &post, eConstraint type);
    HJOINT GetHandle() const {
        return this->mHandle;
    }

    static HJOINT mNextHandle;

  private:
    Lever mFemale;
    int mPad1;
    Lever mMale;
    HJOINT mHandle;
    UTL::Std::list<Constraint *, _type_list> mConstraints;
};

void Constrain(HJOINT handle, IEntity *entity, const UMath::Matrix4 &orient, float minTheta, float maxTheta, const UMath::Vector3 &post, eConstraint type);
void Resolve();
bool IsJoined(const IEntity *A, const IEntity *B);
bool IsJoined(const IEntity *entity);
HJOINT Create(IEntity *female, const UMath::Vector3 &female_arm, IEntity *male, const UMath::Vector3 &male_arm, eJointFlags flags);
void Release(IEntity *entity);

} // namespace Articulation
} // namespace Dynamics

#endif
