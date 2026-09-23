# Loop Engineering

## Why
Repeated generation without diagnosis creates drift. Loop Engineering makes iteration measurable and causal.

## Loop contract

Each loop has seven phases:

1. **PLAN**: declare target, constraints, expected output, and pass conditions.
2. **GENERATE**: create only the requested artifact/version.
3. **VALIDATE**: run hard deterministic gates.
4. **REVIEW**: score/inspect soft criteria and human-facing clarity.
5. **DIFF**: compare current artifact against contract, previous version, and source facts.
6. **PATCH**: issue atomic change requests tied to defects.
7. **RE-RUN**: regenerate only affected artifacts, then restart validation.

## Defect format

```yaml
id: DEF-001
severity: hard | major | minor
stage: dieline | artwork | copy | mockup | compliance
observed: "..."
expected: "..."
evidence: "source field or rule"
root_cause: "..."
patch: "..."
owner: ai | human | vendor
status: open | fixed | waived
```

## Stop conditions

Stop and escalate when any of these occurs:
- max 5 iterations without passing
- same hard defect repeats twice after a patch
- missing legal/production evidence blocks validation
- source data conflicts
- geometry cannot be validated with available information

## Loop memory

For every iteration append:
- artifact version
- defects opened/closed
- prompt or code change
- source-data change, if any
- gate results
- reviewer note

Never erase failed history. Failed iterations are training data for future rules.

## Learning loop

After release:
1. collect printer/vendor issues
2. collect retail/user feedback when available
3. convert repeated defects into deterministic checks
4. convert recurring successful patterns into templates
5. update `DESIGN.md`, schemas, or tests

This is how the system improves instead of merely accumulating prompts.
