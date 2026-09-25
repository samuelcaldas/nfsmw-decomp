#include "Speed/GameCube/Src/Logitech/LGWheels.hpp"

bool Wheels::ButtonIsPressed(long channel, unsigned long buttonMask) {
    bool res = true;
    if (!(this->Position[channel].button & buttonMask)) {
        res = false;
    }
    return res;
}

bool Wheels::IsConnected(long channel) {
    return this->Position[channel].err == 0;
}

bool Wheels::PedalsConnected(long channel) {
    return (this->Position[channel].misc & 8) != 0;
}
