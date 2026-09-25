#include "Speed/GameCube/Src/Logitech/LGWheels.hpp"

extern LGWheels *plat_lgwheels;

void ReadLGWheelDataForProgressiveMenu() {
    if (plat_lgwheels != 0) {
        plat_lgwheels->ReadAll();
    }
}

unsigned short ReadLGWheelButtonsForProgressiveMenu(int channel) {
    unsigned short buttons = 0;
    if (plat_lgwheels != 0) {
        if (plat_lgwheels->IsConnected(channel)) {
            buttons = plat_lgwheels->Position[channel].button;
        }
    }
    return buttons;
}

bool IsWheelActiveForProgressiveMenu(int channel) {
    bool active = false;
    if (plat_lgwheels != 0) {
        active = plat_lgwheels->IsConnected(channel);
    }
    return active;
}
