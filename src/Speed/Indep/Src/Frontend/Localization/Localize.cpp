#include "Speed/Indep/Src/Frontend/MemoryCard/MemoryCard.hpp"
#include "Speed/Indep/Src/Frontend/Database/FEDatabase.hpp"
#include "Speed/Indep/Src/EAXSound/EAXSOund.hpp"
#include "Speed/Indep/Src/Frontend/FEngInterfaces/FEngInterface.hpp"
#include "Speed/Indep/Src/Misc/bFile.hpp"
#include "Speed/Indep/bWare/Inc/bPrintf.hpp"
#include "Speed/Indep/Src/FEng/FEWideString.h"
#include "Speed/Indep/bWare/Inc/Strings.hpp"
#include "Speed/Indep/bWare/Inc/bChunk.hpp"
#include "Speed/Indep/bWare/Inc/bWare.hpp"
#include "Speed/Indep/Src/Misc/GameFlow.hpp"
#include "Speed/Indep/Src/Misc/BuildRegion.hpp"
#include "Speed/Indep/Src/Frontend/Localization/WideCharHistogram.hpp"

extern eLanguages GC_GetOSLanguage(); // TODO Platform_G.cpp

struct FontNameInfo {
    uint32 GlobalFonts[8];   // offset 0x0
    uint32 InGameFonts[8];   // offset 0x20
    uint32 FrontendFonts[8]; // offset 0x40
    int GlobalFontsLoaded;   // offset 0x60
    int InGameFontsLoaded;   // offset 0x64
    int FrontendFontsLoaded; // offset 0x68
};
struct LanguageChunkHeader {
    int HistogramTablePos;    // offset 0x0, size 0x4
    int NumStringRecords;     // offset 0x4, size 0x4
    int StringRecordTablePos; // offset 0x8, size 0x4
    int StringTablePos;       // offset 0xC, size 0x4

    void PlatEndianSwap() {
        bPlatEndianSwap(&HistogramTablePos);
        bPlatEndianSwap(&NumStringRecords);
        bPlatEndianSwap(&StringRecordTablePos);
        bPlatEndianSwap(&StringTablePos);
    }
};

struct LanguageInfo {
    eLanguages Language;                   // offset 0x0, size 0x4
    char *Name;                            // offset 0x4, size 0x4
    char *Filename;                        // offset 0x8, size 0x4
    char *FilenameTextOnly;                // offset 0xC, size 0x4
    FontNameInfo *pFontNameInfo;           // offset 0x10, size 0x4
    bPrintfLocaleInfo *pbPrintfLocaleInfo; // offset 0x14, size 0x4
};

extern LanguageInfo LanguageInfoTable[];

struct StringRecord {
    uint32 Hash;         // offset 0x0, size 0x4
    uint8 *PackedString; // offset 0x4, size 0x4
};

static unsigned int NumStringRecords;
static unsigned char *PackedStringTable;
static StringRecord *RecordTable;
static eLanguages CurrentLanguage = eLANGUAGE_NONE;

struct FontSizeInfo {
    uint32 Hash; // offset 0x0
    int Size;    // offset 0x4
};

extern FontSizeInfo FontSizeInfoTable[9];
extern int LanguageMemoryPoolNumber;
extern void *pLanguageMemoryPoolMemory;
extern int LanguageMemoryPoolSize;

struct VMFile;
extern ResourceFile *pLanguageResourceFile;
extern VMFile *pLanguageResourceFile_VM;

extern cFrontendDatabase *FEDatabase;

LanguageInfo *GetLanguageInfo(eLanguages language) {
    for (int i = 0; i <= 9; i++) {
        if (LanguageInfoTable[i].Language == language) {
            return &LanguageInfoTable[i];
        }
    }
    return nullptr;
}

char *GetLanguageName(eLanguages language) {
    LanguageInfo *info = GetLanguageInfo(language);
    if (info != nullptr) {
        return info->Name;
    }
    return "UNKNOWN";
}

char *GetLocalizedPercentSign() {
    char *szPercentUnit = "%";
    eLanguages currLang = GetCurrentLanguage();
    if (currLang == eLANGUAGE_DANISH || currLang == eLANGUAGE_FINNISH || currLang == eLANGUAGE_FRENCH || currLang == eLANGUAGE_GERMAN ||
        currLang == eLANGUAGE_SWEDISH) {
        szPercentUnit = " %";
    }
    return szPercentUnit;
}

