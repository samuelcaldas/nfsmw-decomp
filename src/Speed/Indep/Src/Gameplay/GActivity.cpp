#include "Speed/Indep/Src/Gameplay/GActivity.h"
#include "Speed/Indep/bWare/Inc/Strings.hpp"

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

void GActivity::GatherStatesAndHandlers() {
    this->mStateHandlers.clear();
    for (GObjectIterator<GState> it(-1); it; ++it) {
        GState *state = it;
        if (this->CollectionIsStateForActivity(state)) {
            this->mStateHandlers[state].clear();
        }
    }
    for (StateToHandlers::iterator it = this->mStateHandlers.begin(); it != this->mStateHandlers.end(); ++it) {
        GState *state = it->first;
        StateToHandlers::mapped_type &handlers = it->second;
        unsigned int count = this->StoreHandlers(state, nullptr);
        handlers.reserve(count);
        this->StoreHandlers(state, &handlers);
    }
}

int GActivity::StoreHandlers(GState *state, StateToHandlers::mapped_type *handlers) {
    int count = 0;
    for (GObjectIterator<GHandler> it(-1); it; ++it) {
        GHandler *handler = it;
        if (this->CollectionIsHandlerForState(state, handler)) {
            if (handlers != nullptr) {
                handlers->push_back(handler);
            }
            count++;
        }
    }
    return count;
}

bool GActivity::CollectionIsStateForActivity(GState *state) {
    Attrib::Key parent = this->GetParent();
    while (parent != 0) {
        Attrib::Gen::gameplay parentRecord(parent, 0, nullptr);
        unsigned int key = state->templateref().mCollectionKey;
        if (key == parentRecord.GetCollection()) {
            return true;
        }
        parent = parentRecord.GetParent();
    }
    return false;
}

bool GActivity::CollectionIsHandlerForState(GState *state, GHandler *handler) {
    unsigned int stateKey = handler->stateref().mCollectionKey;
    if (stateKey != state->GetCollection()) {
        return false;
    }
    const GCollectionKey &ownerKey = handler->handler_owner();
    unsigned int ownerCollection = ownerKey.mCollectionKey;
    if (ownerCollection == this->GetCollection()) {
        return true;
    }
    Attrib::Gen::gameplay owner(ownerKey.mCollectionKey, 0, nullptr);
    if (bStrCmp(owner.CollectionName(), this->CollectionName()) == 0) {
        return true;
    }
    Attrib::Key key = this->GetCollection();
    while (key != 0) {
        if (key == ownerKey.mCollectionKey) {
            return true;
        }
        Attrib::Gen::gameplay parentRecord(key, 0, nullptr);
        key = parentRecord.GetParent();
    }
    return false;
}
