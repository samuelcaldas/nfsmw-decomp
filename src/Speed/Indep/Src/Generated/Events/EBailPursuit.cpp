#include "EBailPursuit.hpp"
#include "Speed/Indep/Src/Interfaces/Simables/IAI.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Speech/SoundAI.h"

EBailPursuit::EBailPursuit(int pPlayAudio, int pDisperseCops)
    : Event(0x10),
      fPlayAudio(pPlayAudio),
      fDisperseCops(pDisperseCops) {
}

EBailPursuit::~EBailPursuit() {
    if (this->fPlayAudio) {
        SoundAI *soundAI = SoundAI::Get();
        if (soundAI != NULL) {
            soundAI->TerminatePursuit(SoundAI::kForcedBail);
        }
    }
    if (this->fDisperseCops) {
        for (IPursuit::List::const_iterator it = IPursuit::GetList().begin(); it != IPursuit::GetList().end(); ++it) {
            (*it)->BailPursuit();
        }
    }
}

const char *EBailPursuit::GetEventName() const {
    return "EBailPursuit";
}

static void EBailPursuit_MakeEvent_Callback(const void *staticData) {
    const EBailPursuit::StaticData *data = static_cast<const EBailPursuit::StaticData *>(staticData);
    new EBailPursuit(data->fPlayAudio, data->fDisperseCops);
}

static int EBailPursuit_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 2) {
        new EBailPursuit(static_cast<int>(lua_tonumber(luaState, 1)), static_cast<int>(lua_tonumber(luaState, 2)));
    }
    return 0;
}

static void EBailPursuit_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
