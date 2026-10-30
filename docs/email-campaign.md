# Services email campaign

The marketing email and its images live in `public/email/`, so the site hosts them at:

- Web version: https://portfolio.jelvan.pro/email/
- Images: `https://portfolio.jelvan.pro/email/images/<file>`

| File | Use |
|---|---|
| `public/email/index.html` | Full email. Also works as the "view in browser" page and in Amazon SES or any email service. |
| `public/email/zoho-insert.html` | Body only, for Zoho Mail's **Insert HTML**. |
| `public/email/images/` | JPG and PNG images only (no SVG), so they display in Gmail, Outlook and Zoho Mail. |

## Sending from Zoho Mail

1. Compose a new email and set the subject.
2. In the formatting toolbar, choose **Insert HTML** (the `<>` icon).
3. Paste the contents of `zoho-insert.html` and click **Insert**.
4. Send a test to yourself (Gmail and Outlook) before sending to clients.

All styling is inline, so the layout holds even when a composer removes `<style>` blocks.
The images load from portfolio.jelvan.pro, so keep this folder deployed while the email is in use.

## Changing an image

Replace the file in `public/email/images/` with one of the same name and size, then push to `main`.
