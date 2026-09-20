#include "ECameraShake.hpp"
#include "Speed/Indep/Src/Interfaces/SimEntities/IPlayer.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"
#include "Speed/Indep/Src/Misc/Rumble.hpp"
#include "Speed/Indep/bWare/Inc/bMath.hpp"

struct UGroup;

ECameraShake::ECameraShake()
    : Event(0x10) {
}

ECameraShake::~ECameraShake() {
    if (IPlayer::Count(PLAYER_ALL) <= 1 && IPlayer::First(PLAYER_LOCAL) != NULL) {
        bVector3 shake(0.2f, 0.0f, 0.3f);
        ForceCameraShake(0, &shake);
    }
}

const char *ECameraShake::GetEventName() const {
    return "ECameraShake";
}

static void ECameraShake_MakeEvent_Callback(const void *staticData) {
    new ECameraShake();
}

static int ECameraShake_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new ECameraShake();
    }
    return 0;
}

static void ECameraShake_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
