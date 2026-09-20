#include "EBreakerStopCops.hpp"
#include "Speed/Indep/Libs/Support/Utility/UMath.h"
#include "Speed/Indep/Libs/Support/Utility/UVector.h"
#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Generated/Messages/MBreakerStopCops.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"
#include "Speed/Indep/Src/Misc/Hermes.h"

struct UGroup;

EBreakerStopCops::EBreakerStopCops(float pEventRadius, float pDuration, UMath::Vector4 pPosition)
    : Event(0x20),
      fEventRadius(pEventRadius),
      fDuration(pDuration),
      fPosition(pPosition) {
}

EBreakerStopCops::~EBreakerStopCops() {
    UMath::Vector3 pos = UMath::Vector4To3(this->fPosition);

    UCrc32 hash("EBreakerStopCops");

    MBreakerStopCops msg(pos, this->fDuration, this->fEventRadius);
    msg.Post(hash);

    GManager::Get().HidePursuitBreakerIcon(pos, 20.0f);
}

const char *EBreakerStopCops::GetEventName() const {
    return "EBreakerStopCops";
}

static void EBreakerStopCops_MakeEvent_Callback(const void *staticData) {
    const EBreakerStopCops::StaticData *data = static_cast<const EBreakerStopCops::StaticData *>(staticData);
    new EBreakerStopCops(data->fEventRadius, data->fDuration, gEventDynamicData.fPosition);
}

static int EBreakerStopCops_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 2) {
        new EBreakerStopCops(static_cast<float>(lua_tonumber(luaState, 1)), static_cast<float>(lua_tonumber(luaState, 2)),
                            gEventDynamicData.fPosition);
    }
    return 0;
}

static void EBreakerStopCops_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
