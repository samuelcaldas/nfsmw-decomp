#include "EBecomePlayerCar.hpp"
#include "Speed/Indep/Src/Interfaces/SimEntities/IPlayer.h"
#include "Speed/Indep/Src/Interfaces/Simables/IAI.h"
#include "Speed/Indep/Src/Interfaces/Simables/IRBVehicle.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Sim/Simulation.h"

EBecomePlayerCar::EBecomePlayerCar()
    : Event(0x10) {
}

EBecomePlayerCar::~EBecomePlayerCar() {
    if (Sim::GetUserMode() == Sim::USER_SINGLE) {
        ISimable *simable = IPlayer::First(PLAYER_LOCAL)->GetSimable();
        if (simable != NULL) {
            IHumanAI *humanAI;
            IRBVehicle *rbVehicle;

            if (simable->QueryInterface(&humanAI) && simable->QueryInterface(&rbVehicle)) {
                if (humanAI->GetAiControl()) {
                    humanAI->SetAiControl(false);
                    rbVehicle->EnableObjectCollisions(true);
                    rbVehicle->SetInvulnerability(INVULNERABLE_FROM_CONTROL_SWITCH, 1.0f);
                }
            }
        }
    }
}

const char *EBecomePlayerCar::GetEventName() const {
    return "EBecomePlayerCar";
}

static void EBecomePlayerCar_MakeEvent_Callback(const void *staticData) {
    new EBecomePlayerCar();
}

static int EBecomePlayerCar_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new EBecomePlayerCar();
    }
    return 0;
}

static void EBecomePlayerCar_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
