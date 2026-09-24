# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A matching decompilation of Need for Speed: Most Wanted supporting multiple console targets:
- `GOWE69`: GameCube USA Rev 0 (primary target; built with SN Systems ProDG 3.9.3 for game code, CodeWarrior for Dolphin SDK)
- `EUROPEGERMILESTONE`: Xbox 360 PAL Oct 21, 2005 prototype (built with MSVC for PPC)
- `SLES-53558-A124`: PS2 PAL Sep 20, 2005 prototype (Alpha 124; built with GCC 3.x for MIPS EE R5900)
- `SLUS-21351`: PS2 USA Black Edition

The repository uses [decomp-toolkit](https://github.com/encounter/decomp-toolkit) (`dtk`) for GameCube/Xbox slicing and [splat](https://github.com/ethteck/splat) for PS2.

## Build and Development Commands

### Configuration
`configure.py` generates `build.ninja` and `objdiff.json`.

```sh
# Configure default version (GOWE69)
python configure.py

# Configure specific platform/version
python configure.py --version GOWE69
python configure.py --version EUROPEGERMILESTONE
python configure.py --version SLES-53558-A124
python configure.py --version SLUS-21351

# Configure with map file generation and custom toolchain paths
python configure.py --map --version GOWE69 --binutils <path> --compilers <path>

# Build equivalent non-matching objects (defines -DNON_MATCHING)
python configure.py --non-matching
```

### Building
```sh
# Build all source objects
ninja
# or
ninja all_source

# Compile a specific object file
ninja build/GOWE69/src/Speed/Indep/SourceLists/zMain.o

# Download required toolchain binaries (dtk, objdiff-cli, wibo)
ninja tools
```

### Progress, Matching & Regression Testing
```sh
# Calculate current decompilation progress
ninja progress

# Create a baseline report for regression testing
ninja baseline

# Detect match regressions against the baseline
ninja changes

# Show all changes (including matching/non-matching diffs) against baseline
ninja changes_all

# Check for mismatching symbols in linked DOL (GameCube only)
ninja diff

# Apply symbols from linked ELF (GameCube only)
ninja apply
```

### Diffing
- **CLI Diffing (`objdiff-cli`)**: Run terminal diffs directly without the GUI:
  ```sh
  # Diff a specific unit's symbols and matching percentages
  build/tools/objdiff-cli diff -p . -u <unit_name>
  # Example:
  build/tools/objdiff-cli diff -p . -u "main/Speed/Indep/Libs/snd/9/source/library/cmn/saems"
  # Generate project-wide progress report JSON
  build/tools/objdiff-cli report generate -p .
  ```
- **GUI Diffing (`objdiff`)**: Run the `objdiff` GUI pointing to the repository root; it reads `objdiff.json` and updates live on file changes.

### decomp.me Context Generation
Generate preprocessed C/C++ context for creating scratches on [decomp.me](https://decomp.me) (Preset ID: 176 for GOWE69):
```sh
python tools/decompctx.py <path/to/source.cpp> -o ctx.c
```

### Reverse Engineering & Symbol Lookup Tools
- **Address to Line Mapping**: Look up exact original source file and line numbers for GameCube addresses:
  ```sh
  python tools/line_lookup.py symbols/debug_lines.txt <address>
  # Example: python tools/line_lookup.py symbols/debug_lines.txt 0x801AE820
  ```
- **DWARF Symbol Lookup**: Query types, structs, enums, functions, and globals from DWARF debug info:
  ```sh
  python tools/lookup.py symbols/Dwarf struct <StructName>
  python tools/lookup.py symbols/Dwarf enum <EnumName>
  python tools/lookup.py symbols/Dwarf function <AddressOrDemangledName>
  ```
- **Dump & Split DWARF Info**:
  ```sh
  ./build/tools/dtk dwarf dump ./orig/GOWE69/NFSMWRELEASE.ELF -o ./symbols/mw_dwarfdump.nothpp
  python tools/split_dwarf_info.py ./symbols/mw_dwarfdump.nothpp ./symbols/Dwarf
  ```

### Ralph Loop Automated Decompilation
- **Candidate Selection**: Pick non-matching functions ordered by highest match or smallest size:
  ```sh
  python scripts/next-decomp-candidate.py
  python scripts/next-decomp-candidate.py --strategy smallest
  python scripts/next-decomp-candidate.py --unit zFe
  ```
- **Autonomous Headless Runner**: Run iterative decompilation loop in background:
  ```sh
  ./scripts/ralph-decomp.sh --max-iterations 50
  ```
- **Interactive Session Runner**: Run Ralph loop within Claude Code using `/ralph-loop`:
  ```sh
  /ralph-loop "$(cat prompts/decomp-loop.md)" --completion-promise "FULL DECOMPILATION COMPLETE" --max-iterations 50
  ```
- See `docs/ralph_loop.md` for full state machine, safety controls, and configuration options.

### Formatting & Linting
- **C++ Formatting**: `clang-format -i <file>`  
  Configured in `.clang-format` (C++03, column limit 150, indent 4, `SortIncludes: Never`). Include sorting is disabled because include order in unity builds is semantic.
- **C++ Linting**: `clang-tidy <file>`  
  Configured in `.clang-tidy` (enforces `modernize-use-nullptr` and `readability-implicit-bool-conversion`).
- **Python Linting**: `flake8`  
  Configured in `.flake8` (ignores E203, E501).

### Dependencies & Initial Setup
- **Toolchain Bootstrap**: Running `python configure.py && ninja` automatically downloads necessary tools (`dtk`, `objdiff-cli`, `wibo`, compilers) to `build/tools/`, splits the original binary, and generates the full build graph.
- **Game Binaries**: Original binaries must be placed in `orig/<version>/` before splitting. See `docs/game_files.md` for full directory layouts, expected SHA-1 hashes, and verification commands.
- **Host Tools**: Linux/macOS requires `ninja` and `python3`. On Linux x86_64, `wibo` runs 32-bit Windows toolchains natively.
- **PS2 Tooling**: Requires `pip install -r requirements.txt` (splat64, spimdisasm, rabbitizer).

## Architecture & Code Organization

### Unity Build / SourceLists Model
The original game was compiled using unity compilation units ("SourceLists") located in `src/Speed/Indep/SourceLists/z*.cpp` (e.g., `zMain.cpp`, `zAI.cpp`, `zPhysics.cpp`, `zWorld.cpp`).
- Each `z*.cpp` `#include`s multiple underlying `.cpp` files from `src/Speed/Indep/Src/...`.
- `configure.py` defines object matching state via `Object(Matching, ...)` or `Object(NonMatching, ...)`.
- Matching objects compile the decompiled C++ source and link the generated object; non-matching objects link the original binary slices extracted from the game executable.

### Directory Structure
- `src/Speed/Indep/`: Platform-independent game engine code:
  - `Src/`: Engine subsystems (`AI`, `Animation`, `Camera`, `Debug`, `EAGL4Anim`, `EAXSound`, `Ecstasy` collision/geometry, `FEng` UI engine, `Frontend` menus, `Gamemodes`, `Gameplay`, `Generated` events/hashes, `Input`, `Interfaces`, `Lua`, `Main` game loop, `Math`, `Misc`, `Online`, `Physics` vehicle dynamics, `Render`, `Sim`, `Speech`, `World`).
  - `Libs/`: Subsystem support libraries (`Support/stlgc`, `allocator`, `csis`, `endian`, `path`, `realcore`, `snd`, `spch`).
  - `bWare/`: EA Black Box foundation framework and chunk loading system.
- `src/Speed/GameCube/`, `src/Speed/PSX2/`, `src/Speed/Xenon/`: Platform-specific implementations.
- `src/Packages/`: External EA packages (`eathread`, `xenonsdk`).
- `src/LibSN/`: SN Systems runtime support routines.
- `config/<version>/`:
  - `config.yml`: Slicer configuration for `dtk` or `splat`.
  - `splits.txt`: Slice boundaries across `.text`, `.data`, `.rodata`, `.bss`.
  - `symbols.txt`: Extracted symbol mappings (address, type, size, scope).
  - `build.sha1`: Expected SHA-1 checksums for matching build artifacts.
- `tools/`:
  - `project.py`: Core ninja build script generator invoked by `configure.py`.
  - `StringHash32.py`, `bHash.py`: Hashing utilities used for asset and event IDs.
  - `decompctx.py`, `decompctx2.py`: Header preprocessors for generating decomp.me contexts.
  - `attrib_generator.py`, `event_class_generator.py`: Code generators for attributes and event classes.
- `orig/<version>/`: Target original game binaries (e.g. `orig/GOWE69/NFSMWRELEASE.ELF`, `orig/SLES-53558-A124/NFS.ELF`). Never committed to git.

## Multi-Agent Orchestration & Ultracode Standards

### Active Peer Sessions Pool
The distributed decompilation team is organized across dedicated peer sessions:
- `@nfs1`: Unit focus (e.g., `zFe`, Frontend UI)
- `@nfs2`: Unit focus (e.g., `zEAXSound2`, Audio subsystems)
- `@nfs3`: Unit focus (e.g., `zWorld`, World and Collision)
- `@nfs4`: Unit focus (e.g., `zGameplay`, Game rules and Vault)
- `@nfs5`: Unit focus (e.g., `zPhysics`, Vehicle dynamics and Math)
- Orchestrator session (`nfs6` / `main`): Upstream integration, conflict resolution, global synchronization.

Coordination between sessions must occur via inter-session messaging (`SendMessage`). Before and after completing work in any worktree, sessions must rebase onto `origin/main` to incorporate peer commits.

### Ultracode Workflows & Fast Model Mandate
- **Keyword Activation:** Workflows are activated whenever the keyword `ultracode` is used.
- **Model Mandate:** All subagents and workflow tasks must strictly use `gemini-3.5-flash-lite` (via `agentType: 'decomp-worker'` or `model: gemini-3.5-flash-lite`).
- **Rationale:** `gemini-3.5-flash-lite` is exceptionally fast, lightweight, and cost-efficient for parallel instruction matching, iterative assembly diffing, and compile loops across concurrent worktrees.
- **Workflow Standardization:** Standardized workflow scripts reside in `scripts/workflows/` and must follow and reuse `scripts/workflows/standard-workflow.js`.
- **Operating Guidelines for Decomp Workers:**
  1. Always run in isolated git worktrees (`isolation: 'worktree'`).
  2. Verify toolchain symlinks (`orig`, `build/tools`, `build/compilers`, `build/ppc_binutils`).
  3. Inspect diff with `python3 tools/decomp-diff.py -u <unit> -d <symbol>`.
  4. Compile target object with `ninja build/GOWE69/<unit>.o`.
  5. Check for regressions with `ninja changes` before committing.
  6. Commit matching progress atomically: `git commit -m "match(<unit>): decompile <symbol>"`.
  7. Return structured results conforming to `DECOMP_SCHEMA`.
