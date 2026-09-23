#ifndef CAMERA_ACTIONS_CDACTIONTRACKCOP_HPP
#define CAMERA_ACTIONS_CDACTIONTRACKCOP_HPP

#include "Speed/Indep/Src/Camera/CameraAI.hpp"
#include "Speed/Indep/Src/Interfaces/IAttachable.h"

class CDActionTrackCop : public CameraAI::Action {
public:
    virtual ~CDActionTrackCop();
    virtual void Reset() override;
    virtual void SetSpecial(float) override;
    virtual void OnAttached(IAttachable *) override;
};

#endif
