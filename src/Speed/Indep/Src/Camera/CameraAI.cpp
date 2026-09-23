#include "CameraAI.hpp"
#include "Speed/Indep/Src/Frontend/Database/FEDatabase.hpp"

IMPLEMENT_LISTABLE(CameraAI::Director);

CameraAI::Director *FindDirector(unsigned int id);

/**
 * @brief Determines if moment (jump/action) cameras are enabled based on frontend game mode.
 * @return True if moment cameras are enabled; false in split screen, network modes, or disabled in options.
 */
bool AreMomentCamerasEnabled() {
    if (FEDatabase->IsSplitScreenMode()) {
        return false;
    }
    if (FEDatabase->IsLANMode() || FEDatabase->IsOnlineMode()) {
        return false;
    }
    return FEDatabase->GetGameplaySettings()->JumpCam;
}

/**
 * @brief Resets all camera directors.
 */
void CameraAI::Reset() {
    for (CameraAI::Director *const *iter = UTL::Collections::Listable<CameraAI::Director, 2>::GetList().begin();
         iter != UTL::Collections::Listable<CameraAI::Director, 2>::GetList().end(); iter++) {
        (*iter)->Reset();
    }
}

/**
 * @brief Starts jump camera sequence by scaling the given duration by 4/3.
 *
 * @param time Jump camera duration in seconds.
 */
void CameraAI::Director::JumpStart(float time) {
    this->mJumpTime = time * 1.3333334f;
}

/**
 * @brief Ends the jumping camera sequence if the jump timer is below 1.0s.
 */
void CameraAI::Director::EndJumping() {
    if (this->mJumpTime < 1.0f) {
        this->mJumpTime = -1.0f;
    }
}

/**
 * @brief Ends pursuit start camera sequence if pursuit timer is below 2.0s.
 */
void CameraAI::Director::EndPursuitStart() {
    if (this->mPursuitStartTime < 2.0f) {
        this->mPursuitStartTime = -1.0f;
    }
}

/**
 * @brief Releases the camera action.
 */
void CameraAI::Director::ReleaseAction() {
    if (this->mAction != nullptr) {
        delete this->mAction;
        this->mAction = nullptr;
    }
}

/**
 * @brief Resets the camera director.
 */
void CameraAI::Director::Reset() {
    ReleaseAction();
    this->mDesiredMode = Attrib::StringKey();
    this->mPrepareToEnableIce = false;
    this->mPursuitStartTime = -1.0f;
    this->mJumpTime = -1.0f;
    this->mIsCinematicMomement = false;
    this->mCinematicSlowdownSeconds = 0.0f;
}

/**
 * @brief Starts totaled camera sequence.
 */
void CameraAI::Director::TotaledStart() {
}

/**
 * @brief Gets the camera mover.
 */
CameraMover *CameraAI::Director::GetMover() {
    if (this->mAction != nullptr) {
        return this->mAction->GetMover();
    }
    return nullptr;
}

/**
 * @brief Handles totaled camera logic for the given player.
 */
void CameraAI::MaybeDoTotaledCam(IPlayer *iplayer) {
    const CameraAI::Director::List &directors = UTL::Collections::Listable<CameraAI::Director, 2>::GetList();
    for (CameraAI::Director::List::const_iterator iter = directors.begin(); iter != directors.end(); ++iter) {
        Director *director = *iter;
        if (director != nullptr) {
        }
    }
}

/**
 * @brief Cancels or ends active pursuit start camera sequence for the specified view if director exists.
 *
 * @param id View ID identifying the camera director.
 */
void CameraAI::MaybeKillPursuitCam(unsigned int id) {
    Director *cd = FindDirector(id);
    if (cd != nullptr) {
        cd->EndPursuitStart();
    }
}

/**
 * @brief Cancels or ends active jump camera sequence for the specified view if director exists.
 *
 * @param id View ID identifying the camera director.
 */
void CameraAI::MaybeKillJumpCam(unsigned int id) {
    Director *cd = FindDirector(id);
    if (cd != nullptr) {
        cd->EndJumping();
    }
}
