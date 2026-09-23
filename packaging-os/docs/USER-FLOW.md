# User Flow

## Goal
Turn an uploaded product source into a controlled packaging job without assuming the user's desired deliverable.

## Entry Flow

```text
User uploads product data
  -> Source Intake
  -> Fact / Evidence / Assumption / Unknown split
  -> Data completeness summary
  -> Output Menu
  -> User selects one or more outputs
  -> Output Router
  -> Structure Router (when needed)
  -> Design / Engineering / Mockup modules
  -> Validation
  -> Review / Iteration
  -> Human approval when release is requested
```

## Required first response when output is unspecified
The agent must summarize:
- detected SKU / product name
- available source types
- known product facts
- missing production-critical data
- probable package structure if one can be inferred safely

Then ask the user to select:
1. Product data整理
2. Packaging brief / strategy
3. Packaging copy
4. Packaging design
5. Packaging structure / production specification
6. Full packaging development

Multiple selections are allowed.

## Rules
- Do not start a full packaging workflow merely because product data was uploaded.
- Do not invent production dimensions to avoid asking for missing data.
- If the user chooses a concept-only output, missing production geometry does not block concept work.
- If the user chooses engineering or production-ready output, required structure inputs become hard gates.
- Save the selection to `output-request.yaml`.

## Example
For a transparent raincoat in an OPP laminated pouch:
- Packaging design may proceed from verified product facts.
- Pouch production specification must stop if finished size / seals / material specification are missing.
- Photoreal mockup can proceed only after artwork and structure are locked at the appropriate concept fidelity.
