# Architecture

## Layers

### A. Source layer
PDF, product page, spreadsheet, PIM, brand guide, legal copy, printer spec.

### B. Normalized job contract
`job.yaml` is the single source of truth for one packaging job. It separates `facts`, `assumptions`, `constraints`, `evidence`, and `decisions`.

### C. Research layer
Uses the original Awesome Design Resources concept for inspiration, typography, color, icons, mockups, and packaging references.

### D. Structure layer
Routes to native/simple generators or external adapters for cartons and other structures.

### E. Design layer
Produces hierarchy, tokens, copy, artwork specification, and mockup instructions.

### F. Validation layer
Two-stage validation:
1. deterministic: schema, required fields, units, geometry, claim evidence
2. semantic: hierarchy, clarity, visual consistency, reference alignment

### G. Loop layer
Transforms validation defects into atomic patches and records iteration history.

### H. Release layer
Human approval + vendor/printer checks.

## State machine

```text
DRAFT
 -> FACTS_VALIDATED
 -> RESEARCHED
 -> STRUCTURE_SELECTED
 -> DIELINE_READY
 -> ARTWORK_READY
 -> REVIEWING
 -> ITERATING
 -> HUMAN_APPROVAL
 -> RELEASED
```

Any hard-gate failure moves the job back to the earliest affected state.
