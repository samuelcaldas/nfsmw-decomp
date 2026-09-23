#ifndef CAMERA_ACTIONS_CDACTIONTRACKCAR_HPP
#define CAMERA_ACTIONS_CDACTIONTRACKCAR_HPP

#include "Speed/Indep/Src/Camera/CameraAI.hpp"
#include "Speed/Indep/Src/Interfaces/IAttachable.h"

class CDActionTrackCar : public CameraAI::Action {
public:
    virtual ~CDActionTrackCar();
    virtual void Reset() override;
    virtual void SetSpecial(float) override;
    virtual void OnAttached(IAttachable *) override;
};

#endif
