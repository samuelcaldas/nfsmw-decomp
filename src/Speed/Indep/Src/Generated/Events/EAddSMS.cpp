#include "EAddSMS.hpp"
#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Lua/source/lua.h"

struct UGroup;

EAddSMS::EAddSMS(int pNumber) : Event(0x10), fNumber(pNumber) {
}

EAddSMS::~EAddSMS() {
    if (GManager::Exists()) {
        GManager::Get().AddSMS(this->fNumber);
    }
}

const char *EAddSMS::GetEventName() const {
    return "EAddSMS";
}

static void EAddSMS_MakeEvent_Callback(const void *staticData) {
    const EAddSMS::StaticData *data = static_cast<const EAddSMS::StaticData *>(staticData);
    new EAddSMS(data->fNumber);
}

static int EAddSMS_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EAddSMS(static_cast<int>(lua_tonumber(luaState, 1)));
    }
    return 0;
}

static void EAddSMS_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
