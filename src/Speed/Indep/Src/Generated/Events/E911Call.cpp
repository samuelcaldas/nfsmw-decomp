#include "E911Call.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"

struct UGroup;




E911Call::E911Call() : Event(0x10) {

}




E911Call::~E911Call() {



}












const char *E911Call::GetEventName() const {
    return "E911Call";
}



static void E911Call_MakeEvent_Callback(const void *staticData) {
    new E911Call();
}



static int E911Call_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 0) {

        new E911Call();

    }




    return 0;
}



static void E911Call_ResolveEvent_Callback(void *staticData, const UGroup *context) {

}
