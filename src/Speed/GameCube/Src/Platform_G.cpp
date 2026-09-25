#include "G.hpp"
#include "Speed/Indep/Src/Misc/Platform.h"
#include <dolphin.h>

void FlushCaches() {
    PPCSync();
}

void EnableInterrupts() {
    OSEnableInterrupts();
}

eLanguages GC_GetOSLanguage() {}

void FinishedRenderingFEngLayer() {}

void ServicePlatform() {}

int bDoWithStack(void *, void *, int, int) { return 0; }
