// TODO remove
#ifdef _MSC_VER
#pragma warning(disable : 4716)
#endif

#define _STLP_EXPOSE_GLOBALS_IMPLEMENTATION

#include "Speed/Indep/Src/AI/Activities/AITrafficManager.cpp"

#include "Speed/Indep/Src/AI/Activities/AICopManager.cpp"

#include "Speed/Indep/Src/AI/Activities/AvoidableManager.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionNone.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionTooDamaged.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionGetUnstuck.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionTraffic.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionPursuitOffRoad.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionHeliPursuit.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionHeliExit.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionHeadOnRam.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionRam.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionStopShort.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionSpline.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionStrafe.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionAirborne.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionJackKnife.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionStaticRoadBlock.cpp"

#include "Speed/Indep/Src/AI/Actions/AIActionRace.cpp"

#include "Speed/Indep/Src/AI/Common/AIVehicle.cpp"

#include "Speed/Indep/Src/AI/Common/AIVehicleCopCar.cpp"

#include "Speed/Indep/Src/AI/Common/AIVehicleRacecar.cpp"

#include "Speed/Indep/Src/AI/Common/AIVehicleTraffic.cpp"

#include "Speed/Indep/Src/AI/Common/AIVehiclePursuit.cpp"

#include "Speed/Indep/Src/AI/Common/AIVehicleHelicopter.cpp"

#include "Speed/Indep/Src/AI/Common/AdaptivePIDController.cpp"

#include "Speed/Indep/Src/AI/Common/AITarget.cpp"

#include "Speed/Indep/Src/AI/Common/AISteer.cpp"

#include "Speed/Indep/Src/AI/Common/AIAction.cpp"

#include "Speed/Indep/Src/AI/Common/AIGoal.cpp"

#include "Speed/Indep/Src/AI/Common/AIPursuit.cpp"

#include "Speed/Indep/Src/AI/Common/AIRoadBlock.cpp"

#include "Speed/Indep/Src/AI/Common/AIRoadBlockSetups.cpp"

#include "Speed/Indep/Src/AI/Common/AISpawnManager.cpp"

#include "Speed/Indep/Src/AI/Common/AIMath.cpp"

#include "Speed/Indep/Src/AI/Gps.cpp"

#include "Speed/Indep/Src/Gameplay/GReflected.h"
#include "Speed/Indep/Src/EAXSound/SoundCollision.hpp"
#include "Speed/Indep/Src/Interfaces/Simables/ISimpleBody.h"
#include "Speed/Indep/Src/EAXSound/SimStates/EAX_HeliState.hpp"

template const GCollectionKey &Attrib::TAttrib<GCollectionKey>::Get(unsigned int) const;
template const UMath::Vector4 &Attrib::TAttrib<UMath::Vector4>::Get(unsigned int) const;
template const bool &Attrib::TAttrib<bool>::Get(unsigned int) const;

template <typename T, typename U, typename V>
U *UTL::COM::Factory<T, U, V>::CreateInstance(V sig, T params) {
    for (const Prototype *f = Prototype::GetHead(); f != nullptr; f = f->GetNext()) {
        if (f->mSignature == sig) {
            return f->mConstructor(params);
        }
    }
    return nullptr;
}

template Sound::AudioEvent *UTL::COM::Factory<const Sound::AudioEventParams &, Sound::AudioEvent, unsigned int>::CreateInstance(
    unsigned int, const Sound::AudioEventParams &);

struct IDebugWatchCar;

namespace _STL {
template ISimpleBody **find<ISimpleBody **, ISimpleBody *>(ISimpleBody **, ISimpleBody **, ISimpleBody * const &);
template EAX_HeliState **find<EAX_HeliState **, EAX_HeliState *>(EAX_HeliState **, EAX_HeliState **, EAX_HeliState * const &);
template IDebugWatchCar **find<IDebugWatchCar **, IDebugWatchCar *>(IDebugWatchCar **, IDebugWatchCar **, IDebugWatchCar * const &);
}
