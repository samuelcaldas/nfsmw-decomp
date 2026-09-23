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

Lever::Lever(IEntity *entity, const UMath::Vector3 &arm, bool immobile)
    : mArm(arm), mEntity(entity), mImmobile(immobile) {}

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
    Constraint *c;
    if (entity == this->mFemale.GetEntity()) {
        c = new Constraint(orient, minTheta, maxTheta, this->mFemale, this->mMale, post, type);
    } else {
        c = new Constraint(orient, minTheta, maxTheta, this->mMale, this->mFemale, post, type);
    }
    this->mConstraints.push_back(c);
}

/**
 * @brief Constructs a physics joint constraint.
 */
Constraint::Constraint(const UMath::Matrix4 &orient, float minTheta, float maxTheta, Lever &female, Lever &male, const UMath::Vector3 &post, eConstraint type)
    : mFemale(&female), mMale(&male), mPost(post), mMinTheta(minTheta), mMaxTheta(maxTheta), mFlag(1), mType(type) {
    VU0_m4toquat(orient, mOrient);
    float len = VU0_sqrt(VU0_v3lengthsquare(post));
    (void)len;

    mMinTheta = minTheta * 0.017453292f;
    mMaxTheta = maxTheta * 0.017453292f;

    float cMin = cosf(mMinTheta);
    float sMin = sinf(mMinTheta);
    float cMax = cosf(mMaxTheta);
    float sMax = sinf(mMaxTheta);

    float *fields = reinterpret_cast<float *>(reinterpret_cast<char *>(this) + 0x14);
    fields[0] = -cMin;
    fields[1] = sMin;
    fields[2] = sMin * cMin;
    fields[3] = sMin;
    fields[4] = cMin;
    fields[5] = sMin;
    fields[6] = cMax;
    fields[7] = sMax;
    fields[8] = sMin;
    fields[9] = cMax;
    fields[10] = sMax;
    fields[11] = -sMax;
}

void Lever::OnDebugDraw() {}

void Constraint::OnDebugDraw() {}

} // namespace Articulation
} // namespace Dynamics
