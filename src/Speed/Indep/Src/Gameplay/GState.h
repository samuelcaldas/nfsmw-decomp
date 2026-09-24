#ifndef GAMEPLAY_GSTATE_H
#define GAMEPLAY_GSTATE_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

#include "Speed/Indep/Src/Gameplay/GRuntimeInstance.h"

// total size: 0x28
class GState : public GRuntimeInstance {
  public:
    GState(const Attrib::Key &stateKey);
    ~GState() override;

    /**
     * @brief Gets the gameplay object type for this state.
     * @return The state gameplay object type (kGameplayObjType_State).
     */
    GameplayObjType GetType() const override {
        return kGameplayObjType_State;
    }

    static GameplayObjType GetTypeStatic() {
        return kGameplayObjType_State;
    }
};

#endif
