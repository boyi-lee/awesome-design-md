# Packaging Design OS

AI-native packaging workflow that turns product facts into controlled packaging strategy, artwork, engineering specifications, mockups, validation, iteration, and human-approved production release.

## What changed in v2

The B6827 raincoat test exposed three important system gaps:
1. The agent must ask what output the user wants before launching a full workflow.
2. Different package families require different engineering deliverables; not everything is a dieline.
3. Photoreal mockups must render approved artwork, not redesign it.

These are now first-class system rules.

## User-facing output menu

When product data is uploaded and no output is specified, the agent first summarizes the source and asks the user to choose one or more:

1. Product data整理
2. Packaging brief / strategy
3. Packaging copy
4. Packaging design
5. Packaging structure / production specification
6. Full packaging development

See `docs/USER-FLOW.md` and `docs/OUTPUT-CATALOG.md`.

## End-to-end flow

```text
Product facts / images / PDF / PIM
  -> Source Intake
  -> Evidence / Unknown split
  -> Output Router
  -> Reference / Inspiration sourcing
  -> Structure Router
  -> Packaging design + artwork preview
  -> Artwork / Structure / Product Truth locks
  -> Engineering deliverable
  -> Structural / photoreal mockup
  -> Deterministic + visual validation
  -> AI review
  -> DIFF / ROOT CAUSE / PATCH
  -> Re-run affected stages
  -> Human release gate
  -> Production package
  -> Printer / retail feedback
  -> Promote repeated fixes into rules / tests / templates
```

## Reference / Inspiration pipeline

Design work should search and synthesize references from:
- same category
- same package structure
- same retail / ecommerce channel
- cross-category visual principles

References are used to extract principles, not copy layouts. Inspiration is never evidence for factual product claims.

See `references/REFERENCE-SOURCING.md`.

## Structure routing

Engineering output is routed by package family:

| Structure | Engineering output |
|---|---|
| Header card | Dieline |
| Folding carton | Dieline |
| Sleeve | Dieline |
| Pouch / polybag | Bag specification drawing |
| Label | Cutline + application specification |

Flexible packaging therefore uses bag specifications for dimensions, seals, holes, windows, print areas, and artwork placement instead of being forced into carton-style dieline logic.

See:
- `structures/STRUCTURE-REGISTRY.yaml`
- `structures/flexible-pouch.yaml`
- `docs/STRUCTURE-ROUTING.md`

## Mockup pipeline

Mockups have three distinct levels:
1. Artwork Preview
2. Structural Mockup
3. Photorealistic Mockup

Photoreal mockups may change camera, lighting, shadow, background, and physically plausible material rendering. They may not change approved logo, copy, layout, structure, transparent areas, product truth, or claims.

See:
- `docs/MOCKUP-PIPELINE.md`
- `mockup/MOCKUP-CONTRACT.md`

## Locks

Downstream generation can be constrained by:
- Artwork Lock
- Structure Lock
- Product Truth Lock

Schema: `schemas/lock.schema.json`.

## AI-native rules

1. Facts, assumptions, decisions, and unknowns are separate.
2. Every agent has an input/output contract.
3. Claims require evidence; unsupported claims are blocked.
4. Deterministic validation runs before subjective review.
5. The system routes to a package structure instead of assuming one.
6. Engineering deliverables are routed by structure family.
7. Printer requirements live in reusable vendor profiles.
8. Compliance is a verified checklist, never AI-invented legal copy.
9. Production release is a distinct state and requires human approval.
10. Every failed loop records root cause and patch.
11. Repeated defects are promoted into reusable system knowledge.
12. Mockups are renderings of locked packaging, not a second design pass.

## Maturity states

- `CONCEPT`
- `DESIGN_APPROVED`
- `ENGINEERING_READY`
- `PRODUCTION_READY`
- `RELEASED`
- `BLOCKED`

Design, structure, mockup, and production readiness must be reported separately.

## Loop Engineering

```text
PLAN -> GENERATE -> VALIDATE -> REVIEW -> DIFF -> ROOT CAUSE -> PATCH -> RE-RUN
```

The objective is to fix the cause, not repeatedly change prompts until an output happens to look acceptable.

## Current modules

```text
packaging-os/
├── AGENTS.md
├── SKILL.md
├── DESIGN.md
├── adapters/
├── compliance/
├── docs/
├── examples/
├── loop-engine/
├── mockup/
├── outputs/
├── references/
├── schemas/
├── scripts/
├── structures/
├── templates/
├── tests/
└── vendors/
```

## Current implementation status

- Header Card: controlled SVG generator available.
- Flexible pouch: specification contract added; native bag-spec generator still planned.
- Folding carton / label / sleeve: routing defined, adapters still incomplete.
- Mockup locks and contracts: defined; automated visual-diff implementation remains future work.
- DXF / print-ready PDF exporters and verified printer-specific profiles remain expansion modules.

## B6827 regression case

`examples/B6827/` is retained as the flexible-packaging golden case. It should prevent regressions such as:
- routing a pouch into carton dieline logic
- inventing missing bag dimensions
- changing approved artwork during photoreal mockup generation
- adding unsupported product claims or accessories

## Production release

Design completion does not equal print approval.

A release requires:
- clean source/evidence state
- confirmed structure and production geometry
- confirmed vendor profile
- compliance verification
- hard gates passed
- human approval

See `docs/RELEASE-PROCESS.md`.
