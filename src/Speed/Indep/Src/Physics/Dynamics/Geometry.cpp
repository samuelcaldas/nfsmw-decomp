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

/**
 * @brief Sets the geometry orientation, position, dimension, shape, and delta.
 */
void Geometry::Set(const UMath::Matrix4 &orient, const UMath::Vector3 &position, const UMath::Vector3 &dimension, Shape shape, const UMath::Vector3 &delta) {
    this->mShape = shape;

    switch (shape) {
    case BOX:
        UMath::Vector4To3(this->mPosition) = position;
        this->mDimension[0] = dimension.x;
        this->mDimension[1] = dimension.y;
        this->mDimension[2] = dimension.z;
        this->mDelta = delta;

        for (unsigned int i = 0; i < 3; ++i) {
            unsigned int offset = i * sizeof(UMath::Vector4);
            offset += reinterpret_cast<unsigned int>(this);
            UMath::Vector4 *base = reinterpret_cast<UMath::Vector4 *>(offset);
            UMath::Vector4 &normal = base[1];
            UMath::Vector4 &extent = base[4];
            UMath::Vector4To3(normal) = UMath::Vector4To3(orient[i]);
            VU0_v4scalexyz(normal, this->mDimension[i], extent);
        }
        break;

    case SPHERE: {
        this->mNormal[0] = UMath::Vector4::kIdentity;
        this->mNormal[1] = UMath::Vector4::kIdentity;
        this->mNormal[2] = UMath::Vector4::kIdentity;
        this->mExtent[0] = UMath::Vector4::kIdentity;
        this->mExtent[1] = UMath::Vector4::kIdentity;
        this->mExtent[2] = UMath::Vector4::kIdentity;
        this->mPosition = UMath::Vector4Make(position, 1.0f);
        float s = UMath::Max(dimension.x, UMath::Max(dimension.y, dimension.z));
        this->mDimension[2] = s;
        this->mDimension[1] = s;
        this->mDimension[0] = s;
        this->mDelta = delta;
        break;
    }

    default:
        this->mShape = UNKNOWN;
        break;
    }

    this->mCollision_normal.w = 0.0f;
    this->mCollision_point.w = 0.0f;
    this->mOverlap = -100000.0f;
    this->mPenetratesOther = 0;
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
        result->mCollision_point.x = A->mPosition.y + A->mDimension[0];
        result->mCollision_point.x = A->mPosition.z;

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
