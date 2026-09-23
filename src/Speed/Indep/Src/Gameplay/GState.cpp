#include "Speed/Indep/Src/Gameplay/GState.h"

// -----------------------------------------------------------------------------
// GState implementation
// -----------------------------------------------------------------------------










/**
 * @brief Constructs a new GState runtime instance.
 * @param stateKey Attribute key identifying the state definition.
 */


GState::GState(const Attrib::Key &stateKey)
    : GRuntimeInstance(stateKey, kGameplayObjType_State) {
}

/**
 * @brief Destroys the GState runtime instance.
 */
GState::~GState() {
}
