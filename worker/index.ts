/**
 * Cloudflare Worker for the portfolio.
 *
 * - Static files (the `next build` export in ./out) are served by the
 *   Workers static-assets layer before this code runs.
 * - Only `/api/*` requests reach this Worker (see `run_worker_first` in
 *   wrangler.jsonc). `/api/contact` delivers contact-form messages to your
 *   inbox through Cloudflare Email Service.
 *
 * Types are declared locally so the Next.js type-check does not need
 * @cloudflare/workers-types.
 */

interface EmailAddress {
  email: string;
  name?: string;
}

interface SendEmailBinding {
  send(message: {
    to: string | EmailAddress;
    from: string | EmailAddress;
    subject: string;
    text?: string;
    html?: string;
    replyTo?: string | EmailAddress;
  }): Promise<{ messageId: string }>;
}

interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

export interface Env {
  ASSETS: AssetsBinding;
  /** Optional until Email Service is set up — see README "Contact form". */
  EMAIL?: SendEmailBinding;
  /** Your verified inbox, e.g. you@gmail.com */
  CONTACT_TO?: string;
  /** Sender on your Cloudflare domain, e.g. portfolio@yourdomain.com */
  CONTACT_FROM?: string;
}

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

const clean = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405);
  }

  // Only accept submissions from this site.
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json({ ok: false, error: 'Forbidden' }, 403);
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'Invalid request body' }, 400);
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(payload.company, 200)) {
    return json({ ok: true });
  }

  const name = clean(payload.name, MAX_NAME);
  const email = clean(payload.email, MAX_EMAIL);
  const message = clean(payload.message, MAX_MESSAGE);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Please fill in all fields' }, 422);
  }

  if (!env.EMAIL || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json(
      { ok: false, error: 'Contact form is not configured yet' },
      503
    );
  }

  try {
    await env.EMAIL.send({
      to: env.CONTACT_TO,
      from: { email: env.CONTACT_FROM, name: 'Portfolio contact form' },
      replyTo: { email, name },
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return json({ ok: true });
  } catch (error) {
    const code = (error as { code?: string }).code ?? 'UNKNOWN';
    console.error('Contact email failed', code, (error as Error).message);
    return json({ ok: false, error: 'Message could not be sent' }, 502);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact') {
      return handleContact(request, env);
    }
    if (pathname.startsWith('/api/')) {
      return json({ ok: false, error: 'Not found' }, 404);
    }

    // Anything else falls through to the static site.
    return env.ASSETS.fetch(request);
  },
};