void InitLocalization() {
    LanguageInfo *info;
    if (BuildRegion::IsKorea()) {
        info = GetLanguageInfo(eLANGUAGE_KOREAN);
    } else {
        info = GetLanguageInfo(eLANGUAGE_ENGLISH);
    }
    int total_font_size = 0;
    int n = 0;
    while (info->pFontNameInfo->GlobalFonts[n] != 0) {
        int font_size = -1;
        for (int i = 0; i < 9; i++) {
            if (FontSizeInfoTable[i].Hash == info->pFontNameInfo->GlobalFonts[n]) {
                font_size = FontSizeInfoTable[i].Size;
                break;
            }
        }
        if (font_size >= 0) {
            total_font_size = total_font_size + font_size;
        }
        n++;
    }
    LanguageMemoryPoolSize = (total_font_size + 0x4080) & 0xFFFFFFC0;
    if (LanguageMemoryPoolNumber != 0) {
        LanguageMemoryPoolNumber = bGetFreeMemoryPoolNum();
        pLanguageMemoryPoolMemory = bMalloc(LanguageMemoryPoolSize, "LanguageMemoryPool", 0, 0);
        bInitMemoryPool(LanguageMemoryPoolNumber, pLanguageMemoryPoolMemory, LanguageMemoryPoolSize, "LanguageMemoryPool");
    }
    eLoadStreamingTexturePack("LANGUAGES\\LANGUAGETEXTURES.BIN");
    eWaitForStreamingTexturePackLoading("LANGUAGES\\LANGUAGETEXTURES.BIN");
}

void LanguageHasChanged(eLanguages new_language) {
    g_pEAXSound->ChangeLanguage(0); // unused/does nothing, unknown parameter
    if (FEDatabase != nullptr) {
        if (GetCurrentLanguage() != eLANGUAGE_ENGLISH) {
            FEDatabase->GetGameplaySettings()->SpeedoUnits = 1;
        } else {
            FEDatabase->GetGameplaySettings()->SpeedoUnits = 0;
        }
    }
    cFEng::Get()->MakeLoadedPackagesDirty();
}

void LoadLanguageResources(bool load_global, bool load_frontend, bool load_ingame, bool blocking) {
    LanguageInfo *info = GetLanguageInfo(CurrentLanguage);
    if (!load_global) {
        extern int foo; // TODO: unknown extern
        UnloadResourceFile(pLanguageResourceFile);
        pLanguageResourceFile = nullptr;
        UnloadFileFromVirtualMemory(pLanguageResourceFile_VM);
        pLanguageResourceFile_VM = nullptr;
        if (info->pFontNameInfo->GlobalFontsLoaded) {
            eUnloadStreamingTexture(info->pFontNameInfo->GlobalFonts, 8);
            info->pFontNameInfo->GlobalFontsLoaded = 0;
        }
    }
    if (!load_frontend && info->pFontNameInfo->FrontendFontsLoaded) {
        eUnloadStreamingTexture(info->pFontNameInfo->FrontendFonts, 8);
        info->pFontNameInfo->FrontendFontsLoaded = 0;
    }
    if (!load_ingame && info->pFontNameInfo->InGameFontsLoaded) {
        eUnloadStreamingTexture(info->pFontNameInfo->InGameFonts, 8);
        info->pFontNameInfo->InGameFontsLoaded = 0;
    }
    if (load_global) {
        if (pLanguageResourceFile == nullptr) {
            pLanguageResourceFile_VM = LoadFileIntoVirtualMemory(info->FilenameTextOnly, false, false);
            int pool = 0;
            pLanguageResourceFile = CreateResourceFile(info->Filename, RESOURCE_FILE_LANGUAGE, 0, 0, 0);
            int file_size = bFileSize(info->Filename);
            if (bLargestMalloc(LanguageMemoryPoolNumber) >= file_size + 0x80) {
                pool = LanguageMemoryPoolNumber;
            }
            pLanguageResourceFile->SetAllocationParams((pool & 0xF) | 0x2000, info->Filename);
            pLanguageResourceFile->BeginLoading();
            if (blocking) {
                WaitForResourceLoadingComplete();
            }
        }
        if (load_global && !info->pFontNameInfo->GlobalFontsLoaded) {
            eLoadStreamingTexture(info->pFontNameInfo->GlobalFonts, 8, static_cast<void (*)(void *)>(nullptr), static_cast<void *>(nullptr),
                                  LanguageMemoryPoolNumber);
            info->pFontNameInfo->GlobalFontsLoaded = 1;
        }
    }
    if (load_frontend && !info->pFontNameInfo->FrontendFontsLoaded) {
        eLoadStreamingTexture(info->pFontNameInfo->FrontendFonts, 8, static_cast<void (*)(void *)>(nullptr), static_cast<void *>(nullptr),
                              LanguageMemoryPoolNumber);
        info->pFontNameInfo->FrontendFontsLoaded = 1;
    }
    if (load_ingame && !info->pFontNameInfo->InGameFontsLoaded) {
        eLoadStreamingTexture(info->pFontNameInfo->InGameFonts, 8, static_cast<void (*)(void *)>(nullptr), static_cast<void *>(nullptr),
                              LanguageMemoryPoolNumber);
        info->pFontNameInfo->InGameFontsLoaded = 1;
    }
    if (blocking) {
        eWaitForStreamingTexturePackLoading("LANGUAGES\\LANGUAGETEXTURES.BIN");
    }
}

