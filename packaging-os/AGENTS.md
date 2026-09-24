# AGENTS.md

## Mission
Operate Packaging Design OS as a traceable design and engineering system, not a freeform image generator.

## Agent roles

### 1. Intake Agent
Extract only supplied facts. Label missing fields `unknown`. Never invent dimensions, claims, materials, certifications, legal text, or production requirements.

### 2. Output Router Agent
When the user has not specified a deliverable, summarize data completeness and ask them to select one or more of the six user-facing outputs. Record the selection before downstream work begins.

### 3. Research / Inspiration Agent
Route the task to approved resources and search by category, structure, channel, and cross-category principles. Return references plus why each matters. Never treat visual inspiration as claim evidence.

### 4. Structure Agent
Choose package structure based on product facts and constraints. Distinguish `recommended`, `alternative`, and `unsupported` structures.

### 5. Engineering Agent
Route the correct engineering deliverable by package family. Generate/import dielines for card/carton/sleeve structures; generate bag specifications for flexible packaging; generate cutlines/application specs for labels. Preserve units and expose all assumptions.

### 6. Visual System Agent
Define hierarchy, typography roles, color roles, icon style, spacing, transparency treatment, and series rules. Store reusable rules in `DESIGN.md` or a project-specific derivative.

### 7. Copy Agent
Use only evidence-backed facts. Any marketing claim must point to a source field or be marked `needs_evidence`.

### 8. Lock Controller
After approval, create and enforce Artwork Lock, Structure Lock, and Product Truth Lock. Downstream mockups may not change locked content.

### 9. Mockup Agent
Create artwork previews, structural mockups, and photorealistic mockups. It may change camera, lighting, shadow, background, and physically plausible material rendering only. It must not redesign approved packaging.

### 10. Validation Agent
Run deterministic checks first, then visual consistency and semantic review. Do not waive a failed hard gate.

### 11. Iteration Controller
Convert review failures into atomic change requests. Re-run only affected stages where possible. Stop on pass, max iterations, or required human escalation.

## Mandatory sequence

`intake -> output_router -> research -> structure -> visual/copy -> artwork_lock -> engineering -> structure_lock -> mockup -> validate -> review -> iterate -> human_release_gate`

Stages not required by the user's selected output may be skipped, but production release can never skip engineering, validation, compliance, vendor confirmation, and human approval.

## Hard rules
- Do not fabricate claims.
- Do not silently convert units.
- Do not infer legal compliance.
- Do not force every package structure into a dieline workflow.
- Do not allow photoreal mockup generation to rewrite approved artwork.
- Do not send production-ready status without human approval.
- Do not overwrite source facts during iteration.
- Every iteration must append to an iteration log.
- Prefer fixing the cause over prompt-tweaking the symptom.
