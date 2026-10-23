import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { convertEncoding, generatePassword, generateTotp, htmlPreview, randomString } from '../../utils/dev-tools';
import styles from './DevTools.module.css';
import ExtraTools, { ExtraToolId } from './ExtraTools';

const categories = [
  { id: 'build', title: 'BUILD & PREVIEW' },
  { id: 'data', title: 'DATA & ENCODING' },
  { id: 'security', title: 'SECURITY & IDENTIFIERS' },
  { id: 'debug', title: 'DEBUGGING & REFERENCE' },
] as const;
const tools = [
  { id: 'html', name: 'HTML Viewer', description: 'Safe HTML/CSS preview', icon: 'code', category: 'build' },
  { id: 'json', name: 'JSON Formatter', description: 'Validate, format and minify', icon: 'code', category: 'build' },
  { id: 'diff', name: 'Text Compare', description: 'Line-level differences', icon: 'note', category: 'build' },
  { id: 'notes', name: 'Notes', description: 'Private local scratchpad', icon: 'note', category: 'build' },
  { id: 'encoding', name: 'Base32 / Base64', description: 'Encode, decode and inspect', icon: 'convert', category: 'data' },
  { id: 'url-codec', name: 'URL Encoder', description: 'URIComponent and URI tools', icon: 'convert', category: 'data' },
  { id: 'entities', name: 'HTML Entities', description: 'Escape and unescape markup', icon: 'code', category: 'data' },
  { id: 'jwt', name: 'JWT Inspector', description: 'Unverified token claims', icon: 'shield', category: 'data' },
  { id: 'otp', name: 'OTP Generator', description: 'Random and timed codes', icon: 'shield', category: 'security' },
  { id: 'keys', name: 'Key Generator', description: '16–128 character random keys', icon: 'key', category: 'security' },
  { id: 'password', name: 'Password Generator', description: 'Secure password strings', icon: 'lock', category: 'security' },
  { id: 'hash', name: 'Hash Generator', description: 'SHA-256, SHA-384 and SHA-512', icon: 'shield', category: 'security' },
  { id: 'uuid', name: 'UUID Generator', description: 'Secure random v4 identifiers', icon: 'key', category: 'security' },
  { id: 'regex', name: 'Regex Tester', description: 'Match and inspect patterns', icon: 'code', category: 'debug' },
  { id: 'url-inspect', name: 'URL Inspector', description: 'Parse URLs and queries', icon: 'convert', category: 'debug' },
  { id: 'http', name: 'HTTP Status Codes', description: 'Common response reference', icon: 'note', category: 'debug' },
  { id: 'color', name: 'Color Converter', description: 'HEX, RGB, HSL and contrast', icon: 'convert', category: 'debug' },
  { id: 'time', name: 'Timestamp Converter', description: 'Unix, ISO and local time', icon: 'note', category: 'debug' },
] as const;
type ToolId = typeof tools[number]['id'];
const SAMPLE = '<style>body { font-family: system-ui; padding: 32px; color: #27272a; } h1 { color: #b94e0a; } .card { padding: 28px; background: #fff7ed; border-radius: 18px; }</style>\n<div class="card">\n  <h1>Hello, developer.</h1>\n  <p>Your next idea starts here.</p>\n</div>';
const PASSWORD_GROUPS = { Uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', Lowercase: 'abcdefghijklmnopqrstuvwxyz', Numbers: '0123456789', Symbols: '!@#$%^&*()-_=+[]{}:;,.?' };
const NOTES_KEY = 'jelvan.devtools.notes.v1';
const MAX_NOTES = 100000;

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" /></>,
    shield: <><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z" /><path d="m8 12 3 3 5-6" /></>,
    key: <><circle cx="8" cy="8" r="5" /><path d="m12 12 9 9m-5-5 3-3m-6 0 3-3" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" /></>,
    convert: <><path d="M4 7h16l-4-4m4 14H4l4 4M6 11l-2 2 2 2m12-4 2 2-2 2" /></>,
    note: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8m-8 4h5" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function download(text: string, name: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  const link = document.createElement('a');
  link.href = url; link.download = name; link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function CopyButton({ value }: { value: string }) {
  const [status, setStatus] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { setStatus(''); clearTimeout(timer.current); }, [value]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('Copied');
    } catch { setStatus('Copy unavailable. Select the text to copy it.'); }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(''), 3500);
  };
  return <div className={styles.copy}><button type="button" onClick={copy} disabled={!value}>Copy</button><span role="status">{status}</span></div>;
}

