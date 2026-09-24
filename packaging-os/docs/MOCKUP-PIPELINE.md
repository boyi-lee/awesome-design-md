# Mockup Pipeline

## Purpose
Create realistic packaging previews without allowing the mockup stage to redesign approved packaging.

## Three output levels

### 1. Artwork Preview
Flat front/back artwork used to review layout, copy, hierarchy, and print zones.

### 2. Structural Mockup
Shows package form, seams, holes, folds, windows, and artwork placement.

### 3. Photorealistic Mockup
Shows the approved package as if photographed in studio or in a scene.

## Required locks before photoreal mockup
- `Artwork Lock`: logo, copy, typography, layout, icons, print zones.
- `Structure Lock`: package type, proportions, seams, holes, clear windows.
- `Product Truth Lock`: product appearance, materials, approved claims, included components.

## Allowed changes in photoreal mockup
- camera angle
- lighting
- shadow
- depth of field
- background / environment
- physically plausible material reflection and wrinkles

## Forbidden changes
- rewriting copy
- moving logo or major layout blocks
- adding/removing icons
- changing package structure
- inventing products, accessories, certifications, or features
- altering transparent / printed zones

## Validation
Every photoreal mockup must be compared against locked artwork and structure. Any visual drift is a defect, not creative freedom.

Recommended defect classes:
- `ARTWORK_DRIFT`
- `STRUCTURE_DRIFT`
- `PRODUCT_DRIFT`
- `HALLUCINATED_ELEMENT`
- `COPY_CORRUPTION`
