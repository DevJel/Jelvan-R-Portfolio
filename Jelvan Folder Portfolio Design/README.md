# Jelvan Folder Portfolio Design

A standalone, interactive desktop-inspired Folder View for the Jelvan personal portfolio. It presents five tactile folders — **Projects, Profile, Skills & Expertise, Developer Lab, and Contact & Links** — arranged on a softly illuminated desk. Visitors can hover over folders, open a folder, inspect a portfolio item, and follow links into the corresponding Standard View pages and public resources.

> **Design-preservation rule:** keep the existing desk, folder artwork, typography, animations, responsive layout, and interaction language intact when synchronizing portfolio content. Content and destination links may be updated to match the Standard View; do not redesign the Folder View unless explicitly requested.

## Contents

- [Project overview](#project-overview)
- [Current files](#current-files)
- [Experience and features](#experience-and-features)
- [Folder and portfolio content](#folder-and-portfolio-content)
- [Visual design system](#visual-design-system)
- [Typography](#typography)
- [Layout and responsive behavior](#layout-and-responsive-behavior)
- [Interaction and accessibility](#interaction-and-accessibility)
- [Technical implementation](#technical-implementation)
- [Run locally](#run-locally)
- [Hosting and path requirements](#hosting-and-path-requirements)
- [Maintenance and change-control guidance](#maintenance-and-change-control-guidance)
- [Known demo limitations](#known-demo-limitations)
- [Reference links](#reference-links)

---

## Project overview

**Latest content and interaction update — 9 November 2026:** the complete desktop workspace is viewport-fitted as one application surface, with all five folders arranged in a single responsive row on desktop, independent preview scrolling/fullscreen, and consistent folder menu controls.

| Item | Details |
| --- | --- |
| Project name | Jelvan Folder Portfolio Design |
| Entry point | `index.html` |
| Format | Standalone HTML document |
| Interface concept | Interactive desktop / file-folder workspace |
| Primary experience | Five portfolio folders on an animated, atmospheric desk |
| Framework/runtime | React UI bundled into the HTML artifact |
| Styling | Embedded CSS, Tailwind CSS utility output, and custom CSS |
| Typography | Optimistic and Optimistic Mono, with system fallbacks |
| Dependencies at runtime | No separate package installation is required to open the HTML file |
| Data model | Portfolio navigation cards, descriptions and destination links embedded in the page |
| Status | Standalone Folder View artifact linked to the main portfolio |

This folder remains a separate standalone HTML artifact, not a Next.js source directory. It is embedded by the main homepage at `https://portfolio.jelvan.pro/` and is also published at `https://jelvan-folder-portfolio-design.pages.dev/`. Its cards link to the main portfolio's routes and resources; the artifact does not host the main site's contact form, Workers, email relay, or other backend services.

## Current files

```text
Jelvan Folder Portfolio Design/
├── index.html    # Standalone Folder View interface; preserve visual design and interactions
└── README.md     # Project, design, feature, and maintenance documentation
```

### Entry point

Open `index.html` in a modern browser. The document includes its bundled interface code and styles. No npm install, compilation, or development server is required for a basic local preview.

---

## Experience and features

### 1. Desk environment

- Full-viewport desk-style composition.
- Atmospheric background with ambient glow, layered orbs, and a perspective grid floor.
- Subtle pointer-responsive/parallax visual treatment.
- Centered content area with a maximum width of approximately 1,280px.
- Responsive spacing and folder sizing for narrower screens.

### 2. Five interactive folders

The main view displays five folders. Their visual treatment and artwork remain individually configured in the bundled interface:

1. **Projects** — seven featured systems and project guides; light aurora treatment.
2. **Profile** — résumé, professional experience, education and certifications; light verdant treatment.
3. **Skills & Expertise** — strategic HR, digital strategy, AI, automation, cloud and engineering capabilities; dark glacier treatment with the existing contextual menu.
4. **Developer Lab** — browser-based developer tools, SVG Library, technical articles, repository explorer and project guides; light ember treatment.
5. **Contact & Links** — contact form, email, LinkedIn, GitHub and résumé download; dark dusk treatment.

Folder labels and card data mirror the main portfolio's current content. The two views intentionally keep separate visual systems: the Folder View does not copy the Standard View's page layout or styling.

### 3. Hover and focus behavior

- Hovering a folder gives it a tactile, dimensional response.
- The interface emphasizes the active folder while visually de-emphasizing other folders.
- Folder perspective and transitions help communicate depth and selection.
- Pointer interaction is designed as a visual enhancement; the core open/select actions are click-driven.

### 4. Folder opening and file selection

- Every folder now uses the same options control and menu.
- Open or close an individual folder, show all entries in that folder (rather than the compact four-item stack), close all folders, and lock or unlock the selected folder.
- A locked folder prevents opening and selecting its entries; its options control remains available so it can be unlocked.
- Select a file to show its selected state and update the live status text.
- The selected item is reflected in the footer/status area.
- The folder interaction uses a transition from the selected folder into a larger preview surface.

### 5. Expanded file preview

The expanded preview is presented as a dialog-like card with:

- Artwork/header area.
- Folder and file name.
- File-type and metadata labels.
- Type, size, modified, and folder detail fields.
- A short explanatory demo description.
- Open, Download, Share, and Back to folders controls.
- Close control and a blurred backdrop.

**Link behavior:** Open follows the item's configured destination in a new tab. Download triggers a browser download of the configured résumé PDF when the selected item provides a download destination. Share uses the browser's native share sheet when available, or copies the item's URL to the clipboard. Items without a destination retain a demo-only action.

### 6. Add-file demonstration

Folders configured with an add action can create a new sample entry in the in-memory demonstration state. The generated entry is labeled as an untitled item and uses a simple recent timestamp label.

This is not persistent storage. A browser refresh resets the demonstration state.

### 7. Context menu demonstration

The Skills & Expertise folder retains its contextual options menu with sample actions:

- Download report
- Share…
- Move to Trash

These menu choices are visual/demo actions. They do not delete, share, or download a real user file.

### 8. Sound control

- A fixed sound toggle is available near the top edge of the interface.
- The control reports its current state through its label and accessible pressed state.
- The interface is muted by default.
- Sound effects are limited to the interactions implemented in the artifact; sound is optional and should not be required to understand the interface.

### 9. Responsive folder sizing

The folder width adapts to viewport width using the following breakpoints in the bundled code:

| Viewport width | Folder width |
| --- | ---: |
| Below 420px | 300px |
| 420px through 640px | 320px |
| Above 640px | 340px |

The layout also uses responsive padding, text sizing, and grid/flex behavior to fit mobile and desktop screens.

---

## Folder and portfolio content

The following entries are portfolio navigation cards embedded in the design. Their names and descriptions are synchronized with the Standard View; they are not files loaded from a local or cloud filesystem.

| Folder | Portfolio entries |
| --- | --- |
| Projects | Master AI — Multi-Agent Workspace; Knowledge Center System; Internal Email System; HR Information System; BOLEKpad — Personal Workspace; Online Printing Store; Developers Playground — DevAI |
| Profile | Professional Profile; Professional Résumé; Professional Experience; Education & Development; Certifications |
| Skills & Expertise | Strategic HR; Digital Strategy & Branding; AI & Automation; Cloud & Engineering; Process & Operations |
| Developer Lab | Developer Toolkit; SVG Library; Technical Articles; GitHub Repositories; Project Guides |
| Contact & Links | Contact Form; Email; Phone; LinkedIn; GitHub; Download CV |

Folder card metadata is descriptive UI text (for example, `Private product guide`, `Career history`, or `Browser-based utilities`), not filesystem metadata.

---

## Visual design system

The implementation uses a warm neutral canvas with dark ink, soft surfaces, and colorful atmospheric accents. A dark appearance is also defined through the system color-scheme media query.

### Core interface tokens

| Token / role | Light appearance | Dark appearance |
| --- | --- | --- |
| Page background | `#F7F5F1` | `#101013` |
| Primary text | `#17171A` | `#F4F2EE` |
| Muted text | `#6F6D68` | `#A8A49E` |
| Surface | `#FFFFFF` | `#17171A` |
| Dark control / deep surface | `#141416` | `#141416` |
| Secondary dark surface | `#1A1A1D` | `#1A1A1D` |

These values are taken from the document's declared CSS custom properties and recurring surface styles. The light/dark base palette is selected using `prefers-color-scheme: dark`.

### Atmospheric and accent colors

The visual effects and folder artwork also use a broader set of colors. The following values are present in the source and should be treated as decorative accents rather than a single global brand accent:

| Color | Hex | Typical visual role |
| --- | --- | --- |
| Blue | `#4C8DFF` | Cool ambient glow / highlight |
| Purple | `#9333EA` | Folder artwork and atmospheric accent |
| Pink | `#EC4899` | Gradient / artwork accent |
| Cyan | `#22D3EE` | Cool gradient / artwork accent |
| Amber | `#F59E0B` | Warm gradient / artwork accent |
| Warm red | `#D92D20`, `#FF6B5E`, `#C2433F` | Artwork palette |
| Orange | `#EF4A2B`, `#FF8A5C`, `#B3502F` | Ember artwork palette |
| Green | `#173024`, `#4F7A5A` | Verdant artwork palette |
| Blue-gray | `#22395E`, `#6F97C2` | Glacier artwork palette |
| Plum | `#2A1E2A`, `#3E2850`, `#8F6C9C` | Dusk artwork palette |
| Gold | `#A7843A`, `#E9CF87` | Warm artwork palette |

### Surface, border, and overlay treatment

- Use near-black surfaces for high-contrast controls and dark folder treatments.
- Use white or off-white surfaces for expanded content.
- Use subtle translucent white borders and fills for glass-like controls.
- Use soft shadows to lift folders and the expanded preview from the desk.
- Use backdrop blur behind the expanded preview to preserve focus.
- Use muted text for metadata and secondary labels.
- Avoid treating the many artwork colors as interchangeable text colors; preserve readable foreground/background contrast.

### Shape and depth language

- Rounded folder silhouettes and rounded preview cards.
- Circular sound and close controls.
- Layered artwork and gradient surfaces.
- Perspective transforms, ambient lighting, and soft shadow depth.
- Compact uppercase mono labels for metadata and status information.

---

## Typography

### Primary display and interface font

**Optimistic**

The HTML declares a variable font face:

- Family: `Optimistic`
- Weight range: 400–600
- Format: WOFF2
- Declared source: `/fonts/OptimisticAI_VF_Optimized.woff2`
- Fallback: `system-ui, sans-serif`

Use this family for the main interface, headings, and general reading text when the font asset is available.

### Monospaced / metadata font

**Optimistic Mono**

The HTML declares:

- Family: `Optimistic Mono`
- Weight: 400
- Format: WOFF2
- Declared source: `/fonts/OptimisticMono_W_TextRegular.woff2`
- Fallback: `ui-monospace, monospace`

Use the mono family for small uppercase labels, status information, metadata, and compact technical details.

### Type hierarchy visible in the interface

| Element | Source styling / intended use |
| --- | --- |
| Main heading | Approximately 36px on small screens and 48px at the larger breakpoint; semibold |
| Supporting line | 14px on compact screens and 16px at the larger breakpoint |
| Folder labels | Responsive folder component typography |
| Metadata labels | Approximately 10–11px, uppercase, monospaced, letter-spaced |
| Preview title | 24px, increasing to 30px at the larger breakpoint |
| Preview body | 14px, increasing to approximately 15px at the larger breakpoint |
| Status/footer | Approximately 11px, uppercase, monospaced, letter-spaced |

### Font loading and fallback behavior

The font files are referenced from the site-root `/fonts/` path. If those font files are not hosted at that exact path, the browser will use the declared system fallbacks. When hosting this folder under a subdirectory, verify the font URL resolution before considering the typography fully matched.

Do not rename or replace the font files as part of a documentation-only change.

---

## Layout and responsive behavior

- On desktop widths (900px and above), the desk is constrained to the viewport height and the page itself does not scroll.
- On mobile and smaller tablet widths, the layout remains naturally scrollable so folders and controls are reachable on shorter screens.
- Expanded previews fit within the viewport; their content area can scroll independently if the content is taller than the available space.
- Full-screen preview mode occupies the full browser viewport.
- The main desk composition uses a full-viewport minimum height based on `100svh`.
- The central content is constrained to approximately 1,280px.
- Folder cards are arranged in a centered, wrapping flex layout.
- The layout uses responsive outer padding and spacing.
- The folder stage uses perspective to create a dimensional presentation.
- The expanded preview is centered and constrained by viewport-relative width and height.
- The expanded preview uses a scrollable content area when its contents exceed the available height.
- Safe-area top padding is applied for devices with display cutouts or system UI insets.

### Responsive verification

Test the artifact at minimum at:

- 320px wide — narrow mobile.
- 390px wide — common mobile viewport.
- 768px wide — tablet portrait.
- 1024px wide — tablet landscape / compact desktop.
- 1440px wide — desktop.

Check that folders remain reachable, preview content remains readable, controls do not overlap, and the close action remains visible.

---

## Interaction and accessibility

The bundled interface includes semantic and assistive-technology details such as:

- Button elements for interactive controls.
- Accessible labels for sound and close controls.
- `aria-pressed` state for the sound toggle.
- A dialog role, `aria-modal`, and an accessible preview label for the expanded card.
- A live status region for selection feedback.
- An aria-hidden treatment for decorative background elements.

### Keyboard and pointer checks

- Confirm the interface can be navigated using keyboard focus.
- Confirm visible focus is maintained for buttons and folder actions.
- Confirm Escape closes the preview when the dialog is open.
- Confirm backdrop and close controls return the user to the folder view.
- Confirm hover-only effects do not hide essential actions on touch devices.
- Confirm the sound toggle communicates state without relying only on audio.

The artifact should continue to treat motion and sound as enhancements, not as the only way to access information.

---

## Technical implementation

### Document structure

The HTML document contains:

- Document metadata and viewport declaration.
- Embedded font-face declarations.
- Compiled Tailwind CSS utility styles.
- Custom CSS variables and responsive rules.
- A React-rendered application mounted into the `#root` element.
- Bundled component/runtime code and inline interaction logic.
- Small supporting scripts for external-link behavior and artifact-host integration.

### Styling approach

- Tailwind CSS v3.4.18 utility output is embedded in the HTML.
- Custom styles define the desk, folder artwork, motion, preview surface, and interaction states.
- CSS variables define the light and dark base palette.
- Responsive behavior is implemented with CSS media queries and viewport-aware JavaScript sizing.

### Runtime and dependencies

The React application is bundled into the standalone HTML artifact. The folder does not currently include a separate package manifest or build pipeline. Do not assume that this folder can be built with `npm run build` independently.

### State and persistence

Folder expansion, selection, added demo entries, sound state, and preview status are handled in browser-side application state. The current design does not persist those changes to a database or remote storage service.

---

## Run locally

### Option A — Open directly

1. Clone or download the repository.
2. Open `Jelvan Folder Portfolio Design/index.html` in a modern browser.
3. Interact with the folders and preview.

### Option B — Serve the repository locally

From the repository root, run a static file server, for example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/Jelvan%20Folder%20Portfolio%20Design/
```

A local server is recommended when checking root-relative font paths and browser behavior.

---

## Hosting and path requirements

This artifact can be hosted as static content. For a clean standalone deployment:

1. Publish the folder contents to the intended static hosting location.
2. Ensure `index.html` is the directory entry point.
3. Ensure the referenced font files are available at the expected `/fonts/` paths, or document the fallback behavior.
4. Test the published URL on mobile and desktop.
5. Verify browser console output and network requests for missing assets.

**Path warning:** the declared font URLs begin with `/fonts/`, which resolves from the host's domain root. If the folder is hosted at a nested URL such as `/Jelvan-Folder-Portfolio-Design/`, the font request still targets the domain-root `/fonts/` directory. Do not silently rewrite these paths during a documentation-only update.

The standalone artifact is published at `https://jelvan-folder-portfolio-design.pages.dev/` and embedded by the main portfolio homepage. Its Cloudflare Pages configuration has been inspected:

| Setting | Verified value |
| --- | --- |
| Cloudflare account | `Jelvan - Projects - Works` |
| Pages project | `jelvan-folder-portfolio-design` |
| Git repository | `DevJel/Jelvan-R-Portfolio` |
| Production branch | `main` |
| Path include filter | `Jelvan Folder Portfolio Design/*` |
| Root directory | `Jelvan Folder Portfolio Design` |
| Build command | None |
| Output directory | `.` |
| Entry point | `index.html` |

The main Next.js Pages project is separate: `jelvan-r-portfolio`, repository root, `npm run build`, output `out`. A successful deployment of one project does not prove that the other project has deployed.

---

## Maintenance and change-control guidance

### Documentation-only changes

- Update this README when features, design tokens, fonts, or hosting assumptions change.
- Keep descriptions aligned with the actual HTML implementation.
- Distinguish implemented behavior from demo-only controls.
- Record any new assets and their paths.
- Do not claim backend functionality unless a real backend integration is added and verified.

### Source changes

Before modifying `index.html`:

1. Confirm the requested change applies to this standalone artifact, not the main portfolio application.
2. Preserve existing interactions and visual behavior unless the request explicitly authorizes a change.
3. Check font and asset paths.
4. Test folder opening, selection, preview, close, add action, context menu, and sound toggle.
5. Test narrow mobile and desktop layouts.
6. Review the final diff to ensure unrelated bundled code was not altered.

### Change log convention

For future updates, record:

- Date of change.
- File(s) changed.
- User-visible behavior affected.
- Design tokens or font references changed.
- Browser/device checks performed.
- Whether the change is documentation-only or changes the actual experience.

---

## Known demo limitations

- Folder cards are embedded portfolio navigation data, not files loaded from a local computer or cloud drive.
- Add-file behavior is temporary browser state and is not saved after refresh.
- Open navigates only when a card has a configured destination. Download is configured for the résumé PDF. Share uses native share or clipboard where supported. The Skills & Expertise context-menu actions remain demonstration actions.
- The artifact has no authentication, user accounts, database, cloud drive, or server-side API.
- File sizes, modified dates, and file-type details are illustrative.
- Font rendering depends on the declared WOFF2 files being available at the expected root paths.
- The HTML document is a standalone artifact; its page metadata and font asset availability should be checked separately from the main Next.js site's metadata.

These limitations are intentional to the current prototype scope. The artifact is a visual portfolio navigator, not a production file-management or cloud-drive application.

---

## Reference links

### Standards and browser APIs

- [MDN — HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN — CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN — CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [MDN — CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN — ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [MDN — Viewport concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts)

### Implementation libraries

- [React documentation](https://react.dev/learn)
- [Tailwind CSS v3 documentation](https://v3.tailwindcss.com/docs)
- [Lucide icons](https://lucide.dev/icons/) — general icon reference; use only if the source implementation is intentionally updated to use Lucide.

### Typography

- [CSS `@font-face` reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
- [CSS font-family reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)

---

## Ownership and usage

This design artifact is maintained as part of the Jelvan portfolio repository. The repository's top-level license and ownership terms apply unless a separate license is explicitly provided for this folder.

Do not assume that bundled third-party libraries, fonts, or artwork are relicensed by this README. Their original license and usage terms remain applicable.

---

## Portfolio integration and synchronized content

**Content alignment update — 9 November 2026**

This artifact is also used as the Folder View presentation for the main portfolio at [portfolio.jelvan.pro](https://portfolio.jelvan.pro/). The folder layout remains an independent visual design; the portfolio integration updates the sample labels, descriptions and selected destinations without replacing the established desk, folder artwork, motion, typography or responsive treatment.

### Folder categories

| Folder | Contents represented | Main portfolio destination |
| --- | --- | --- |
| Projects | Master AI, Knowledge Center System, Internal Email System, HR Information System, BOLEKpad, Online Printing Store and Developers Playground / DevAI. | [Selected project guides](https://portfolio.jelvan.pro/projects) |
| Profile | Professional résumé, experience, education and professional development. | [Résumé](https://portfolio.jelvan.pro/portfolio/resume) |
| Skills & Expertise | Strategic HR, digital strategy and branding, AI and automation, cloud and engineering, process and operations. | [About](https://portfolio.jelvan.pro/portfolio/about) |
| Developer Lab | Developer Toolkit, SVG Library, technical articles, GitHub repositories and project guides. | [Developer tools](https://portfolio.jelvan.pro/tools) |
| Contact & Links | Contact form, professional email, LinkedIn, GitHub and résumé download. | [Contact](https://portfolio.jelvan.pro/portfolio/contact) |

### Linked preview behavior

The folder preview uses the selected item's description when one is provided.

- **Open** opens the item's configured destination in a new browser tab.
- **Download** opens the configured downloadable resource, currently the résumé PDF.
- **Share** invokes the Web Share API when supported; otherwise it copies the configured URL when clipboard access is available.
- Items without a configured destination continue to use the artifact's demonstration feedback. This is not a real local file system, cloud drive or persistent file-management service.

### Content maintenance

When the Standard View changes, review the corresponding folder content and links in `index.html`. Keep these aligned:

1. Project names, descriptions, order and guide destinations.
2. Profile, résumé, education and experience summaries.
3. Skill categories and technical capability descriptions.
4. Developer tools and resource destinations.
5. Contact form, email, LinkedIn, GitHub and résumé download links.

Do not copy private client information, private source code, credentials, personal records or unsupported claims into this public-facing artifact. Treat the Standard View's verified portfolio content as the source of truth, while retaining the Folder View's independent visual design.

### Verification checklist

- [ ] All five folder categories and labels are correct.
- [ ] All seven project entries and guide destinations are present.
- [ ] Résumé, About, Tools, SVG Library, Projects and Contact destinations resolve.
- [ ] Email, LinkedIn and GitHub links are correct.
- [ ] Open, Download and Share behavior is checked in a supported browser.
- [ ] Existing folder artwork, animation, preview, close and responsive behavior remain intact.
- [ ] The main portfolio's view selector remains available in Folder View and at the bottom of the Standard View navigation menu.