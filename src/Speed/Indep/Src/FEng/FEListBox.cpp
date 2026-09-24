#include "Speed/Indep/Src/FEng/FEListBox.h"
#include "Speed/Indep/Src/FEng/FEMath.h"
#include "Speed/Indep/Src/FEng/FETypes.h"
#include "Speed/Indep/Src/FEng/FEWideString.h"
#include "Speed/Indep/Src/FEng/FEngStandard.h"

FEListBox::FEListBox()
    : mulFlags(FELISTBOX_FLAGS_DONTWRAP), //
      mulNumColumns(0),                   //
      mulNumRows(0),                      //
      mstViewDimensions(0.0f),            //
      mstCurrentLocation(0.0f),           //
      mpstColumnData(nullptr),            //
      mpstRowData(nullptr),               //
      mstSelectionSpeed(1.0f),            //
      mulCurrentColumn(0),                //
      mulCurrentRow(0),                   //
      mpstCells(nullptr),                 //
      mstTargetLocation(0.0f),            //
      mstDirection(0.0f),                 //
      mfCurrentAlpha(1.0f),               //
      mfAlphaDelta(-1.0f / 720.0f) {
    Type = FE_List;
}

FEListBox::~FEListBox() {
    Terminate();
}

void FEListBox::Terminate() {
    if (!(mulFlags & FELISTBOX_FLAGS_INITIALIZED)) {
        return;
    }
    mulFlags &= ~FELISTBOX_FLAGS_INITIALIZED;
    CleanupColumns();
    CleanupRows();
    CleanupCells();
}

void FEListBox::SetNumColumns(u32 ulNumColumns) {
    if (ulNumColumns == 0) {
        CleanupColumns();
        CleanupCells();
        return;
    }

    FEListEntryData *pstNewColumns = FNEW FEListEntryData[ulNumColumns];
    u32 ulNumCopy = 0;
    if (mulNumColumns != 0) {
        ulNumCopy = ulNumColumns;
        if (ulNumColumns > mulNumColumns) {
            ulNumCopy = mulNumColumns;
        }
        FEngMemCpy(pstNewColumns, mpstColumnData, ulNumCopy * sizeof(FEListEntryData));
        if (mpstColumnData != nullptr) {
            delete[] mpstColumnData;
        }
    }
    InitializeListEntry(pstNewColumns + ulNumCopy, ulNumColumns - ulNumCopy);

    u32 ulNumCells = ulNumColumns * mulNumRows;
    FEListBoxCell *pstCells = nullptr;
    if (ulNumCells != 0) {
        pstCells = FNEW FEListBoxCell[ulNumCells];
        if (mpstCells != nullptr) {
            for (u32 c = 0; c < mulNumRows; c++) {
                FEngMemCpy(pstCells + (c * ulNumColumns), mpstCells + (c * mulNumColumns), ulNumCopy);
                InitializeCell(pstCells + (c * ulNumColumns) + ulNumCopy, ulNumColumns - ulNumCopy);
            }
            if (mpstCells != nullptr) {
                delete[] mpstCells;
            }
        } else {
            InitializeCell(pstCells, ulNumCells);
        }
    }
    mulNumColumns = ulNumColumns;
    mpstColumnData = pstNewColumns;
    mpstCells = pstCells;
}

void FEListBox::SetNumRows(u32 ulNumRows) {
    if (ulNumRows == 0) {
        CleanupRows();
        CleanupCells();
        return;
    }

    FEListEntryData *pstNewRows = FNEW FEListEntryData[ulNumRows];
    u32 ulNumCopy = 0;
    if (mulNumRows != 0) {
        ulNumCopy = ulNumRows;
        if (ulNumRows > mulNumRows) {
            ulNumCopy = mulNumRows;
        }
        FEngMemCpy(pstNewRows, mpstRowData, ulNumCopy * sizeof(FEListEntryData));
        if (mpstRowData != nullptr) {
            delete[] mpstRowData;
        }
    }
    InitializeListEntry(pstNewRows + ulNumCopy, ulNumRows - ulNumCopy);

    u32 ulNumCells = mulNumColumns * ulNumRows;
    FEListBoxCell *pstCells = nullptr;
    if (ulNumCells != 0) {
        pstCells = FNEW FEListBoxCell[ulNumCells];
        if (mpstCells != nullptr) {
            FEngMemCpy(pstCells, mpstCells, ulNumCopy * mulNumColumns);
            InitializeCell(pstCells + ulNumCopy * mulNumColumns, (ulNumRows - ulNumCopy) * mulNumColumns);
            if (mpstCells != nullptr) {
                delete[] mpstCells;
            }
        } else {
            InitializeCell(pstCells, ulNumCells);
        }
    }
    mulNumRows = ulNumRows;
    mpstRowData = pstNewRows;
    mpstCells = pstCells;
}

