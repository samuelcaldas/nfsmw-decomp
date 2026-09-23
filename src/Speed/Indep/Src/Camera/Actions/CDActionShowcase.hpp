#ifndef CAMERA_ACTIONS_CDACTIONSHOWCASE_HPP
#define CAMERA_ACTIONS_CDACTIONSHOWCASE_HPP

#include "Speed/Indep/Src/Camera/CameraAI.hpp"
#include "Speed/Indep/Src/Interfaces/IAttachable.h"

class CDActionShowcase : public CameraAI::Action {
public:
    virtual ~CDActionShowcase();
    virtual void Reset() override;
    virtual void SetSpecial(float) override;
    virtual void OnAttached(IAttachable *) override;
};

#endif
