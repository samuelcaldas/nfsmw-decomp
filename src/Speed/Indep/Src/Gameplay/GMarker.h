#ifndef GMARKER_H__
#define GMARKER_H__

#include "Speed/Indep/Src/Gameplay/GRuntimeInstance.h"

class GMarker : public GRuntimeInstance {
  public:
    GMarker(const unsigned int &markerKey);

    /**
     * @brief Gets the gameplay object type for this marker.
     * @return The marker gameplay object type (kGameplayObjType_Marker).
     */
    GameplayObjType GetType() const override {
        return static_cast<GameplayObjType>(3);
    }

    const UMath::Vector3 &GetPosition() const {
        return mPosition;
    }
    const UMath::Vector3 &GetDirection() const {
        return mDirection;
    }

    void CalcTransform(UMath::Matrix4 &mat) const;

  private:
    UMath::Vector3 mPosition;  // offset 0x28, size 0xC
    UMath::Vector3 mDirection; // offset 0x34, size 0xC
};

#endif
