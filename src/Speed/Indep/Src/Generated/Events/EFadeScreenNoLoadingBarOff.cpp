#include "EFadeScreenNoLoadingBarOff.hpp"
#include "Speed/Indep/Src/Frontend/FEngInterfaces/FEngInterface.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"

struct UGroup;

EFadeScreenNoLoadingBarOff::EFadeScreenNoLoadingBarOff()
    : Event(0x10) {
    if (cFEng::Get()->IsPackagePushed("FadeScreenNoLoadingBar.fng")) {
        cFEng::Get()->PopNoControlPackage("FadeScreenNoLoadingBar.fng");
    }
}

EFadeScreenNoLoadingBarOff::~EFadeScreenNoLoadingBarOff() {
}

const char *EFadeScreenNoLoadingBarOff::GetEventName() const {
    return "EFadeScreenNoLoadingBarOff";
}

void EFadeScreenNoLoadingBarOff_MakeEvent_Callback(const void *staticData) {
    new EFadeScreenNoLoadingBarOff();
}

static int EFadeScreenNoLoadingBarOff_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new EFadeScreenNoLoadingBarOff();
    }
    return 0;
}

static void EFadeScreenNoLoadingBarOff_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
