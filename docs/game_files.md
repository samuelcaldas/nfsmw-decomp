# Game Files & Binaries Setup

This document lists all original executable binaries and assets required for building and reverse engineering each supported version of Need for Speed: Most Wanted.

This repository does **not** distribute game binaries or assets. You must dump or extract them from an authentic game copy or prototype build.

---

## Directory Layout in `orig/`

Place the original game files according to the following layout:

```
orig/
├── EUROPEGERMILESTONE/
│   └── NfsMWEuropeGerMilestone.xex      # Xbox 360 PAL Prototype executable
├── GOWE69/
│   ├── NFSMWRELEASE.ELF                 # GameCube Debug ELF (contains DWARF debug symbols)
│   └── sys/
│       └── main.dol                     # GameCube DOL binary (sliced & matched during build)
├── SLES-53558-A124/
│   └── NFS.ELF                          # PS2 PAL Alpha 124 Prototype executable
└── SLUS-21351/
    └── SLUS_213.51                      # PS2 USA Black Edition retail executable
```

---

## Supported Versions

### 1. GameCube USA Rev 0 (`GOWE69`)
*Target Directory:* `orig/GOWE69/`

| File | Required | Expected SHA-1 Hash | Description |
| :--- | :---: | :--- | :--- |
| **`orig/GOWE69/sys/main.dol`** | **Yes** | `9619ba57c9919f95f7f2ac951a2166a3517f91e3` | **Target Executable**: The GameCube DOL binary sliced by `dtk` and linked against during matching builds. |
| **`orig/GOWE69/NFSMWRELEASE.ELF`** | *Recommended* | *(Debug build)* | **Debug ELF with DWARF1**: Contains complete function names, inlines, variable names, and line mappings. |

#### Usage & Conversion:
- **Convert ELF to DOL:** If you only possess `NFSMWRELEASE.ELF`, generate `sys/main.dol` with:
  ```sh
  ./build/tools/dtk elf2dol ./orig/GOWE69/NFSMWRELEASE.ELF ./orig/GOWE69/sys/main.dol
  ```
- **Dump DWARF symbols:** Extract full DWARF information into `symbols/`:
  ```sh
  ./build/tools/dtk dwarf dump ./orig/GOWE69/NFSMWRELEASE.ELF -o ./symbols/mw_dwarfdump.nothpp
  python tools/split_dwarf_info.py ./symbols/mw_dwarfdump.nothpp ./symbols/Dwarf
  ```
- **Reverse Engineering:** Import `orig/GOWE69/NFSMWRELEASE.ELF` into Ghidra.

---

### 2. Xbox 360 PAL Prototype (`EUROPEGERMILESTONE`)
*Target Directory:* `orig/EUROPEGERMILESTONE/`

| File | Required | Expected SHA-1 Hash | Description |
| :--- | :---: | :--- | :--- |
| **`orig/EUROPEGERMILESTONE/NfsMWEuropeGerMilestone.xex`** | **Yes** | `e032bccf5a246644b734218e753347cd7c75ac42` | **Target XEX Executable**: Extracted from the Oct 21, 2005 Xbox 360 PAL prototype disc. |

#### Usage:
- In prototype dumps, this file is often named `NfsMWEuropeGerMilestone.exe` or `default.xex`. Rename it to `NfsMWEuropeGerMilestone.xex` before copying it to `orig/EUROPEGERMILESTONE/`.

---

### 3. PlayStation 2 PAL Alpha 124 Prototype (`SLES-53558-A124`)
*Target Directory:* `orig/SLES-53558-A124/`

| File | Required | Expected SHA-1 Hash | Description |
| :--- | :---: | :--- | :--- |
| **`orig/SLES-53558-A124/NFS.ELF`** | **Yes** | `d01ad0bca1f88e1261cfaba35fccdbb8fba38d80` | **Target PS2 ELF**: Extracted from the Sep 20, 2005 PS2 PAL prototype (Alpha 124) disc. |

#### Usage:
- Sliced by `splat` into assembly and object units for matching builds and progress calculation.
- Can be imported directly into Ghidra (`ghidra import ./orig/SLES-53558-A124/NFS.ELF`).

---

### 4. PlayStation 2 USA Black Edition (`SLUS-21351`)
*Target Directory:* `orig/SLUS-21351/`

| File | Required | Expected SHA-1 Hash | Description |
| :--- | :---: | :--- | :--- |
| **`orig/SLUS-21351/SLUS_213.51`** | **Yes** | `60289f3f8b643822a302720f9649ddc4ba55034b` | **Target PS2 Executable**: Extracted from the root directory of the retail PS2 DVD. |

#### Usage:
- Copy the file as `SLUS_213.51` (note the underscore and dot).
- Sliced by `splat` into relocatable units for matching builds and progress tracking.

---

## Verifying Hashes

You can verify that your placed files match the expected hashes using `sha1sum`:

```sh
sha1sum orig/GOWE69/sys/main.dol
# Expected: 9619ba57c9919f95f7f2ac951a2166a3517f91e3

sha1sum orig/EUROPEGERMILESTONE/NfsMWEuropeGerMilestone.xex
# Expected: e032bccf5a246644b734218e753347cd7c75ac42

sha1sum orig/SLES-53558-A124/NFS.ELF
# Expected: d01ad0bca1f88e1261cfaba35fccdbb8fba38d80

sha1sum orig/SLUS-21351/SLUS_213.51
# Expected: 60289f3f8b643822a302720f9649ddc4ba55034b
```
