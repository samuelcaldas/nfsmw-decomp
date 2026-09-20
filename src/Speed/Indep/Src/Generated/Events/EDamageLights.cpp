#include "EDamageLights.hpp"
#include "Speed/Indep/Libs/Support/Miscellaneous/StringHash.h"
#include "Speed/Indep/Src/Interfaces/Simables/IDamageable.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"
#include "Speed/Indep/Src/World/VehicleFX.h"
#include "Speed/Indep/bWare/Inc/bDebug.hpp"

struct UGroup;

EDamageLights::EDamageLights(UCrc32 pName, unsigned int phSimable)
    : Event(0x10), fName(pName), fhSimable(phSimable) {
}

EDamageLights::~EDamageLights() {
    ISimable *simable = ISimable::FindInstance(reinterpret_cast<HSIMABLE>(this->fhSimable));
    IDamageableVehicle *idamage;
    if (simable != nullptr && simable->QueryInterface(&idamage)) {
        VehicleFX::ID id = VehicleFX::LookupID(this->fName);
        if (id != VehicleFX::LIGHT_NONE) {
            idamage->DamageLight(id, true);
        } else {
            bBreak();
        }
    }
}

const char *EDamageLights::GetEventName() const {
    return "EDamageLights";
}

static void EDamageLights_MakeEvent_Callback(const void *staticData) {
    const EDamageLights::StaticData *data = static_cast<const EDamageLights::StaticData *>(staticData);
    new EDamageLights(data->fName, gEventDynamicData.fhSimable);
}

static int EDamageLights_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EDamageLights(stringhash32(lua_tostring(luaState, 1)), gEventDynamicData.fhSimable);
    }
    return 0;
}

static void EDamageLights_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
