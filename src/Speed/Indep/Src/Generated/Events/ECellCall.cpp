#include "ECellCall.hpp"
#include "Speed/Indep/Src/EAXSound/Stream/SpeechManager.hpp"
#include "Speed/Indep/Src/Frontend/Database/FEDatabase.hpp"
#include "Speed/Indep/Src/Frontend/FEngFrontend.hpp"
#include "Speed/Indep/Src/Frontend/FEngInterfaces/FEngInterface.hpp"
#include "Speed/Indep/Src/Frontend/FEManager.hpp"
#include "Speed/Indep/Src/Frontend/Localization/Localize.hpp"
#include "Speed/Indep/Src/Generated/Events/ESndGameState.hpp"
#include "Speed/Indep/Src/Lua/source/lua.h"
#include "Speed/Indep/Src/Main/EventSequencer.h"
#ifndef MISC_SPEECH_DECLARED
#define MISC_SPEECH_DECLARED
class MiscSpeech {
  public:
    static void SMSCellCall(int SMS_ID);
    static void D_Day();
};
#endif

struct UGroup;

ECellCall::ECellCall(int pID)
    : Event(0x10),
      fID(pID) {
}

ECellCall::~ECellCall() {
    eLanguages lang = GetCurrentLanguage();
    if (lang == eLANGUAGE_DUTCH || lang == eLANGUAGE_DANISH || lang == eLANGUAGE_FINNISH ||
        lang == eLANGUAGE_POLISH || lang == eLANGUAGE_SWEDISH) {
        if (FEManager::IsOkayToRequestPauseSimulation(0, true, false)) {
            SMSMessage *msg = FEDatabase->GetCareerSettings()->GetSMSMessage(this->fID);
            if (msg != NULL) {
                msg->Flags = SMS_FLAG_UNREAD;
            }
            new ESndGameState(8, true);
            uint32 joyParam = FEngMapJoyportToJoyParam(FEDatabase->GetPlayersJoystickPort(0));
            if (this->fID > -1) {
                SMSMessage *pMsg = FEDatabase->GetCareerSettings()->GetSMSMessage(this->fID);
                if (!cFEng::Get()->IsPackagePushed("SMS_Mailboxes.fng")) {
                    cFEng::Get()->QueuePackagePush("SMS_Mailboxes.fng", reinterpret_cast<int>(pMsg), joyParam, false);
                }
            } else {
                if (!cFEng::Get()->IsPackagePushed("SMS_Mailboxes.fng")) {
                    cFEng::Get()->QueuePackagePush("SMS_Mailboxes.fng", 0, joyParam, false);
                }
            }
        }
    } else {
        MiscSpeech::SMSCellCall(this->fID);
        Speech::Manager::Deduce();
    }
}

const char *ECellCall::GetEventName() const {
    return "ECellCall";
}

static void ECellCall_MakeEvent_Callback(const void *staticData) {
    const ECellCall::StaticData *data = static_cast<const ECellCall::StaticData *>(staticData);
    new ECellCall(data->fID);
}

static int ECellCall_MakeEvent_LuaBinding(lua_State *luaState) {
    if (lua_gettop(luaState) == 1) {
        new ECellCall(static_cast<int>(lua_tonumber(luaState, 1)));
    }
    return 0;
}

static void ECellCall_ResolveEvent_Callback(void *staticData, const UGroup *context) {
}
