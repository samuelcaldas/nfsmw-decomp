# Implementation Plan: Add Idempotent Anti-Slop Guardrails for Decompilation Workflows

## Context
To maintain 100% binary parity and prevent AI-generated "slop" (fake matches, hardcoded offsets, random renaming, and other shortcut anti-patterns), we need to formalize strict anti-slop guardrails across all decompilation agents, prompts, and workflow templates.

## Proposed Changes
1. **Agent Definition (`.claude/agents/decomp-worker.md`)**:
   - Add a dedicated **Anti-Slop Guardrails** section enumerating prohibited anti-patterns (forced register assignment, pointer offset struct access, random string/float replacement, variable renaming, duplicate re-implementations with include guards, redundant function redeclarations, and unnecessary casts).
   - Enforce strict adherence to original DWARF types, symbol names, and compiler idioms.

2. **Autonomous Loop Prompt (`prompts/decomp-loop.md`)**:
   - Integrate anti-slop guardrails into Step 3 (Implementation & Diff Refinement Loop) and Section 6 (Guardrails & Non-Negotiable Rules).
   - Mandate that matching must be achieved via correct control flow, types, and compiler matching rather than artificial hacks.

3. **Standard Workflow Template (`scripts/workflows/standard-workflow.js`)**:
   - Add validation prompts / instructions in workflow agent prompts requiring verification against anti-slop rules before commits.

## Verification
- Run `ninja` and `ninja changes` to verify 0 regressions and strict adherence to matching criteria.
- Review updated files for completeness.
