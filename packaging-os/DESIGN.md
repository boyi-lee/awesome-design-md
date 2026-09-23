# Packaging DESIGN.md

A reusable design-language contract for AI and human designers. Project-specific files may override these defaults.

## 1. Visual hierarchy
Priority order:
1. Product type/name
2. Variant or size
3. Primary verified use/context
4. Brand/series
5. Secondary factual information

Do not let decorative elements outrank product identification.

## 2. Typography roles
- `brand`: identity, not the largest element by default
- `product_name`: primary reading target
- `variant_size`: fast comparison information
- `supporting`: secondary explanation
- `legal`: required small text, never below printer/legal minimum

## 3. Color roles
Use semantic roles rather than hard-coded colors:
- `surface`
- `text_primary`
- `text_secondary`
- `accent_series`
- `warning`
- `technical_dieline`

Exact print values must be approved from brand/production sources, not guessed from screenshots.

## 4. Icon rules
- One icon family per package system
- Same stroke logic and optical weight
- Icons explain verified functions or navigation
- An icon must not imply an unsupported product claim

## 5. Spacing
Use a consistent base unit. Default digital planning unit: 4 mm-equivalent logical step; production files may use exact millimeters.

## 6. Dieline visualization
Recommended layer roles:
- CUT
- FOLD
- BLEED
- SAFE
- HOLE/PERFORATION
- ARTWORK

## 7. Series behavior
Across SKUs, keep grid, hierarchy, typography roles, icon family, and technical zones stable. Vary only explicitly defined fields such as accent, product name, size, and approved variant imagery.

## 8. Guardrails
- No invented benefits
- No invented certification marks
- No fake barcodes
- No guessed mandatory legal copy
- No production-ready claim until human approval
