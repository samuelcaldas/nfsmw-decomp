#include "EEnableCollisionElement.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"

struct UGroup;

EEnableCollisionElement::EEnableCollisionElement(int pEnable, CARP::CollisionObject *pColElement)
    : Event(0x10),
      fEnable(pEnable),
      fColElement(pColElement) {
}

EEnableCollisionElement::~EEnableCollisionElement() {
    if (this->fColElement != nullptr) {
        if (this->fEnable != 0) {
            this->fColElement->fFlags &= ~0x20;
        } else {
            this->fColElement->fFlags |= 0x20;
        }
    }
}

const char *EEnableCollisionElement::GetEventName() const {
    return "EEnableCollisionElement";
}

static void EEnableCollisionElement_MakeEvent_Callback(const void *staticData) {
    const EEnableCollisionElement::StaticData *data = static_cast<const EEnableCollisionElement::StaticData *>(staticData);
    new EEnableCollisionElement(data->fEnable, data->fColElement);
}

static int EEnableCollisionElement_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 2) {
        new EEnableCollisionElement(static_cast<int>(lua_tonumber(luaState, 1)), reinterpret_cast<CARP::CollisionObject *>(const_cast<char *>(lua_tostring(luaState, 2))));
    }
    return 0;
}

static void EEnableCollisionElement_ResolveEvent_Callback(void *staticData, const UGroup *context) {
    EEnableCollisionElement::StaticData *data = static_cast<EEnableCollisionElement::StaticData *>(staticData);
    new (&data->fColElement) CARP::TagReference(context);
}
