#include "EDDaySpeech.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"

#ifndef MISC_SPEECH_DECLARED
#define MISC_SPEECH_DECLARED
class MiscSpeech {
  public:
    static void SMSCellCall(int SMS_ID);
    static void D_Day();
};
#endif

struct UGroup;

EDDaySpeech::EDDaySpeech()
    : Event(0x10) {
}

EDDaySpeech::~EDDaySpeech() {
    MiscSpeech::D_Day();
}

const char *EDDaySpeech::GetEventName() const {
    return "EDDaySpeech";
}

static void EDDaySpeech_MakeEvent_Callback(const void *staticData) {
    new EDDaySpeech();
}

static int EDDaySpeech_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new EDDaySpeech();
    }
    return 0;
}

static void EDDaySpeech_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
