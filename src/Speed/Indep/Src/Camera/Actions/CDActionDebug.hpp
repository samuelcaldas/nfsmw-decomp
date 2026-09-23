#ifndef CAMERA_ACTIONS_CDACTIONDEBUG_HPP
#define CAMERA_ACTIONS_CDACTIONDEBUG_HPP

#include "Speed/Indep/Src/Camera/CameraAI.hpp"

class CDActionDebug : public CameraAI::Action {
public:
    virtual ~CDActionDebug();
    virtual void Reset() override;
    virtual void SetSpecial(float) override;
};

#endif
