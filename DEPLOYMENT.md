# Deployment Guide

How to put this portfolio live on Cloudflare from GitHub.

**How it works:** `npm run build` exports the whole site as static files into `out/`. A Cloudflare Worker serves those files from Cloudflare's edge. Worker code only runs for `/api/*` (the contact form). Configuration lives in `wrangler.jsonc`.

| | |
|---|---|
| Repository | `jelvan-operava/Jelvan-R-Portfolio`, branch `main` |
| Worker name | `jelvan-r-portfolio` (set in `wrangler.jsonc`) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Output folder | `out/` |
| Node.js | 18.18 or later (20 recommended) |
| Default URL | `https://jelvan-r-portfolio.<your-subdomain>.workers.dev` |

---

## Before the first deploy

- [ ] Replace content that is not yours. The résumé, phone number, location, career history, CV PDF (`public/assets/vushenko2026.pdf`), award PDF and Google Scholar link still come from the original template.
- [ ] Update the social links in `components/Contact/Contact.config.tsx` and the GitHub/LinkedIn links in `components/Resume/Resume.tsx`.
- [ ] Replace images, keeping the same file names and paths so no code changes are needed.
- [ ] Decide which Cloudflare account the site belongs to.

---

## Option A: Connect GitHub in the Cloudflare dashboard (recommended)

No API tokens or GitHub secrets needed. Every push to `main` deploys automatically.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select the account to use.
2. Go to **Workers & Pages → Create → Import a repository**.
3. Connect GitHub if asked, and give Cloudflare access to `jelvan-operava/Jelvan-R-Portfolio`.
4. Select the repository and set:
   - **Project name:** `jelvan-r-portfolio` (must match `name` in `wrangler.jsonc`)
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** leave empty
5. Click **Create and deploy**. The first build takes about 2–3 minutes.
6. Open the `*.workers.dev` URL shown when it finishes.

Pushes to other branches create preview builds automatically. Turn this off in **Settings → Build → Branch control** if you don't want previews.

---

## Option B: Deploy from your computer

Useful for a one-off manual deploy.

```bash
git clone https://github.com/jelvan-operava/Jelvan-R-Portfolio.git
cd Jelvan-R-Portfolio
npm install
npx wrangler login      # opens the browser to authorize Cloudflare
npm run deploy          # builds, then deploys
```

If you have several Cloudflare accounts, Wrangler asks which one to use. To skip the prompt, set `CLOUDFLARE_ACCOUNT_ID` first:

```bash
CLOUDFLARE_ACCOUNT_ID=<account-id> npm run deploy
```

Test locally before deploying with `npm run preview` (site + Worker at http://localhost:8787).

---

## Option C: GitHub Actions

The workflow in `.github/workflows/deploy.yml` already builds every push and pull request. It deploys from `main` once these secrets exist:

1. Cloudflare dashboard → **My Profile → API Tokens → Create Token** → use the **Edit Cloudflare Workers** template → select your account → create, then copy the token.
2. Copy your **Account ID** (Workers & Pages overview page, right sidebar).
3. GitHub → repository **Settings → Secrets and variables → Actions → New repository secret**:
   - `CLOUDFLARE_API_TOKEN` = the token
   - `CLOUDFLARE_ACCOUNT_ID` = the account ID
4. GitHub → **Actions → Build & Deploy → Run workflow** on `main` (or push any commit).

Use **either** Option A **or** Option C, not both, or every push deploys twice.

---

## Custom domain

The domain must be on Cloudflare DNS in the same account.

1. Worker `jelvan-r-portfolio` → **Settings → Domains & Routes → Add → Custom domain**.
2. Enter the domain (e.g. `jelvan.com` or `www.jelvan.com`) and confirm. Cloudflare creates the DNS record and SSL certificate.
3. Optional: turn off the `workers.dev` URL in the same screen once the custom domain works.

---

## Contact form (Cloudflare Email Service)

Until this is configured, the form shows **"Not sent, retry"**. Nothing else on the site depends on it.

1. Cloudflare dashboard → **Email Service** → **Onboard Domain** → pick your domain. It adds the SPF/DKIM DNS records.
2. In **Email Routing → Destination addresses**, add the inbox that should receive messages and click the verification link Cloudflare emails you.
3. Edit `wrangler.jsonc`:

   ```jsonc
   "vars": {
     "CONTACT_TO": "you@example.com",            // the verified inbox
     "CONTACT_FROM": "portfolio@yourdomain.com"  // any address on the onboarded domain
   },
   "send_email": [
     {
       "name": "EMAIL",
       "allowed_destination_addresses": ["you@example.com"]
     }
   ],
   ```

4. Commit and push (Option A/C) or run `npm run deploy` (Option B).
5. Send a test message from the Contact page. Replies go straight to the visitor because their address is set as Reply-To.

---

## Check after each deploy

- [ ] Home page loads with the landing animation and photo
- [ ] `/portfolio/about`, `/portfolio/projects`, `/portfolio/contact`, `/portfolio/resume` and `/articles` open directly (not only via links)
- [ ] An unknown URL shows the 404 page
- [ ] Images and the Segoe UI font load (no broken images)
- [ ] Hamburger menu opens and its links work
- [ ] Contact form sends, if configured
- [ ] "Download CV" downloads the right file

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails on `npm install` | Make sure the build uses Node 18.18+ (set `NODE_VERSION=20` under the Worker's **Settings → Build → Variables**). |
| "A Worker with this name already exists" | Change `name` in `wrangler.jsonc`, or deploy into the existing Worker on purpose. |
| Deploy asks which account to use | Set `CLOUDFLARE_ACCOUNT_ID` (Option B/C). |
| Page works from links but 404s when opened directly | Confirm `out/` contains that page's `.html` file after `npm run build`. |
| Contact form says "Not sent, retry" | Email Service not set up, `CONTACT_TO`/`CONTACT_FROM` empty, or `send_email` still commented out. Check logs in Worker → **Observability**. |
| Old version still showing | Hard refresh (Ctrl/Cmd + Shift + R); check the latest deployment under Worker → **Deployments**. |

## Rollback

Worker → **Deployments** → choose an earlier version → **Rollback**. Or revert the commit on GitHub and let it redeploy.
