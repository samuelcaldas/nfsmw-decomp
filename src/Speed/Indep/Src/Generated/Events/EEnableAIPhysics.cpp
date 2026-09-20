#include "EEnableAIPhysics.hpp"
#include "Speed/Indep/Src/Interfaces/Simables/IEngine.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISuspension.h"
#include "Speed/Indep/Src/Interfaces/Simables/IVehicle.h"
#include "Speed/Indep/Src/Sim/SimTypes.h"

EEnableAIPhysics::EEnableAIPhysics(uintptr_t phSimable, float pSpeed, unsigned int pEnable)
    : Event(0x20),
      fhSimable(phSimable),
      fSpeed(pSpeed),
      fEnable(pEnable) {
}

EEnableAIPhysics::~EEnableAIPhysics() {
    ISimable *simable = ISimable::FindInstance(reinterpret_cast<HSIMABLE>(this->fhSimable));
    if (simable != nullptr) {
        IVehicle *vehicle = nullptr;
        if (simable->QueryInterface(&vehicle)) {
            if (this->fEnable != 0) {
                vehicle->SetBehaviorOverride(BEHAVIOR_MECHANIC_SUSPENSION, "SuspensionSimple");
            } else {
                vehicle->RemoveBehaviorOverride(BEHAVIOR_MECHANIC_SUSPENSION);
            }
            vehicle->CommitBehaviorOverrides();

            ISuspension *suspension = nullptr;
            if (vehicle->QueryInterface(&suspension)) {
                suspension->MatchSpeed(this->fSpeed);
            }

            IEngine *engine = nullptr;
            if (vehicle->QueryInterface(&engine)) {
                engine->MatchSpeed(this->fSpeed);
            }
        }
    }
}

const char *EEnableAIPhysics::GetEventName() const {
    return "EEnableAIPhysics";
}

void EEnableAIPhysics_MakeEvent_Callback(const void *staticData) {
    const EEnableAIPhysics::StaticData *data = static_cast<const EEnableAIPhysics::StaticData *>(staticData);
    new EEnableAIPhysics(data->fhSimable, data->fSpeed, data->fEnable);
}
