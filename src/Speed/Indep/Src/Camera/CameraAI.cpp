#include "CameraAI.hpp"

CameraAI::Director *FindDirector(unsigned int id);

void CameraAI::Reset() {
    return;
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

