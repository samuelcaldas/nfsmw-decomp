#include "EDisableTrigger.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/World/WTrigger.h"
#include <new>

struct UGroup;

EDisableTrigger::EDisableTrigger(CARP::Trigger *pTrigger)
    : Event(0x10), fTrigger(pTrigger) {
}

EDisableTrigger::~EDisableTrigger() {
    if (this->fTrigger != nullptr) {
        static_cast<WTrigger *>(this->fTrigger)->Disable();
    }
}

const char *EDisableTrigger::GetEventName() const {
    return "EDisableTrigger";
}

static void EDisableTrigger_MakeEvent_Callback(const void *staticData) {
    const EDisableTrigger::StaticData *data = static_cast<const EDisableTrigger::StaticData *>(staticData);
    new EDisableTrigger(data->fTrigger);
}

static int EDisableTrigger_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EDisableTrigger(reinterpret_cast<CARP::Trigger *>(const_cast<char *>(lua_tostring(luaState, 1))));
    }
    return 0;
}

static void EDisableTrigger_ResolveEvent_Callback(void *staticData, const UGroup *context) {
    EDisableTrigger::StaticData *data = static_cast<EDisableTrigger::StaticData *>(staticData);
    new (&data->fTrigger) CARP::TagReference(context);
}
