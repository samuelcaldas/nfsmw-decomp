#include "EAudioWorldTest.hpp"
#include "Speed/Indep/Libs/Support/Utility/UVectorMath.h"
#include "Speed/Indep/Src/EAXSound/SndCamera.hpp"
#include "Speed/Indep/Src/Generated/Messages/MAudioReflection.h"
#include "Speed/Indep/Src/Misc/Config.h"
#include "Speed/Indep/Src/Misc/GameFlow.hpp"
#include "Speed/Indep/Src/World/WCollisionMgr.h"
#include "Speed/Indep/bWare/Inc/bMath.hpp"

EAudioWorldTest::EAudioWorldTest() : Event(0x10) {
}

EAudioWorldTest::~EAudioWorldTest() {
    if (TheGameFlowManager.GetState() == GAMEFLOW_STATE_RACING && IsSoundEnabled) {
        for (int i = 0; i < SndCamera::NumPlayers; i++) {
            UMath::Vector4 seg[2];
            WCollisionMgr::WorldCollisionInfo cInfo;
            UMath::Vector4 carDir;

            bVector3 *pos = SndCamera::GetWorldCarPos3(i);
            bVector3 *dir = SndCamera::GetNormCarDir3(i);

            seg[0].z = pos->x;
            seg[0].x = -pos->y;
            seg[0].y = pos->z;

            seg[1].z = dir->x;
            seg[1].x = -dir->y;
            seg[1].y = dir->z;

            float speed = bAbs(SndCamera::GetWorldCarVel(i));
            float dist = speed * 0.4f;
            if (dist > 20.0f) {
                dist = 20.0f;
            }
            if (dist < 4.0f) {
                continue;
            }

            VU0_v4scaleadd(seg[1], dist, seg[0], seg[1]);

            if (WCollisionMgr(0, 3).CheckHitWorld(seg, cInfo, 2)) {
                carDir.z = dir->x;
                carDir.x = -dir->y;
                carDir.y = dir->z;

                if (bAbs(VU0_v4dotprod(carDir, cInfo.fNormal)) < 0.2f) {
                    continue;
                }

                MAudioReflection msg(i, cInfo.fDist, false);
                msg.Send(UCrc32("FRONT_BARRIER"));
            }
        }
    }
}

const char *EAudioWorldTest::GetEventName() const {
    return "EAudioWorldTest";
}

static void EAudioWorldTest_MakeEvent_Callback(const void *staticData) {
    new EAudioWorldTest();
}
