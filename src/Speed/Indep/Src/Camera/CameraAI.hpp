#ifndef CAMERA_CAMERAAI_H
#define CAMERA_CAMERAAI_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

#include "Speed/Indep/Src/Ecstasy/EcstasyData.hpp"
#include "Speed/Indep/Src/Interfaces/Simables/IVehicle.h"
#include "Speed/Indep/Libs/Support/Utility/UListable.h"
#include "Speed/Indep/Libs/Support/Utility/UCOM.h"
#include "Speed/Indep/Src/Misc/attribuserinclude.h"

class CameraMover;

namespace CameraAI {

class Director;

class Action : public UTL::COM::Object, public UTL::COM::Factory<CameraAI::Director *, CameraAI::Action, UCrc32> {
public:
    Action() : UTL::COM::Object(0) {}
    virtual ~Action() {}
    virtual void Update(float dT) = 0;
    virtual void Reset() = 0;
    virtual const char *GetName() const = 0;
    virtual Action *GetNext() const = 0;
    virtual CameraMover *GetMover() = 0;
    virtual void SetSpecial(float val) = 0;
};

class Director : public UTL::Collections::Listable<Director, 2> {
public:
    EVIEW_ID mViewID;
    Attrib::StringKey mDesiredMode;
    Action *mAction;
    char _pad_inputq[0x294];
    bool mPrepareToEnableIce;
    float mPursuitStartTime;
    float mJumpTime;
    bool mIsCinematicMomement;
    float mCinematicSlowdownSeconds;

    virtual ~Director();
    void JumpStart(float time);
    void EndJumping();
    void EndPursuitStart();
    void TotaledStart();
    void Reset();
    void ReleaseAction();
    CameraMover *GetMover();
    void SetAction(Attrib::StringKey key);
};

void Update(float dT);
void Reset();
void MaybeDoTotaledCam(IPlayer *iplayer);
void MaybeDoPursuitCam(IVehicle *ivehicle);
void MaybeKillPursuitCam(unsigned int id);
void MaybeKillJumpCam(unsigned int id);

void StartCinematicSlowdown(EVIEW_ID viewID, float seconds);
void SetAction(EVIEW_ID viewID, const char *action);
}; // namespace CameraAI

#endif
