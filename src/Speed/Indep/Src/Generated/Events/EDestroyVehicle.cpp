#include "EDestroyVehicle.hpp"
#include "Speed/Indep/Src/Interfaces/Simables/IDamageable.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"

struct UGroup;

EDestroyVehicle::EDestroyVehicle(unsigned int phSimable)
    : Event(0x10), fhSimable(phSimable) {
}

EDestroyVehicle::~EDestroyVehicle() {
    ISimable *simable = ISimable::FindInstance(reinterpret_cast<HSIMABLE>(this->fhSimable));
    IDamageable *damageable;
    if (simable != nullptr && simable->QueryInterface(&damageable)) {
        damageable->Destroy();
    }
}

const char *EDestroyVehicle::GetEventName() const {
    return "EDestroyVehicle";
}

static void EDestroyVehicle_MakeEvent_Callback(const void *staticData) {
    new EDestroyVehicle(gEventDynamicData.fhSimable);
}

static int EDestroyVehicle_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new EDestroyVehicle(gEventDynamicData.fhSimable);
    }
    return 0;
}

static void EDestroyVehicle_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
