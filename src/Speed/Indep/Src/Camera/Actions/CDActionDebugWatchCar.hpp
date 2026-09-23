#ifndef CAMERA_ACTIONS_CDACTIONDEBUGWATCHCAR_HPP
#define CAMERA_ACTIONS_CDACTIONDEBUGWATCHCAR_HPP

#include "Speed/Indep/Src/Camera/CameraAI.hpp"

class CDActionDebugWatchCar : public CameraAI::Action {
public:
    virtual ~CDActionDebugWatchCar();
    virtual void Reset() override;
    virtual void SetSpecial(float) override;
};

#endif
