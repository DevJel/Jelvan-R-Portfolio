/** Browser-only utilities. No inputs are sent to a server. */
const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function randomString(length: number, alphabet: string): string {
  if (!Number.isInteger(length) || length < 1 || length > 4096 || alphabet.length < 2 || alphabet.length > 256) {
    throw new Error('Choose a valid length and character set.');
  }
  const limit = 256 - (256 % alphabet.length);
  let result = '';
  while (result.length < length) {
    const bytes = crypto.getRandomValues(new Uint8Array(Math.min(256, (length - result.length) * 2)));
    for (const byte of Array.from(bytes)) {
      if (byte < limit) result += alphabet[byte % alphabet.length];
      if (result.length === length) break;
    }
  }
  return result;
}

export function generatePassword(length: number, groups: string[]): string {
  if (!Number.isInteger(length) || !groups.length || length < 8 || length < groups.length || length > 128) throw new Error('Select at least one character type and a length from 8 to 128.');
  // Rejection sampling gives every valid password equal probability.
  for (let attempt = 0; attempt < 10000; attempt++) {
    const candidate = randomString(length, groups.join(''));
    if (groups.every(group => Array.from(candidate).some(char => group.includes(char)))) return candidate;
  }
  throw new Error('Could not generate a password. Please try again.');
}

export function encodeBase32(bytes: Uint8Array): string {
  let bits = 0, value = 0, output = '';
  for (const byte of Array.from(bytes)) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) { bits -= 5; output += BASE32[(value >>> bits) & 31]; }
  }
  if (bits > 0) output += BASE32[(value << (5 - bits)) & 31];
  return output.padEnd(Math.ceil(output.length / 8) * 8, '=');
}

export function decodeBase32(input: string): Uint8Array {
  const clean = input.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z2-7]*={0,6}$/.test(clean)) throw new Error('Enter valid Base32 text (A-Z and 2-7).');
  const raw = clean.replace(/=+$/, '');
  if (![0, 2, 4, 5, 7].includes(raw.length % 8)) throw new Error('Invalid Base32 length.');
  let bits = 0, value = 0;
  const bytes: number[] = [];
  for (const char of raw) {
    value = (value << 5) | BASE32.indexOf(char);
    bits += 5;
    if (bits >= 8) { bits -= 8; bytes.push((value >>> bits) & 255); }
  }
  if (bits && (value & ((1 << bits) - 1))) throw new Error('Invalid Base32 padding bits.');
  const result = new Uint8Array(bytes);
  if (clean.includes('=') && encodeBase32(result) !== clean) throw new Error('Invalid Base32 padding.');
  return result;
}

export function convertEncoding(input: string, base: '32' | '64', decode: boolean): string {
  if (input.length > 100000) throw new Error('Please use text shorter than 100,000 characters.');
  if (decode) {
    let bytes: Uint8Array;
    if (base === '32') bytes = decodeBase32(input);
    else {
      const clean = input.replace(/\s/g, '');
      if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}(?:==)?|[A-Za-z0-9+/]{3}=?)?$/.test(clean)) throw new Error('Enter valid Base64 text.');
      bytes = Uint8Array.from(atob(clean), char => char.charCodeAt(0));
    }
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  }
  const bytes = new TextEncoder().encode(input);
  return base === '32' ? encodeBase32(bytes) : btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(''));
}

export async function generateTotp(secret: string, digits = 6, timestamp = Date.now()): Promise<string> {
  if (![6, 8].includes(digits)) throw new Error('TOTP supports 6 or 8 digits.');
  const bytes = decodeBase32(secret);
  if (bytes.length < 10 || bytes.length > 128) throw new Error('Use a Base32 secret containing 10 to 128 bytes.');
  const counter = new Uint8Array(8);
  let step = Math.floor(timestamp / 30000);
  for (let i = 7; i >= 0; i--) { counter[i] = step & 255; step = Math.floor(step / 256); }
  const key = await crypto.subtle.importKey('raw', bytes, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, counter));
  const offset = mac[mac.length - 1] & 15;
  const value = ((mac[offset] & 127) << 24) | (mac[offset + 1] << 16) | (mac[offset + 2] << 8) | mac[offset + 3];
  return (value % (10 ** digits)).toString().padStart(digits, '0');
}

/** A restrictive policy plus an opaque-origin iframe isolates pasted markup. */
export function htmlPreview(source: string): string {
  if (source.length > 250000) throw new Error('HTML must be smaller than 250,000 characters.');
  // Template parsing is inert: resources are not loaded while inspecting markup.
  const template = document.createElement('template');
  template.innerHTML = source;
  template.content.querySelectorAll('script,iframe,frame,object,embed,base,meta,link,template,animate,set,animateMotion,animateTransform').forEach(node => node.remove());
  template.content.querySelectorAll('*').forEach(node => {
    for (const attr of Array.from(node.attributes)) {
      if (/^on/i.test(attr.name) || ['href', 'xlink:href', 'action', 'formaction', 'srcdoc', 'target', 'ping', 'srcset'].includes(attr.name)) node.removeAttribute(attr.name);
      if (attr.name === 'src' && !/^data:image\/(png|jpeg|gif|webp);base64,/i.test(attr.value)) node.removeAttribute('src');
    }
  });
  const policy = "default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src 'none'; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'";
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${policy}"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>${template.innerHTML}</body></html>`;
}
