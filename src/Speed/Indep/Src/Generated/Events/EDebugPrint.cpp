#include "EDebugPrint.hpp"
#include "Speed/Indep/Libs/Support/Miscellaneous/CARP.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include <new>

struct UGroup;

EDebugPrint::EDebugPrint(const char *pDebugMsg)
    : Event(0x10) {
    this->fDebugMsg = EventManager::EmbedField(this, pDebugMsg);
}

EDebugPrint::~EDebugPrint() {
}

const char *EDebugPrint::GetEventName() const {
    return "EDebugPrint";
}

static void EDebugPrint_MakeEvent_Callback(const void *staticData) {
    const EDebugPrint::StaticData *data = static_cast<const EDebugPrint::StaticData *>(staticData);
    new EDebugPrint(data->fDebugMsg);
}

static int EDebugPrint_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EDebugPrint(lua_tostring(luaState, 1));
    }
    return 0;
}

static void EDebugPrint_ResolveEvent_Callback(void *staticData, const UGroup *context) {
    EDebugPrint::StaticData *data = static_cast<EDebugPrint::StaticData *>(staticData);
    new (const_cast<char **>(&data->fDebugMsg)) CARP::TagReference(context);
}
