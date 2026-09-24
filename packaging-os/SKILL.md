# Packaging Design OS Skill

## Trigger
Use when a task asks to create, redesign, evaluate, systematize, prototype, or prepare packaging from product information.

## Entry SOP
When the user provides product information without naming a deliverable, DO NOT immediately start designing.

1. Parse source facts, evidence, assumptions, and unknowns.
2. Summarize data completeness and production-critical gaps.
3. Ask the user which output(s) they want:
   - 1. Product data整理
   - 2. Packaging brief / strategy
   - 3. Packaging copy
   - 4. Packaging design
   - 5. Packaging structure / production specification
   - 6. Full packaging development
4. Record the choice in `output-request.yaml`.
5. Run only the modules required by the selected output.

For full packaging development, continue until the deepest stage supported by verified inputs. If production-critical inputs are missing, stop at the appropriate gate and return `BLOCKED` instead of inventing dimensions.

## Inputs
Minimum:
- SKU / product identifier
- Product name
- Product/material facts
- Available evidence/source material

Conditional:
- Product dimensions when relevant
- Existing package structure
- Brand assets
- Target channel / retail context
- Production constraints
- Printer/vendor requirements
- Desired references

## Workflow
1. Build `job.yaml` from source facts.
2. Run source/evidence check.
3. Run reference/inspiration sourcing when design or concept work is requested.
4. Route selected output(s).
5. Select package structure with rationale.
6. Route the correct engineering deliverable by structure:
   - folding carton / header card / sleeve -> dieline
   - pouch / polybag -> bag specification drawing
   - label -> cutline + application specification
7. Define packaging design system and front/back information hierarchy.
8. Produce artwork preview.
9. Lock approved artwork, structure, and product truth before mockup generation.
10. Create structural and/or photorealistic mockups without redesigning locked artwork.
11. Run deterministic validation.
12. Run visual consistency and AI review.
13. Create diff + root-cause + patch plan.
14. Iterate until gates pass or escalation is required.
15. Human approves release package.

## Reference / Inspiration Rules
- Search by same category, same structure, same channel, and cross-category visual principles.
- Extract reusable principles, not copied layouts.
- Record why each reference is relevant.
- Separate inspiration from evidence: visual inspiration cannot support factual product claims.

## Locks
Once approved, downstream stages must respect:
- `Artwork Lock`: logo, copy, typography, layout, icons, print zones.
- `Structure Lock`: package form, seams, holes, clear windows, dimensions.
- `Product Truth Lock`: product appearance, materials, features, approved claims.

Mockups may change camera, lighting, shadow, environment, and material rendering only.

## Outputs
Depending on selected output:
- `job.yaml`
- `output-request.yaml`
- `brief.md`
- packaging copy specification
- `DESIGN.md` or design tokens
- artwork preview(s)
- engineering deliverable: dieline / bag spec / cutline / structure spec
- structural mockup(s)
- photorealistic mockup(s)
- validation report
- review report
- iteration log
- release checklist

## States
- `CONCEPT`
- `DESIGN_APPROVED`
- `ENGINEERING_READY`
- `PRODUCTION_READY`
- `RELEASED`
- `BLOCKED`

## Done definition
A selected output is complete when its required gates pass. Production release requires verified geometry, vendor/printer requirements, compliance verification, and human approval.