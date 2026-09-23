#ifndef CAMERA_ACTIONS_CDACTIONICE_HPP
#define CAMERA_ACTIONS_CDACTIONICE_HPP

#include "Speed/Indep/Src/Camera/CameraAI.hpp"
#include "Speed/Indep/Src/Interfaces/IAttachable.h"

class CDActionIce : public CameraAI::Action {
public:
    CDActionIce();
    virtual ~CDActionIce();
    virtual void Update(float dT) override;
    virtual void Reset() override;
    virtual const char *GetName() const override;
    virtual CameraAI::Action *GetNext() const override;
    virtual CameraMover *GetMover() override;
    virtual void SetSpecial(float) override;
    virtual void OnAttached(IAttachable *) override;
    virtual const IAttachable::List *GetAttachments() const;
protected:
    char _pad_attach[0x2cc];
    const IAttachable::List *mAttachments;
};

#endif
