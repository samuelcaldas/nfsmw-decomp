// TODO remove
#ifdef _MSC_VER
#pragma warning(disable : 4716)
#endif

#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Lua/LuaPostOffice.h"
#include "Speed/Indep/Src/Gameplay/GRaceStatus.cpp"
#include "Speed/Indep/Src/Gameplay/GVault.cpp"
#include "Speed/Indep/Src/Gameplay/GRaceDatabase.cpp"
#include "Speed/Indep/Src/Gameplay/GRuntimeInstance.cpp"
#include "Speed/Indep/Src/Gameplay/GCharacter.cpp"

/**
 * @brief Reports whether gameplay is currently active.
 * @return True when the manager is in gameplay; otherwise false.
 */
bool GManager::GetInGameplay() const {
    return this->mInGameplay;
}

/**
 * @brief Returns the number of configured milestones.
 * @return The number of milestone records managed by the gameplay manager.
 */
unsigned int GManager::GetNumMilestones() {
    return this->mNumMilestones;
}

/**
 * @brief Returns the number of configured speed traps.
 * @return The number of speed trap records managed by the gameplay manager.
 */
unsigned int GManager::GetNumSpeedTraps() {
    return this->mNumSpeedTraps;
}
