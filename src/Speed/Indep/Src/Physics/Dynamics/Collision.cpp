#include "Speed/Indep/Src/Physics/Dynamics/Collision.h"

namespace Dynamics {
namespace Collision {

Friction::State Friction::GetForce(const UVector3 &p, float impulse, const UVector3 &n, UVector3 &Ff) const {
    Ff.z = 0.0f;
    Ff.y = 0.0f;
    Ff.x = 0.0f;
    float neg_impulse = -impulse;
    if (neg_impulse <= 0.0f) {
        return None;
    }
    Ff = p + n * neg_impulse;
    float len = Ff.Magnitude();
    if (len <= 0.0f) {
        return Static;
    }
    if (len > neg_impulse * this->mUs) {
        float scale = -(neg_impulse * this->mUk) / len;
        UMath::Scale(Ff, scale, Ff);
        return Dynamic;
    }
    Ff.x = -Ff.x;
    Ff.y = -Ff.y;
    Ff.z = -Ff.z;
    return Static;
}

/**
 * @brief Constructs a Moment object from orientation, mass, inertia, center of gravity, and velocities.
 */
Moment::Moment(const UMath::Matrix4 &orientation, float mass, const UMath::Vector3 &inertia, const UMath::Vector3 &cg, const UMath::Vector3 &linearVel,
               const UMath::Vector3 &angularVel, const UMath::Vector3 &position) {
    mOrientation = orientation;
    mCG = cg;
    mLinearVelocity = linearVel;
    mAngularVelocity = angularVel;
    mPosition = position;
    mInertiaP = inertia;
    mInertialScale = UVector3(1.0f, 1.0f, 1.0f);
    mImmobile = false;
    mBrakingForce = 0.0f;
    mMass = mass;
    mMassInv = 1.0f / mass;
    mClosingVelocity = UVector3::kZero;
    mSlidingVelocity = UVector3::kZero;
    mForce = UVector3::kZero;
    mFriction = UVector3::kZero;
    mFrictionState = Friction::None;
    mElasticity = 0.0f;
    mFixedCG = false;
    UMath::Transpose(orientation, mOrientationInv);
}

/**
 * @brief Constructs a Moment object from an IEntity.
 */
Moment::Moment(const IEntity *entity) {
    mOrientation = entity->GetRotation();
    mCG = entity->GetCenterOfGravity();
    mLinearVelocity = entity->GetLinearVelocity();
    mAngularVelocity = entity->GetAngularVelocity();
    mPosition = entity->GetPosition();
    mInertiaP = entity->GetPrincipalInertia();
    mInertialScale = UVector3(1.0f, 1.0f, 1.0f);
    mImmobile = entity->IsImmobile();
    mBrakingForce = 0.0f;
    mMass = entity->GetMass();
    mMassInv = 1.0f / mMass;
    mClosingVelocity = UVector3::kZero;
    mSlidingVelocity = UVector3::kZero;
    mForce = UVector3::kZero;
    mFriction = UVector3::kZero;
    mFrictionState = Friction::None;
    mElasticity = 0.0f;
    mFixedCG = false;
    UMath::Transpose(mOrientation, mOrientationInv);
}

void Moment::SetInertia(const UMath::Vector3 &inertiaP) {
    this->mInertiaP = inertiaP;
}

void Moment::SetMass(float mass) {
    this->mMass = mass;
    this->mMassInv = 1.0f / mass;
}

void Moment::SetCG(const UMath::Vector3 &cg) {
    this->mCG = cg;
}

} // namespace Collision
} // namespace Dynamics
