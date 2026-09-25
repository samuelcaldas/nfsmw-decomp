#include "G.hpp"
#include "Speed/Indep/Src/Frontend/Localization/Localize.hpp"
#include "Speed/Indep/Src/Frontend/MemoryCard/MemoryCard.hpp"
#include "Speed/Indep/Src/Misc/BuildRegion.hpp"
#include "Speed/Indep/Src/Misc/Platform.h"
#include <dolphin.h>

void FlushCaches() {
    PPCSync();
}

void EnableInterrupts() {
    OSEnableInterrupts();
}

void CheckReset(int resetCode) {
    if (!MemoryCard::IsCardBusy()) {
        VISetBlack(1);
        VIFlush();
        VIWaitForRetrace();
        VISetBlack(1);
        VIFlush();
        VIWaitForRetrace();
        OSResetSystem(resetCode, 1, 0);
    }
}

int DVDValidErrorState(int state) {
    switch (state) {
        case 5:
            return 5;
        case 4:
            return 4;
        case 6:
            return 6;
        case 11:
            return 11;
        case -1:
            return -1;
        default:
            return 0;
    }
}

eLanguages GC_GetOSLanguage() {
    if (BuildRegion::IsEuropeFr()) {
        return eLANGUAGE_FRENCH;
    }
    if (BuildRegion::IsEuropeGer()) {
        return eLANGUAGE_GERMAN;
    }
    if (BuildRegion::IsJapan()) {
        return eLANGUAGE_JAPANESE;
    }
    return eLANGUAGE_ENGLISH;
}

void FinishedRenderingFEngLayer() {}

void ServicePlatform() {}

int bDoWithStack(void *, void *, int, int) { return 0; }
