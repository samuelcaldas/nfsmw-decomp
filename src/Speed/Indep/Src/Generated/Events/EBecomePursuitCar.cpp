#include "EBecomePursuitCar.hpp"
#include "Speed/Indep/Src/Interfaces/SimEntities/IPlayer.h"
#include "Speed/Indep/Src/Interfaces/Simables/IAI.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"

EBecomePursuitCar::EBecomePursuitCar(unsigned int phSimable)
    : Event(0x10),
      fhSimable(phSimable) {
}

EBecomePursuitCar::~EBecomePursuitCar() {
    ISimable *simable = ISimable::FindInstance(reinterpret_cast<HSIMABLE>(this->fhSimable));

    if (simable != NULL) {
        IPursuitAI *pursuitAI;

        if (simable->QueryInterface(&pursuitAI)) {
            pursuitAI->EndPursuit();
            ISimable *target = IPlayer::First(PLAYER_LOCAL)->GetSimable();
            pursuitAI->StartPursuit(NULL, target);
        }
    }
}

const char *EBecomePursuitCar::GetEventName() const {
    return "EBecomePursuitCar";
}

static void EBecomePursuitCar_MakeEvent_Callback(const void *staticData) {
    new EBecomePursuitCar(gEventDynamicData.fhSimable);
}

static int EBecomePursuitCar_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new EBecomePursuitCar(gEventDynamicData.fhSimable);
    }
    return 0;
}

static void EBecomePursuitCar_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
