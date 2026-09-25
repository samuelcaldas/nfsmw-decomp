#include "Speed/GameCube/Src/Logitech/LGWheels.hpp"

Force::Force() {
    this->InitVars();
}

void Force::InitVars() {
    for (int channel = 0; channel < 4; channel++) {
        for (int i = 0; i < 8; i++) {
            this->Playing[channel][i] = false;
            this->EffectID[channel][i] = 0xFFFFFFFF;
        }
    }
}
