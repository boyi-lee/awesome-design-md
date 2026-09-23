# Packaging Design OS Web

Netlify-ready web workbench for the Packaging Design OS.

## What this version adds

- Real OpenAI Responses API calls from Netlify Functions.
- AI web research before design: product/category, brand, competitors, packaging patterns.
- Brand CIS generation from brand URL, notes and research results.
- CIS is editable before downstream design.
- Packaging is not fixed to header cards: carton, header card, pouch, label, sleeve, bottle/jar, blister and custom structures are routed separately.
- Packaging design fields stay editable before mockup/review.
- GPT Image photorealistic product-packaging mockup endpoint.
- Adobe Illustrator-compatible SVG artwork export.
- No login, quota or usage-limit layer in this version.

## Netlify

Base directory: `apps/web`

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

Functions directory:

```text
netlify/functions
```

Required environment variable:

```text
OPENAI_API_KEY
```

Optional:

```text
OPENAI_MODEL=gpt-5
```

## Workflow

```text
Product + brand + competitor input
  -> AI web research
  -> editable CIS
  -> editable packaging design
  -> package-family engineering routing
  -> photoreal mockup
  -> AI review
  -> Illustrator-compatible SVG / JSON / PNG delivery
```

## Illustrator delivery

The application exports SVG with named groups such as `BRAND`, `HEADLINE`, `HERO_AREA`, `FEATURES`, `SAFE_AREA`, so Adobe Illustrator can open and edit the vector artwork. A native `.ai` file is not fabricated because that proprietary file should be written/exported by Illustrator or an Adobe-compatible conversion service.

## Production note

Missing dimensions or vendor requirements must keep engineering output blocked. Concept visuals are not silently promoted to production-ready files.
