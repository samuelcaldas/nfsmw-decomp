#include "VehicleSystem.h"

namespace VehicleSystem {

float ENABLE_ROLL_STOPS_THRESHOLD = 0.2f;

/**
 * @brief Initialize vehicle globals.
 */
void InitializeVehicleGlobals() {}

/**
 * @brief Initialize general globals.
 */
void InitializeGlobals() {}

/**
 * @brief Initialize the vehicle system.
 */
void Init() {
    InitializeGlobals();
    InitializeVehicleGlobals();
}

/**
 * @brief Shutdown the vehicle system.
 */
void Shutdown() {}

};

