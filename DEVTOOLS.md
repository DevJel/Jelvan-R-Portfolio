# Dev Tools

The portfolio navigation opens `/tools`. Existing `/articles` and `/portfolio/articles` bookmarks render the same developer workspace.

- **HTML Viewer:** paste or open HTML, preview inline HTML/CSS at desktop, tablet or mobile widths, and download the original source. The preview uses an opaque-origin sandbox and a restrictive CSP. Scripts, embedded frames, active links, external resources and event handlers are disabled. Downloaded HTML contains the original input and is not sanitized.
- **OTP Generator:** random 4/6/8/10-digit development codes, or 6/8-digit SHA-1 TOTP from a Base32 secret with a 30-second step. Random codes do not implement delivery, expiry or single-use enforcement. TOTP secrets stay in memory and are cleared when leaving the tool.
- **Key Generator:** 16/32/64/128-character hexadecimal, alphanumeric, Base32-alphabet or URL-safe random tokens. Lengths are characters, not bytes; 64 hex characters represent 32 bytes.
- **Password Generator:** 8–128 characters, with every selected character group represented. Random generation uses Web Crypto and rejection sampling to avoid modulo bias.
- **Base32 / Base64:** UTF-8 text encoding and decoding with input validation. These encodings do not encrypt data.
- **Notes:** versioned local storage, copy, text download, and confirmed deletion. Notes are not encrypted or synced, and storage failures are reported. Only notes are persisted.

No tool sends user inputs or generated values to an API. Clipboard access requires browser permission and a secure context. Use HTTPS in production.

## Validation

Run `npm run test:tools`, `npm run typecheck`, and `npm run build`. Unit tests include RFC 4648 Base32 vectors, Unicode round trips, all RFC 6238 SHA-1 vectors, invalid inputs, and generator length/character requirements.

Browser checks cover all six panels, preview script/network isolation, clipboard, note reload/download/deletion, legacy routes, and 320px/390px layouts.