function Result({ value, label = 'Generated value' }: { value: string; label?: string }) {
  return <div className={styles.result}><label>{label}<textarea readOnly value={value} placeholder="Your result will appear here" rows={2} spellCheck={false} /></label><CopyButton value={value} /></div>;
}

function HtmlTool() {
  const [source, setSource] = useState(SAMPLE);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [width, setWidth] = useState('100%');
  useEffect(() => { setPreview(htmlPreview(SAMPLE)); }, []);
  const run = () => {
    try { setPreview(htmlPreview(source)); setError(''); }
    catch (e) { setError((e as Error).message); }
  };
  const openFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 250000) { setError('Choose an HTML file smaller than 250 KB.'); return; }
    try { const text = await file.text(); setSource(text); setPreview(htmlPreview(text)); setError(''); }
    catch { setError('This file could not be opened.'); }
  };
  return <>
    <div className={styles.toolbar}><label className={styles.file}>Open HTML file<input type="file" accept=".html,.htm,text/html" onChange={openFile} /></label><button type="button" onClick={() => download(source, 'preview.html', 'text/html')}>Download HTML</button></div>
    <label>HTML &amp; CSS<textarea className={styles.editor} value={source} onChange={e => setSource(e.target.value)} maxLength={250000} spellCheck={false} autoCapitalize="off" autoCorrect="off" /></label>
    <div className={styles.toolbar}><button className={styles.primary} type="button" onClick={run}>Update preview</button><label className={styles.inline}>Preview width<select value={width} onChange={e => setWidth(e.target.value)}><option value="100%">Full width</option><option value="375px">Mobile · 375px</option><option value="768px">Tablet · 768px</option></select></label></div>
    <p className={styles.hint}>HTML and inline CSS only. Scripts, links and external resources are disabled in the preview.</p>
    <p className={styles.error} role="alert">{error}</p>
    <div className={styles.preview}><iframe title="HTML preview" sandbox="" referrerPolicy="no-referrer" srcDoc={preview} style={{ width, maxWidth: '100%' }} /></div>
  </>;
}

function OtpTool() {
  const [mode, setMode] = useState('random');
  const [digits, setDigits] = useState(6);
  const [secret, setSecret] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(30);
  useEffect(() => {
    if (mode !== 'totp' || !secret.trim()) return;
    let disposed = false;
    let previousStep = -1;
    const tick = async () => {
      const now = Date.now();
      const step = Math.floor(now / 30000);
      setSeconds(30 - Math.floor(now / 1000) % 30);
      if (step === previousStep) return;
      previousStep = step;
      try {
        const code = await generateTotp(secret, digits, now);
        if (!disposed) { setValue(code); setError(''); }
      } catch (e) { if (!disposed) { setValue(''); setError((e as Error).message); } }
    };
    void tick();
    const timer = setInterval(() => void tick(), 1000);
    return () => { disposed = true; clearInterval(timer); };
  }, [mode, secret, digits]);
  const reset = () => { setValue(''); setError(''); };
  return <>
    <div className={styles.fields}><label>Code type<select value={mode} onChange={e => { setMode(e.target.value); setDigits(6); setSecret(''); reset(); }}><option value="random">Random code</option><option value="totp">Time-based code (TOTP)</option></select></label><label>Digits<select value={digits} onChange={e => { setDigits(Number(e.target.value)); reset(); }}>{(mode === 'totp' ? [6, 8] : [4, 6, 8, 10]).map(n => <option key={n} value={n}>{n} digits</option>)}</select></label></div>
    {mode === 'totp' ? <><label>Base32 secret<input type="password" value={secret} onChange={e => { setSecret(e.target.value); reset(); }} autoComplete="off" spellCheck={false} maxLength={256} placeholder="Enter your authenticator secret" /></label><p className={styles.hint}>SHA-1 · 30-second interval. The secret stays in this tab and is never saved.</p>{value ? <p className={styles.hint}>Refreshes in {seconds} seconds</p> : null}</> : <><p className={styles.hint}>Generate random numeric codes for development. Expiration, delivery and one-time use must be enforced by your application.</p><button className={styles.primary} type="button" onClick={() => { try { setValue(randomString(digits, '0123456789')); setError(''); } catch { setError('Secure generation is unavailable in this browser.'); } }}>Generate code</button></>}
    <p className={styles.error} role="alert">{error}</p><Result value={value} label="OTP code" />
    <button type="button" onClick={() => { setSecret(''); reset(); }}>Clear code{mode === 'totp' ? ' and secret' : ''}</button>
  </>;
}

