# Validation Gates

## Hard gates
Must pass before release.

### G1 Source integrity
- Product name exists
- SKU exists
- All product claims have evidence or are marked `needs_evidence`

### G2 Dimensional integrity
- Units declared
- Required dimensions are positive numbers
- Dieline dimensions map to the chosen structure

### G3 Structural integrity
- Cut/fold/bleed/safe roles are distinguishable where applicable
- Hole/perforation geometry does not violate safe zone

### G4 Content integrity
- No unsupported certification
- No fabricated barcode
- Required factual fields are not silently omitted

### G5 Production handoff
- Human confirms print method/material/vendor requirements
- Human confirms final legal copy
- Human approves release

## Soft gates
Review and document.

### S1 One-second identification
Can a viewer identify product type quickly?

### S2 Information hierarchy
Product name, variant/size, and primary use follow intended priority.

### S3 Series consistency
Grid, type roles, icon family, and technical zones remain stable across SKUs.

### S4 Reference usefulness
Reference choices influence a concrete design decision rather than decoration-only moodboarding.

### S5 Mockup realism
Mockup preserves package structure, scale, and visible product zones.

## Decision
`PASS`, `FAIL`, or `BLOCKED` only. Avoid vague "mostly okay" release states.
