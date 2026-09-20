#include "EEndCarStop.hpp"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Interfaces/Simables/IVehicle.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"

struct UGroup;

EEndCarStop::EEndCarStop(int pDontRetestInput, unsigned int phSimable)
    : Event(0x10),
      fDontRetestInput(pDontRetestInput),
      fhSimable(phSimable) {
}

EEndCarStop::~EEndCarStop() {
    ISimable *simable = ISimable::FindInstance(reinterpret_cast<HSIMABLE>(this->fhSimable));
    if (simable != nullptr) {
        IVehicle *vehicle = nullptr;
        if (simable->QueryInterface(&vehicle) && vehicle != nullptr) {
            vehicle->ForceStopOff(3);
        }
    }
}

const char *EEndCarStop::GetEventName() const {
    return "EEndCarStop";
}

static void EEndCarStop_MakeEvent_Callback(const void *staticData) {
    const EEndCarStop::StaticData *data = static_cast<const EEndCarStop::StaticData *>(staticData);
    new EEndCarStop(data->fDontRetestInput, gEventDynamicData.fhSimable);
}

static int EEndCarStop_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EEndCarStop(static_cast<int>(lua_tonumber(luaState, 1)), gEventDynamicData.fhSimable);
    }
    return 0;
}

static void EEndCarStop_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
