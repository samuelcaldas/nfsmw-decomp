#include "Speed/Indep/Src/Gameplay/GTrigger.h"
#include "Speed/Indep/Src/Gameplay/GMarker.h"
#include "Speed/Indep/Src/Gameplay/GCharacter.h"
#include "Speed/Indep/Src/Gameplay/GActivity.h"
#include "Speed/Indep/Src/Gameplay/GState.h"
#include "Speed/Indep/Src/Gameplay/GHandler.h"

/**
 * @brief Computes 16-byte padded size for gameplay object types.
 * @tparam T Gameplay object class.
 * @return 16-byte aligned object byte size.
 */
template <typename T>
unsigned int GetPaddedObjectSize() {
    return (sizeof(T) + 15) & ~15;
}

template unsigned int GetPaddedObjectSize<GTrigger>();
template unsigned int GetPaddedObjectSize<GMarker>();
template unsigned int GetPaddedObjectSize<GCharacter>();
template unsigned int GetPaddedObjectSize<GActivity>();
template unsigned int GetPaddedObjectSize<GState>();
template unsigned int GetPaddedObjectSize<GHandler>();
