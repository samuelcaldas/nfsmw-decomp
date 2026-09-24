#ifndef GMARKER_H__
#define GMARKER_H__

#include "Speed/Indep/Src/Gameplay/GRuntimeInstance.h"

/**
 * @brief Represents a spatial marker in the gameplay world.
 */
class GMarker : public GRuntimeInstance {
  public:
    USE_FASTALLOC(GMarker);

    /**
     * @brief Constructs a new GMarker instance from an attribute key.
     * @param markerKey Attribute collection key for this marker.
     */
    GMarker(const unsigned int &markerKey);

    /**
     * @brief Destructor for GMarker.
     */
    virtual ~GMarker();

    /**
     * @brief Gets the gameplay object type for this marker.
     * @return The marker gameplay object type (kGameplayObjType_Marker).
     */
    GameplayObjType GetType() const override {
        return kGameplayObjType_Marker;
    }

    static GameplayObjType GetTypeStatic() {
        return kGameplayObjType_Marker;
    }

    /**
     * @brief Gets the world position vector.
     * @return Const reference to the marker position.
     */
    const UMath::Vector3 &GetPosition() const {
        return mPosition;
    }

    /**
     * @brief Gets the facing direction vector.
     * @return Const reference to the marker direction.
     */
    const UMath::Vector3 &GetDirection() const {
        return mDirection;
    }

  private:
    UMath::Vector3 mPosition;  // offset 0x28, size 0xC
    UMath::Vector3 mDirection; // offset 0x34, size 0xC
};

#endif
