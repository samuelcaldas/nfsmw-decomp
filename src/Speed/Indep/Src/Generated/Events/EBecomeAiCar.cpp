#include "EBecomeAiCar.hpp"
#include "Speed/Indep/Src/Interfaces/SimEntities/IPlayer.h"
#include "Speed/Indep/Src/Interfaces/Simables/IAI.h"
#include "Speed/Indep/Src/Interfaces/Simables/IRBVehicle.h"
#include "Speed/Indep/Src/Interfaces/Simables/IVehicle.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Sim/Simulation.h"

EBecomeAiCar::EBecomeAiCar()
    : Event(0x10) {
}

EBecomeAiCar::~EBecomeAiCar() {
    if (Sim::GetUserMode() == Sim::USER_SINGLE) {
        ISimable *simable = IPlayer::First(PLAYER_LOCAL)->GetSimable();
        if (simable != NULL) {
            IVehicle *vehicle;
            IHumanAI *humanAI;
            IRBVehicle *rbVehicle;

            if (simable->QueryInterface(&vehicle) && simable->QueryInterface(&humanAI) && simable->QueryInterface(&rbVehicle)) {
                if (!humanAI->GetAiControl()) {
                    humanAI->SetAiControl(true);
                    IVehicleAI *aiVehicle = vehicle->GetAIVehiclePtr();
                    if (aiVehicle != NULL) {
                        aiVehicle->ResetDriveToNav(SELECT_CURRENT_LANE);
                    }
                    rbVehicle->EnableObjectCollisions(false);
                }
            }
        }
    }
}

const char *EBecomeAiCar::GetEventName() const {
    return "EBecomeAiCar";
}

static void EBecomeAiCar_MakeEvent_Callback(const void *staticData) {
    new EBecomeAiCar();
}

static int EBecomeAiCar_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new EBecomeAiCar();
    }
    return 0;
}

static void EBecomeAiCar_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
