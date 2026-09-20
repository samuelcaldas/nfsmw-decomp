#include "EDispIntroRace.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"

#ifndef MISC_SPEECH_DECLARED
#define MISC_SPEECH_DECLARED
class MiscSpeech {
  public:
    static void DispIntroRace();
};
#endif

struct UGroup;

EDispIntroRace::EDispIntroRace()
    : Event(0x10) {
}

EDispIntroRace::~EDispIntroRace() {
    MiscSpeech::DispIntroRace();
}

const char *EDispIntroRace::GetEventName() const {
    return "EDispIntroRace";
}

static void EDispIntroRace_MakeEvent_Callback(const void *staticData) {
    new EDispIntroRace();
}

static int EDispIntroRace_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new EDispIntroRace();
    }
    return 0;
}

static void EDispIntroRace_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
