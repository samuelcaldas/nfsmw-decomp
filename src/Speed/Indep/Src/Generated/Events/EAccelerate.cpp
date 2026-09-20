#include "EAccelerate.hpp"
#include "Speed/Indep/Libs/Support/Utility/UVector.h"
#include "Speed/Indep/Src/Interfaces/Simables/IRigidBody.h"
#include "Speed/Indep/Src/Interfaces/Simables/ISimable.h"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/World/WTrigger.h"

int GetFoundationVideoMode();

struct UGroup;

EAccelerate::EAccelerate(float pAccelerationX, float pAccelerationY, float pAccelerationZ, int pLocalToObject, int pLocalToTrigger, int pPALOnly,
                        unsigned int phSimable, WTrigger *pTrigger)
    : Event(0x30),
      fAccelerationX(pAccelerationX),
      fAccelerationY(pAccelerationY),
      fAccelerationZ(pAccelerationZ),
      fLocalToObject(pLocalToObject),
      fLocalToTrigger(pLocalToTrigger),
      fPALOnly(pPALOnly),
      fhSimable(phSimable),
      fTrigger(pTrigger) {
}

EAccelerate::~EAccelerate() {
    if (this->fPALOnly && GetFoundationVideoMode() != 2) {
        return;
    }
    ISimable *simable = ISimable::FindInstance(reinterpret_cast<HSIMABLE>(this->fhSimable));
    if (!simable) {
        return;
    }
    IRigidBody *rb = simable->GetRigidBody();
    if (!rb) {
        return;
    }
    UVector3 force(this->fAccelerationX, this->fAccelerationY, this->fAccelerationZ);
    if (this->fLocalToObject) {
        rb->ConvertLocalToWorld(force, false);
    } else if (this->fLocalToTrigger && this->fTrigger) {
        UMath::Matrix4 m;
        this->fTrigger->MakeMatrix(m, false, false);
        force *= m;
    }
    force *= rb->GetMass();
    rb->ResolveForce(force);
}

const char *EAccelerate::GetEventName() const {
    return "EAccelerate";
}

static void EAccelerate_MakeEvent_Callback(const void *staticData) {
    const EAccelerate::StaticData *data = static_cast<const EAccelerate::StaticData *>(staticData);
    new EAccelerate(data->fAccelerationX, data->fAccelerationY, data->fAccelerationZ, data->fLocalToObject, data->fLocalToTrigger,
                    data->fPALOnly, gEventDynamicData.fhSimable, gEventDynamicData.fTrigger);
}

static int EAccelerate_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 6) {
        new EAccelerate(static_cast<float>(lua_tonumber(luaState, 1)), static_cast<float>(lua_tonumber(luaState, 2)),
                        static_cast<float>(lua_tonumber(luaState, 3)), static_cast<int>(lua_tonumber(luaState, 4)),
                        static_cast<int>(lua_tonumber(luaState, 5)), static_cast<int>(lua_tonumber(luaState, 6)),
                        gEventDynamicData.fhSimable, gEventDynamicData.fTrigger);
    }
    return 0;
}

static void EAccelerate_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
