#include "Speed/Indep/Src/Ecstasy/Texture.hpp"
#include "TextureInfoPlat.hpp"
#include "Speed/Indep/bWare/Inc/bSlotPool.hpp"

extern SlotPool *eAnimTextureSlotPool;

struct AnimDataInfo {
    void *ImageData;
    void *PaletteData;
};

void eInitTexture() {}

void eUnSwizzle8bitPalette(unsigned int *) {}

void eSwizzle8bitPalette(unsigned int *) {}

void TextureInfoPlatInterface::SetPlatInfo(TextureInfoPlatInfo *info) {
    this->PlatInfo = info;
}

void TextureInfoPlatInterface::Close() {}

void *TextureInfoPlatInterface::LockImage(TextureLockType) {
    return *(void **)((char *)this + 0x70);
}

void TextureInfoPlatInterface::UnlockImage(void *) {}

void *TextureInfoPlatInterface::CreateAnimData() {
    AnimDataInfo *data = (AnimDataInfo *)bOMalloc(eAnimTextureSlotPool);
    data->ImageData = *(void **)((char *)this + 0x70);
    data->PaletteData = *(void **)((char *)this + 0x74);
    return data;
}

void TextureInfoPlatInterface::ReleaseAnimData(void *anim_data) {
    bFree(eAnimTextureSlotPool, anim_data);
}

void TextureInfoPlatInterface::SetAnimData(void *anim_data) {
    AnimDataInfo *data = (AnimDataInfo *)anim_data;
    void *img = data->ImageData;
    TextureInfo *self = (TextureInfo *)this;
    TextureInfoPlatInfo *plat = this->PlatInfo;
    *(void **)((char *)this + 0x70) = img;
    *(void **)((char *)this + 0x74) = data->PaletteData;
    plat->SetImage(self);
}

bool TextureInfoPlatInfo::HasClut() {
    return (this->Format & 0x7FFFFFFF) - 8 <= 2;
}
