#include "EExitEngagableTrigger.hpp"
#include "Speed/Indep/Libs/Support/Miscellaneous/CARP.h"
#include "Speed/Indep/Src/Interfaces/IFengHud.h"
#include "Speed/Indep/Src/Interfaces/SimEntities/IPlayer.h"
#include "Speed/Indep/Src/Lua/source/lua.h"

struct UGroup;

EExitEngagableTrigger::EExitEngagableTrigger(GRuntimeInstance *pRaceActivity)
    : Event(0x10),
      fRaceActivity(pRaceActivity) {
}

EExitEngagableTrigger::~EExitEngagableTrigger() {
    IPlayer *player = IPlayer::First(PLAYER_LOCAL);
    if (player != nullptr && player->GetHud() != nullptr) {
        IMenuZoneTrigger *trigger = nullptr;
        if (player->GetHud()->QueryInterface(&trigger)) {
            trigger->ExitTrigger();
        }
    }
}

const char *EExitEngagableTrigger::GetEventName() const {
    return "EExitEngagableTrigger";
}

void EExitEngagableTrigger_MakeEvent_Callback(const void *staticData) {
    const EExitEngagableTrigger::StaticData *data = static_cast<const EExitEngagableTrigger::StaticData *>(staticData);
    new EExitEngagableTrigger(data->fRaceActivity);
}

static int EExitEngagableTrigger_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EExitEngagableTrigger(reinterpret_cast<GRuntimeInstance *>(const_cast<char *>(lua_tostring(luaState, 1))));
    }
    return 0;
}

static void EExitEngagableTrigger_ResolveEvent_Callback(void *staticData, const UGroup *context) {
    new (static_cast<char *>(staticData) + 4) CARP::TagReference(context);
}
