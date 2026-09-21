void SmackableRender_Init();
void SmackableRender_Shutdown();
void SmackableRender_Service(float dT);
void ClearXenonEmitters();
void CarRender_Service(float dT);

namespace VehicleRenderConn {
void UpdateLoading();
}

class EmitterSystem {
public:
    void Update(float);
};
extern EmitterSystem gEmitterSystem;

class CAnimPlayer {
public:
    void UpdateTime(float);
};
extern CAnimPlayer TheAnimPlayer;

namespace RenderConn {

/**
 * @brief Initializes render services.
 */
void InitServices() {
    SmackableRender_Init();
}

/**
 * @brief Restores render services and clears emitters.
 */
void RestoreServices() {
    SmackableRender_Shutdown();
    ClearXenonEmitters();
}

/**
 * @brief Updates loading state for vehicle render connections.
 */
void UpdateLoading() {
    VehicleRenderConn::UpdateLoading();
}

/**
 * @brief Updates all render services per frame.
 * @param dT Delta time since last update.
 */
void UpdateServices(float dT) {
    SmackableRender_Service(dT);
    CarRender_Service(dT);
    gEmitterSystem.Update(dT);
    TheAnimPlayer.UpdateTime(dT);
}

} // namespace RenderConn
