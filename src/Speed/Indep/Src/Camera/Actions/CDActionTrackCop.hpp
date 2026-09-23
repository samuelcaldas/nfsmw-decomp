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
    virtual const IAttachable::List *GetAttachments() const;
protected:
    char _pad_attach[0x2C];
    const IAttachable::List *mAttachments;
};

#endif
