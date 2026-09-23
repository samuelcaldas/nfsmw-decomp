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

/**
 * @brief Tests intersection between two sphere geometries.
 * @param A Pointer to sphere geometry A.
 * @param B Pointer to sphere geometry B.
 * @param result Pointer to result geometry where collision data is stored.
 * @return True if intersection occurs, false otherwise.
 */
bool Geometry::SphereVsSphere(const Geometry *A, const Geometry *B, Geometry *result) {
    UMath::Vector4 delta;
    UMath::Subxyz(A->mPosition, B->mPosition, delta);
    float dist = UMath::Sqrt(UMath::LengthSquarexyz(delta));
    float sum = A->mDimension[0] + B->mDimension[0];

    if (dist == 0.0f) {
        result->mCollision_normal.x = 0.0f;
        result->mCollision_normal.y = 1.0f;
        result->mCollision_normal.z = 0.0f;

        result->mCollision_point.x = A->mPosition.x;
        result->mCollision_point.y = A->mPosition.y + A->mDimension[0];
        result->mCollision_point.z = A->mPosition.z;

        result->mOverlap = -A->mDimension[0];
    } else if (dist >= sum) {
        return false;
    } else {
        float rsqrt = VU0_rsqrt(UMath::LengthSquarexyz(delta));
        UMath::Scalexyz(delta, rsqrt, result->mCollision_normal);
        result->mOverlap = dist - sum;
        UMath::ScaleAddxyz(result->mCollision_normal, B->mDimension[0] + result->mOverlap, B->mPosition, result->mCollision_point);
    }

    if (A != result) {
        UMath::Negatexyz(result->mCollision_normal);
        result->mPenetratesOther = 0;
    } else {
        result->mPenetratesOther = 1;
    }

    return true;
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
