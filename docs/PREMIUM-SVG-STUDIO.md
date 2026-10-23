# Jelvan Elements — Premium Icon Studio

Additional personal-portfolio SVG icon collection with **48 original premium icons**, organized into eight six-icon categories: Developer, Cloud, Security, AI, Design, Business, Communication, and Navigation.

Twenty-four icons include pure CSS animation. All motion versions include `@media(prefers-reduced-motion:reduce)` and can be paused in the gallery; their corresponding `-still.svg` files are included for non-animated usage.

## Browse, copy, customize and download

- Visit [the SVG Library](https://portfolio.jelvan.pro/svg-library).
- Choose a category and filter by Animated or Static.
- Use **Play motion** / **Pause motion** to switch between the 24 animated icon files and their static alternatives.
- **Copy SVG** copies the icon’s complete markup for pasting into HTML or vector editors.
- **Download** provides an individual standalone SVG.
- **Download full premium pack (.zip)** produces 48 icons plus 24 `-still.svg` variants, grouped by category (72 files).

## Reproducible source

```bash
node scripts/generate-premium-svg.cjs
npm run test:tools
npm run build
```

Icon definitions, backgrounds and animations are authored in `scripts/generate-premium-svg.cjs`. The static frontend serves the SVGs from `public/assets/svg-library/premium/<category>/`, without external dependencies or API credentials.

The original 108 vector studies and existing 101 hardware illustrations remain unchanged.

