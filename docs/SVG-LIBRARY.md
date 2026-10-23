# Jelvan Elements · SVG Artwork Library

Part of the personal portfolio at https://portfolio.jelvan.pro/svg-library.

## Collections

- **108 original vector studies:** symbols, geometric, botanical, interface, network and abstract artwork.
- **101 hardware illustrations:** ten illustrations each for graphics cards, RAM, SSDs, motherboards, fans, cases, power supplies, microchips and CPU coolers, plus eleven processor illustrations including an alternate.

All 101 hardware SVG files are bundled under `public/assets/svg-library/pc-components/<category>/`, so visitors do not need access to any external file-sharing service.

## Copy and paste

Select a category and artwork, then use **Copy SVG** directly on its card. The complete SVG markup is placed on your clipboard for pasting into HTML or an SVG editor. You can also manually select text from the **Hardware SVG source** inspector or use the individual **Download** button. The **Download all 101 SVGs (.zip)** action creates a category-organized archive.

## Hardware categories

| Folder | Content |
|---|---|
| `gpu/` | Graphics cards |
| `ram/` | Memory modules |
| `ssd/` | Solid-state drives |
| `mobo/` | Motherboards |
| `fan/` | Cooling fans |
| `case/` | Computer cases |
| `psu/` | Power supplies |
| `chip/` | Microchips |
| `cooler/` | CPU coolers |
| `cpu/` | Processors |

The assets use the same 400 × 400 coordinates and charcoal, silver and orange palette, while each has its own layout and geometry. Each SVG is self-contained and hosted as part of the static website.

## Rebuild and verify

```bash
node scripts/generate-svg-library.cjs
npm run test:tools
npm run build
```

CI verifies that all 101 files exist, are reproducible, have different vector structures and contain no external scripts.