void FEListBox::SetCellType(u32 ulType) {
    FEListBoxCell *pstCell = GetPCellData(mulCurrentColumn, mulCurrentRow);
    if (pstCell->ulType != ulType) {
        if (pstCell->ulType == 2 && (pstCell->u.string.pStr != nullptr)) {
            delete[] pstCell->u.string.pStr;
            pstCell->u.string.pStr = nullptr;
        }
        pstCell->ulType = ulType;
    }
}

void FEListBox::SetCellString(const i16 *psString) {
    FEListBoxCell *pstCell = GetPCellData(mulCurrentColumn, mulCurrentRow);
    if (pstCell->u.string.pStr != nullptr) {
        delete[] pstCell->u.string.pStr;
        pstCell->u.string.pStr = nullptr;
    }
    if (psString == nullptr) {
        return;
    }
    u32 ulNewLength = (GetStringLength(psString) + 1);
    pstCell->u.string.pStr = FNEW i16[ulNewLength];
    FEngMemCpy(pstCell->u.string.pStr, psString, ulNewLength * sizeof(i16));
}

void FEListBox::IncrementCellByColumn() {
    mulCurrentColumn++;
    if (mulCurrentColumn >= mulNumColumns) {
        mulCurrentColumn = 0;
        mulCurrentRow++;
        if (mulCurrentRow >= mulNumRows) {
            mulCurrentRow = 0;
        }
    }
}

/**
 * @brief Scroll selection by column and row offsets.
 * @param lColumnNum Column scroll delta
 * @param lRowNum Row scroll delta
 */
