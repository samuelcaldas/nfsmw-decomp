#include "Speed/Indep/Src/Gameplay/GMilestone.h"
#include "Speed/Indep/Src/Gameplay/GRaceDatabase.h"
#include "Speed/Indep/Src/Generated/AttribSys/Classes/gameplay.h"
#include "Speed/Indep/Src/Generated/AttribSys/Classes/milestonetypes.h"
#include "Speed/Indep/Src/Generated/Events/EReportMilestoneAtStake.hpp"
#include "Speed/Indep/Src/Generated/Messages/MNotifyMilestoneReached.h"

extern void Game_AwardPlayerBounty(int bounty);
extern void Game_ChallengeCompleted();

GMilestone::GMilestone()
    : mTypeKey(0),
      mChallengeKey(0),
      mState(0),
      mFlags(0),
      mBinNumber(0),
      mRequiredValue(0.0f),
      mRecordedValue(0.0f) {
}

/**
 * @brief Gets the current value of the milestone metric from GManager.
 * @return Current floating-point value of the milestone metric.
 */
float GMilestone::GetCurrentValue() const {
    return GManager::Get().GetValue(this->mTypeKey);
}

/**
 * @brief Gets the bounty awarded for completing this milestone.
 * @return Bounty value in cash/points, or 0.0f if record is invalid.
 */
float GMilestone::GetBounty() const {
    Attrib::Gen::gameplay challengeRecord(this->mChallengeKey, 0, nullptr);
    if (challengeRecord.IsValid()) {
        return challengeRecord.Bounty();
    }
    return 0.0f;
}

/**
 * @brief Gets the localization text tag for this milestone.
 * @return Localization tag ID, or 0 if record is invalid.
 */
int GMilestone::GetLocalizationTag() const {
    Attrib::Gen::milestonetypes milestoneTypeRecord(this->mTypeKey, 0, nullptr);
    if (milestoneTypeRecord.IsValid()) {
        return milestoneTypeRecord.LocalizationTag();
    }
    return 0;
}

/**
 * @brief Gets the spawn point jump marker attribute key for this milestone.
 * @return Attribute key for the jump marker.
 */
Attrib::Key GMilestone::GetJumpMarkerKey() const {
    Attrib::Gen::gameplay challengeRecord(this->mChallengeKey, 0, nullptr);
    return challengeRecord.SpawnPoint().mCollectionKey;
}

/**
 * @brief Initializes the milestone with the given challenge key and resets state.
 * @param challengeKey Challenge key identifier.
 */
void GMilestone::Init(unsigned int challengeKey) {
    this->mChallengeKey = challengeKey;
    this->Reset();
}

/**
 * @brief Resets the milestone state and reloads attributes from the challenge key.
 */
void GMilestone::Reset() {
    Attrib::Gen::gameplay challengeRecord(this->mChallengeKey, 0, nullptr);
    this->mTypeKey = Attrib::StringToKey(challengeRecord.MilestoneName());
    this->mState = 1;
    this->mBinNumber = challengeRecord.BinIndex();
    this->mRequiredValue = challengeRecord.GoalEasy();
    this->mRecordedValue = 0.0f;
    if (GManager::Get().GetIsBiggerValueBetter(this->mTypeKey)) {
        this->mFlags |= 1;
    }
}

/**
 * @brief Unlocks the milestone if it is currently locked.
 */
void GMilestone::Unlock() {
    if (this->mState == 1) {
        this->mState = 2;
    }
}

/**
 * @brief Checks if a given value meets the milestone goal.
 */
bool GMilestone::ValueMeetsGoal(float value) {
    bool flag = !(this->mFlags & 1);
    float diff = this->mRequiredValue - value;
    if (flag) {
        diff = -diff;
    }
    return diff <= 0.0f;
}

/**
 * @brief Notifies progress on this milestone and fires at-stake event if met.
 * @param value Current progress value.
 */
void GMilestone::NotifyProgress(float value) {
    if (this->mState == 2 && this->ValueMeetsGoal(value)) {
        new EReportMilestoneAtStake(this);
        this->mState = 3;
    }
}

/**
 * @brief Handles pursuit outcome for this milestone, awarding rewards on escape.
 * @param escaped True if the player successfully escaped pursuit; false if busted/failed.
 */
void GMilestone::NotifyPursuitOver(bool escaped) {
    if (this->mState == 3) {
        if (escaped) {
            float currentValue = this->GetCurrentValue();
            if (this->mFlags & 2) {
                currentValue = this->mRequiredValue;
            }
            this->mRecordedValue = currentValue;
            this->mState = 4;
            Attrib::Gen::milestonetypes milestoneTypeRecord(this->mTypeKey, 0, nullptr);
            MNotifyMilestoneReached(milestoneTypeRecord.CollectionName(), currentValue).Post(0x20d60dbf);
            Attrib::Gen::gameplay challengeRecord(this->mChallengeKey, 0, nullptr);
            GRaceBin *bin = GRaceDatabase::Get().GetBinNumber(this->mBinNumber);
            if (bin != nullptr) {
                bin->RefreshProgress();
            }
            Game_AwardPlayerBounty(challengeRecord.Bounty());
            Game_ChallengeCompleted();
        } else {
            this->mState = 2;
        }
    }
}