function KeyTool() {
  const [length, setLength] = useState(32);
  const [format, setFormat] = useState('hex');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const alphabets: Record<string, string> = { hex: '0123456789abcdef', alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', base32: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', url: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_' };
  return <>
    <div className={styles.fields}><label>Length<select aria-label="Length" value={length} onChange={e => { setLength(Number(e.target.value)); setValue(''); }}>{[16, 32, 64, 128].map(n => <option key={n} value={n}>{n} characters</option>)}</select></label><label>Character set<select value={format} onChange={e => { setFormat(e.target.value); setValue(''); }}><option value="hex">Hexadecimal</option><option value="alphanumeric">Alphanumeric</option><option value="base32">Base32 alphabet</option><option value="url">URL-safe alphabet</option></select></label></div>
    <p className={styles.hint}>{format === 'hex' ? `${length} hexadecimal characters = ${length / 2} bytes (${length * 4} bits).` : 'Length is measured in characters.'} Generated locally using your browser’s secure random source.</p>
    <button className={styles.primary} type="button" onClick={() => { try { setValue(randomString(length, alphabets[format])); setError(''); } catch { setError('Secure generation is unavailable in this browser.'); } }}>Generate key</button>
    <p className={styles.error} role="alert">{error}</p><Result value={value} label="Generated key" /><button type="button" onClick={() => setValue('')}>Clear key</button>
  </>;
}

function PasswordTool() {
  const [length, setLength] = useState(20);
  const [groups, setGroups] = useState<string[]>(Object.keys(PASSWORD_GROUPS));
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const generate = () => {
    try { setValue(generatePassword(length, groups.map(group => PASSWORD_GROUPS[group as keyof typeof PASSWORD_GROUPS]))); setError(''); }
    catch (e) { setValue(''); setError((e as Error).message); }
  };
  return <>
    <label>Password length: {length}<input type="range" min="8" max="128" value={length} onChange={e => { setLength(Number(e.target.value)); setValue(''); }} /></label>
    <fieldset><legend>Include characters</legend><div className={styles.checks}>{Object.keys(PASSWORD_GROUPS).map(group => <label key={group}><input type="checkbox" checked={groups.includes(group)} onChange={e => { setGroups(previous => e.target.checked ? [...previous, group] : previous.filter(item => item !== group)); setValue(''); }} />{group}</label>)}</div></fieldset>
    <div className={styles.toolbar}><button className={styles.primary} type="button" onClick={generate}>Generate password</button><button type="button" onClick={() => setValue('')}>Clear password</button></div>
    <p className={styles.error} role="alert">{error}</p><Result value={value} label="Generated password" /><p className={styles.hint}>Includes every selected character type. Passwords are never saved by this tool.</p>
  </>;
}

function EncodingTool() {
  const [base, setBase] = useState<'32' | '64'>('64');
  const [input, setInput] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const run = (decode: boolean) => {
    try { setValue(convertEncoding(input, base, decode)); setError(''); }
    catch (e) { setValue(''); setError(e instanceof TypeError ? 'The decoded data is not valid UTF-8 text.' : (e as Error).message); }
  };
  return <>
    <label>Encoding<select value={base} onChange={e => { setBase(e.target.value as '32' | '64'); setValue(''); setError(''); }}><option value="32">Base32</option><option value="64">Base64</option></select></label>
    <label>Input text<textarea rows={6} value={input} maxLength={100000} onChange={e => { setInput(e.target.value); setValue(''); setError(''); }} spellCheck={false} /></label>
    <div className={styles.toolbar}><button className={styles.primary} type="button" onClick={() => run(false)} disabled={!input}>Encode</button><button type="button" onClick={() => run(true)} disabled={!input}>Decode</button><button type="button" onClick={() => { setInput(''); setValue(''); setError(''); }}>Clear text</button></div>
    <p className={styles.error} role="alert">{error}</p><Result value={value} label="Converted text" /><p className={styles.hint}>Supports Unicode text. Encoding changes the representation of data; it does not encrypt it.</p>
  </>;
}

function NotesTool() {
  const [text, setText] = useState('');
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('Loading notes...');
  const [confirmClear, setConfirmClear] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(NOTES_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.version !== 1 || typeof saved.text !== 'string') throw new Error('Invalid note');
        setText(saved.text.slice(0, MAX_NOTES));
      }
      setStatus('Saved on this device');
    } catch { setStatus('Saved notes could not be loaded. You can still write and download notes.'); }
    setReady(true);
  }, []);
  const change = (next: string) => {
    setText(next); setConfirmClear(false);
    try { localStorage.setItem(NOTES_KEY, JSON.stringify({ version: 1, text: next })); setStatus('Saved on this device'); }
    catch { setStatus('Could not save on this device. Download a copy before leaving.'); }
  };
  const clear = () => {
    try { localStorage.removeItem(NOTES_KEY); setText(''); setStatus('Notes cleared from this device'); setConfirmClear(false); }
    catch { setStatus('Could not clear saved notes. Check your browser storage settings.'); }
  };
  return <>
    <p className={styles.hint}>Autosaved in this browser. Notes are not encrypted or synced. Clearing browser data removes them; download a copy to keep them.</p>
    <label>Your notes<textarea className={styles.notes} value={text} disabled={!ready} onChange={e => change(e.target.value)} maxLength={MAX_NOTES} placeholder="Ideas, snippets, reminders..." /></label>
    <div className={styles.noteStatus}><span role="status">{status}</span><span>{text.length.toLocaleString()} / 100,000</span></div>
    <div className={styles.toolbar}><button className={styles.primary} type="button" disabled={!text} onClick={() => download(text, 'developer-notes.txt')}>Download notes</button><CopyButton value={text} /><button type="button" disabled={!text} onClick={() => setConfirmClear(true)}>Clear notes</button></div>
    {confirmClear ? <div className={styles.confirm} role="group" aria-label="Confirm clearing notes"><p>Delete your saved notes on this device?</p><button type="button" onClick={clear}>Delete notes</button><button type="button" onClick={() => setConfirmClear(false)}>Keep notes</button></div> : null}
  </>;
}

