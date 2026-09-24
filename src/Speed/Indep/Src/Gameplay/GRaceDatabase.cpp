#include "Speed/Indep/Src/Gameplay/GRaceDatabase.h"

const char GRaceDatabase::sDDayRaces[5][8] = {"16.1.0", "16.2.2", "16.2.3", "16.1.1", "16.2.1"};

/**
 * @brief Returns the number of completed challenges.
 * @return Count of completed challenges.
 */
int GRaceBin::GetCompletedChallenges() const {
    return this->mStats.mChallengesCompleted;
}

/**
 * @brief Returns the number of awarded race wins.
 * @return Count of awarded race wins.
 */
unsigned short GRaceBin::GetAwardedRaceWins() const {
    return this->mStats.mRacesWon;
}

/**
 * @brief Sets the number of completed challenges.
 * @param numChallenges Number of completed challenges.
 */
void GRaceBin::SetCompletedChallenges(int numChallenges) {
    this->mStats.mChallengesCompleted = numChallenges;
}

/**
 * @brief Sets the number of won races.
 * @param numRaces Number of won races.
 */
void GRaceBin::SetRacesWon(int numRaces) {
    this->mStats.mRacesWon = numRaces;
}

/**
 * @brief Simulates completion of D-Day event.
 */
void GRaceDatabase::SimulateDDayComplete() {
}

/**
 * @brief Returns the total count of registered races.
 * @return Sum of static and dynamic race counts.
 */
unsigned int GRaceDatabase::GetRaceCount() {
    return this->mRaceCountStatic + this->mRaceCountDynamic;
}

/**
 * @brief Returns the total count of race bins.
 * @return Count of race bins.
 */
unsigned int GRaceDatabase::GetBinCount() {
    return this->mBinCount;
}

/**
 * @brief Returns the race bin at the specified index.
 * @param index Array index of the requested race bin.
 * @return Pointer to the requested race bin.
 */
GRaceBin *GRaceDatabase::GetBin(unsigned int index) {
    return &this->mBins[index];
}

/**
 * @brief Returns the startup race custom object.
 * @return Pointer to the startup race custom object.
 */
GRaceCustom *GRaceDatabase::GetStartupRace() {
    return this->mStartupRace;
}

/**
 * @brief Returns the startup race context.
 * @return Race context for the startup race.
 */
GRace::Context GRaceDatabase::GetStartupRaceContext() {
    return this->mStartupRaceContext;
}

/**
 * @brief Gets the gameplay object associated with these race parameters.
 * @return Pointer to the gameplay attribute object.
 */
const Attrib::Gen::gameplay *GRaceParameters::GetGameplayObj() const {
    return this->mRaceRecord;
}

/**
 * @brief Gets the parent vault of these race parameters.
 * @return Pointer to the parent vault.
 */
GVault *GRaceParameters::GetParentVault() const {
    return this->mParentVault;
}

/**
 * @brief Gets the child vault of these race parameters.
 * @return Pointer to the child vault.
 */
GVault *GRaceParameters::GetChildVault() const {
    return this->mChildVault;
}

/**
 * @brief Gets the activity associated with this custom race.
 * @return Pointer to the race activity.
 */
GActivity *GRaceCustom::GetRaceActivity() const {
    return this->mRaceActivity;
}

/**
 * @brief Gets the collection key of this race bin.
 * @return Collection key identifier.
 */
unsigned int GRaceBin::GetCollectionKey() const {
    return this->mBinRecord.GetCollection();
}

/**
 * @brief Gets the child vault of this race bin.
 * @return Pointer to the child vault.
 */
GVault *GRaceBin::GetChildVault() const {
    return this->mChildVault;
}

/**
 * @brief Sets whether this race runs in reverse.
 * @param isReverseDir Whether the race direction is reversed.
 */
void GRaceCustom::SetReversed(bool isReverseDir) {
    this->mReversed = isReverseDir;
}

