#include "EFadeScreenNoLoadingBarOn.hpp"
#include "Speed/Indep/Src/Frontend/FEngInterfaces/FEngInterface.hpp"
#include "Speed/Indep/Src/Frontend/FEManager.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"

struct UGroup;

/**
 * @brief Constructs the EFadeScreenNoLoadingBarOn event and displays the fade screen without loading bar.
 */
EFadeScreenNoLoadingBarOn::EFadeScreenNoLoadingBarOn()
    : Event(0x10) {
    if (!cFEng::Get()->IsPackagePushed("FadeScreenNoLoadingBar.fng")) {
        FEManager::Get()->SuppressControllerError(true);
        cFEng::Get()->PushNoControlPackage("FadeScreenNoLoadingBar.fng", FE_PACKAGE_PRIORITY_SECOND_CLOSEST);
    }
}

/**
 * @brief Destructs the EFadeScreenNoLoadingBarOn event.
 */
EFadeScreenNoLoadingBarOn::~EFadeScreenNoLoadingBarOn() {
}

/**
 * @brief Gets the name of the event.
 * @return String literal containing "EFadeScreenNoLoadingBarOn".
 */
const char *EFadeScreenNoLoadingBarOn::GetEventName() const {
    return "EFadeScreenNoLoadingBarOn";
}

/**
 * @brief Callback to instantiate an EFadeScreenNoLoadingBarOn event.
 * @param staticData Unused static event data pointer.
 */
void EFadeScreenNoLoadingBarOn_MakeEvent_Callback(const void *staticData) {
    new EFadeScreenNoLoadingBarOn();
}

/**
 * @brief Lua binding to instantiate an EFadeScreenNoLoadingBarOn event.
 * @param luaState Pointer to Lua state.
 * @return 0 on completion.
 */
static int EFadeScreenNoLoadingBarOn_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {
        new EFadeScreenNoLoadingBarOn();
    }
    return 0;
}

/**
 * @brief Callback to resolve the event within a group context.
 * @param staticData Unused static event data pointer.
 * @param context Pointer to UGroup context.
 */
static void EFadeScreenNoLoadingBarOn_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
