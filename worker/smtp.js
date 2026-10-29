// Minimal SMTP submission client for Cloudflare Workers.
//
// Workers cannot use a Node SMTP library, so this speaks the protocol directly
// over the runtime's TCP socket API. It supports both submission styles Amazon
// SES offers: STARTTLS upgrade (port 587/2587) and implicit TLS (port 465/2465).
// Port 25 is intentionally unsupported; Cloudflare blocks it.

import { connect } from 'cloudflare:sockets';

const CRLF = '\r\n';
const encoder = new TextEncoder();
const decoder = new TextDecoder();

class SmtpError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'SmtpError';
    this.code = code || 0;
  }
}

// Reads CRLF-delimited SMTP replies off the socket, buffering partial reads.
class ReplyReader {
  constructor(readable) {
    this.reader = readable.getReader();
    this.buffer = '';
    this.done = false;
  }

  async readLine() {
    for (;;) {
      const index = this.buffer.indexOf('\n');
      if (index !== -1) {
        const line = this.buffer.slice(0, index).replace(/\r$/, '');
        this.buffer = this.buffer.slice(index + 1);
        return line;
      }
      if (this.done) throw new SmtpError('The mail server closed the connection unexpectedly.');
      const { value, done } = await this.reader.read();
      if (done) {
        this.done = true;
        if (!this.buffer) throw new SmtpError('The mail server closed the connection unexpectedly.');
        continue;
      }
      this.buffer += decoder.decode(value, { stream: true });
      if (this.buffer.length > 65536) throw new SmtpError('The mail server sent an oversized reply.');
    }
  }

  // An SMTP reply is one or more lines; every line but the last has a '-' after the code.
  async readReply() {
    const lines = [];
    let code = 0;
    for (;;) {
      const line = await this.readLine();
      lines.push(line);
      code = Number.parseInt(line.slice(0, 3), 10);
      if (!Number.isInteger(code)) throw new SmtpError('The mail server sent a malformed reply.');
      if (line.charAt(3) !== '-') break;
      if (lines.length > 64) throw new SmtpError('The mail server sent too many reply lines.');
    }
    return { code, lines, text: lines.join('\n') };
  }

  release() {
    try { this.reader.releaseLock(); } catch (_) { /* already released */ }
  }
}

export class SmtpClient {
  constructor(options) {
    this.hostname = options.hostname;
    this.port = options.port;
    this.implicitTls = options.implicitTls;
    this.socket = null;
    this.writer = null;
    this.replies = null;
  }

  async #attach(socket) {
    this.socket = socket;
    this.writer = socket.writable.getWriter();
    this.replies = new ReplyReader(socket.readable);
  }

  async #detach() {
    if (this.replies) this.replies.release();
    if (this.writer) {
      try { this.writer.releaseLock(); } catch (_) { /* already released */ }
    }
    this.writer = null;
    this.replies = null;
  }

  async #send(line) {
    await this.writer.write(encoder.encode(line + CRLF));
  }

  // Sends a command and asserts the reply code is one the caller expects.
  async #command(line, expected, describe) {
    if (line !== null) await this.#send(line);
    const reply = await this.replies.readReply();
    if (!expected.includes(reply.code)) {
      throw new SmtpError(`${describe} failed: ${reply.text}`, reply.code);
    }
    return reply;
  }

  async connect() {
    const socket = connect(
      { hostname: this.hostname, port: this.port },
      { secureTransport: this.implicitTls ? 'on' : 'starttls', allowHalfOpen: false }
    );
    await this.#attach(socket);
    await this.#command(null, [220], 'Connecting to the mail server');
    const ehlo = await this.#command(`EHLO ${this.hostname}`, [250], 'EHLO');

    if (!this.implicitTls) {
      await this.#command('STARTTLS', [220], 'STARTTLS');
      await this.#detach();
      const secure = this.socket.startTls();
      this.socket = secure;
      await this.#attach(secure);
      return await this.#command(`EHLO ${this.hostname}`, [250], 'EHLO over TLS');
    }
    return ehlo;
  }

  async login(username, password) {
    // AUTH LOGIN is what SES advertises; credentials go out only after TLS.
    await this.#command('AUTH LOGIN', [334], 'AUTH LOGIN');
    await this.#command(base64(username), [334], 'Username');
    await this.#command(base64(password), [235], 'Authentication');
  }

  async sendMessage({ from, recipients, raw }) {
    await this.#command(`MAIL FROM:<${from}>`, [250], 'MAIL FROM');
    for (const rcpt of recipients) {
      await this.#command(`RCPT TO:<${rcpt}>`, [250, 251], 'RCPT TO');
    }
    await this.#command('DATA', [354], 'DATA');
    await this.writer.write(encoder.encode(dotStuff(raw) + CRLF + '.' + CRLF));
    const reply = await this.replies.readReply();
    if (reply.code !== 250) throw new SmtpError(`The message was rejected: ${reply.text}`, reply.code);
    return reply.lines[0] || '';
  }

  async quit() {
    try {
      await this.#send('QUIT');
    } catch (_) { /* the server may already have gone away */ }
    await this.close();
  }

  async close() {
    await this.#detach();
    try { await this.socket?.close(); } catch (_) { /* already closed */ }
    this.socket = null;
  }
}

function base64(value) {
  const bytes = encoder.encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

// A line of body text that begins with '.' would otherwise end the DATA block.
function dotStuff(body) {
  return body.replace(/\r?\n/g, CRLF).replace(/^\./gm, '..');
}

// RFC 2047 encoded-word, so non-ASCII subjects and display names survive transit.
export function encodeHeader(value) {
  if(typeof value!=='string'||/[\x00-\x1F\x7F]/.test(value))
    throw new SmtpError('Invalid email header value',400);
  if (/^[\x20-\x7E]*$/.test(value)) return value;
  const bytes = encoder.encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return `=?UTF-8?B?${btoa(binary)}?=`;
}

export function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Builds a multipart/alternative message so clients that refuse HTML still read it.
export function buildMimeMessage({ from, fromName, to, cc, replyTo, subject, text, html, messageId }) {
  const boundary = `----bolekpad-${crypto.randomUUID()}`;
  const fromHeader = fromName ? `${encodeHeader(fromName)} <${from}>` : from;
  const headers = [
    `From: ${fromHeader}`,
    `To: ${to.join(', ')}`,
  ];
  if (cc.length) headers.push(`Cc: ${cc.join(', ')}`);
  if (replyTo) headers.push(`Reply-To: ${replyTo}`);
  headers.push(
    `Subject: ${encodeHeader(subject)}`,
    `Message-ID: <${messageId}>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'X-Mailer: Boleksend',
    `Content-Type: multipart/alternative; boundary="${boundary}"`
  );

  const body = [
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    text,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    html,
    '',
    `--${boundary}--`,
  ];

  return headers.concat(body).join(CRLF);
}

export { SmtpError };
