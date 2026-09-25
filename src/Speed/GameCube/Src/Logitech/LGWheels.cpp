#include "Speed/GameCube/Src/Logitech/LGWheels.hpp"

bool LGWheels::IsConnected(long channel) {
    return this->wheels.IsConnected(channel);
}

bool LGWheels::ButtonIsPressed(long channel, unsigned long buttonMask) {
    return this->wheels.ButtonIsPressed(channel, buttonMask);
}

bool LGWheels::PedalsConnected(long channel) {
    return this->wheels.PedalsConnected(channel);
}

void LGWheels::StopSpringForce(long channel) {
    this->StopForce(channel, 0);
}

void LGWheels::StopConstantForce(long channel) {
    this->StopForce(channel, 1);
}

bool LGWheels::SameConstantForceParams(long channel, short magnitude, unsigned short direction) {
    bool res = false;
    if (this->ConstantForceParams[channel].magnitude == magnitude) {
        res = this->ConstantForceParams[channel].direction == direction;
    }
    return res;
}

void LGWheels::StopDamperForce(long channel) {
    this->StopForce(channel, 2);
}

bool LGWheels::SameDamperForceParams(long channel, short coefficient) {
    return this->DamperForceParams[channel].coefficient == coefficient;
}

bool LGWheels::SameFrontalCollisionForceParams(long channel, short magnitude) {
    return this->FrontalCollisionParams[channel].magnitude == magnitude;
}

void LGWheels::StopDirtRoadEffect(long channel) {
    this->StopForce(channel, 5);
}

bool LGWheels::SameDirtRoadEffectParams(long channel, short magnitude) {
    return this->DirtRoadParams[channel].magnitude == magnitude;
}

void LGWheels::StopBumpyRoadEffect(long channel) {
    this->StopForce(channel, 6);
}

bool LGWheels::SameBumpyRoadEffectParams(long channel, short magnitude) {
    return this->BumpyRoadParams[channel].magnitude == magnitude;
}

void LGWheels::StopSlipperyRoadEffect(long channel) {
    this->StopForce(channel, 7);
}

bool LGWheels::SameSlipperyRoadEffectParams(long channel, short magnitude) {
    return this->SlipperyRoadParams[channel].magnitude == magnitude;
}

void LGWheels::StopSurfaceEffect(long channel) {
    this->StopForce(channel, 8);
}

bool LGWheels::SameSurfaceEffectParams(long channel, unsigned char type, unsigned char magnitude, unsigned short period) {
    bool res = false;
    if (this->SurfaceEffectParams[channel].type == type && this->SurfaceEffectParams[channel].magnitude == magnitude) {
        res = this->SurfaceEffectParams[channel].period == period;
    }
    return res;
}

void LGWheels::StopCarAirborne(long channel) {
    this->StopForce(channel, 9);
}
