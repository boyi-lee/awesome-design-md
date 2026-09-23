# Packaging Design OS

AI-native packaging workflow that turns product facts into research, package structure, dielines, artwork direction, mockups, validation, iteration, and controlled production release.

## End-to-end flow

```text
Product facts / images / PDF / PIM
  -> Intake contract
  -> Evidence check
  -> Reference research
  -> Structure routing
  -> Dieline generation/import
  -> Visual system + copy
  -> Mockup/prototype
  -> Deterministic validation
  -> AI review
  -> DIFF / ROOT CAUSE / PATCH
  -> Re-run affected stages
  -> Human release gate
  -> Production package
  -> Printer/retail feedback
  -> Promote repeated fixes into rules/tests/templates
```

## AI-native rules

1. Facts, assumptions, decisions, and unknowns are separate.
2. Every agent has an input/output contract.
3. Claims require evidence; unsupported claims are blocked.
4. Deterministic validation runs before subjective review.
5. The system routes to a packaging structure instead of assuming one.
6. Printer requirements live in reusable vendor profiles.
7. Compliance is a verified checklist, never AI-invented legal copy.
8. Production release is a distinct state and always requires human approval.
9. Every failed loop records root cause and patch.
10. Repeated defects are promoted into reusable system knowledge.

## Loop Engineering

```text
PLAN -> GENERATE -> VALIDATE -> REVIEW -> DIFF -> ROOT CAUSE -> PATCH -> RE-RUN
```

The objective is to fix the cause, not repeatedly change prompts until an output happens to look acceptable.

See:
- `docs/LOOP-ENGINEERING.md`
- `loop-engine/ROOT-CAUSE-TAXONOMY.md`

## Current modules

```text
packaging-os/
├── AGENTS.md
├── SKILL.md
├── DESIGN.md
├── adapters/
├── compliance/
│   └── taiwan/
├── docs/
├── examples/
│   └── W0987/
├── loop-engine/
├── outputs/
├── references/
├── schemas/
├── scripts/
├── structures/
├── templates/
├── tests/
└── vendors/
```

## Structure routing

`structures/STRUCTURE-REGISTRY.yaml` currently defines:
- header card: supported MVP
- folding carton: adapter required
- pouch: planned
- label: planned
- sleeve: planned

If production-critical inputs are missing, routing returns `BLOCKED` rather than inventing dimensions.

## Vendor profiles

Printer specifications belong in `vendors/*.yaml`. Unknown bleed, safe area, print profile, tolerances, or export requirements block production release.

See `vendors/vendor-profile.template.yaml`.

## Compliance

Compliance files are verification scaffolds, not legal advice. AI may identify missing fields, but it may not invent regulatory requirements or legal copy.

Current scaffold:
- `compliance/taiwan/household-product-checklist.yaml`

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

## Deterministic release gate

```bash
python packaging-os/scripts/release_gate.py \
  packaging-os/examples/W0987/job.yaml \
  packaging-os/vendors/vendor-profile.template.yaml
```

The W0987 demo is expected to be BLOCKED because it intentionally contains demonstration geometry and an unsupported claim. That is correct behavior, not a test failure.

## Quick start

```bash
python packaging-os/scripts/validate_job.py packaging-os/examples/W0987/job.yaml
python packaging-os/scripts/generate_header_card.py packaging-os/examples/W0987/job.yaml packaging-os/outputs/W0987-header-card.svg
python -m unittest discover packaging-os/tests
```

## Current boundary

The system can already demonstrate controlled header-card generation and validation. Folding-carton/Pouch/Label/Sleeve production geometry still requires adapters or future native generators. DXF/PDF production exporters and verified printer-specific profiles remain expansion modules.
