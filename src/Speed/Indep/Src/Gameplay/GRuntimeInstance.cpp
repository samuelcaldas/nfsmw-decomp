#include "Speed/Indep/Src/Gameplay/GRuntimeInstance.h"

/**
 * @brief Sets the connection buffer for runtime instance linkages.
 * @param buffer Pointer to the connected instance storage array.
 * @param maxConnections Maximum capacity of the connection buffer.
 */
void GRuntimeInstance::SetConnectionBuffer(ConnectedInstance *buffer, unsigned int maxConnections) {
    this->mConnected = buffer;
    this->mNumConnected = 0;
}

/**
 * @brief Returns the number of currently linked connected instances.
 * @return Count of connected instances.
 */
unsigned short GRuntimeInstance::GetConnectionCount() const {
    return this->mNumConnected;
}
