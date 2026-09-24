# Structure Routing

## Principle
Package engineering output depends on package family. Do not treat every structure as a dieline problem.

## Routing table

| Structure | Engineering deliverable |
|---|---|
| Header card | Dieline |
| Folding carton | Dieline |
| Sleeve | Dieline |
| Pouch / polybag | Bag specification drawing |
| Label | Cutline + application specification |
| Bottle / jar | Container specification + label area |
| Blister | Blister specification + backing-card dieline |

## Flexible packaging rule
For pouch / polybag projects, the default engineering document must specify:
- finished width / height
- material structure
- film thickness when required
- top / side / bottom seals
- top header
- hang-hole type and position
- clear window geometry
- printable area
- safe area
- front/back artwork placement
- printer limitations

A standard Euro hole may use vendor standard tooling. A custom shaped hole requires tooling confirmation.

## Gate behavior
- Concept work may use explicit `TBD` dimensions.
- Engineering-ready output requires confirmed dimensions.
- Production-ready output additionally requires vendor/printer requirements and compliance checks.

## Failure rule
If a structure lacks verified engineering inputs, return `BLOCKED_FOR_PRODUCTION`. Never infer package dimensions from product dimensions unless a validated packaging rule or vendor specification explicitly permits it.
