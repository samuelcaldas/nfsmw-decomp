#include "Speed/Indep/Src/Ecstasy/Ecstasy.hpp"
#include "Speed/Indep/Src/World/VisualTreatment.h"

struct IVisualTreatmentPlat : public IVisualTreatment {
    IVisualTreatmentPlat();
    ~IVisualTreatmentPlat();

    void SetupCaptureTextures();
    void RenderMWVisualLook(eView *view);
    void UpdateIndirectTexture();
};

extern IVisualTreatmentPlat *pVisualTreatmentPlat;

/**
 * @brief Returns the active platform visual-treatment object.
 * @return The platform visual-treatment object.
 */
IVisualTreatment *IVisualTreatment::Get() {
    return pVisualTreatmentPlat;
}