void FEListBox::ScrollSelection(i32 lColumnNum, i32 lRowNum) {
    if ((mulFlags & FELISTBOX_FLAGS_SCROLLH) && (mulFlags & FELISTBOX_FLAGS_SCROLLV)) {
        return;
    }
    if (mulFlags & 0x20) {
        lColumnNum = 0;
    }
    if ((mulFlags & 0x40) != 0) {
        lRowNum = 0;
    }
    if (lColumnNum == 0) {
        if (lRowNum == 0) {
            return;
        }
    } else if ((mulFlags & 0x20) == 0) {
        int lColumn = mulCurrentColumn + lColumnNum;
        if (mulFlags & 4) {
            if (lColumn >= static_cast<i32>(mulNumColumns)) {
                lColumn = mulNumColumns - 1;
            }
            if (lColumn < 0) {
                lColumn = 0;
            }
            mulCurrentColumn = lColumn;
            mstTargetLocation.h = GetCurrentColumnData()->fCummulativeValue;
        } else {
            if (lColumn < 0) {
                int i = mulNumColumns + lColumn;
                float fCummulativeValue = GetColumnData(i)->fCummulativeValue;
                mstTargetLocation.h = fCummulativeValue;
                mstCurrentLocation.h = fCummulativeValue;
                do {
                    mstCurrentLocation.h = mstCurrentLocation.h + GetColumnData(i)->fValue;
                    int next = i + 1;
                    i = next - (next / mulNumColumns) * mulNumColumns;
                } while (i != mulCurrentColumn);
                mulFlags = mulFlags | FELISTBOX_FLAGS_WRAPH;
                mulCurrentColumn = static_cast<u32>(lColumn) - (static_cast<u32>(lColumn) / mulNumColumns) * mulNumColumns;
            } else if (lColumn >= static_cast<i32>(mulNumColumns)) {
                mstTargetLocation.h = mstCurrentLocation.h;
                int i = mulCurrentColumn;
                do {
                    int idx = i - (i / mulNumColumns) * mulNumColumns;
                    i = i + 1;
                    mstTargetLocation.h = mstTargetLocation.h + GetColumnData(idx)->fValue;
                } while (i != lColumn);
                mulFlags = mulFlags | FELISTBOX_FLAGS_WRAPH;
                mulCurrentColumn = static_cast<u32>(lColumn) - (static_cast<u32>(lColumn) / mulNumColumns) * mulNumColumns;
            } else {
                mulCurrentColumn = lColumn;
                mstTargetLocation.h = GetCurrentColumnData()->fCummulativeValue;
            }
        }

        u32 i = mulCurrentColumn;
        float fNewWidth = 0.0f;
        if (i < mulNumColumns) {
            do {
                fNewWidth = fNewWidth + mpstColumnData[i].fValue;
                i = i + 1;
            } while (i < mulNumColumns);
        }

        if ((mulFlags & 4) != 0) {
            if (fNewWidth < mstViewDimensions.h) {
                mstTargetLocation.h = mstTargetLocation.h - (mstViewDimensions.h - fNewWidth);
            }
        } else {
            if (fNewWidth < mstViewDimensions.h) {
                mulFlags = mulFlags | FELISTBOX_FLAGS_WRAPH;
            }
        }
        mulFlags = mulFlags | 0x20;
    }

    if (lRowNum != 0 && (mulFlags & 0x40) == 0) {
        int lRow = mulCurrentRow + lRowNum;
        if (mulFlags & 4) {
            if (lRow >= static_cast<i32>(mulNumRows)) {
                lRow = mulNumRows - 1;
            }
            if (lRow < 0) {
                lRow = 0;
            }
            mulCurrentRow = lRow;
            mstTargetLocation.v = GetCurrentRowData()->fCummulativeValue;
        } else {
            if (lRow < 0) {
                int i = mulNumRows + lRow;
                float fCummulativeValue = GetRowData(i)->fCummulativeValue;
                mstTargetLocation.v = fCummulativeValue;
                mstCurrentLocation.v = fCummulativeValue;
                do {
                    mstCurrentLocation.v = mstCurrentLocation.v + GetRowData(i)->fValue;
                    int next = i + 1;
                    i = next - (next / mulNumRows) * mulNumRows;
                } while (i != mulCurrentRow);
                mulFlags = mulFlags | FELISTBOX_FLAGS_WRAPH;
                mulCurrentRow = static_cast<u32>(lRow) - (static_cast<u32>(lRow) / mulNumRows) * mulNumRows;
            } else if (lRow >= static_cast<long>(mulNumRows)) {
                mstTargetLocation.v = mstCurrentLocation.v;
                int i = mulCurrentRow;
                do {
                    int idx = i - (i / mulNumRows) * mulNumRows;
                    i = i + 1;
                    mstTargetLocation.v = mstTargetLocation.v + GetRowData(idx)->fValue;
                } while (i != lRow);
                mulFlags = mulFlags | FELISTBOX_FLAGS_WRAPH;
                mulCurrentRow = static_cast<u32>(lRow) - (static_cast<u32>(lRow) / mulNumRows) * mulNumRows;
            } else {
                mulCurrentRow = lRow;
                mstTargetLocation.v = GetCurrentRowData()->fCummulativeValue;
            }
        }

        u32 i = mulCurrentRow;
        float fNewHeight = 0.0f;
        if (i < mulNumRows) {
            do {
                fNewHeight = fNewHeight + mpstRowData[i].fValue;
                i = i + 1;
            } while (i < mulNumRows);
        }

        if ((mulFlags & 4) != 0) {
            if (fNewHeight < mstViewDimensions.v) {
                mstTargetLocation.v = mstTargetLocation.v - (mstViewDimensions.v - fNewHeight);
            }
        } else {
            if (fNewHeight < mstViewDimensions.v) {
                mulFlags = mulFlags | 0x10;
            }
        }
        mulFlags = mulFlags | 0x40;
    }

    FEVector2 &obDirection = reinterpret_cast<FEVector2 &>(mstDirection);
    obDirection = reinterpret_cast<FEVector2 &>(mstTargetLocation) - reinterpret_cast<FEVector2 &>(mstCurrentLocation);
    mulFlags = mulFlags | FELISTBOX_FLAGS_SCROLL;
    float fLength = obDirection.Length();
    if (fLength < 0.1f) {
        CompleteScroll();
    } else {
        obDirection *= 1.0f / obDirection.Length();
    }
}

