#include "Speed/Indep/Src/Camera/ICE/ICEManager.hpp"
#include "ICEReplay.hpp"
#include "Speed/Indep/Src/Camera/ICE/ICEReplay.hpp"

ICEManager::ICEManager() {

    this->nState = 0;
    this->nTrack = 0;
    this->nHandle = 0;
    this->nOption = 0;
    this->nSetting = 0;
    this->nSceneHash = 0;
    this->nExitConfirmOption = 0;
    this->nDeleteConfirmOption = 0;
    this->nCopyMode = 0;
    this->nNisCameras = 0;
    this->nFmvCameras = 0;
    this->nReplayCameras = 0;
    this->nGenericCameras = 0;
    this->pNisCameras = nullptr;
    this->pFmvCameras = nullptr;
    this->pReplayCameras = nullptr;
    this->pGenericCameras = nullptr;
    this->pShakeGroup = nullptr;

    this->fAnimElevation = 0.0f;
    this->fParameterStart = 0.0f;
    this->fParameterLength = 0.0f;
    this->fParameterLengthBackup = 0.0f;

    this->nContext = 3;
    this->nPlayGenericGroupHash = bStringHash("");
    this->nPlayGenericTrackName[0] = '\0';
    this->pPlaybackTrack = nullptr;

    ICEReplay::ClearRecentlyUsed();
    this->bSmoothExit = false;
    this->bUseRealTime = false;
    this->nMarkerIndex = -1;
}

/**
 * @brief Updates ICE camera manager state.
 */
void ICEManager::Update() {
}

// TODO move this?
struct ICEManager TheICEManager; // size: 0x80
