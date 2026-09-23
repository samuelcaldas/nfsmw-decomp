#ifndef GAMEPLAY_GHANDLER_H
#define GAMEPLAY_GHANDLER_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

#include "GRuntimeInstance.h"

struct lua_State;
struct LuaMessageDeliveryInfo;

// total size: 0x2C
class GHandler : public GRuntimeInstance {
  public:
    GHandler(const Attrib::Key &handlerKey);
    ~GHandler() override;

    /**
     * @brief Gets the gameplay object type for this handler.
     * @return The handler gameplay object type (kGameplayObjType_Handler).
     */
    GameplayObjType GetType() const override {
        return kGameplayObjType_Handler;
    }

    void Attach(lua_State *state);
    void Detach(lua_State *state);
    void ExecuteScriptedHandler(LuaMessageDeliveryInfo *info);
    void NotifyBytecodeFlushed();
    bool MessagePassesFilters(LuaMessageDeliveryInfo *info);
    void HandleMessage(LuaMessageDeliveryInfo *info);

  private:
    unsigned int mAttached; // offset 0x28, size 0x4
};

#endif
