#include "ECinematicMoment.hpp"
#include "Speed/Indep/Src/Camera/CameraAI.hpp"
#include "Speed/Indep/Src/Camera/ICE/ICEManager.hpp"
#include "Speed/Indep/Src/Interfaces/SimEntities/IPlayer.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include <new>

struct UGroup;

ECinematicMoment::ECinematicMoment(const char *pGenericGroupName, const char *pGenericTrackName, float pEventRadius)
    : Event(0x20),
      fGenericGroupName(pGenericGroupName),
      fGenericTrackName(pGenericTrackName),
      fEventRadius(pEventRadius) {
}

ECinematicMoment::~ECinematicMoment() {
    if (IPlayer::Count(PLAYER_ALL) <= 1 && IPlayer::First(PLAYER_LOCAL) != NULL) {
        TheICEManager.SetGenericCameraToPlay(this->fGenericGroupName, this->fGenericTrackName);
        CameraAI::SetAction(EVIEW_PLAYER1, "CDActionIce");
    }
}

const char *ECinematicMoment::GetEventName() const {
    return "ECinematicMoment";
}

static void ECinematicMoment_MakeEvent_Callback(const void *staticData) {
    const ECinematicMoment::StaticData *data = static_cast<const ECinematicMoment::StaticData *>(staticData);
    new ECinematicMoment(data->fGenericGroupName, data->fGenericTrackName, data->fEventRadius);
}

static int ECinematicMoment_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 3) {
        new ECinematicMoment(lua_tostring(luaState, 1), lua_tostring(luaState, 2), static_cast<float>(lua_tonumber(luaState, 3)));
    }
    return 0;
}

static void ECinematicMoment_ResolveEvent_Callback(void *staticData, const UGroup *context) {
    ECinematicMoment::StaticData *data = static_cast<ECinematicMoment::StaticData *>(staticData);
    new (const_cast<char **>(&data->fGenericGroupName)) CARP::TagReference(context);
    new (const_cast<char **>(&data->fGenericTrackName)) CARP::TagReference(context);
}
