# B6827 Golden Case — Flexible Packaging

B6827 is the regression case created from the transparent raincoat packaging test.

## What this case must protect against
- A pouch must not be forced into folding-carton dieline logic.
- Missing bag dimensions must remain `TBD` / `BLOCKED_FOR_PRODUCTION`, never inferred.
- Approved artwork must remain visually consistent when converted into a photorealistic product shot.
- Mockups must not move logo, rewrite copy, change transparent zones, alter package structure, or invent accessories.
- Unsupported product claims must remain blocked.

## Expected engineering output
`bag specification drawing`, containing:
- finished width / height
- material structure
- seal zones
- hang-hole geometry
- clear window
- printable area
- safe area
- front/back artwork placement

## Current state
- product intake: available
- packaging brief: available
- pouch routing: available
- bag-spec contract: available
- native bag-spec generator: planned
- photoreal lock contract: available
- automated visual-diff validator: planned

Use this case whenever structure routing, flexible packaging, mockup generation, or visual validation changes.
