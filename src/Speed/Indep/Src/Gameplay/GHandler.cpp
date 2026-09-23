#include "Speed/Indep/Src/Gameplay/GHandler.h"
#include "Speed/Indep/Src/Lua/LuaRuntime.h"

// -----------------------------------------------------------------------------
// GHandler implementation
// -----------------------------------------------------------------------------














































/**
 * @brief Constructs a new GHandler runtime instance.
 * @param handlerKey Attribute key identifying the handler definition.
 */

GHandler::GHandler(const Attrib::Key &handlerKey)
    : GRuntimeInstance(handlerKey, kGameplayObjType_Handler),
      mAttached(0) {
}




/**
 * @brief Destroys the GHandler runtime instance.
 */
GHandler::~GHandler() {
    this->Detach(LuaRuntime::Get().GetState());
}













































































































/**
 * @brief Resets attachment state when bytecode is flushed.
 */
void GHandler::NotifyBytecodeFlushed() {
    this->mAttached = 0;
}














































































/**
 * @brief Dispatches an incoming event message to the scripted handler.
 * @param info Delivery information for the message.
 */
void GHandler::HandleMessage(LuaMessageDeliveryInfo *info) {
    this->ExecuteScriptedHandler(info);
}
