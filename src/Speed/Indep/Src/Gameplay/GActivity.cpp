#include "Speed/Indep/Src/Gameplay/GActivity.h"
#include "Speed/Indep/Src/Gameplay/GManager.h"
#include "Speed/Indep/Src/Gameplay/GTrigger.h"
#include "Speed/Indep/Src/Generated/Events/EChangeState.hpp"
#include "Speed/Indep/Src/Generated/Messages/MStateEnter.h"
#include "Speed/Indep/Src/Generated/Messages/MStateExit.h"
#include "Speed/Indep/Src/Lua/LuaPostOffice.h"
#include "Speed/Indep/Src/Lua/LuaRuntime.h"
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

void GActivity::EnterState(GState *state) {
    if (!this->mVarsInLuaVM) {
        this->DeserializeVars();
    }
    if (state == this->mCurrentState) {
        return;
    }
    if (this->mCurrentState != nullptr) {
        this->HandleLocalMessage(MStateExit::_GetKind());
    }
    this->UnregisterMessageHandlers();
    if (!this->mVarsInLuaVM) {
        this->DeserializeVars();
    }
    this->mCurrentState = state;
    if (state != nullptr) {
        this->RegisterMessageHandlers(state);
        this->HandleLocalMessage(MStateEnter::_GetKind());
    }
}

int GActivity::ChangeStateFromScript(lua_State *L) {
    GActivity *activity = static_cast<GActivity *>(lua_touserdata(L, lua_upvalueindex(1)));
    GState *state = activity->GetStateByName(lua_tostring(L, 1));
    new EChangeState(activity->GetCollection(), state->GetCollection());
    return 0;
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

void GActivity::RegisterMessageHandlers(GState *state) {
    if (this->mRegisteredHandlersState == state) {
        return;
    }
    if (this->mRegisteredHandlersState != nullptr) {
        this->UnregisterMessageHandlers();
    }
    StateToHandlers::mapped_type &handlers = this->mStateHandlers.find(state)->second;
    for (StateToHandlers::mapped_type::iterator itH = handlers.begin(); itH != handlers.end(); ++itH) {
        GHandler *handler = *itH;
        LuaPostOffice::fObj->RegisterHandler(handler->message_id(), this);
    }
    this->mRegisteredHandlersState = state;
}

void GActivity::UnregisterMessageHandlers() {
    if (this->mRegisteredHandlersState == nullptr) {
        return;
    }
    StateToHandlers::mapped_type &handlers = this->mStateHandlers.find(this->mRegisteredHandlersState)->second;
    for (StateToHandlers::mapped_type::iterator itH = handlers.begin(); itH != handlers.end(); ++itH) {
        GHandler *handler = *itH;
        LuaPostOffice::fObj->UnregisterHandler(handler->message_id(), this);
    }
    this->mRegisteredHandlersState = nullptr;
}

void GActivity::ActivateReferencedTriggers(bool activate, GRuntimeInstance *instance) {
    for (unsigned int i = 0; i < instance->GetConnectionCount(); i++) {
        GRuntimeInstance *conn = instance->GetConnectionAt(i);
        GTrigger *trigger = GRuntimeInstance::FindObject<GTrigger>(conn->GetCollection());
        if (trigger != nullptr) {
            if (activate) {
                trigger->AddActivationReference();
            } else {
                trigger->RemoveActivationReference();
            }
        }
    }
    for (unsigned int i = 0; i < instance->Num_Children(); i++) {
        Attrib::Key childKey = instance->Children(i).mCollectionKey;
        GRuntimeInstance *child = GManager::Get().FindInstance(childKey);
        if (child != nullptr) {
            this->ActivateReferencedTriggers(activate, child);
        }
    }
}

void GActivity::Run() {
    if (this->mRunning) {
        return;
    }
    if (this->mStateHandlers.size() == 0) {
        this->GatherStatesAndHandlers();
    }
    this->mRunning = true;
    this->ActivateReferencedTriggers(true, this);
    if (this->mCurrentState == nullptr) {
        GState *state = this->GetStateByName("initial");
        new EChangeState(this->GetCollection(), state->GetCollection());
    } else {
        this->RegisterMessageHandlers(this->mCurrentState);
    }
}

void GActivity::Suspend() {
    if (!this->mRunning) {
        return;
    }
    this->mRunning = false;
    this->ActivateReferencedTriggers(false, this);
    this->UnregisterMessageHandlers();
    this->mStateHandlers.clear();
}

void GActivity::Reset() {
    this->Suspend();
    this->ClearActivityVars(LuaRuntime::Get().GetState());
    GManager::Get().ClearObjectStateBlock(this->GetCollection());
    this->mCurrentState = nullptr;
}

GState *GActivity::GetStateByName(const char *name) {
    for (StateToHandlers::iterator it = this->mStateHandlers.begin(); it != this->mStateHandlers.end(); ++it) {
        GState *state = it->first;
        if (bStrCmp(state->Name(), name) == 0) {
            return state;
        }
    }
    return nullptr;
}
