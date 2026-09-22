# Need for Speed: Most Wanted Decompilation Documentation

This directory contains technical documentation, decompilation status, architectural notes, and guidelines for the matching decompilation of Need for Speed: Most Wanted (primary target: GameCube USA Rev 0 `GOWE69`).

## Documentation Index

- [Decompiled Functions Ledger](decompiled_functions.md) — Comprehensive documentation of matched functions, signatures, subsystem locations, and compiler matching patterns.
- [Ralph Loop Automation](ralph_loop.md) — Documentation for automated iterative decompilation loops and safety controls.
- [Game Files & Setup](game_files.md) — Game disc layouts, SHA-1 checksums, and extraction instructions.
- [Getting Started](getting_started.md) — Toolchain bootstrap, build commands, and workflow setup.
- [Dependencies](dependencies.md) — Required system packages, toolchains, and emulator dependencies.
- [Splits Architecture](splits.md) — Slicing configuration, section boundaries, and symbol layout.
- [Symbols Reference](symbols.md) — Extracted symbol tables, types, and DWARF mappings.
- [Comment Sections](comment_section.md) — Behavior of `.comment` sections across SN Systems ProDG and GCC.
- [Common BSS Layout](common_bss.md) — Memory layout conventions for uninitialized data.

## Decompilation Standards

All decompiled C++ functions must:
1. Include full Doxygen docstrings (`@brief`, `@param`, `@return`).
2. Adhere to strict Object Calisthenics, fail-fast validations, and SOLID principles.
3. Pass zero-regression validation across all 571 units (`ninja -j1 changes`).
4. Be recorded with their demangled signature and address in `docs/decompiled_functions.md`.
