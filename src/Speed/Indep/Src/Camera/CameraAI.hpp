#ifndef CAMERA_CAMERAAI_H
#define CAMERA_CAMERAAI_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

#include "Speed/Indep/Src/Ecstasy/EcstasyData.hpp"
#include "Speed/Indep/Src/Interfaces/Simables/IVehicle.h"

namespace CameraAI {

class Director {
public:
    char _pad[0x2B4];
    float mPursuitStartTime;
    float mJumpTime;

    void JumpStart(float time);
    void EndJumping();
    void EndPursuitStart();
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
