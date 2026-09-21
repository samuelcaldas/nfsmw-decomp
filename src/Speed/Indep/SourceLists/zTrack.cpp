// TODO remove
#ifdef _MSC_VER
#pragma warning(disable : 4716)
#endif

#define ClearTable ClearTableInline

#include "Speed/Indep/Src/World/Skids.cpp"

#include "Speed/Indep/Src/World/Clans.cpp"

#include "Speed/Indep/Src/World/Track.cpp"

#include "Speed/Indep/Src/World/TrackPositionMarker.cpp"

#include "Speed/Indep/Src/World/TrackInfo.cpp"

#include "Speed/Indep/Src/World/TrackPath.cpp"

#include "Speed/Indep/Src/World/TrackStreamer.cpp"

#include "Speed/Indep/Src/World/Scenery.cpp"

#include "Speed/Indep/Src/World/VisibleSection.cpp"

#include "Speed/Indep/Src/World/WeatherMan.cpp"

#include "Speed/Indep/Src/World/ScreenEffects.cpp"

#include "Speed/Indep/Src/World/EventManager.cpp"

#undef ClearTable

/**
 * Clears all bits in a bit table.
 *
 * @param table Bit table to clear.
 */
extern "C" void ClearTable__9bBitTable(bBitTable *table) {
    int num_bits = *reinterpret_cast<int *>(table);
    void *bits = *reinterpret_cast<void **>(reinterpret_cast<char *>(table) + 4);
    bMemSet(bits, 0, num_bits >> 3);
}
