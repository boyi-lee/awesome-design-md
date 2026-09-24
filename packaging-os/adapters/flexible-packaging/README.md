# Flexible Packaging Adapter

## Purpose
Convert verified pouch / polybag structure inputs into a bag specification drawing rather than forcing a carton-style dieline.

## Input contract
- finished width / height
- material structure
- film thickness when required
- seal geometry
- top header geometry
- hang-hole geometry
- clear window geometry
- print limitations

## Output contract
- `bag-spec.svg`
- optional print-ready PDF after vendor confirmation
- front/back artwork placement map
- dimension legend
- production status

## Rules
- Concept drawings may show `TBD` for unknown dimensions.
- Production output must contain verified dimensions only.
- Standard vendor tooling may be referenced but must be confirmed before release.
- This adapter must not create unsupported claims or alter approved artwork.
