# Security Policy

This repository and https://portfolio.jelvan.pro are owned and maintained by Mr. Jelvan B. Ricolcol, CHRA, MHR, MBAI.

## Reporting a vulnerability

Please report security issues privately by email to **hello@work.jelvan.pro**. Do not open a public GitHub issue for security problems.

Include:
- What you found and where (URL, page or file)
- Steps to reproduce
- The possible impact

You'll get an acknowledgement as soon as possible, and the issue will be fixed and confirmed back to you.

## Scope

- The website at https://portfolio.jelvan.pro
- The contact form endpoint `/api/contact`
- This repository and its GitHub Actions workflow

## Rules

- Don't access, change or delete data that isn't yours.
- Don't run denial-of-service, spam or automated flooding against the site or the contact form.
- Give reasonable time to fix an issue before sharing it publicly.

## How the site is protected

- Hosted on Cloudflare and served over HTTPS, with strict browser security headers (no embedding in other sites, no MIME sniffing, HSTS, restricted browser features).
- The site is static. The only server code is the contact form, which validates input, limits field lengths, rejects other websites' requests and filters bots with a hidden honeypot field.
- No visitor accounts, passwords or payment details are collected or stored.
- Deployment credentials are kept in GitHub/Cloudflare secrets, never in the code.

## Website projects

For help creating a website, or for permission to use anything from this repository (see [LICENSE](./LICENSE)), contact **hello@work.jelvan.pro**.
