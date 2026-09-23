#ifndef DYNAMICS_ARTICULATION_H
#define DYNAMICS_ARTICULATION_H

#include "Speed/Indep/Libs/Support/Utility/UMath.h"
#include "Speed/Indep/Libs/Support/Utility/UStandard.h"
#include "Speed/Indep/Libs/Support/Utility/UVector.h"
#include "Speed/Indep/Src/Physics/Dynamics.h"
#include "Speed/Indep/bWare/Inc/bList.hpp"

namespace Dynamics {
namespace Articulation {

struct HJOINT__ {};
typedef HJOINT__ *HJOINT;

enum eConstraint {
    CONSTRAINT_NONE = 0,
};

enum eJointFlags {
    JOINT_FLAG_NONE = 0,
};

struct Quaternion : public UMath::Vector4 {
};

class Lever {
  public:
    virtual void OnDebugDraw();

    const IEntity *GetEntity() const {
        return this->mEntity;
    }

  private:
    int mPad;
    UMath::Vector3 mPivot;
    IEntity *mEntity;
    int mFixed;
};

class Constraint {
  public:
    virtual void OnDebugDraw();

  private:
    char mPad[0x68];
};

class Joint : public bTNode<Joint> {
  public:
    virtual void OnDebugDraw();

    bool Owns(const IEntity *entity) const;
    void Resolve();

    static unsigned int mNextHandle;

  private:
    int mPad;
    Lever mLeverA;
    Lever mLeverB;
    int mHandle;
    UTL::Std::list<Constraint *, _type_list> mConstraints;
};

void Resolve();

} // namespace Articulation
} // namespace Dynamics

#endif
