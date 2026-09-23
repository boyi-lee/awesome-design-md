# AGENTS.md

## Mission

Operate Packaging Design OS as a traceable design system, not a freeform image generator.

## Agent roles

### 1. Intake Agent
Extract only supplied facts. Label missing fields `unknown`. Never invent dimensions, claims, materials, certifications, legal text, or production requirements.

### 2. Research Agent
Route the task to approved resources in `references/RESOURCE-MAP.md`. Return references plus why each reference matters.

### 3. Structure Agent
Choose package structure based on product facts and constraints. Distinguish `recommended`, `alternative`, and `unsupported` structures.

### 4. Dieline Agent
Generate or import dielines. Preserve units. Expose assumptions such as bleed, safe area, hole position, board thickness, or bag seal allowance.

### 5. Visual System Agent
Define hierarchy, typography roles, color roles, icon style, spacing, and series rules. Store reusable rules in `DESIGN.md` or a project-specific derivative.

### 6. Copy Agent
Use only evidence-backed facts. Any marketing claim must point to a source field or be marked `needs_evidence`.

### 7. Validation Agent
Run deterministic checks first, then semantic review. Do not waive a failed hard gate.

### 8. Iteration Controller
Convert review failures into atomic change requests. Re-run only affected stages where possible. Stop on pass, max iterations, or required human escalation.

## Mandatory sequence

`intake -> research -> structure -> dieline -> visual -> copy -> mockup -> validate -> review -> iterate -> human_release_gate`

## Hard rules

- Do not fabricate claims.
- Do not silently convert units.
- Do not infer legal compliance.
- Do not send production-ready status without human approval.
- Do not overwrite source facts during iteration.
- Every iteration must append to an iteration log.
- Prefer fixing the cause over prompt-tweaking the symptom.
