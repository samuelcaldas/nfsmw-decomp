#include "EEnableTrigger.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/World/WTrigger.h"
#include <new>

struct UGroup;

EEnableTrigger::EEnableTrigger(CARP::Trigger *pTrigger)
    : Event(0x10), fTrigger(pTrigger) {
}

EEnableTrigger::~EEnableTrigger() {
    if (this->fTrigger != nullptr) {
        static_cast<WTrigger *>(this->fTrigger)->Enable();
    }
}

const char *EEnableTrigger::GetEventName() const {
    return "EEnableTrigger";
}

static void EEnableTrigger_MakeEvent_Callback(const void *staticData) {
    const EEnableTrigger::StaticData *data = static_cast<const EEnableTrigger::StaticData *>(staticData);
    new EEnableTrigger(data->fTrigger);
}

static int EEnableTrigger_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EEnableTrigger(reinterpret_cast<CARP::Trigger *>(const_cast<char *>(lua_tostring(luaState, 1))));
    }
    return 0;
}

static void EEnableTrigger_ResolveEvent_Callback(void *staticData, const UGroup *context) {
    EEnableTrigger::StaticData *data = static_cast<EEnableTrigger::StaticData *>(staticData);
    new (&data->fTrigger) CARP::TagReference(context);
}