void FEListBox::Update(float fNumTicks) {
    mfCurrentAlpha = mfCurrentAlpha + mfAlphaDelta * fNumTicks;
    if (mfCurrentAlpha < 0.0f) {
        mfCurrentAlpha = 0.0f;
        mfAlphaDelta = -mfAlphaDelta;
    } else if (mfCurrentAlpha > 1.0f) {
        mfCurrentAlpha = 1.0f;
        mfAlphaDelta = -mfAlphaDelta;
    }
    if (!(mulFlags & FELISTBOX_FLAGS_SCROLL)) {
        return;
    }
    FEVector2 &obTargetLocation = reinterpret_cast<FEVector2 &>(mstTargetLocation);
    FEVector2 &obCurrentLocation = reinterpret_cast<FEVector2 &>(mstCurrentLocation);
    FEVector2 &obSpeed = reinterpret_cast<FEVector2 &>(mstSelectionSpeed);
    FEVector2 obDirection(reinterpret_cast<FEVector2 &>(mstDirection));
    FEVector2 obVelocity(obDirection);
    float fDot = obDirection.Dot(obSpeed);

    obVelocity *= FEngAbs(fDot) * fNumTicks;
    obCurrentLocation += obVelocity;
    if (obDirection.Dot(obTargetLocation) - obDirection.Dot(obCurrentLocation) < 0.0f) {
        CompleteScroll();
    }
}

void FEListBox::SetAutoWrap(bool bStopWrap) {
    if (bStopWrap) {
        mulFlags &= ~FELISTBOX_FLAGS_DONTWRAP;
    } else {
        mulFlags |= FELISTBOX_FLAGS_DONTWRAP;
    }
}

void FEListBox::InitializeListEntry(FEListEntryData *pstEntries, u32 ulNumEntries) {
    FEngMemSet(pstEntries, 0, ulNumEntries * sizeof(FEListEntryData));
}

void FEListBox::InitializeCell(FEListBoxCell *pstCells, u32 ulNumCells) {
    for (u32 i = 0; i < ulNumCells; i++) {
        pstCells[i].ulColor = 0xFFFFFFFF;
        pstCells[i].stScale = FEPoint(1.0f);
        pstCells[i].stResource.Set(0, 0, 0);
        pstCells[i].ulType = 0;
        pstCells[i].SetUV()(0.0f, 0.0f, 1.0f, 1.0f);
        pstCells[i].ulJustification = 0;
    }
}

void FEListBox::CleanupColumns() {
    if (mulNumColumns != 0) {
        delete[] mpstColumnData;
        mpstColumnData = nullptr;
        mulNumColumns = 0;
    }
}

void FEListBox::CleanupRows() {
    if (mulNumRows != 0) {
        delete[] mpstRowData;
        mpstRowData = nullptr;
        mulNumRows = 0;
    }
}

void FEListBox::CleanupCells() {
    u32 ulNumCells = mulNumRows * mulNumColumns;
    if (ulNumCells != 0) {
        for (u32 i = 0; i < ulNumCells; i++) {
            if (mpstCells[i].ulType == 2 && (mpstCells[i].u.string.pStr != nullptr)) {
                delete[] mpstCells[i].u.string.pStr;
                mpstCells[i].u.string.pStr = nullptr;
            }
        }

        delete[] mpstCells;
        mpstCells = nullptr;
    }
}

void FEListBox::RecalculateCummulative() {
    FEListEntryData *pstColumn = mpstColumnData;
    f32 fCurrent = 0.0f;
    for (u32 ulColumn = 0; ulColumn < mulNumColumns; ulColumn++) {
        pstColumn->fCummulativeValue = fCurrent;
        fCurrent += pstColumn->fValue;
        pstColumn++;
    }

    FEListEntryData *pstRow = mpstRowData;
    fCurrent = 0.0f;
    for (u32 ulRow = 0; ulRow < mulNumRows; ulRow++) {
        pstRow->fCummulativeValue = fCurrent;
        fCurrent += pstRow->fValue;
        pstRow++;
    }
}

void FEListBox::CompleteScroll() {
    mstCurrentLocation = mstTargetLocation;
    mulFlags &= ~(FELISTBOX_FLAGS_SCROLL | FELISTBOX_FLAGS_SCROLLH | FELISTBOX_FLAGS_SCROLLV);
    if (mulCurrentColumn == 0) {
        mulFlags &= ~FELISTBOX_FLAGS_WRAPH;
        mstCurrentLocation.h = 0.0f;
    }
    if (mulCurrentRow == 0) {
        mulFlags &= ~FELISTBOX_FLAGS_WRAPV;
        mstCurrentLocation.v = 0.0f;
    }
}
