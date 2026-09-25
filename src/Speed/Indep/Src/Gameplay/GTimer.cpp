#include "Speed/Indep/Src/Gameplay/GTimer.h"

void GTimer::SetTime(float time) {
    this->mTotalTime = time;
    this->mRunning = false;
}

/**
 * @brief Sets the timer interval and clears the elapsed time.
 * @param value New interval value.
 */
void GEventTimer::SetInterval(float value) {
    this->mInterval = value;
    this->mElapsed = 0.0f;
}

void GEventTimer::Start() {
    this->mRunning = true;
    this->mElapsed = 0.0f;
}

void GEventTimer::Stop() {
    this->mRunning = false;
    this->mElapsed = 0.0f;
}

void GEventTimer::SetInterval(float value) {
    this->mInterval = value;
    this->mElapsed = 0.0f;
}

