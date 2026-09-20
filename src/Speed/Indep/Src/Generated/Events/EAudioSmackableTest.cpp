#include "EAudioSmackableTest.hpp"

EAudioSmackableTest::EAudioSmackableTest(float pTestRadius) : Event(0x10), fTestRadius(pTestRadius) {
}

EAudioSmackableTest::~EAudioSmackableTest() {
}

const char *EAudioSmackableTest::GetEventName() const {
    return "EAudioSmackableTest";
}

static void EAudioSmackableTest_MakeEvent_Callback(const void *staticData) {
    const EAudioSmackableTest::StaticData *data = static_cast<const EAudioSmackableTest::StaticData *>(staticData);
    new EAudioSmackableTest(data->fTestRadius);
}
