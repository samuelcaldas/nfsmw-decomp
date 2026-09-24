#include "Speed/Indep/Src/Gameplay/GActivity.h"

GActivity::GActivity(const Attrib::Key &activityKey)
    : GRuntimeInstance(activityKey, static_cast<GameplayObjType>(0)),
      mCurrentState(nullptr),
      mRegisteredHandlersState(nullptr) {
    this->mRunning = false;
    this->mVarsInLuaVM = false;
    this->DeserializeVars();
}

GActivity::~GActivity() {
    if (this->Persistent()) {
        this->SerializeVars(true);
    }
    this->UnregisterMessageHandlers();
    this->mStateHandlers.clear();
}