export default function DevTools() {
  const [active, setActive] = useState<ToolId>('html');
  const [query, setQuery] = useState('');
  const visibleTools = tools.filter(tool => (tool.name + ' ' + tool.description).toLowerCase().includes(query.toLowerCase().trim()));
  const current = tools.find(tool => tool.id === active)!;
  return <div className={styles.root}>
    <Navbar isLogoExpanded />
    <main className={styles.main}>
      <header className={styles.header}><span className={styles.eyebrow}>DEVELOPER WORKSPACE / TOOLS</span><h1>Dev Tools<span>.</span></h1><p>Essential utilities for building, debugging and shipping on the web.</p><span className={styles.local}>Local-first tools · No login needed</span></header>
      <div className={styles.workspace}>
        <nav className={styles.navigation} aria-label="Developer tools">
          <div className={styles.searchBox}><label htmlFor="developer-tool-search">Find a tool</label><input id="developer-tool-search" aria-label="Search developer tools" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search 18 tools..." autoComplete="off" /></div>
          {categories.map(category => {
            const members = visibleTools.filter(tool => tool.category === category.id);
            return members.length ? <div className={styles.navGroup} key={category.id}>
              <h3>{category.title}</h3>
              {members.map(tool => <button key={tool.id} type="button" className={active === tool.id ? styles.selected : ''} aria-pressed={active === tool.id} aria-controls="tool-workspace" onClick={() => setActive(tool.id)}>
                <span className={styles.toolIcon}><Icon name={tool.icon} /></span><span><strong>{tool.name}</strong><small>{tool.description}</small></span>
              </button>)}
            </div> : null;
          })}
          {visibleTools.length === 0 ? <p className={styles.hint}>No matching tools. Try a shorter search.</p> : null}
        </nav>
        <section className={styles.panel} id="tool-workspace" aria-labelledby="tool-heading"><div className={styles.panelHeader}><span className={styles.toolIcon}><Icon name={current.icon} /></span><div><h2 id="tool-heading">{current.name}</h2><p>{current.description}</p></div></div>
          <div className={styles.content}>{active === 'html' ? <HtmlTool /> : active === 'otp' ? <OtpTool /> : active === 'keys' ? <KeyTool /> : active === 'password' ? <PasswordTool /> : active === 'encoding' ? <ExtraTools tool="encoding" /> : active === 'notes' ? <NotesTool /> : <ExtraTools tool={active as ExtraToolId} />}</div>
        </section>
      </div>
      <footer className={styles.footer}>Developed and Designed by Jelvan® <span>2026</span></footer>
    </main>
  </div>;
}
