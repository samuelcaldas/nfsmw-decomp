#ifndef GAMEPLAY_GACTIVITY_H
#define GAMEPLAY_GACTIVITY_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

#include "GHandler.h"
#include "GState.h"
#include "Speed/Indep/Libs/Support/Utility/UStandard.h"

DECLARE_CONTAINER_TYPE(ID_GHandlerVector);
DECLARE_CONTAINER_TYPE(ID_StateToVectors);

typedef UTL::Std::map<GState *, UTL::Std::vector<GHandler *, _type_ID_GHandlerVector>, _type_ID_StateToVectors> StateToHandlers;

class UCrc32;
struct lua_State;
struct LuaMessageDeliveryInfo;

// total size: 0x48
class GActivity : public GRuntimeInstance {
  public:
    USE_FASTALLOC(GActivity);

    friend class GManager;
    // total size: 0x8
    struct SerializedHeader {
        unsigned int mStateNameHash; // offset 0x0, size 0x4
        unsigned short mFlags;       // offset 0x4, size 0x2
        unsigned short mTableBytes;  // offset 0x6, size 0x2
    };

    GActivity(const Attrib::Key &activityKey);
    virtual ~GActivity();

    /**
     * @brief Gets the gameplay object type for this activity.
     * @return The activity gameplay object type (kGameplayObjType_Activity).
     */
    GameplayObjType GetType() const override {
        return kGameplayObjType_Activity;
    }

    static GameplayObjType GetTypeStatic() {
        return kGameplayObjType_Activity;
    }

    void EnterState(GState *state);
    void Run();
    void Suspend();
    void Reset();
    GState *GetStateByName(const char *name);
    void SerializeVars(bool write);
    void DeserializeVars();
    void RegisterMessageHandlers(GState *state);
    void UnregisterMessageHandlers();
    void ActivateReferencedTriggers(bool activate, GRuntimeInstance *instance);

    void GatherStatesAndHandlers();
    int StoreHandlers(GState *state, StateToHandlers::mapped_type *handlers);
    bool CollectionIsStateForActivity(GState *state);
    bool CollectionIsHandlerForState(GState *state, GHandler *handler);
    static int ChangeStateFromScript(lua_State *L);
    void HandleLocalMessage(UCrc32 messageKind);
    void PushActivityVars(lua_State *L);
    void ClearActivityVars(lua_State *L);
    void BuildActivityTables(lua_State *L);
    void HandleMessage(LuaMessageDeliveryInfo *info);

  private:
    GState *mCurrentState;            // offset 0x28, size 0x4
    GState *mRegisteredHandlersState; // offset 0x2C, size 0x4
    StateToHandlers mStateHandlers;   // offset 0x30, size 0x10
    bool mRunning;                    // offset 0x40, size 0x1
    bool mVarsInLuaVM;                // offset 0x44, size 0x1
};

#endif
