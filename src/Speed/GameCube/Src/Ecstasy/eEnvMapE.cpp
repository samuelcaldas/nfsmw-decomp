#include "Speed/Indep/Src/Ecstasy/eEnvMap.hpp"

eEnvMap TheOnlyEnvMap;

eEnvMap *eGetEnvMap() {
    return &TheOnlyEnvMap;
}

void eDisplayEnvRenderTargets(eView *view) {
    ePoly poly;
    int frame_width;
    int frame_height;
}
