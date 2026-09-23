# Packaging Design OS

AI-native packaging design workflow that turns product facts into research, structure, artwork direction, dielines, mockups, validation, and an auditable iteration loop.

## Purpose

This folder extends the design-resource mindset of this repository into a packaging workflow. It does **not** copy third-party repositories wholesale. External projects are treated as adapters/reference engines and are listed in `adapters/README.md`.

## Core pipeline

```text
Product facts
  -> Intake contract
  -> Reference research
  -> Packaging structure choice
  -> Dieline generation/import
  -> Visual system
  -> Artwork brief
  -> Mockup/prototype
  -> Deterministic validation
  -> AI review
  -> Human gate
  -> Iteration loop
  -> Release package
```

## AI-native principles

1. Facts and assumptions are separated.
2. Every AI output has an input contract and output contract.
3. Claims not present in source data are blocked.
4. Deterministic checks run before subjective AI review.
5. Each iteration records defects, changes, and pass/fail state.
6. Human approval is mandatory before print-production release.
7. Reusable knowledge lives in templates, schemas, design rules, and review history.

## Loop Engineering

The loop is not "generate again until it looks good". Each cycle is:

```text
PLAN -> GENERATE -> VALIDATE -> REVIEW -> DIFF -> PATCH -> RE-RUN
```

See `docs/LOOP-ENGINEERING.md`.

## Quick start

```bash
cd packaging-os
python scripts/validate_job.py examples/W0987/job.yaml
python scripts/generate_header_card.py examples/W0987/job.yaml outputs/W0987-header-card.svg
python -m unittest discover tests
```

## Repository map

```text
packaging-os/
├── AGENTS.md
├── SKILL.md
├── README.md
├── DESIGN.md
├── adapters/
├── docs/
├── references/
├── schemas/
├── scripts/
├── templates/
├── examples/
├── tests/
└── outputs/
```

## Current MVP scope

- Header-card packaging
- Simple rectangular dieline generation to SVG
- Structured product-fact intake
- Evidence/claim guardrails
- Design-resource routing
- Validation gates
- Iteration log contract

Future adapters can add folding cartons, FEFCO structures, richer 3D preview, and production-specific CAD without changing the core workflow.
