# Packaging Design OS Web App

## Live app

https://packaging-design-os-vp20sp.v2.appdeploy.ai/

## Purpose

Turn the repository rules into a simple web workflow that a non-technical user can operate without reading YAML, schemas, or engineering docs.

## Current runnable flow

1. Paste product facts / URL or upload a product image.
2. AI extracts product facts, claims, package type, missing information, and risks.
3. User chooses one or more outputs from the six-output menu.
4. AI proposes three reference / inspiration directions.
5. User selects one direction.
6. AI generates packaging copy, visual direction, structure deliverable type, and production readiness.
7. AI Review explains passed items, warnings, blockers, and next actions in plain language.

## Six user-facing outputs

- Product data organization
- Packaging planning
- Packaging copy
- Packaging design
- Packaging structure / production specification
- Full packaging development

## Structure deliverable routing

- Folding carton / header card / sleeve -> dieline
- Flexible pouch / OPP / CPP -> Bag Specification Drawing
- Label -> Cutline / Label Specification

## API behavior

The deployed app runs immediately with managed AI. It also supports an optional backend secret named `OPENAI_API_KEY`; when that secret is configured, text-only AI stages attempt to use the user's OpenAI API first and fall back to managed AI if unavailable. Image intake currently uses the managed multimodal extraction path.

## Current boundary

- Image upload is supported.
- Text / pasted product data is supported.
- URL can be provided as product context but is not yet automatically scraped.
- PDF binary parsing is not yet enabled; PDF facts can be pasted as text.
- The current mockup is an interactive concept preview, not yet photorealistic image generation.
- Production-ready dieline / bag spec still requires the engineering inputs defined by Packaging Design OS gates.

## Next implementation targets

1. PDF extraction.
2. Real reference search / scrape with source links.
3. Photorealistic packaging mockup generation with Artwork Lock.
4. Bag Specification Drawing generator.
5. Project persistence and user accounts.
