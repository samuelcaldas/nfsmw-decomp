#include "Speed/Indep/Src/Camera/Actions/CDActionDebugWatchCar.hpp"
#include "Speed/Indep/Src/Misc/Table.hpp"

/**
 * @brief Resets debug watch car action state.
 */
void CDActionDebugWatchCar::Reset() {
    AverageBase ab(4, 4);
    ab.Recalculate();
}

/**
 * @brief Sets special parameter for debug watch car action.
 */
void CDActionDebugWatchCar::SetSpecial(float) {
}
