#ifndef CAMERA_ACTIONS_CDACTIONDRIVE_HPP
#define CAMERA_ACTIONS_CDACTIONDRIVE_HPP

#include "Speed/Indep/Src/Camera/CameraAI.hpp"
#include "Speed/Indep/Src/Interfaces/IAttachable.h"

class CDActionDrive : public CameraAI::Action {
public:
    virtual ~CDActionDrive();
    virtual void Reset() override;
    virtual void SetSpecial(float) override;
    virtual void OnAttached(IAttachable *) override;
    virtual CameraMover *GetMover() override;
    virtual const IAttachable::List *GetAttachments() const;

protected:
    char _pad_mover[0x14];
    CameraMover *mMover; // offset 0x2c
    char _pad_attach[0x1c];
    const IAttachable::List *mAttachments; // offset 0x4c
};

#endif
