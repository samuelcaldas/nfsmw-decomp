#include "EDeliverMessage.hpp"
#include "Speed/Indep/Src/Misc/Hermes.h"

EDeliverMessage::EDeliverMessage(Hermes::Message *pMessage, UCrc32 pPort)
    : Event(0x10),
      fMessage(EventManager::EmbedField(this, pMessage)),
      fPort(pPort) {
}

EDeliverMessage::~EDeliverMessage() {
    this->fMessage->Send(this->fPort);
}

const char *EDeliverMessage::GetEventName() const {
    return "EDeliverMessage";
}

static void EDeliverMessage_MakeEvent_Callback(const void *staticData) {
    const EDeliverMessage::StaticData *data = static_cast<const EDeliverMessage::StaticData *>(staticData);
    new EDeliverMessage(data->fMessage, data->fPort);
}
