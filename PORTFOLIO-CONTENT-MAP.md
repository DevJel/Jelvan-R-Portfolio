# Portfolio content map — Standard View and Folder View

This document defines the content-parity contract for the two homepage presentations. The Standard View remains the source of truth for professional facts, project descriptions, route destinations and contact links. Folder View is a separate visual presentation of that information.

## Experience boundaries

**Default entry:** Standard View is now the first-visit experience. Folder View remains available through the view selector.

| Presentation | Source | Design rule |
| --- | --- | --- |
| Standard View | Next.js pages and React components under `pages/` and `components/` | Preserve the original navigation, landing composition, page layouts, typography, color system and interactions. |
| Folder View | `Jelvan Folder Portfolio Design/index.html` | Preserve the existing desk, folder artwork, glass surfaces, typography, motion, responsive sizing, sound control and preview behavior while updating portfolio content and destinations. |
| Homepage selector | `pages/index.tsx` | New visitors default to Standard View. The selected view is remembered under the versioned `jelvan-portfolio-view-v2` browser-storage key so older Folder View defaults do not override the new default. The same selector remains available in both presentations. |

The two presentations are intentionally not visually identical. Content parity means that names, facts, descriptions, destinations and project maturity are consistent; it does not mean copying one design into the other.

## Standard View source-of-truth files

| Content area | Primary source |
| --- | --- |
| Homepage and view selector | `pages/index.tsx` |
| About and professional profile | `components/About/`, especially `About.content.ts` and the slide components |
| Project titles, descriptions, scope, maturity and technology labels | `components/HighlightedProjects/HighlightedProjects.config.tsx` |
| Project guides and route slugs | `pages/projects/[slug].tsx` |
| Résumé, professional experience, education and certifications | `components/Resume/Resume.tsx` and `components/Resume/Resume.config.tsx` |
| Developer toolkit | `components/DevTools/` and `pages/tools.tsx` |
| SVG Library | `pages/svg-library.tsx` and `components/DevTools/SvgLibraryPage.tsx` |
| Contact and social links | `components/Contact/Contact.config.tsx` |
| Navigation labels and destinations | `components/NavigationMenu/NavigationMenu.config.ts` |

## Folder View content mapping

All URLs below use the public portfolio origin, `https://portfolio.jelvan.pro`, unless a destination is explicitly external or uses `mailto:`.

### 1. Projects

| Folder card | Standard View destination | Content alignment |
| --- | --- | --- |
| Master AI — Multi-Agent Workspace | `/projects/master-ai-multi-agent-workspace` | Specialist assistants, knowledge retrieval, governed workflows and human approval. Private product showcase; no internal source or organization configuration is published. |
| Knowledge Center System | `/projects/knowledge-center-system` | Policies, SOPs, process maps, learning paths, references and onboarding knowledge. Public sample: `https://app-bible.jelvan.pro/`. |
| Internal Email System | `/projects/internal-email-system` | Internal communications, recruitment, employee notifications, customer correspondence and responsible sending. Private application showcase. |
| HR Information System | `/projects/hr-information-system` | Workforce planning through recruitment, onboarding, employee records, time, leave, performance, employee relations and offboarding. Public prototype; not approved for real employee or payroll records without production review. |
| BOLEKpad — Personal Workspace | `/projects/bolekpad-personal-workspace` | Notes, documents, attachments, team knowledge, task coordination and AI-assisted productivity. Private application showcase. |
| Online Printing Store | `/projects/online-printing-store` | Print catalogue, configuration, quotation, proofing, checkout, production and delivery. Concept guide; source repository and production stack are not verified. |
| Developers Playground — DevAI | `/projects/developers-playground-devai` | AI-assisted coding, project resources, connectors, media handling and engineering workflows. Feature availability requires independent verification. |

### 2. Profile

| Folder card | Standard View destination | Content alignment |
| --- | --- | --- |
| Professional Profile | `/portfolio/about` | Strategic HR professional, full-stack software developer and AI/digital transformation practitioner. |
| Professional Résumé | `/portfolio/resume` | Professional summary, key highlights, experience, education and certifications. |
| Professional Experience | `/portfolio/resume` | Web development and consulting, global advertising support, shared-services HR and customer experience roles. |
| Education & Development | `/portfolio/resume` | Dual-specialization master's studies in AI for Business and HR/Talent Management, plus BS Business Administration. |
| Certifications | `/portfolio/resume` | Software development, AI, HR, recruiting, Lean Six Sigma, leadership and customer service credentials. |

### 3. Skills & Expertise

| Folder card | Standard View destination | Content alignment |
| --- | --- | --- |
| Strategic HR | `/portfolio/about` | Workforce planning, talent acquisition, employee relations, policy, compliance, performance and HRIS administration. |
| Digital Strategy & Branding | `/portfolio/about` | Web layout, digital branding, domain administration, internal communications and HRIS/CRM administration. |
| AI & Automation | `/portfolio/about` | Custom agents, knowledge architecture, workflow automation, process mapping and business intelligence. |
| Cloud & Engineering | `/portfolio/about` | Cloudflare services, JavaScript, TypeScript, React, Next.js, Python, HTML and CSS. |
| Process & Operations | `/portfolio/about` | Process mapping, strategic planning, operational improvement, organizational scaling and service delivery. |

