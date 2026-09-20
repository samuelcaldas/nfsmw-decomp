#include "EDisablePursuitVehicle.hpp"
#include "Speed/Indep/Src/Interfaces/Simables/IAI.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"

struct UGroup;

EDisablePursuitVehicle::EDisablePursuitVehicle(unsigned int phSimable)
    : Event(0x10), fhSimable(phSimable) {
}

EDisablePursuitVehicle::~EDisablePursuitVehicle() {
    ISimable *simable = nullptr;
    if (this->fhSimable != 0) {
        simable = ISimable::FindInstance(reinterpret_cast<HSIMABLE>(this->fhSimable));
    }
    IPursuitAI *pursuitAI;
    if (simable != nullptr && simable->QueryInterface(&pursuitAI)) {
        pursuitAI->StartRoadBlock();
    }
}

const char *EDisablePursuitVehicle::GetEventName() const {
    return "EDisablePursuitVehicle";
}

static void EDisablePursuitVehicle_MakeEvent_Callback(const void *staticData) {
    new EDisablePursuitVehicle(gEventDynamicData.fhSimable);
}

static int EDisablePursuitVehicle_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new EDisablePursuitVehicle(gEventDynamicData.fhSimable);
    }
    return 0;
}

static void EDisablePursuitVehicle_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