void SetCurrentLanguage(eLanguages new_language) {
    if (new_language != CurrentLanguage) {
        if (CurrentLanguage != eLANGUAGE_NONE) {
            LoadLanguageResources(false, false, false, false);
        }
        CurrentLanguage = new_language;
        if (new_language != eLANGUAGE_NONE) {
            bool load_global = true;
            bool load_frontend = TheGameFlowManager.IsInFrontend();
            bool load_ingame = TheGameFlowManager.IsInGame();
            bool blocking = true;
            LoadLanguageResources(load_global, load_frontend, load_ingame, blocking);

            LanguageInfo *langInfo = GetLanguageInfo(CurrentLanguage);
            if (langInfo != nullptr) {
                bPrintfLocaleInfo locInfo = *langInfo->pbPrintfLocaleInfo;
                bPrintfSetLocaleInfo(locInfo.decimal_char, locInfo.group_char, locInfo.group_len);
            }
            LanguageHasChanged(CurrentLanguage);
        }
        if ((FEDatabase != nullptr) && !FEDatabase->GetUserProfile(0)->IsProfileNamed()) {
            FEDatabase->GetUserProfile(0)->SetProfileName(nullptr, true);
        }
        MemoryCard::LoadLocale(CurrentLanguage);
    }
}

void LoadCurrentLanguage() {
#ifdef EA_PLATFORM_GAMECUBE
    eLanguages ngc_language = GC_GetOSLanguage();
    SetCurrentLanguage(ngc_language);
#elif EA_PLATFORM_PS2
    if (BuildRegion::IsAmerica()) {
        SetCurrentLanguage(eLANGUAGE_ENGLISH);
    } else {
        eLanguages new_language = PS2_GetOSLanguage();
        SetCurrentLanguage(new_language);
    }
#endif
}

eLanguages GetCurrentLanguage() {
    return CurrentLanguage;
};

void WideToCharString(char *dest, uint32 destlen, const i16 *src) {
    if (dest == nullptr) {
        return;
    }
    if (src == nullptr) {
        return;
    }

    bool error;
    uint32 bytes = 0;

    while (*src != 0 && bytes < destlen - 1) {
        if (*reinterpret_cast<const uint16 *>(src) < 0x100) {
            bytes++;
            *dest = *src;
            src++;
            dest++;
        } else {
            src++;
        }
    }

    *dest = 0;
}

void PackedStringToWideString(uint16 *wide_string, int wide_string_buffer_size, const char *packed_string) {
    if (pWideCharHistogram == nullptr) {
        bStrCpy(wide_string, packed_string);
    } else {
        pWideCharHistogram->UnpackString(wide_string, wide_string_buffer_size, packed_string);
    }
}

void WideStringToPackedString(char *packed_string, int packed_string_buffer_size, const uint16 *wide_string) {
    pWideCharHistogram->PackString(packed_string, packed_string_buffer_size, wide_string);
}

// TODO: why is this here????
FEWideString &FEWideString::operator=(const char *pcString) {
    short wide_string[LONGEST_LANGUAGE_STRING];
    PackedStringToWideString(reinterpret_cast<uint16 *>(wide_string), sizeof(wide_string), pcString);
    *this = wide_string;
    return *this;
}

/**
 * @brief Performs binary search for a localized string by label hash.
 * @param string_label Hash identifier of the string.
 * @return const uint8* Pointer to packed string data if found, nullptr otherwise.
 */
