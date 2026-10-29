/**
 * Dedicated, unexposed SES SMTP relay for the portfolio contact form.
 * Invoked exclusively by a Cloudflare service binding (no public route).
 * SES credentials are bound from the account Secrets Store.
 */
import { SmtpClient, buildMimeMessage } from './smtp.js';

const INBOX = 'hello@work.jelvan.pro';
const CONFIRM_BCC = 'rjelvan@operavaglobal.com';
const CONFIRM_SUBJECT = 'Thanks for reaching out — Jelvan Ricolcol';
const ADDRESS = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const MAX_BODY_BYTES = 50000;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  }});

function validAddress(value) {
  return typeof value === 'string' && value.length <= 254 &&
    ADDRESS.test(value) && !/[\r\n\0]/.test(value);
}
function validContent(message) {
  return message && typeof message === 'object' &&
    typeof message.subject === 'string' && message.subject.length <= 180 &&
    typeof message.text === 'string' && message.text.length <= 15000 &&
    typeof message.html === 'string' && message.html.length <= 20000 &&
    !/[\r\n\0]/.test(message.subject);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname !== 'portfolio-mail.internal' ||
        url.pathname !== '/internal/portfolio-mail') {
      return json({ ok: false, error: 'Not found' }, 404);
    }
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405);
    }
    let payload;
    try {
      const raw = await request.text();
      if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
        return json({ ok: false, error: 'Request too large' }, 413);
      }
      payload = JSON.parse(raw);
    } catch {
      return json({ ok: false, error: 'Invalid JSON' }, 400);
    }
    const messages = payload?.messages;
    if (!Array.isArray(messages) || messages.length !== 2) {
      return json({ ok: false, error: 'Invalid messages' }, 422);
    }
    const [inquiry, confirmation] = messages;
    // Restrict this relay to the exact two-message portfolio workflow.
    // It is not a general-purpose mail-sending or open-relay endpoint.
    if (!validContent(inquiry) || !validContent(confirmation) ||
        inquiry.to !== INBOX || inquiry.bcc !== undefined ||
        !inquiry.subject.startsWith('Portfolio inquiry — ') ||
        !validAddress(inquiry.replyTo) ||
        !validAddress(confirmation.to) ||
        confirmation.to !== inquiry.replyTo ||
        confirmation.bcc !== CONFIRM_BCC ||
        confirmation.replyTo !== INBOX ||
        confirmation.subject !== CONFIRM_SUBJECT) {
      return json({ ok: false, error: 'Invalid portfolio mail request' }, 422);
    }

    let host, port, user, pass;
    try {
      [host, port, user, pass] = await Promise.all([
        env.SES_SMTP_HOST.get(), env.SES_SMTP_PORT.get(),
        env.SES_SMTP_USERNAME.get(), env.SES_SMTP_PASSWORD.get(),
      ]);
    } catch {
      console.error('Portfolio SES Secrets Store is unavailable');
      return json({ ok: false, error: 'Mail configuration unavailable' }, 503);
    }
    const smtpPort = Number.parseInt(String(port || '').trim(), 10);
    if (!String(host || '').endsWith('.amazonaws.com') ||
        ![465, 587, 2465, 2587].includes(smtpPort) || !user || !pass) {
      console.error('Portfolio SES SMTP configuration is invalid');
      return json({ ok: false, error: 'Mail configuration unavailable' }, 503);
    }

    const client = new SmtpClient({
      hostname: String(host).trim(),
      port: smtpPort,
      implicitTls: smtpPort === 465 || smtpPort === 2465,
    });
    try {
      await client.connect();
      await client.login(user, pass);
      for (const message of messages) {
        const recipients = [message.to, ...(message.bcc ? [message.bcc] : [])];
        const raw = buildMimeMessage({
          from: env.MAIL_FROM || INBOX,
          fromName: 'Jelvan Portfolio',
          to: [message.to],
          cc: [],
          replyTo: message.replyTo,
          subject: message.subject,
          text: message.text,
          html: message.html,
          messageId: `${crypto.randomUUID()}@work.jelvan.pro`,
        });
        await client.sendMessage({ from: env.MAIL_FROM || INBOX, recipients, raw });
      }
      await client.quit();
      return json({ ok: true });
    } catch (error) {
      console.error('Portfolio SES submission failed', {
        code: Number.isInteger(error?.code) ? error.code : null,
        message: String(error?.message || 'Unknown error').slice(0, 180),
      });
      await client.close();
      return json({ ok: false, error: 'Email provider rejected delivery' }, 502);
    }
  },
};
