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

/**
 * @brief Sets the number of opponents in this custom race.
 * @param numOpponents Number of opponents to set.
 */
void GRaceCustom::SetNumOpponents(int numOpponents) {
    this->mNumOpponents = numOpponents;
}
