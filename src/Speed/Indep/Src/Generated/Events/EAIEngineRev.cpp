#include "EAIEngineRev.hpp"
#include "Speed/Indep/Src/EAXSound/EAXCarState.hpp"
#include "Speed/Indep/Src/Generated/Messages/MAIEngineRev.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Lua/source/lua.h"

struct UGroup;

EAIEngineRev::EAIEngineRev(unsigned int phSimable, unsigned int pCarID, unsigned int pPatterPlay)
    : Event(0x20), fhSimable(phSimable), fCarID(pCarID), fPatterPlay(pPatterPlay) {
    ISimable *simable = ISimable::FindInstance(reinterpret_cast<HSIMABLE>(this->fhSimable));
    EAX_CarState *state = nullptr;
    if (simable != nullptr) {
        state = EAX_CarState::Find(simable->GetWorldID());
    }
    if (state != nullptr) {
        MAIEngineRev msg(this->fhSimable, this->fCarID, state, this->fPatterPlay);
        msg.Send(UCrc32("QRev"));
    }
}

EAIEngineRev::~EAIEngineRev() {
}

const char *EAIEngineRev::GetEventName() const {
    return "EAIEngineRev";
}

static void EAIEngineRev_MakeEvent_Callback(const void *staticData) {
    const EAIEngineRev::StaticData *data = static_cast<const EAIEngineRev::StaticData *>(staticData);
    new EAIEngineRev(gEventDynamicData.fhSimable, data->fCarID, data->fPatterPlay);
}

static int EAIEngineRev_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 2) {
        new EAIEngineRev(gEventDynamicData.fhSimable, static_cast<unsigned int>(lua_tonumber(luaState, 1)),
                        static_cast<unsigned int>(lua_tonumber(luaState, 2)));
    }
    return 0;
}

static void EAIEngineRev_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
