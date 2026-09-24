/**
 * @brief Retrieves the parent vault associated with these race parameters.
 * @return Pointer to the parent vault.
 */
GVault *GRaceParameters::GetParentVault() const {
    return this->mParentVault;
}

/**
 * @brief Gets the child vault of this race bin.
 * @return Pointer to the child vault.
 */
GVault *GRaceBin::GetChildVault() const {
    return this->mChildVault;
}

/**
 * @brief Retrieves the child vault associated with these race parameters.
 * @return Pointer to the child vault.
 */
GVault *GRaceParameters::GetChildVault() const {
    return this->mChildVault;
}

/**
 * @brief Retrieves the number of challenges completed for this race bin.
 * @return Number of completed challenges.
 */
int GRaceBin::GetCompletedChallenges() const {
    return this->mStats.mChallengesCompleted;
}

/**
 * @brief Retrieves the number of race wins awarded for this race bin.
 * @return Number of awarded race wins.
 */
unsigned short GRaceBin::GetAwardedRaceWins() const {
    return this->mStats.mRacesWon;
}

/**
 * @brief Simulates D-Day completion in the database.
 */
void GRaceDatabase::SimulateDDayComplete() {}

/**
 * @brief Retrieves the startup race configuration.
 * @return Pointer to startup race custom instance.
 */
GRaceCustom *GRaceDatabase::GetStartupRace() {
    return this->mStartupRace;
}

/**
 * @brief Sets whether this race runs in reverse.
 * @param isReverseDir Whether the race direction is reversed.
 */
void GRaceCustom::SetReversed(bool isReverseDir) {
    this->mReversed = isReverseDir;
}

/**
 * @brief Sets the number of opponents in this custom race.
 * @param numOpponents Number of opponents to set.
 */
void GRaceCustom::SetNumOpponents(int numOpponents) {
    this->mNumOpponents = numOpponents;
}

/**
 * @brief Retrieves the number of race bins in the database.
 * @return Number of race bins.
 */
unsigned int GRaceDatabase::GetBinCount() {
    return this->mBinCount;
}

/**
 * @brief Retrieves the gameplay attribute object for this race parameter set.
 * @return Pointer to gameplay attribute object.
 */
const Attrib::Gen::gameplay *GRaceParameters::GetGameplayObj() const {
    return this->mRaceRecord;
}

/**
 * @brief Retrieves the total count of races across static and dynamic records.
 * @return Total count of races.
 */
unsigned int GRaceDatabase::GetRaceCount() {
    return this->mRaceCountStatic + this->mRaceCountDynamic;
}
