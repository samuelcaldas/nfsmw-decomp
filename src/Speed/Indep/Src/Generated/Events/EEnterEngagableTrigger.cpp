#include "EEnterEngagableTrigger.hpp"
#include "Speed/Indep/Libs/Support/Miscellaneous/CARP.h"
#include "Speed/Indep/Src/Interfaces/IFengHud.h"
#include "Speed/Indep/Src/Interfaces/SimEntities/IPlayer.h"
#include "Speed/Indep/Src/Lua/source/lua.h"

struct UGroup;

EEnterEngagableTrigger::EEnterEngagableTrigger(GRuntimeInstance *pRaceActivity)
    : Event(0x10),
      fRaceActivity(pRaceActivity) {
}

EEnterEngagableTrigger::~EEnterEngagableTrigger() {
    IPlayer *player = IPlayer::First(PLAYER_LOCAL);
    if (player != nullptr && player->GetHud() != nullptr) {
        IMenuZoneTrigger *trigger = nullptr;
        if (player->GetHud()->QueryInterface(&trigger)) {
            trigger->EnterTrigger(this->fRaceActivity);
        }
    }
}

const char *EEnterEngagableTrigger::GetEventName() const {
    return "EEnterEngagableTrigger";
}

void EEnterEngagableTrigger_MakeEvent_Callback(const void *staticData) {
    const EEnterEngagableTrigger::StaticData *data = static_cast<const EEnterEngagableTrigger::StaticData *>(staticData);
    new EEnterEngagableTrigger(data->fRaceActivity);
}

static int EEnterEngagableTrigger_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EEnterEngagableTrigger(reinterpret_cast<GRuntimeInstance *>(const_cast<char *>(lua_tostring(luaState, 1))));
    }
    return 0;
}

static void EEnterEngagableTrigger_ResolveEvent_Callback(void *staticData, const UGroup *context) {
    new (static_cast<char *>(staticData) + 4) CARP::TagReference(context);
}
