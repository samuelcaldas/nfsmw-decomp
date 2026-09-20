#include "EDynamicRegion.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"
#include "Speed/Indep/Src/World/TrackPath.hpp"

struct UGroup;

EDynamicRegion::EDynamicRegion(int pOn, UMath::Vector4 pPosition, UMath::Vector4 pVector, UMath::Vector4 pVelocity, unsigned int phSimable)
    : Event(0x40),
      fOn(pOn),
      fPosition(pPosition),
      fVector(pVector),
      fVelocity(pVelocity),
      fhSimable(phSimable) {
}

EDynamicRegion::~EDynamicRegion() {
    bVector3 vpos;
    vpos.x = this->fPosition.z;
    vpos.y = -this->fPosition.x;
    vpos.z = this->fPosition.y;
    bVector2 pos2d(vpos.x, vpos.y);
    TrackPathZone *zone = nullptr;
    while ((zone = TheTrackPathManager.FindZone(&pos2d, TRACK_PATH_ZONE_DYNAMIC, zone)) != nullptr) {
        zone->VisitInfo = (this->fOn != 0);
    }
}

const char *EDynamicRegion::GetEventName() const {
    return "EDynamicRegion";
}

static void EDynamicRegion_MakeEvent_Callback(const void *staticData) {
    const EDynamicRegion::StaticData *data = static_cast<const EDynamicRegion::StaticData *>(staticData);
    new EDynamicRegion(data->fOn, gEventDynamicData.fPosition, gEventDynamicData.fVector, gEventDynamicData.fVelocity, gEventDynamicData.fhSimable);
}

static int EDynamicRegion_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EDynamicRegion(static_cast<int>(lua_tonumber(luaState, 1)), gEventDynamicData.fPosition, gEventDynamicData.fVector, gEventDynamicData.fVelocity, gEventDynamicData.fhSimable);
    }
    return 0;
}

static void EDynamicRegion_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