### 4. Developer Lab

| Folder card | Standard View destination | Content alignment |
| --- | --- | --- |
| Developer Toolkit | `/tools` | HTML preview, JSON, text comparison, encoding, security identifiers, debugging, CSS, SEO and deployment utilities. |
| SVG Library | `/svg-library` | Searchable SVG resources and supported preview/copy/download actions. |
| Technical Articles | `/portfolio/articles` | Articles and technical learning content. |
| GitHub Repositories | `/projects` | Repository explorer. Public repository details and limited private metadata are subject to the access rules documented in the application. |
| Project Guides | `/projects` | Seven static project guides with maturity, architecture opportunities, setup, deployment and security guidance. |

### 5. Contact & Links

| Folder card | Destination | Content alignment |
| --- | --- | --- |
| Contact Form | `/portfolio/contact` | Main portfolio inquiry form. |
| Email | `mailto:hello@work.jelvan.pro` | Professional email contact. |
| Phone | `tel:+639605193602` | Telephone contact listed in the public résumé. |
| LinkedIn | `https://my.linkedin.com/in/jelvanricolcol` | Professional profile. |
| GitHub | `https://github.com/DevJel` | Public development profile. |
| Download CV | `/assets/jelvan-ricolcol-resume.pdf` | Current résumé PDF. |

## Interaction behavior and limits

- Selecting a folder opens its existing animated folder presentation.
- Selecting a file opens the existing expanded preview card.
- **Open** follows a configured destination in a new tab.
- **Download** opens the configured résumé PDF when the selected card has a download destination. Other cards do not claim to be downloadable files.
- **Share** uses the browser share sheet where available, or copies the configured URL to the clipboard.
- The add-file interaction remains temporary in-memory demonstration state. It does not create a real cloud or local file.
- The Skills & Expertise contextual menu remains a visual/demo menu; it does not delete or move real files.
- No authentication, database, file upload service or cloud-drive backend is added by this content synchronization.

## Update procedure

When Standard View content changes:

1. Update the relevant Standard View source first.
2. Check project names, summaries, maturity notes, route slugs and public links against the source.
3. Update the matching Folder View file-card data in the bundled React application inside `Jelvan Folder Portfolio Design/index.html`.
4. Keep the folder count, file count, labels, accessible names, descriptions and destinations consistent.
5. Update this document and `Jelvan Folder Portfolio Design/README.md` in the same change.
6. Preserve the existing visual design and test folder open/close, preview, open link, CV download, share/copy, keyboard focus, responsive layout and reduced-motion behavior.
7. Run the main portfolio type checks, tests and build. Separately test the standalone Folder View because the Next.js build does not compile its bundled HTML application.
8. Verify both production deployments against the exact commit before announcing completion.

## Deployment distinction

- Standard View and the homepage selector are part of the Next.js static export under `out/`, deployed to `portfolio.jelvan.pro`.
- Folder View is a standalone HTML artifact at `Jelvan Folder Portfolio Design/index.html` and is embedded from `https://jelvan-folder-portfolio-design.pages.dev/`.
- The two views use separate hosting outputs. A successful Next.js build does not prove that the standalone Folder View has been deployed.
- The standalone Cloudflare Pages project was verified as `jelvan-folder-portfolio-design`, connected to this repository's `main` branch with root directory `Jelvan Folder Portfolio Design`, no build command and output directory `.`. The main Pages project remains `jelvan-r-portfolio`, repository root, `npm run build`, output `out`.

## Review checklist

- [ ] Seven project names and project maturity notes match the Standard View.
- [ ] Profile, experience, education and certifications match the résumé.
- [ ] Skills and technology labels match the About content.
- [ ] Developer Lab links point to the correct tools, SVG, articles and project routes.
- [ ] Contact and social links are current.
- [ ] Folder View design and interaction behavior remain unchanged.
- [ ] Standard View retains its original navigation and uses one project cover image plus its title for each featured project; long descriptions and detail panels remain on each dedicated project guide.
- [ ] Both deployments reference the intended commit and pass production smoke tests.


## PROCTORAVA — Standard View project 02

The second selected project is **LEARNING MANAGEMENT SYSTEM - PROCTORAVA**, developed by **Jelvan R · Developer**. Its cover artwork is sourced from `public/assets/portfolio/projects/desktopview-proctorava.png` and `mobileview-proctorava.png`; the desktop and mobile device images use separate hover transforms. The project guide route is `/projects/proctorava-learning-management-system`. The guide describes registration, email OTP, phone-based identity verification, assessment delivery, proctoring signals, recruitment administration, deployment and privacy/security considerations. Treat these as the product showcase scope; verify current production integrations and readiness independently.
