# Packaging Design OS Skill

## Trigger
Use when a task asks to create, redesign, evaluate, systematize, or prepare packaging from product information.

## Inputs
Minimum:
- SKU / product identifier
- Product name
- Product dimensions when relevant
- Product/material facts
- Existing package structure if any
- Available evidence/source material

Optional:
- Brand assets
- Target channel / retail context
- Production constraints
- Printer/vendor requirements
- Desired references

## Workflow
1. Build `job.yaml` from source facts.
2. Run source/evidence check.
3. Research only through approved resource classes.
4. Select package structure with rationale.
5. Generate/import dieline.
6. Define packaging design system.
7. Produce front/back information hierarchy.
8. Create mockup/prototype.
9. Run deterministic validation.
10. Run AI review against rubric.
11. Create diff + patch plan.
12. Iterate until gates pass or escalation condition is met.
13. Human approves release package.

## Outputs
- `job.yaml`
- `brief.md`
- `DESIGN.md` or design tokens
- dieline (`.svg`, optionally `.dxf/.pdf` via adapter)
- artwork specification
- mockup(s)
- validation report
- review report
- iteration log
- release checklist

## Done definition
A job is complete only when all hard gates pass, soft-gate exceptions are documented, and human release approval exists.
