# Root Cause Taxonomy

Use this before regenerating. A failed output is not a prompt problem by default.

## RC-01 Source defect
Missing, conflicting, stale, or unverified product facts.
Action: repair source data; do not regenerate downstream artifacts yet.

## RC-02 Contract defect
Required input/output fields are missing or ambiguous.
Action: patch schema/template/agent contract.

## RC-03 Routing defect
Wrong packaging structure, adapter, reference class, or workflow path selected.
Action: patch routing rule and rerun from affected stage.

## RC-04 Geometry defect
Dimensions, bleed, safe area, fold/cut/hole relationships, or unit conversion are wrong.
Action: patch deterministic geometry logic and add regression test.

## RC-05 Evidence defect
Copy, icon, certification, or benefit is unsupported by source evidence.
Action: remove claim or attach verified evidence. Never prompt around this gate.

## RC-06 Visual-system defect
Hierarchy, spacing, color roles, typography roles, or series rules drifted.
Action: patch DESIGN.md/project tokens, then regenerate artwork only.

## RC-07 Adapter defect
External tool/version changed behavior or produced invalid output.
Action: pin version, validate output, patch adapter contract.

## RC-08 Production-profile defect
Printer/vendor requirements are missing or outdated.
Action: update vendor profile from verified specification.

## RC-09 Review defect
Human/AI review criteria are vague or contradictory.
Action: convert feedback into an observable pass/fail rule.

## Promotion rule
When the same defect class appears in 3 jobs, promote the fix from job-level patch to one of:
- schema rule
- deterministic validator
- routing rule
- reusable template
- DESIGN.md guardrail
- regression test

That promotion is the learning mechanism of the system.
