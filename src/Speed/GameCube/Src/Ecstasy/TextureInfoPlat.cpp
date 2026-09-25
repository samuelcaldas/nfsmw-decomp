#include "Speed/Indep/Src/Ecstasy/Texture.hpp"
#include "TextureInfoPlat.hpp"

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
