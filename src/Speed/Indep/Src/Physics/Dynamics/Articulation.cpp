#include "Speed/Indep/Src/Physics/Dynamics/Articulation.h"

namespace Dynamics {
namespace Articulation {

HJOINT Joint::mNextHandle = reinterpret_cast<HJOINT>(1);
static bTList<Joint> Joints;

inline Joint *Find(HJOINT handle) {
    for (Joint *j = Joints.GetHead(); j != Joints.EndOfList(); j = j->GetNext()) {
        if (j->GetHandle() == handle) {
            return j;
        }
    }
    return NULL;
}

void Constrain(HJOINT handle, IEntity *entity, const UMath::Matrix4 &orient, float minTheta, float maxTheta, const UMath::Vector3 &post, eConstraint type) {
    Joint *j = Find(handle);
    if (j != NULL) {
        j->AddConstraint(entity, orient, minTheta, maxTheta, post, type);
    }
}

bool IsJoined(const IEntity *A, const IEntity *B) {
    for (Joint *j = Joints.GetHead(); j != Joints.EndOfList(); j = j->GetNext()) {
        if (j->Owns(A) && j->Owns(B)) {
            return true;
        }
    }
    return false;
}

bool IsJoined(const IEntity *entity) {
    for (Joint *j = Joints.GetHead(); j != Joints.EndOfList(); j = j->GetNext()) {
        if (j->Owns(entity)) {
            return true;
        }
    }
    return false;
}

void Resolve() {
    for (Joint *j = Joints.GetHead(); j != Joints.EndOfList(); j = j->GetNext()) {
        j->Resolve();
    }
}

HJOINT Create(IEntity *female, const UMath::Vector3 &female_arm, IEntity *male, const UMath::Vector3 &male_arm, eJointFlags flags) {
    Release(female);
    Release(male);
    Joint *joint = new Joint(female, female_arm, male, male_arm, flags);
    Joints.AddTail(joint);
    return joint->GetHandle();
}

void Release(IEntity *entity) {
    for (Joint *j = Joints.GetHead(); j != Joints.EndOfList(); ) {
        Joint *next = j->GetNext();
        if (j->Owns(entity)) {
            j->Remove();
            delete j;
        }
        j = next;
    }
}

/**
 * @brief Constructs an articulation joint between female and male entities.
 */
Joint::Joint(IEntity *female, const UMath::Vector3 &female_arm, IEntity *male, const UMath::Vector3 &male_arm, eJointFlags flags)
    : mFemale(female, female_arm, (flags & JF_IMMOBILE_FEMALE) != 0),
      mMale(male, male_arm, (flags & JF_IMMOBILE_MALE) ? true : false),
      mHandle(mNextHandle++) {}

void Joint::OnDebugDraw() {}

Joint::~Joint() {
    for (UTL::Std::list<Constraint *, _type_list>::iterator it = this->mConstraints.begin(); it != this->mConstraints.end(); it++) {
        delete *it;
    }
}

bool Joint::Owns(const IEntity *entity) const {
    if (entity == this->mFemale.GetEntity() || entity == this->mMale.GetEntity()) {
        return true;
    }
    return false;
}

/**
 * @brief Adds a constraint to the articulation joint.
 */
void Joint::AddConstraint(IEntity *entity, const UMath::Matrix4 &orient, float minTheta, float maxTheta, const UMath::Vector3 &post, eConstraint type) {
    if (entity == this->mFemale.GetEntity()) {
        this->mConstraints.push_back(new Constraint(orient, minTheta, maxTheta, this->mFemale, this->mMale, post, type));
    } else {
        this->mConstraints.push_back(new Constraint(orient, minTheta, maxTheta, this->mMale, this->mFemale, post, type));
    }
}

/**
 * @brief Constructs a physics joint constraint.
 */
Constraint::Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type)
    : mFemale(female),
      mMale(male) {
    mPost = post;
    mType = type;
    mEnabled = true;
    mOuterA = maxTheta / 360.0f;
    mInnerA = minTheta / 360.0f;

    VU0_m4toquat(orient, *(UMath::Vector4 *)&mOrientation);
    float len = VU0_sqrt(VU0_v3lengthsquare(post));

    mInnerN.x = -VU0_Cos(mInnerA * 0.5f);
    mInnerN.y = 1.0f;
    mInnerN.z = VU0_Sin(mInnerA * 0.5f);
    mInnerR.x = VU0_Sin(mInnerA * 0.5f) * len;
    mInnerR.y = 1.0f;
    mInnerR.z = VU0_Cos(mInnerA * 0.5f) * len;
    mOuterN.x = VU0_Cos(mOuterA * 0.5f);
    mOuterN.y = 1.0f;
    mOuterN.z = VU0_Sin(mOuterA * 0.5f);
    mOuterR.x = -VU0_Sin(mOuterA * 0.5f) * len;
    mOuterR.y = 1.0f;
    mOuterR.z = VU0_Cos(mOuterA * 0.5f) * len;
}

void Lever::OnDebugDraw() {}

/**
 * @brief Sets the fulcrum of the articulation lever.
 */
void Lever::SetFulcrum(const UVector3 &fulcrum, bool fixed) {
    if (mEntity != NULL && fixed) {
        UMath::Vector3 arm;
        VU0_MATRIX3x4_vect3mult(mArm, mEntity->GetRotation(), arm);
        float len = VU0_sqrt(VU0_v3lengthsquare(arm));
        (void)len;
    }
}

void Constraint::OnDebugDraw() {}

} // namespace Articulation
} // namespace Dynamics
