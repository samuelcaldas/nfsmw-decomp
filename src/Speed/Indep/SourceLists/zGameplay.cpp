// TODO remove
#ifdef _MSC_VER
#pragma warning(disable : 4716)
#endif

#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Lua/LuaPostOffice.h"
#include "Speed/Indep/Src/Interfaces/Simables/IAudible.cpp"
#include "Speed/Indep/Src/Gameplay/GRaceStatus.cpp"
#include "Speed/Indep/Src/Gameplay/GVault.cpp"
#include "Speed/Indep/Src/Gameplay/GRaceDatabase.cpp"
#include "Speed/Indep/Src/Gameplay/GRuntimeInstance.cpp"
#include "Speed/Indep/Src/Gameplay/GMarker.cpp"
#include "Speed/Indep/Src/Gameplay/GActivity.cpp"
#include "Speed/Indep/Src/Gameplay/GObjectBlock.cpp"
#include "Speed/Indep/Src/Gameplay/GCharacter.cpp"
#include "Speed/Indep/Src/Gameplay/GTrigger.cpp"
#include "Speed/Indep/Src/Gameplay/GState.cpp"
#include "Speed/Indep/Src/Gameplay/GHandler.cpp"
#include "Speed/Indep/Src/Gameplay/GManager.cpp"
#include "Speed/Indep/Src/Gameplay/GTimer.cpp"
#include "Speed/Indep/Src/Gameplay/GMilestone.cpp"
#include "Speed/Indep/Src/Gameplay/GSpeedTrap.cpp"
#include "Speed/Indep/Src/Gameplay/GIconEmitterGroup.cpp"
#include "Speed/Indep/Src/Gameplay/GInfractionManager.cpp"

// Emit the STLPort comparison functors used by gameplay's unsigned-integer algorithms.
namespace _STL {
template less<unsigned int> __less<unsigned int>(unsigned int *);
template less<ObjectStateBlockHeader *> __less<ObjectStateBlockHeader *>(ObjectStateBlockHeader **);
template less<short> __less<short>(short *);
template equal_to<unsigned int> __equal_to<unsigned int>(unsigned int *);
template void __unguarded_linear_insert<ObjectStateBlockHeader **, ObjectStateBlockHeader *, less<ObjectStateBlockHeader *> >(ObjectStateBlockHeader **, ObjectStateBlockHeader *, less<ObjectStateBlockHeader *>);
template void __unguarded_linear_insert<unsigned int *, unsigned int, less<unsigned int> >(unsigned int *, unsigned int, less<unsigned int>);
}
