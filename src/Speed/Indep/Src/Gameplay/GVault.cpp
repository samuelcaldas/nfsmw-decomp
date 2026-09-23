#include "Speed/Indep/Src/Gameplay/GVault.h"

/**
 * @brief Forces instantiation of GVault methods.
 */
static void *ForceGVaultInstantiation(const GVault *vault) {
    return vault->GetAttribVault();
}
