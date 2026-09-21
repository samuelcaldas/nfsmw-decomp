#include "Speed/Indep/bWare/Inc/bChunk.hpp"
#include "Speed/Indep/Src/Ecstasy/Ecstasy.hpp"

bTList<eSolid> SolidList; // size: 0x8, address: 0x8045ED18, Decl: 23

/**
 * Clears the platform-specific solid state during unloading.
 *
 * @param chunk Chunk being unloaded.
 * @return One after the platform state is cleared.
 */
int eSolidPlatInterface::UnloaderPlatChunks(bChunk *chunk) {
    this->PlatInfo = nullptr;
    return 1;
}

/**
 * Fixes platform strip references after a solid is loaded.
 *
 * @return One after the strip table is fixed.
 */
int eSolidPlatInterface::FixPlatInfo() {
    this->PlatInfo->FixStripEntryTable(reinterpret_cast<eSolid *>(this), this->PlatInfo->StripDataStart, nullptr);
    return 1;
}

/**
 * Clears platform strip references before a solid is unloaded.
 *
 * @return One after the strip table is cleared.
 */
int eSolidPlatInterface::UnFixPlatInfo() {
    this->PlatInfo->FixStripEntryTable(reinterpret_cast<eSolid *>(this), nullptr, this->PlatInfo->StripDataStart);
    return 1;
}

int eLoadSolidListPlatChunks(bChunk *chunk) {
    bChunk *last_chunk = chunk->GetLastChunk();
    bChunk *current_chunk = chunk->GetFirstChunk();

    while (current_chunk < last_chunk) {
        current_chunk = current_chunk->GetNext();
    }
    return 1;
}

int eUnloadSolidListPlatChunks(bChunk *chunk) {
    bChunk *last_chunk = chunk->GetLastChunk();
    bChunk *current_chunk = chunk->GetFirstChunk();

    while (current_chunk < last_chunk) {
        current_chunk = current_chunk->GetNext();
    }
    return 1;
}
