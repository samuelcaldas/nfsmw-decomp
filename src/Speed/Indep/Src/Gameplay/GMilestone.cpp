#include "Speed/Indep/Src/Gameplay/GMilestone.h"

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
 * @brief Initializes the milestone with the given challenge key and resets state.
 * @param challengeKey Challenge key identifier.
 */
void GMilestone::Init(unsigned int challengeKey) {
    this->mChallengeKey = challengeKey;
    this->Reset();
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
