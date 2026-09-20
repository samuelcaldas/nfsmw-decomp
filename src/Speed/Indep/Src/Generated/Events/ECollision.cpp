#include "ECollision.hpp"
#include "Speed/Indep/Src/Interfaces/Simables/ICause.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Sim/Collision.h"

ECollision::ECollision(COLLISION_INFO pInfo)
    : Event(0x88),
      fInfo(pInfo) {
}

ECollision::~ECollision() {
    ISimable *simableB;
    ISimable *simableA = ISimable::FindInstance(this->fInfo.objA);

    if (simableA != NULL) {
        simableB = NULL;
        if (this->fInfo.type == COLLISION_INFO::OBJECT) {
            simableB = ISimable::FindInstance(this->fInfo.objB);
        }

        COLLISION_INFO cinfo = this->fInfo;
        Sim::Collision::Respond(cinfo);

        if (cinfo.type == COLLISION_INFO::OBJECT && simableA != NULL && simableB != NULL) {
            ISimable *from = NULL;
            ISimable *to = NULL;
            HCAUSE cause = 0;

            HCAUSE causeA = simableA->GetCausality();
            HCAUSE causeB = simableB->GetCausality();

            if (causeA == 0) {
                if (causeB != 0) {
                    from = simableB;
                    to = simableA;
                    cause = causeB;
                }
            } else if (causeB == 0) {
                from = simableA;
                to = simableB;
                cause = causeA;
            }

            if (from != NULL && to != NULL) {
                ICause *causeInstance = ICause::FindInstance(cause);
                if (causeInstance != NULL) {
                    causeInstance->OnCausedCollision(cinfo, from, to);
                }
            }
        }
    }
}

const char *ECollision::GetEventName() const {
    return "ECollision";
}
