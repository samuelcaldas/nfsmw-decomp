#include "Speed/Indep/Src/Gameplay/GTimer.h"

void GTimer::SetTime(float time) {
    this->mTotalTime = time;
    this->mRunning = false;
}
