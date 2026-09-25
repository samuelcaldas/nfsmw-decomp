# Implementation Plan: Add Idempotent Anti-Slop Guardrails for Decompilation Workflows

## Context
To maintain 100% binary parity and prevent AI-generated "slop" (fake matches, hardcoded offsets, random renaming, and other shortcut anti-patterns), we need to formalize strict anti-slop guardrails across all decompilation agents, prompts, and workflow templates.

## Tasks

### Task 1: Update Agent Definition (`.claude/agents/decomp-worker.md`)
- **Files**: `.claude/agents/decomp-worker.md`
- **Steps**:
  1. Add a dedicated **Anti-Slop Guardrails** section enumerating prohibited anti-patterns (forced register assignment hacks, pointer offset struct access bypassing types, random string/float/constant replacement, arbitrary variable renaming, duplicate re-implementations with include guards, redundant function redeclarations, and unnecessary type casts).
  2. Enforce strict adherence to original DWARF types, symbol names, and compiler idioms.
- **Commit**: `docs(agent): add anti-slop guardrails to decomp-worker agent definition`

### Task 2: Update Autonomous Loop Prompt (`prompts/decomp-loop.md`)
- **Files**: `prompts/decomp-loop.md`
- **Steps**:
  1. Integrate anti-slop guardrails into Step 3 (Implementation & Diff Refinement Loop) and Section 6 (Guardrails & Non-Negotiable Rules).
  2. Mandate that matching must be achieved via correct control flow, types, and compiler matching rather than artificial hacks.
- **Commit**: `docs(prompts): integrate anti-slop guardrails into autonomous decomp loop prompt`

### Task 3: Update Standard Workflow Template (`scripts/workflows/standard-workflow.js`)
- **Files**: `scripts/workflows/standard-workflow.js`
- **Steps**:
  1. Add validation instructions and anti-slop rule checks in `makeDecompPrompt()` so workers verify against anti-slop rules before commits.
- **Commit**: `refactor(workflow): add anti-slop guardrails to standard decomp workflow template`
