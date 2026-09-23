#ifndef LUA_LUAPOSTOFFICE_H
#define LUA_LUAPOSTOFFICE_H

#ifdef EA_PRAGMA_ONCE_SUPPORTED
#pragma once
#endif

#include "Speed/Indep/Libs/Support/Utility/UStandard.h"
#include "Speed/Indep/Libs/Support/Utility/UCOM.h"
#include "Speed/Indep/Src/Gameplay/GActivity.h"
#include "Speed/Indep/Src/Misc/Hermes.h"

struct lua_State;
struct GHandler;
struct Message;

/**
 * @brief Interface for message filtering context.
 */
struct IMessageFilterContext : public UTL::COM::IUnknown {
    DECL_INTERFACE(IMessageFilterContext);

    virtual struct lua_State *GetLuaState() const = 0;
    virtual struct GActivity *GetActivity() const = 0;
    virtual struct GHandler *GetHandler() const = 0;
    virtual const struct Message *GetMessage() const = 0;
};

/**
 * @brief Delivery information for Lua messages.
 */
struct LuaMessageDeliveryInfo : public UTL::COM::Object, public IMessageFilterContext {
    UCrc32 mMessageKind;                       // offset 0x8, size 0x4
    const struct Message *mMessageBase;        // offset 0xC, size 0x4
    void (*mBuildTableFunc)(struct lua_State *, const struct Message *); // offset 0x10, size 0x4
    bool mLuaTableBuilt;                       // offset 0x14, size 0x1
    struct lua_State *mLuaState;               // offset 0x18, size 0x4
    struct GActivity *mActivityContext;        // offset 0x1C, size 0x4
    struct GHandler *mHandlerContext;          // offset 0x20, size 0x4

    LuaMessageDeliveryInfo() : UTL::COM::Object(1), IMessageFilterContext(this) {}
    virtual ~LuaMessageDeliveryInfo() {}

    /**
     * @brief Gets the Lua state.
     */
    virtual struct lua_State *GetLuaState() const override;

    /**
     * @brief Gets the activity context.
     */
    virtual struct GActivity *GetActivity() const override;

    /**
     * @brief Gets the handler context.
     */
    virtual struct GHandler *GetHandler() const override;

    /**
     * @brief Gets the message base.
     */
    virtual const struct Message *GetMessage() const override;
};

struct lua_State *LuaMessageDeliveryInfo::GetLuaState() const {
    return this->mLuaState;
}

struct GActivity *LuaMessageDeliveryInfo::GetActivity() const {
    return this->mActivityContext;
}

struct GHandler *LuaMessageDeliveryInfo::GetHandler() const {
    return this->mHandlerContext;
}

const struct Message *LuaMessageDeliveryInfo::GetMessage() const {
    return this->mMessageBase;
}

DECLARE_CONTAINER_TYPE(ID_LuaActivityList);
DECLARE_CONTAINER_TYPE(ID_LuaMessageSubscriberMap);

// total size: 0x20
class LuaPostOffice {
  public:
    static void Init();
    static void Shutdown();

    LuaPostOffice &Get() {
        return *fObj;
    }

  private:
    static LuaPostOffice *fObj;

    UTL::Std::map<unsigned int, UTL::Std::vector<GActivity *, _type_ID_LuaActivityList>, _type_ID_LuaMessageSubscriberMap>
        mSubscribers;                                                                          // offset 0x0, size 0x10
    UTL::Std::vector<Hermes::HHANDLER, Hermes::_type_ID_HermesHandlerVector> mBindingHandlers; // offset 0x10, size 0x10
};

#endif
