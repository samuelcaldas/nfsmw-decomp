#include "Speed/Indep/Src/Gameplay/GTimer.h"
#include "Speed/Indep/Src/Sim/Simulation.h"
#include "Speed/Indep/Src/Generated/Messages/MNotifyTimer.h"
#include "Speed/Indep/Src/Generated/Hash.hpp"
#include "Speed/Indep/bWare/Inc/Strings.hpp"

/**
 * @brief Constructs a new GTimer instance initialized to zero.
 */
GTimer::GTimer() {
    this->Reset(0.0f);
}

/**
 * @brief Destroys the GTimer instance.
 */
GTimer::~GTimer() {
}

/**
 * @brief Starts the timer running from the current simulation time.
 */
void GTimer::Start() {
    this->mTotalTime = this->GetTime();
    this->mStartTime = Sim::GetTime();
    this->mRunning = true;
}

/**
 * @brief Stops the timer and records accumulated elapsed time.
 */
void GTimer::Stop() {
    this->mTotalTime = this->GetTime();
    this->mRunning = false;
}

/**
 * @brief Resets the timer to a base value.
 * @param value Initial total time value.
 */
void GTimer::Reset(float value) {
    this->mTotalTime = value;
    this->mStartTime = Sim::GetTime();
}

/**
 * @brief Returns the total accumulated time.
 * @return Current total time.
 */
float GTimer::GetTime() const {
    if (this->mRunning) {
        return this->mTotalTime + (Sim::GetTime() - this->mStartTime);
    }
    return this->mTotalTime;
}

/**
 * @brief Sets total time directly and stops timer.
 * @param time Time value to set.
 */
void GTimer::SetTime(float time) {
    this->mTotalTime = time;
    this->mRunning = false;
}

/**
 * @brief Constructs a new GEventTimer initialized to defaults.
 */
GEventTimer::GEventTimer() {
    this->Reset();
}

/**
 * @brief Destroys the GEventTimer instance.
 */
GEventTimer::~GEventTimer() {
}

/**
 * @brief Resets the event timer state to defaults.
 */
void GEventTimer::Reset() {
    this->mElapsed = 0.0f;
    this->mRunning = false;
    this->mInterval = 1.0f;
    this->mNameHash = 0;
    this->mName[0] = '\0';
}

/**
 * @brief Starts the event timer.
 */
void GEventTimer::Start() {
    this->mRunning = true;
    this->mElapsed = 0.0f;
}

/**
 * @brief Stops the event timer.
 */
void GEventTimer::Stop() {
    this->mRunning = false;
    this->mElapsed = 0.0f;
}

/**
 * @brief Sets the timer interval and clears elapsed time.
 * @param value New interval value.
 */
void GEventTimer::SetInterval(float value) {
    this->mInterval = value;
    this->mElapsed = 0.0f;
}

/**
 * @brief Advances the timer by delta time and posts message on interval elapsed.
 * @param dT Delta time step.
 */
void GEventTimer::Update(float dT) {
    if (this->mRunning) {
        this->mElapsed += dT;
        if (this->mElapsed >= this->mInterval) {
            MNotifyTimer(this->mName).Post(UCRC32_Gameplay);
            this->mElapsed -= this->mInterval;
        }
    }
}

/**
 * @brief Sets the timer name and computes its hash.
 * @param name Timer name string.
 */
void GEventTimer::SetName(const char *name) {
    bSafeStrCpy(this->mName, name, 19);
    this->mNameHash = bStringHash(this->mName);
}

/**
 * @brief Serializes timer state into save buffer.
 * @param saveInfo Target save structure.
 */
void GEventTimer::Serialize(SavedTimerInfo *saveInfo) {
    saveInfo->mElapsed = this->mElapsed;
    saveInfo->mInterval = this->mInterval;
    saveInfo->mRunning = this->mRunning;
    bSafeStrCpy(saveInfo->mName, this->mName, 19);
}

/**
 * @brief Deserializes timer state from save buffer.
 * @param saveInfo Source save structure.
 */
void GEventTimer::Deserialize(SavedTimerInfo *saveInfo) {
    this->mElapsed = saveInfo->mElapsed;
    this->mInterval = saveInfo->mInterval;
    this->mRunning = saveInfo->mRunning;
    bSafeStrCpy(this->mName, saveInfo->mName, 19);
    this->mNameHash = bStringHash(this->mName);
}
