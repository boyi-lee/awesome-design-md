# Release Process

## Goal
A package may look finished while still being unsafe to print. Release is a separate state from design completion.

## Required release bundle
- approved job contract
- final artwork
- dieline
- vendor profile
- validation report
- compliance checklist
- iteration log
- human approval record

## Release sequence
1. Freeze source facts.
2. Confirm chosen package structure.
3. Confirm production dimensions with vendor or physical measurement.
4. Resolve every `unknown` that affects production.
5. Resolve all `needs_evidence` claims or remove them.
6. Run deterministic validation.
7. Run semantic/visual review.
8. Generate final mockup for human inspection.
9. Human signs off legal copy, structure, artwork, and vendor profile.
10. Export production package.

## Block release when
- demonstration assumptions remain in production geometry
- vendor profile contains unknown production-critical values
- any hard gate is FAIL or BLOCKED
- unsupported claim/certification remains
- source facts conflict
- human approval is absent

## Release states
- `DRAFT`: work in progress
- `REVIEW_READY`: all artifacts exist but approvals are incomplete
- `PRODUCTION_BLOCKED`: a hard dependency is missing
- `APPROVED_FOR_EXPORT`: human release gate passed
- `RELEASED`: final production package exported and archived

## Feedback loop after production
Record printer corrections, proofing issues, retail problems, and repeated manual fixes. Convert repeated problems into validators, templates, or structure/vendor rules instead of merely documenting them.
