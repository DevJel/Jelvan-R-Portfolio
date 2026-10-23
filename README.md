# Jelvan® | Personal Portfolio

Welcome to my personal portfolio: an interactive, minimalist desktop-inspired web experience. The site brings together my professional profile, technical interests, and selected software projects in a responsive interface inspired by modern desktop operating systems.

Explore the live portfolio at **[portfolio.jelvan.pro](https://portfolio.jelvan.pro)**.

---

## 👋 About

I work across full-stack software development, automation, user experience, and human resources practice. This portfolio is a personal project designed to present my work, skills, and approach to building useful digital tools.

**Areas of interest**
- Full-stack web applications and responsive interfaces
- Workflow automation, integrations, and developer tooling
- Cloud deployment and application reliability
- Data visualization, reporting, and operational analytics
- Human resources processes and digital productivity

## 🧰 Technologies

The portfolio uses the following technologies and development patterns:

- **Framework:** Next.js
- **Language:** TypeScript
- **State management:** Redux Toolkit
- **Styling:** Styled-Components
- **Component development:** Storybook
- **Data and persistence:** MongoDB
- **Hosting and deployment:** Cloudflare Pages, Cloudflare Workers, and GitHub Actions

---

## ✨ Portfolio Features

- **Desktop-style interface:** A multi-window experience with window resizing, focus management, and taskbar interactions.
- **Interactive workspaces:** Portfolio views styled as desktop utilities, including a file explorer, terminal, code editor, and settings panels.
- **Project showcases:** Selected projects and technical work presented in an explorable interface.
- **Responsive design:** Layouts and interactions adapted for different screen sizes.
- **Contact form:** A server-side endpoint for receiving portfolio inquiries.

---

## 🛠️ Local Development

### Prerequisites

- [Node.js](https://nodejs.org) 18.18 or later (Node.js 20 LTS recommended)

### Get started

```bash
git clone https://github.com/Dev-Jel-Works/Jelvan-R-Portfolio.git
cd Jelvan-R-Portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Run the Next.js development server |
| `npm run build` | Build the static site into `out/` |
| `npm run typecheck` | Check TypeScript types |
| `npm run preview` | Build the site and preview the contact endpoint locally |
| `npm run deploy` | Deploy the contact endpoint only |

---

## ☁️ Hosting

The portfolio is published at **[portfolio.jelvan.pro](https://portfolio.jelvan.pro)**.

- The website is built as a static Next.js export and hosted on Cloudflare Pages.
- A separate Cloudflare Worker handles contact form requests.
- GitHub Actions can validate builds and publish the site when the required deployment configuration is available.
- API credentials and deployment settings are maintained outside the repository.

The website and contact endpoint are deployed separately. Running `npm run deploy` updates the contact endpoint, not the static website.

### Contact form

The form accepts a message, validates submitted input, and sends a notification and an acknowledgment email. Server-side checks include input-size limits, anti-spam measures, and origin validation.

For inquiries, use **[hello@work.jelvan.pro](mailto:hello@work.jelvan.pro)**.

---

## ⚖️ License & Attribution

**Proprietary. All rights reserved.** This repository and [portfolio.jelvan.pro](https://portfolio.jelvan.pro) belong to **Mr. Jelvan B. Ricolcol, CHRA, MHR, MBAI (Jelvan®)**. Copying, redistribution, or derivative works require written permission. See [LICENSE](./LICENSE).

Open-source libraries and third-party dependencies retain their respective licenses.

For security disclosures, see [SECURITY.md](./SECURITY.md).
