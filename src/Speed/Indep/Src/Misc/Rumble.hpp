//
//
#ifndef _RUMBLE_HPP_
#define _RUMBLE_HPP_

struct bVector3;

void UpdateCameraShakers(float dT);
void ResetCameraShakers();
void ForceCameraShake(int nPlayer, bVector3 *pShake);

#endif
