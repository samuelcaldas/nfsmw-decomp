#include "EChangeState.hpp"
#include "Speed/Indep/Src/Gameplay/GActivity.h"
#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Gameplay/GState.h"

EChangeState::EChangeState(unsigned int pActivityKey, unsigned int pStateKey)
    : Event(0x10),
      fActivityKey(pActivityKey),
      fStateKey(pStateKey) {
}

EChangeState::~EChangeState() {
    GActivity *activity = static_cast<GActivity *>(GManager::Get().FindInstance(this->fActivityKey));
    GState *state = static_cast<GState *>(GManager::Get().FindInstance(this->fStateKey));

    if (activity != NULL && state != NULL) {
        activity->EnterState(state);
    }
}

const char *EChangeState::GetEventName() const {
    return "EChangeState";
}

static void EChangeState_MakeEvent_Callback(const void *staticData) {
    const EChangeState::StaticData *data = static_cast<const EChangeState::StaticData *>(staticData);
    new EChangeState(data->fActivityKey, data->fStateKey);
}