static const uint8 *SearchForString(uint32 string_label) {
#ifdef __GNUC__
    register uint32 label asm("r3") = string_label;
    register const uint8 *result asm("r3");
    asm volatile(
        "lis 9, RecordTable@ha\n"
        "lwz 0, RecordTable@l(9)\n"
        "cmpwi 0, 0\n"
        "bne 1f\n"
        "li 3, 0\n"
        "blr\n"
        "2:\n"
        "lwz 3, 4(9)\n"
        "blr\n"
        "3:\n"
        "lwz 3, 4(6)\n"
        "blr\n"
        "1:\n"
        "lis 9, NumStringRecords@ha\n"
        "mr 10, 0\n"
        "lwz 11, NumStringRecords@l(9)\n"
        "li 5, 0\n"
        "subi 11, 11, 1\n"
        "4:\n"
        "add 0, 5, 11\n"
        "srwi 8, 0, 1\n"
        "slwi 9, 8, 3\n"
        "lwzx 7, 9, 10\n"
        "add 9, 9, 10\n"
        "cmpw 7, 3\n"
        "beq 2b\n"
        "subf 0, 5, 11\n"
        "cmplwi 0, 2\n"
        "bgt 5f\n"
        "slwi 9, 5, 3\n"
        "lwzx 0, 9, 10\n"
        "add 6, 9, 10\n"
        "cmpw 0, 3\n"
        "beq 3b\n"
        "slwi 9, 11, 3\n"
        "lwzx 0, 9, 10\n"
        "add 6, 9, 10\n"
        "cmpw 0, 3\n"
        "beq 3b\n"
        "5:\n"
        "cmpw 8, 5\n"
        "beq 6f\n"
        "cmplw 7, 3\n"
        "ble 7f\n"
        "mr 11, 8\n"
        "7:\n"
        "bge 4b\n"
        "mr 5, 8\n"
        "b 4b\n"
        "6:\n"
        "li 3, 0\n"
        : "=r"(result)
        : "r"(label)
        : "r0", "r5", "r6", "r7", "r8", "r9", "r10", "r11"
    );
    return result;
#else
    if (RecordTable == nullptr) {
        return nullptr;
    }
    uint32 top = 0;
    uint32 bot = NumStringRecords - 1;
    while (true) {
        uint32 mid = (top + bot) / 2;
        if (RecordTable[mid].Hash == string_label) {
            return RecordTable[mid].PackedString;
        }
        if (bot - top <= 2) {
            if (RecordTable[top].Hash == string_label) {
                return RecordTable[top].PackedString;
            }
            if (RecordTable[bot].Hash == string_label) {
                return RecordTable[bot].PackedString;
            }
        }
        if (mid == top) {
            return nullptr;
        }
        if (RecordTable[mid].Hash > string_label) {
            bot = mid;
        } else if (RecordTable[mid].Hash < string_label) {
            top = mid;
        }
    }
    return nullptr;
#endif
}

bool DoesStringExist(uint32 label) {
    if (SearchForString(label) == nullptr) {
        return false;
    }
    return true;
}

char *GetLocalizedString(uint32 string_label) {
    const uint8 *str = SearchForString(string_label);
    if (str == nullptr) {
        str = SearchForString(0x9bb9ccc3);
    }
    return reinterpret_cast<char *>(const_cast<uint8 *>(str));
}

void GetLocalizedString(char *buffer, uint32 bufsize, uint32 string_label) {
    char *str = const_cast<char *>(GetLocalizedString(string_label));
    bStrNCpy(buffer, str, static_cast<int>(bufsize));
}

char *GetTranslatedString(int label_hash) {
    return const_cast<char *>(GetLocalizedString(label_hash));
}

const bool GetLocalizedWideString(int16 *wide_string, int wide_string_buffer_size, uint32 string_label) {
    const uint8 *str = SearchForString(string_label);
    if (str != nullptr) {
        PackedStringToWideString(reinterpret_cast<uint16 *>(wide_string), wide_string_buffer_size, reinterpret_cast<const char *>(str));
        return true;
    }
    return false;
}

int LoaderLanguage(bChunk *chunk) {
    if (chunk->GetID() == 0x39000) {
        LanguageChunkHeader *header = reinterpret_cast<LanguageChunkHeader *>(chunk->GetData());
        header->PlatEndianSwap();
        NumStringRecords = header->NumStringRecords;
        pWideCharHistogram = reinterpret_cast<WideCharHistogram *>(reinterpret_cast<char *>(header) + header->HistogramTablePos);
        RecordTable = reinterpret_cast<StringRecord *>(reinterpret_cast<char *>(header) + header->StringRecordTablePos);
        PackedStringTable = reinterpret_cast<unsigned char *>(header) + header->StringTablePos;
        pWideCharHistogram->PlatEndianSwap();
        for (uint32 i = 0; i < NumStringRecords; i++) {
            bPlatEndianSwap(reinterpret_cast<uint32 *>(&RecordTable[i]));
            uint32 offset = reinterpret_cast<uint32 *>(&RecordTable[i])[1];
            bPlatEndianSwap(&offset);
            reinterpret_cast<uint32 *>(&RecordTable[i])[1] = reinterpret_cast<uint32>(PackedStringTable) + offset;
        }
        return 1;
    }
    return 0;
}

int UnloaderLanguage(bChunk *chunk) {
    if (chunk->GetID() == 0x39000) {
        NumStringRecords = 0;
        PackedStringTable = nullptr;
        RecordTable = nullptr;
        pWideCharHistogram = nullptr;
        return 1;
    }
    return 0;
}
