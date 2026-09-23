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
