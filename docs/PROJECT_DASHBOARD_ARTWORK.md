# Project dashboard artwork standard

The seven featured project previews share one visual system. They are individual product-specific dashboard illustrations, not screenshots from live production accounts.

## Shared frame specification

- Asset location: `public/assets/portfolio/projects/`
- Canvas: 1440 × 900 (16:10)
- Format: SVG, scalable and crisp at desktop and mobile sizes
- Browser chrome: same dark macOS-style window bar, traffic-light controls, centered address field and consistent screen inset
- Application shell: same sidebar width, navigation rhythm, header position, KPI-card geometry, chart panel, activity table and lower summary panel
- Layout: same padding, spacing scale, border radius, typography hierarchy and component density
- Responsive placement: portfolio carousel and project detail hero use a common 16:10 image ratio with `object-fit: contain`

## Product-specific identities

| Project | Dashboard identity | Accent |
|---|---|---|
| Master AI | Agent orchestration and task review | Violet |
| Knowledge Center | Knowledge library and learning activity | Blue |
| Internal Email System | Campaign and deliverability operations | Teal |
| HR Information System | People operations and employee lifecycle | Green |
| BOLEKpad | Personal/team productivity workspace | Orange |
| Online Printing Store | Orders, artwork and production | Rose |
| Developers Playground / DevAI | Developer command center and build activity | Emerald |

## Asset mapping

1. `01-master-ai-dashboard.svg`
2. `02-knowledge-center-dashboard.svg`
3. `03-internal-email-dashboard.svg`
4. `04-hris-dashboard.svg`
5. `05-bolekpad-dashboard.svg`
6. `06-printing-store-dashboard.svg`
7. `07-devai-dashboard.svg`

The homepage carousel mapping is maintained in `components/HighlightedProjects/HighlightedProjects.config.tsx`. Project-detail hero mapping is maintained in `components/ProjectRepositoryExplorer/projectShowcase.ts`.

## Content integrity

Dashboard values, names, activity rows and metrics are illustrative sample content for visual storytelling. They must not be represented as live analytics, real employee records, real campaign recipients, actual order counts, current deployment health or verified production usage.

The artwork depicts representative workflows based on each project's documented purpose and repository context. It is not a substitute for a verified in-product screenshot. If an approved product screenshot becomes available, replace only that project's screen content while retaining the shared frame, canvas, crop and layout rules.

## Review checklist

- All seven assets exist and return successfully.
- All seven assets use the same 1440 × 900 canvas and frame geometry.
- The correct asset is assigned to the corresponding homepage project.
- The same project asset is used on its dedicated detail route.
- No generic image is reused across multiple projects.
- Dashboard labels and widgets fit the product's documented purpose.
- No credentials, private URLs, real personal data or confidential production information appear.
- Mobile rendering preserves the entire dashboard without clipping or distortion.
- Run `npm run typecheck`, `npm run build` and the existing test suite before release.
