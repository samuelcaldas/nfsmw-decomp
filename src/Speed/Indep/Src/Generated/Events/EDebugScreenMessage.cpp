#include "EDebugScreenMessage.hpp"
#include "Speed/Indep/Libs/Support/Miscellaneous/CARP.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include <new>

struct UGroup;

EDebugScreenMessage::EDebugScreenMessage(const char *pDebugMsg, float pDuration, int pX, int pY)
    : Event(0x20),
      fDebugMsg(EventManager::EmbedField(this, pDebugMsg)),
      fDuration(pDuration),
      fX(pX),
      fY(pY) {
}

EDebugScreenMessage::~EDebugScreenMessage() {
}

const char *EDebugScreenMessage::GetEventName() const {
    return "EDebugScreenMessage";
}

static void EDebugScreenMessage_MakeEvent_Callback(const void *staticData) {
    const EDebugScreenMessage::StaticData *data = static_cast<const EDebugScreenMessage::StaticData *>(staticData);
    new EDebugScreenMessage(data->fDebugMsg, data->fDuration, data->fX, data->fY);
}

static int EDebugScreenMessage_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 4) {
        new EDebugScreenMessage(lua_tostring(luaState, 1),
                                static_cast<float>(lua_tonumber(luaState, 2)),
                                static_cast<int>(lua_tonumber(luaState, 3)),
                                static_cast<int>(lua_tonumber(luaState, 4)));
    }
    return 0;
}

static void EDebugScreenMessage_ResolveEvent_Callback(void *staticData, const UGroup *context) {
    EDebugScreenMessage::StaticData *data = static_cast<EDebugScreenMessage::StaticData *>(staticData);
    new (const_cast<char **>(&data->fDebugMsg)) CARP::TagReference(context);
}
