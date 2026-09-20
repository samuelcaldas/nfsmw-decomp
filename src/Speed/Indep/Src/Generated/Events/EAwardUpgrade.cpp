#include "EAwardUpgrade.hpp"
#include "Speed/Indep/Src/Frontend/Careers/UnlockSystem.hpp"
#include "Speed/Indep/Src/Gameplay/GRaceStatus.h"
#include "Speed/Indep/Src/Generated/AttribSys/Classes/gameplay.h"

EAwardUpgrade::EAwardUpgrade(unsigned int pUpgradeKey)
    : Event(0x10),
      fUpgradeKey(pUpgradeKey) {
    Attrib::Gen::gameplay gp(pUpgradeKey, 0, NULL);

    const char *upgradeType = gp.UpgradeType();
    const char *rewardMarkerType = gp.RewardMarkerType();

    if (upgradeType != NULL) {
        AwardUnlockUpgrade(gp);
    } else if (rewardMarkerType != NULL) {
        bool immediate_reward = !GRaceStatus::Exists() || !GRaceStatus::Get().GetRaceParameters()->GetIsMarkerRace();
        TheFEMarkerManager.AwardMarker(gp, immediate_reward);
    }
}

EAwardUpgrade::~EAwardUpgrade() {
}

const char *EAwardUpgrade::GetEventName() const {
    return "EAwardUpgrade";
}

static void EAwardUpgrade_MakeEvent_Callback(const void *staticData) {
    const EAwardUpgrade::StaticData *data = static_cast<const EAwardUpgrade::StaticData *>(staticData);
    new EAwardUpgrade(data->fUpgradeKey);
}
