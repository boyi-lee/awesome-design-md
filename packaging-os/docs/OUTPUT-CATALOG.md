# Output Catalog

Packaging Design OS exposes six user-facing output modes. Internal files are implementation details and should not be the primary menu shown to users.

## 1. Product Data整理
Produces structured facts, claims, evidence, assumptions, unknowns, and data-gap list.

Typical files:
- `job.yaml`
- evidence map
- missing-data report

## 2. Packaging Brief / Strategy
Produces positioning, target context, hierarchy, design direction, and constraints.

Typical files:
- `brief.md`
- information hierarchy
- reference/inspiration summary

## 3. Packaging Copy
Produces front/back copy, feature-benefit language, instructions, warnings, and unsupported-claim blocks.

Typical files:
- artwork copy specification
- claim/evidence map

## 4. Packaging Design
Produces flat artwork concept, front/back layout, visual system, and approved artwork preview.

Typical files:
- `DESIGN.md`
- front artwork preview
- back artwork preview
- artwork lock

## 5. Packaging Structure / Production Specification
Produces the engineering deliverable appropriate to the package family.

Examples:
- Header card -> dieline
- Folding carton -> dieline
- Sleeve -> dieline
- Pouch / polybag -> bag specification drawing
- Label -> cutline + application specification

Production geometry must never be invented.

## 6. Full Packaging Development
Runs the controlled end-to-end pipeline:

```text
Intake
-> Reference / Inspiration
-> Brief
-> Copy
-> Design
-> Artwork Lock
-> Engineering
-> Structure Lock
-> Mockup
-> Validation
-> Review
-> Iteration
-> Human Release Gate
```

## Maturity states
- `CONCEPT`
- `DESIGN_APPROVED`
- `ENGINEERING_READY`
- `PRODUCTION_READY`
- `RELEASED`
- `BLOCKED`

The status must be reported separately for design, structure, mockup, and production so a polished mockup is never mistaken for production readiness.
