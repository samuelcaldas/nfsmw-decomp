#include "Speed/Indep/Src/Gameplay/GMarker.h"
#include "Speed/Indep/Libs/Support/Utility/UMath.h"

/**
 * @brief Constructs a new GMarker instance and initializes its spatial transform.
 * @param markerKey The attribute key identifying this marker.
 */
GMarker::GMarker(const unsigned int &markerKey)
    : GRuntimeInstance(markerKey, static_cast<GameplayObjType>(3)) {
    const UMath::Vector3 &attr_pos = this->Position();

    UMath::Matrix4 mat = UMath::Matrix4::kIdentity;
    UMath::Vector3 dir = {0.0f, 0.0f, 1.0f};
    UMath::Init(mat);

    MATRIX4_multyrot(&mat, -this->Rotation() * (1.0f / 360.0f), &mat);
    VU0_MATRIX3x4_vect3mult(dir, mat, dir);

    UMath::Vector3 pos = UMath::Vector3Make(-attr_pos.y, attr_pos.z, attr_pos.x);
    this->mPosition = pos;
    this->mDirection = dir;
}

/**
 * @brief Destructor for GMarker.
 */
GMarker::~GMarker() {
}
