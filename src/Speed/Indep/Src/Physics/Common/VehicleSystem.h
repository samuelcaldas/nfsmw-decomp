#ifndef VEHICLESYSTEM_H
#define VEHICLESYSTEM_H

namespace VehicleSystem {

extern float ENABLE_ROLL_STOPS_THRESHOLD;
extern float PAD_DEAD_ZONE;

/**
 * @brief Initialize vehicle globals.
 */
void InitializeVehicleGlobals();

/**
 * @brief Initialize general globals.
 */
void InitializeGlobals();

/**
 * @brief Initialize the vehicle system.
 */
void Init();

/**
 * @brief Shutdown the vehicle system.
 */
void Shutdown();

}; // namespace VehicleSystem

#endif
