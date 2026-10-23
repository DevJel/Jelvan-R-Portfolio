/**
 * Contact API Worker for portfolio.jelvan.pro.
 *
 * The static portfolio is deployed separately on Cloudflare Pages.
 * Only portfolio.jelvan.pro/api/contact* is routed to this Worker.
 *
 * Email delivery is delegated over a Cloudflare service binding to the
 * internal portfolio mail endpoint on operava-employee-control. That Worker
 * keeps the AWS credential secrets and submits through Amazon SES SMTP over
 * implicit TLS in ap-southeast-2.
 */

interface ServiceBinding {
  fetch(request: Request): Promise<Response>;
}

export interface Env {
  MAILER?: ServiceBinding;
  CONTACT_TO?: string;
}

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const MAX_BODY_BYTES = 16000;
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const EXPECTED_HOST = 'portfolio.jelvan.pro';
// BCC only the visitor's confirmation, never the private inquiry notification.
const CONFIRMATION_BCC = 'rjelvan@operavaglobal.com';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1']);

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });

const clean = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => {
    const replacements: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return replacements[char] ?? char;
  });

const htmlLines = (value: string): string =>
  escapeHtml(value).replace(/\r?\n/g, '<br>');

function confirmationEmail(
  name: string,
  message: string
): { text: string; html: string } {
  const safeName = escapeHtml(name);
  const safeMessage = htmlLines(message);

  const text = `Hi ${name},

Thanks for reaching out through my portfolio. I received your message and will review it as soon as I can.

Your message:
${message}

Best,
Jelvan Ricolcol
hello@work.jelvan.pro
https://portfolio.jelvan.pro`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Message received</title>
</head>
<body style="margin:0;padding:0;background:#fff7f0;color:#17181d;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fff7f0;margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #f2dfcf;box-shadow:0 12px 40px rgba(23,24,29,.08);">
          <tr><td style="height:8px;background:#f48120;font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr>
            <td style="padding:36px 38px 18px;">
              <div style="font-size:12px;line-height:18px;letter-spacing:.16em;font-weight:700;color:#f48120;text-transform:uppercase;">JELVAN® / PORTFOLIO</div>
              <h1 style="margin:12px 0 14px;font-size:38px;line-height:1.05;letter-spacing:-1.2px;color:#17181d;">Message received<span style="color:#f48120;">.</span></h1>
              <p style="margin:0;font-size:17px;line-height:1.7;color:#4c4d52;">Hi ${safeName}, thanks for reaching out. I’ve received your note and will review it as soon as I can.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 38px 26px;">
              <div style="background:#fff7f0;border-left:4px solid #f48120;border-radius:14px;padding:18px 20px;color:#34353a;font-size:15px;line-height:1.65;">
                <div style="font-size:11px;line-height:16px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:#9a5a22;margin-bottom:8px;">Your message</div>
                ${safeMessage}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 38px 34px;">
              <a href="https://portfolio.jelvan.pro" style="display:inline-block;background:#17181d;color:#ffffff;text-decoration:none;font-size:14px;line-height:20px;font-weight:700;padding:13px 20px;border-radius:999px;">Back to portfolio</a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 38px;background:#17181d;color:#ffffff;">
              <div style="font-size:15px;line-height:22px;font-weight:700;">Jelvan Ricolcol</div>
              <div style="font-size:13px;line-height:20px;color:#c8c9cc;margin-top:3px;">hello@work.jelvan.pro · portfolio.jelvan.pro</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { text, html };
}

function inquiryEmail(
  name: string,
  email: string,
  message: string
): { text: string; html: string } {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = htmlLines(message);

  const text = `New portfolio inquiry

Name: ${name}
Email: ${email}

${message}`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New portfolio inquiry</title>
</head>
<body style="margin:0;background:#fff7f0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#17181d;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#fff;border:1px solid #f2dfcf;border-radius:20px;overflow:hidden;">
          <tr><td style="height:7px;background:#f48120;font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr>
            <td style="padding:30px 34px;">
              <div style="font-size:12px;letter-spacing:.14em;font-weight:700;color:#f48120;text-transform:uppercase;">PORTFOLIO / NEW INQUIRY</div>
              <h1 style="font-size:30px;line-height:1.1;margin:10px 0 22px;">${safeName}</h1>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="font-size:14px;line-height:1.7;color:#4c4d52;">
                <tr>
                  <td style="padding:0 14px 6px 0;font-weight:700;color:#17181d;">Email</td>
                  <td style="padding:0 0 6px;">${safeEmail}</td>
                </tr>
              </table>
              <div style="margin-top:20px;background:#fff7f0;border-left:4px solid #f48120;border-radius:12px;padding:18px 20px;font-size:15px;line-height:1.65;">${safeMessage}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { text, html };
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const isLocal = LOCAL_HOSTS.has(url.hostname);

  if ((!isLocal && url.hostname !== EXPECTED_HOST) || url.pathname !== '/api/contact') {
    return json({ ok: false, error: 'Not found' }, 404);
  }
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405);
  }

  const origin = request.headers.get('origin');
  if (origin && !isLocal && origin !== url.origin) {
    return json({ ok: false, error: 'Forbidden' }, 403);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'Request too large' }, 413);
  }

  let payload: Record<string, unknown>;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return json({ ok: false, error: 'Request too large' }, 413);
    }
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'Invalid request body' }, 400);
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(payload.company, 200)) {
    return json({ ok: true });
  }

  const name = clean(payload.name, MAX_NAME);
  const email = clean(payload.email, MAX_EMAIL).toLowerCase();
  const message = clean(payload.message, MAX_MESSAGE);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Please fill in all fields' }, 422);
  }
  if (!env.MAILER || !env.CONTACT_TO) {
    return json({ ok: false, error: 'Contact form is not configured yet' }, 503);
  }

  const inquiry = inquiryEmail(name, email, message);
  const confirmation = confirmationEmail(name, message);

  try {
    const response = await env.MAILER.fetch(
      new Request('https://portfolio-mail.internal/internal/portfolio-mail', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              to: env.CONTACT_TO,
              subject: `Portfolio inquiry — ${name}`,
              text: inquiry.text,
              html: inquiry.html,
              replyTo: email,
            },
            {
              to: email,
              bcc: CONFIRMATION_BCC,
              subject: 'Thanks for reaching out — Jelvan Ricolcol',
              text: confirmation.text,
              html: confirmation.html,
              replyTo: env.CONTACT_TO,
            },
          ],
        }),
      })
    );

    if (!response.ok) {
      console.error('Portfolio mailer failed', response.status);
      return json({ ok: false, error: 'Message could not be sent' }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    console.error(
      'Portfolio contact delivery failed',
      error instanceof Error ? error.message.slice(0, 200) : 'Unknown error'
    );
    return json({ ok: false, error: 'Message could not be sent' }, 502);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handleContact(request, env);
  },
};
