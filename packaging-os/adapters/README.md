# External adapters

Packaging Design OS keeps external projects decoupled. Integrate them through files/CLI/API where permitted by their licenses instead of copying whole codebases into this repository.

## Design resource source
- `darelova/Awesome-Design-Resources-List`: discovery layer for inspiration, color, typography, icons, mockups, and related tools.

## Dieline/structure candidates
- `GIGAJOHUB/OpenDieline`: parameterized carton dieline/preview direction.
- `stoneproof-tech/PackagingWorkbench`: FreeCAD-oriented packaging structure workflow, useful for FEFCO-style work.
- `jingguanzhang/BoxUnfolder`: simple dimension-to-SVG box unfolding direction.
- `haku-d/pde`: parametric dieline editor direction with 2D/3D concepts.

## Adapter contract
Any adapter must document:
1. upstream repository and version/commit
2. license
3. accepted inputs
4. produced outputs
5. unit handling
6. failure behavior
7. whether generated geometry was independently validated

## Rule
Do not label an imported/generated dieline production-ready merely because an external tool produced it. It must still pass this repo's gates and human production review.
