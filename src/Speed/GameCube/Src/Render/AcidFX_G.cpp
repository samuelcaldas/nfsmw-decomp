#include "Speed/GameCube/Src/G.hpp"

#include "Speed/Indep/Src/Ecstasy/Texture.hpp"

void eSetTexture(TextureInfo *texture_info, int slot);
void eSetBlendMode(TextureInfo *texture_info, unsigned char opt);
void afxBeginBillboardedParticles(eView *view);

int afxBeginBillboardedParticleBatch(TextureInfo *texture_info) {
    eSetTexture(texture_info, 0);
    eSetBlendMode(texture_info, 0);
    return 1;
}

int afxEndBillboardedParticleBatch(TextureInfo *texture_info, float f, int i);
int afxEndBillboardedParticles();

int afxEndBillboardedParticleBatch(TextureInfo *, float, int) { return 1; }

int afxEndBillboardedParticles() { return 1; }

int PlatStartParticleRender(eView *view, TextureInfo *texture_info, unsigned int flags) {
    afxBeginBillboardedParticles(view);
    afxBeginBillboardedParticleBatch(texture_info);
    return 1;
}

void PlatEndParticleRender() {
    afxEndBillboardedParticleBatch(0, 0.0f, 0);
    afxEndBillboardedParticles();
}
