#include "EEnterBin.hpp"
#include "Speed/Indep/Src/Frontend/Careers/UnlockSystem.hpp"
#include "Speed/Indep/Src/Frontend/Database/FEDatabase.hpp"
#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Gameplay/GRaceDatabase.h"
#include "Speed/Indep/Src/Gameplay/GRaceStatus.h"
#include "Speed/Indep/Src/Gameplay/GVault.h"
#include "Speed/Indep/Src/Generated/Events/EAwardUpgrade.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"

struct UGroup;

EEnterBin::EEnterBin(int pBinIndex)
    : Event(0x10),
      fBinIndex(pBinIndex) {
    for (unsigned int i = FEDatabase->GetCareerSettings()->GetCurrentBin() - 1; i >= static_cast<unsigned int>(pBinIndex); --i) {
        FEDatabase->GetCareerSettings()->SetCurrentBin(i);
        GManager::Get().EnableBinMilestones(i);
        GManager::Get().EnableBinSpeedTraps(i);
        if (!GManager::Get().GetInGameplay()) {
            GRaceBin *raceBin = GRaceDatabase::Get().GetBinNumber(i);
            if (raceBin != nullptr) {
                if (raceBin->GetChildVault() != nullptr && !raceBin->GetChildVault()->IsLoaded()) {
                    raceBin->GetChildVault()->LoadSyncTransient();
                }
                ClearAllNewStatus();
                for (unsigned int j = 0; j < raceBin->GetBaselineUnlockCount(); ++j) {
                    unsigned int unlock = raceBin->GetBaselineUnlock(j);
                    if (unlock != 0) {
                        new EAwardUpgrade(unlock);
                    }
                }
            }
        }
    }
    if (GRaceStatus::Exists()) {
        GRaceStatus::Get().RefreshBinWhileInGame();
    }
}

EEnterBin::~EEnterBin() {
}

const char *EEnterBin::GetEventName() const {
    return "EEnterBin";
}

void EEnterBin_MakeEvent_Callback(const void *staticData) {
    const EEnterBin::StaticData *data = static_cast<const EEnterBin::StaticData *>(staticData);
    new EEnterBin(data->fBinIndex);
}

static int EEnterBin_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new EEnterBin(static_cast<int>(lua_tonumber(luaState, 1)));
    }
    return 0;
}

static void EEnterBin_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
