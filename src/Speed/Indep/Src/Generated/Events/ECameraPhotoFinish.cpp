#include "ECameraPhotoFinish.hpp"
#include "Speed/Indep/Src/EAXSound/EAXSOund.hpp"
#include "Speed/Indep/Src/Gameplay/GRaceStatus.h"
#include "Speed/Indep/Src/Interfaces/SimEntities/IPlayer.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"
#include "Speed/Indep/Src/World/VisualTreatment.h"

struct UGroup;

ECameraPhotoFinish::ECameraPhotoFinish()
    : Event(0x10) {
}

ECameraPhotoFinish::~ECameraPhotoFinish() {
    if (IPlayer::Count(PLAYER_ALL) <= 1 && IPlayer::First(PLAYER_LOCAL) != NULL && GRaceStatus::Get().GetRacerCount() == 2) {
        IVisualTreatment *vt = IVisualTreatment::Get();
        if (vt != NULL) {
            vt->TriggerPulse(0.0f);
        }
        if (g_pEAXSound != NULL) {
            g_pEAXSound->bPlayCameraSnapShot = true;
            SoundPause(false, eSNDPAUSE_PHOTOFINISH);
            SetSoundControlState(false, SNDSTATE_PAUSE, "ECameraPhotoFinish");
        }
    }
}

const char *ECameraPhotoFinish::GetEventName() const {
    return "ECameraPhotoFinish";
}

static void ECameraPhotoFinish_MakeEvent_Callback(const void *staticData) {
    new ECameraPhotoFinish();
}

static int ECameraPhotoFinish_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new ECameraPhotoFinish();
    }
    return 0;
}

static void ECameraPhotoFinish_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
