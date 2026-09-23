#include "Speed/Indep/Src/Physics/Dynamics/Collision.h"

namespace Dynamics {
namespace Collision {

Geometry::Geometry() {
    this->mShape = UNKNOWN;
}

Geometry::Geometry(const UMath::Matrix4 &orient, const UMath::Vector3 &position, const UMath::Vector3 &dimension, Shape shape,
                   const UMath::Vector3 &delta) {
    this->Set(orient, position, dimension, shape, delta);
}

void Geometry::Move(const UMath::Vector3 &deltaP) {
    UMath::Add(reinterpret_cast<UMath::Vector3 &>(this->mPosition), deltaP);
    UMath::Add(this->mDelta, deltaP);
}

bool Geometry::BoxVsSphere(const Geometry *A, const Geometry *B, Geometry *result) {
    return SphereVsBox(B, A, result);
}

bool Geometry::FindIntersection(const Geometry *A, const Geometry *B, Geometry *result) {
    static bool (*const algos[MAXSHAPES][MAXSHAPES])(const Geometry *, const Geometry *, Geometry *) = {
        {NULL, NULL, NULL},
        {NULL, BoxVsBox, BoxVsSphere},
        {NULL, SphereVsBox, SphereVsSphere},
    };

    result->mCollision_normal.w = 0.0f;
    result->mCollision_point.w = 0.0f;
    result->mOverlap = -100000.0f;
    result->mPenetratesOther = 0;
    bool (*algo)(const Geometry *, const Geometry *, Geometry *) = algos[A->mShape][B->mShape];
    if (algo != NULL) {
        return algo(A, B, result);
    }
    return false;
}

} // namespace Collision
} // namespace Dynamics
