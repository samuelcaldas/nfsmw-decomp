#include "ECommitAudioAssets.hpp"
#include "Speed/Indep/Src/EAXSound/EAXSOund.hpp"

ECommitAudioAssets::ECommitAudioAssets()
    : Event(0x10) {
}

ECommitAudioAssets::~ECommitAudioAssets() {
    if (g_pEAXSound != NULL) {
        g_pEAXSound->CommitAssets();
    }
}

const char *ECommitAudioAssets::GetEventName() const {
    return "ECommitAudioAssets";
}

static void ECommitAudioAssets_MakeEvent_Callback(const void *staticData) {
    new ECommitAudioAssets();
}
