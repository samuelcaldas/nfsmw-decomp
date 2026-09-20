#include "EEngineBlown.hpp"
#include "Speed/Indep/Src/Gameplay/GRaceStatus.h"
#include "Speed/Indep/Src/Generated/Events/EShowRaceOverMessage.hpp"
#include "Speed/Indep/Src/Generated/Messages/MNotifyEngineBlown.h"
#include "Speed/Indep/Src/Interfaces/SimEntities/IPlayer.h"
#include "Speed/Indep/Src/Interfaces/Simables/IINput.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Sim/Simulation.h"

EEngineBlown::EEngineBlown(HSIMABLE phSimable)
    : Event(0x10),
      fhSimable(phSimable) {
}

EEngineBlown::~EEngineBlown() {
    ISimable *simable = ISimable::FindInstance(this->fhSimable);
    if (simable != nullptr) {
        GRacerInfo *racerInfo = GRaceStatus::Get().GetRacerInfo(simable);
        if (racerInfo != nullptr) {
            racerInfo->BlowEngine();
        }

        MNotifyEngineBlown(simable->GetInstanceHandle()).Post(0x20d60dbf);

        IPlayer *player = simable->GetPlayer();
        if (player != nullptr && player->InGameBreaker()) {
            player->ToggleGameBreaker();
        }

        IInputPlayer *inputPlayer = nullptr;
        if (simable->QueryInterface(&inputPlayer)) {
            inputPlayer->BlockInput(true);
        }

        GRaceStatus::Get().UpdateAdaptiveDifficulty(GRaceStatus::kAdaptiveGain_FromEngineBlown, simable);

        if (Sim::GetUserMode() == Sim::USER_SPLIT_SCREEN && simable->IsPlayer()) {
            new EShowRaceOverMessage(simable->GetPlayer());
        }
    }
}

const char *EEngineBlown::GetEventName() const {
    return "EEngineBlown";
}

void EEngineBlown_MakeEvent_Callback(const void *staticData) {
    const EEngineBlown::StaticData *data = static_cast<const EEngineBlown::StaticData *>(staticData);
    new EEngineBlown(data->fhSimable);
}
