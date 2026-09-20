#include "EEnableModeling.hpp"
#include "Speed/Indep/Src/Interfaces/Simables/ICollisionBody.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"

struct UGroup;

EEnableModeling::EEnableModeling(int pEnable, unsigned int phSimable)
    : Event(0x10),
      fEnable(pEnable),
      fhSimable(phSimable) {
}

EEnableModeling::~EEnableModeling() {
    ISimable *simable = ISimable::FindInstance(reinterpret_cast<HSIMABLE>(this->fhSimable));
    if (simable != nullptr) {
        ICollisionBody *colBody = nullptr;
        if (simable->QueryInterface(&colBody)) {
            if (this->fEnable != 0) {
                colBody->EnableModeling();
            } else {
                colBody->DisableModeling();
            }
        }
    }
}

const char *EEnableModeling::GetEventName() const {
    return "EEnableModeling";
}

static void EEnableModeling_MakeEvent_Callback(const void *staticData) {
    const EEnableModeling::StaticData *data = static_cast<const EEnableModeling::StaticData *>(staticData);
    new EEnableModeling(data->fEnable, gEventDynamicData.fhSimable);
}

static int EEnableModeling_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EEnableModeling(static_cast<int>(lua_tonumber(luaState, 1)), gEventDynamicData.fhSimable);
    }
    return 0;
}

static void EEnableModeling_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
