import React, { useState } from 'react';
import { convertEncoding, encodeBase32, decodeBase32 } from '../../utils/dev-tools';
import styles from './DevTools.module.css';

const encoderOptions = [
  ['64', 'Base64 · RFC 4648'], ['64url', 'Base64URL · URL-safe'],
  ['64mime', 'Base64 · MIME (76-character lines)'], ['32', 'Base32 · RFC 4648'],
  ['32hex', 'Base32hex · RFC 4648'], ['32crock', 'Base32 · Crockford'],
  ['hex', 'Hexadecimal · Base16'],
] as const;
type EncodingMode = typeof encoderOptions[number][0];
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const B32HEX = '0123456789ABCDEFGHIJKLMNOPQRSTUV';
const CROCK = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function requireText(input: string) {
  if (input.length > 100000) throw new Error('Maximum input size is 100,000 characters.');
}
function mapAlphabet(value: string, from: string, to: string): string {
  return value.replace(/[A-Z2-7]/g, char => to[from.indexOf(char)]);
}
function encodeVariant(input: string, mode: EncodingMode, padding: boolean): string {
  requireText(input);
  let result: string;
  if (mode === 'hex') result = Array.from(new TextEncoder().encode(input), b => b.toString(16).padStart(2, '0')).join('');
  else if (mode === '32hex') result = mapAlphabet(encodeBase32(new TextEncoder().encode(input)), B32, B32HEX);
  else if (mode === '32crock') result = mapAlphabet(encodeBase32(new TextEncoder().encode(input)).replace(/=/g, ''), B32, CROCK);
  else if (mode === '64url') result = convertEncoding(input, '64', false).replace(/\+/g, '-').replace(/\//g, '_');
  else if (mode === '64mime') result = (convertEncoding(input, '64', false).match(/.{1,76}/g) || []).join('\r\n');
  else result = convertEncoding(input, mode === '32' ? '32' : '64', false);
  return padding ? result : result.replace(/=+$/g, '');
}
function decodeVariant(input: string, mode: EncodingMode): string {
  requireText(input);
  if (mode === 'hex') {
    const clean = input.replace(/\s/g, '');
    if (clean.length % 2 || /[^a-fA-F0-9]/.test(clean)) throw new Error('Hex requires pairs of hexadecimal digits (0–9, A–F).');
    return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(clean.match(/../g) || [], h => parseInt(h, 16)));
  }
  if (mode === '32hex' || mode === '32crock') {
    let clean = input.replace(/\s/g, '').toUpperCase();
    if (mode === '32crock') clean = clean.replace(/-/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
    const alphabet = mode === '32hex' ? B32HEX : CROCK;
    const raw = clean.replace(/=+$/, '');
    if (Array.from(raw).some(c => !alphabet.includes(c)) || (mode === '32crock' && clean.includes('='))) throw new Error('Invalid characters for the selected Base32 variant.');
    const normal = Array.from(raw, c => B32[alphabet.indexOf(c)]).join('') + (mode === '32crock' ? '' : clean.substring(raw.length));
    return new TextDecoder('utf-8', { fatal: true }).decode(decodeBase32(normal));
  }
  if (mode === '64url') {
    const clean = input.replace(/\s/g, '');
    if (!/^[A-Za-z0-9_-]*={0,2}$/.test(clean)) throw new Error('Enter valid URL-safe Base64 characters.');
    const standard = clean.replace(/-/g, '+').replace(/_/g, '/');
    return convertEncoding(standard, '64', true);
  }
  return convertEncoding(input, mode === '32' ? '32' : '64', true);
}
function Output({ value, label = 'Output' }: { value: string; label?: string }) {
  const [status, setStatus] = useState('');
  return <div className={styles.result}>
    <label>{label}<textarea readOnly rows={4} spellCheck={false} value={value} placeholder="Output appears here" /></label>
    <div className={styles.copy}><button type="button" disabled={!value} onClick={async () => {
      try { await navigator.clipboard.writeText(value); setStatus('Copied to clipboard'); }
      catch { setStatus('Clipboard blocked; select and copy the output.'); }
    }}>Copy</button><span role="status">{status}</span></div>
  </div>;
}
function Failure({ message }: { message: string }) { return <p className={styles.error} role="alert">{message}</p>; }
function Actions({ children }: { children: React.ReactNode }) { return <div className={styles.toolbar}>{children}</div>; }

export function EncodingSuite() {
  const [mode, setMode] = useState<EncodingMode>('64');
  const [input, setInput] = useState('');
  const [padding, setPadding] = useState(true);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const run = (decode: boolean) => {
    try { setOutput(decode ? decodeVariant(input, mode) : encodeVariant(input, mode, padding)); setError(''); }
    catch (e) { setOutput(''); setError(e instanceof TypeError ? 'The decoded data is not valid UTF-8 text.' : (e as Error).message); }
  };
  return <>
    <div className={styles.notice} role="note"><strong>Security notice · encoding is not encryption.</strong><p>Base32, Base64 and hexadecimal are reversible representations, not protection for data. Never rely on encoding to secure passwords, API keys, access tokens, or confidential information. Use encryption and secure transport for sensitive data. Conversion happens locally in your browser; copied values may remain in your clipboard.</p></div>
    <div className={styles.fields}>
      <label>Encoding variant<select value={mode} onChange={e => { setMode(e.target.value as EncodingMode); setOutput(''); setError(''); }}>{encoderOptions.map(([id, title]) => <option key={id} value={id}>{title}</option>)}</select></label>
      <label className={styles.optionLabel}><input type="checkbox" checked={padding} disabled={mode === 'hex' || mode === '32crock'} onChange={e => { setPadding(e.target.checked); setOutput(''); }} /> Include standard padding (=) on encode</label>
    </div>
    <label>Input text<textarea rows={6} value={input} maxLength={100000} onChange={e => { setInput(e.target.value); setOutput(''); setError(''); }} spellCheck={false} /></label>
    <Actions><button className={styles.primary} type="button" disabled={!input} onClick={() => run(false)}>Encode</button><button type="button" disabled={!input} onClick={() => run(true)}>Decode</button><button type="button" onClick={() => { setInput(''); setOutput(''); setError(''); }}>Clear text</button></Actions>
    <Failure message={error}/><Output label="Converted text" value={output}/>
    <p className={styles.hint}>UTF-8 / Unicode supported. Decoding only returns valid UTF-8 text; binary payloads are intentionally not rendered as text. Base32 and Base64 variants follow commonly used RFC alphabets.</p>
  </>;
}

function JsonTool() {
  const [input,setInput]=useState('{"hello":"developer","features":["format","validate","minify"]}');
  const [indent,setIndent]=useState(2); const [output,setOutput]=useState(''); const [error,setError]=useState('');
  const run=(minify:boolean)=>{ try {requireText(input); const parsed=JSON.parse(input);setOutput(JSON.stringify(parsed,null,minify?0:indent));setError('');}catch(e){setOutput('');setError('Invalid JSON: '+(e as Error).message);} };
  return <><div className={styles.fields}><label>Indent size<select value={indent} onChange={e=>setIndent(Number(e.target.value))}><option value={2}>2 spaces</option><option value={4}>4 spaces</option></select></label></div><label>JSON input<textarea rows={9} value={input} spellCheck={false} onChange={e=>setInput(e.target.value)}/></label><Actions><button type="button" className={styles.primary} onClick={()=>run(false)}>Format &amp; validate</button><button type="button" onClick={()=>run(true)}>Minify</button></Actions><Failure message={error}/><Output value={output} label="Valid JSON output"/></>;
}
function UrlCodecTool() {
  const [input,setInput]=useState('https://example.com/search?q=hello world&lang=en');
  const [mode,setMode]=useState('component'); const [output,setOutput]=useState('');const [error,setError]=useState('');
  const run=(decode:boolean)=>{try{requireText(input);setOutput(decode?(mode==='component'?decodeURIComponent(input):decodeURI(input)):(mode==='component'?encodeURIComponent(input):encodeURI(input)));setError('');}catch(e){setOutput('');setError((e as Error).message);}};
  return <><label>Encoding mode<select value={mode} onChange={e=>setMode(e.target.value)}><option value="component">URL component · query parameter values</option><option value="uri">Full URI · preserve structural separators</option></select></label><label>Text or URL<textarea rows={5} value={input} onChange={e=>setInput(e.target.value)}/></label><Actions><button type="button" className={styles.primary} onClick={()=>run(false)}>Encode</button><button type="button" onClick={()=>run(true)}>Decode</button></Actions><Failure message={error}/><Output value={output}/><p className={styles.hint}>Encoding a complete URI differs from encoding individual query values. Do not double-encode existing URLs.</p></>;
}
function EntityTool() {
  const [input,setInput]=useState('<div class="example">Hello & goodbye</div>');const [output,setOutput]=useState('');
  const run=(decode:boolean)=>{requireText(input);if(decode){const el=document.createElement('textarea');el.innerHTML=input;setOutput(el.value);}else setOutput(input.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'));};
  return <><label>HTML entity text<textarea rows={5} value={input} onChange={e=>setInput(e.target.value)}/></label><Actions><button className={styles.primary} type="button" onClick={()=>run(false)}>Escape HTML</button><button type="button" onClick={()=>run(true)}>Unescape entities</button></Actions><Output value={output}/><p className={styles.hint}>Escaping is useful for displaying literal markup. It is not a substitute for contextual output encoding or HTML sanitization.</p></>;
}
function JwtTool(){
  const [token,setToken]=useState('');const [output,setOutput]=useState('');const [error,setError]=useState('');
  const decode=()=>{try{requireText(token);const segments=token.trim().split('.');if(segments.length!==3)throw new Error('A JWT must contain three dot-separated sections.');const unpack=(s:string)=>{if(!/^[A-Za-z0-9_-]+$/.test(s))throw new Error('Invalid JWT segment.');const binary=atob(s.replace(/-/g,'+').replace(/_/g,'/'));return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(binary,c=>c.charCodeAt(0))));};setOutput(JSON.stringify({header:unpack(segments[0]),payload:unpack(segments[1])},null,2));setError('');}catch(e){setOutput('');setError((e as Error).message);}};
  return <><div className={styles.notice} role="note"><strong>JWT inspection does not verify authenticity.</strong><p>Decoded claims are untrusted until the signature, audience, issuer and expiration are verified by your application. Avoid pasting real production bearer tokens.</p></div><label>JWT (JSON Web Token)<textarea rows={5} value={token} spellCheck={false} onChange={e=>{setToken(e.target.value);setOutput('');}} placeholder="eyJhbGciOi..." /></label><button className={styles.primary} type="button" disabled={!token} onClick={decode}>Inspect header &amp; payload</button><Failure message={error}/><Output value={output} label="Decoded, unverified claims"/></>;
}
function HashTool(){
  const [input,setInput]=useState('Hello, developer!');const [algorithm,setAlgorithm]=useState('SHA-256');const [output,setOutput]=useState('');const [error,setError]=useState('');
  const digest=async()=>{try{requireText(input);const hash=await crypto.subtle.digest(algorithm,new TextEncoder().encode(input));setOutput(Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join(''));setError('');}catch(e){setError((e as Error).message);}};
  return <><div className={styles.fields}><label>Hash algorithm<select value={algorithm} onChange={e=>{setAlgorithm(e.target.value);setOutput('');}}><option>SHA-256</option><option>SHA-384</option><option>SHA-512</option></select></label></div><label>Text input<textarea rows={6} value={input} onChange={e=>setInput(e.target.value)} spellCheck={false}/></label><button type="button" className={styles.primary} onClick={()=>void digest()}>Calculate hash</button><Failure message={error}/><Output value={output} label="Hex digest"/><p className={styles.hint}>A hash is not encryption. These functions are not password hashing or secret storage mechanisms; use dedicated password-hashing algorithms for stored credentials.</p></>;
}
function UuidTool(){
  const [count,setCount]=useState(5);const [output,setOutput]=useState('');const [error,setError]=useState('');
  return <><div className={styles.fields}><label>UUID count<select value={count} onChange={e=>setCount(Number(e.target.value))}>{[1,5,10,25,50].map(n=><option key={n} value={n}>{n}</option>)}</select></label></div><button className={styles.primary} type="button" onClick={()=>{try{if(!crypto.randomUUID)throw new Error('Your browser does not support secure UUID generation.');setOutput(Array.from({length:count},()=>crypto.randomUUID()).join('\n'));setError('');}catch(e){setError((e as Error).message);}}}>Generate UUID v4</button><Failure message={error}/><Output value={output} label="Random UUIDs"/><p className={styles.hint}>RFC 4122 UUID v4, generated with the browser's secure random source. UUIDs are identifiers, not authentication secrets.</p></>;
}
function RegexTool(){
  const [pattern,setPattern]=useState('\\b[a-z]+@[a-z]+\\.[a-z]{2,}\\b');const [flags,setFlags]=useState('gi');const [input,setInput]=useState('contact dev@example.com and test@example.org');const [output,setOutput]=useState('');const [error,setError]=useState('');
  const run=()=>{try{if(pattern.length>500||input.length>10000)throw new Error('Limit pattern to 500 and test text to 10,000 characters.');if(!/^[dgimsuvy]*$/.test(flags)||new Set(flags).size!==flags.length)throw new Error('Invalid or repeated flags.');const re=new RegExp(pattern,flags.includes('g')?flags:flags+'g');const matches=Array.from(input.matchAll(re)).slice(0,50).map(m=>({match:m[0],index:m.index,groups:m.groups||null}));setOutput(JSON.stringify({matches,totalShown:matches.length,maxShown:50},null,2));setError('');}catch(e){setOutput('');setError((e as Error).message);}};
  return <><div className={styles.fields}><label>Regular expression<input value={pattern} onChange={e=>setPattern(e.target.value)} spellCheck={false}/></label><label>Flags<input value={flags} onChange={e=>setFlags(e.target.value)} spellCheck={false}/></label></div><label>Test string<textarea rows={6} value={input} onChange={e=>setInput(e.target.value)} spellCheck={false}/></label><button className={styles.primary} type="button" onClick={run}>Run expression</button><Failure message={error}/><Output value={output} label="First 50 matches"/><p className={styles.hint}>Use only trusted patterns; pathological regular expressions can cause slow processing in browsers.</p></>;
}
function UrlInspector(){
 const [input,setInput]=useState('https://example.com:443/products/item?sort=popular&sort=latest#details');const [output,setOutput]=useState('');const [error,setError]=useState('');
 const inspect=()=>{try{const url=new URL(input);if(!['http:','https:'].includes(url.protocol))throw new Error('Use an HTTP or HTTPS URL.');setOutput(JSON.stringify({protocol:url.protocol,hostname:url.hostname,port:url.port,path:url.pathname,hash:url.hash,origin:url.origin,queryParameters:Array.from(url.searchParams.entries()).map(([key,value])=>({key,value}))},null,2));setError('');}catch(e){setOutput('');setError((e as Error).message);}};
 return <><label>Absolute HTTP(S) URL<input value={input} onChange={e=>setInput(e.target.value)} spellCheck={false}/></label><button className={styles.primary} type="button" onClick={inspect}>Parse URL</button><Failure message={error}/><Output label="URL parts and query parameters" value={output}/><p className={styles.hint}>Parsing is local; no request is sent to the provided URL.</p></>;
}
const httpCodes:Record<number,string>={100:'Continue',101:'Switching Protocols',200:'OK',201:'Created',202:'Accepted',204:'No Content',206:'Partial Content',301:'Moved Permanently',302:'Found',303:'See Other',304:'Not Modified',307:'Temporary Redirect',308:'Permanent Redirect',400:'Bad Request',401:'Unauthorized',403:'Forbidden',404:'Not Found',405:'Method Not Allowed',408:'Request Timeout',409:'Conflict',410:'Gone',413:'Content Too Large',415:'Unsupported Media Type',418:"I'm a teapot",422:'Unprocessable Content',425:'Too Early',429:'Too Many Requests',500:'Internal Server Error',501:'Not Implemented',502:'Bad Gateway',503:'Service Unavailable',504:'Gateway Timeout'};
function HttpTool(){
 const [query,setQuery]=useState(''); const filtered=Object.entries(httpCodes).filter(([code,name])=>(code+' '+name).toLowerCase().includes(query.toLowerCase()));
 return <><label>Search HTTP status codes<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g. 404, redirect, gateway"/></label><div className={styles.referenceList} role="list">{filtered.map(([code,desc])=><div key={code} role="listitem"><code>{code}</code><span>{desc}</span></div>)}</div>{!filtered.length?<p className={styles.hint}>No matching common status codes.</p>:null}</>;
}
function ColorTool(){
 const [hex,setHex]=useState('#f48120');const [output,setOutput]=useState('');const [error,setError]=useState('');
 const convert=()=>{try{let h=hex.trim().replace(/^#/,'');if(!/^(?:[a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(h))throw new Error('Enter a 3-digit or 6-digit hexadecimal color.');if(h.length===3)h=h.split('').map(c=>c+c).join('');const [r,g,b]=[0,2,4].map(i=>parseInt(h.slice(i,i+2),16));const x=[r,g,b].map(v=>v/255);const max=Math.max(...x),min=Math.min(...x),diff=max-min;let hue=0;if(diff){if(max===x[0])hue=((x[1]-x[2])/diff)%6;else if(max===x[1])hue=(x[2]-x[0])/diff+2;else hue=(x[0]-x[1])/diff+4;hue=(hue*60+360)%360;}const light=(max+min)/2;const saturation=diff===0?0:diff/(1-Math.abs(2*light-1));const luminance=x.map(c=>c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)).reduce((a,c,i)=>a+c*[.2126,.7152,.0722][i],0);setOutput('HEX: #'+h.toUpperCase()+'\nRGB: rgb('+r+', '+g+', '+b+')\nHSL: hsl('+Math.round(hue)+', '+Math.round(saturation*100)+'%, '+Math.round(light*100)+'%)\nContrast vs white: '+((1.05)/(luminance+.05)).toFixed(2)+':1\nContrast vs black: '+((luminance+.05)/.05).toFixed(2)+':1');setError('');}catch(e){setOutput('');setError((e as Error).message);}};
 return <><label>Hex color<input value={hex} onChange={e=>setHex(e.target.value)} placeholder="#f48120"/></label><div className={styles.colorSwatch} style={{backgroundColor:/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)?hex:'#fff'}} aria-label="Color swatch"/><Actions><button type="button" className={styles.primary} onClick={convert}>Convert &amp; check contrast</button></Actions><Failure message={error}/><Output label="Color values and WCAG contrast ratios" value={output}/></>;
}
function TimeTool(){
 const [input,setInput]=useState('');const [output,setOutput]=useState('');const [error,setError]=useState('');
 const run=()=>{try{const raw=input.trim();if(!raw)throw new Error('Enter an ISO timestamp or Unix timestamp.');const n=Number(raw);const d=/^-?\d+(?:\.\d+)?$/.test(raw)?new Date(raw.length<=10?n*1000:n):new Date(raw);if(Number.isNaN(d.getTime()))throw new Error('Invalid timestamp.');setOutput('ISO 8601 UTC: '+d.toISOString()+'\nUnix seconds: '+Math.floor(d.getTime()/1000)+'\nUnix milliseconds: '+d.getTime()+'\nLocal time: '+d.toLocaleString());setError('');}catch(e){setOutput('');setError((e as Error).message);}};
 return <><label>ISO 8601 or Unix timestamp<input value={input} onChange={e=>setInput(e.target.value)} placeholder="2026-10-23T00:00:00Z or 1792713600" spellCheck={false}/></label><Actions><button className={styles.primary} type="button" onClick={run}>Convert time</button><button type="button" onClick={()=>{setInput(String(Math.floor(Date.now()/1000)));setError('');setOutput('');}}>Use current time</button></Actions><Failure message={error}/><Output value={output} label="Time conversion"/><p className={styles.hint}>ISO dates without timezone information may be interpreted in local time. Current time comes from your device.</p></>;
}
function TextCompare(){
 const [left,setLeft]=useState('first line\nold value\nlast line'); const [right,setRight]=useState('first line\nnew value\nlast line'); const [output,setOutput]=useState('');
 const compare=()=>{const a=left.split('\n').slice(0,200),b=right.split('\n').slice(0,200),dp=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)dp[i][j]=a[i]===b[j]?1+dp[i+1][j+1]:Math.max(dp[i+1][j],dp[i][j+1]);const lines:string[]=[];let i=0,j=0;while(i<a.length||j<b.length){if(i<a.length&&j<b.length&&a[i]===b[j]){lines.push('  '+a[i]);i++;j++;}else if(j<b.length&&(i===a.length||dp[i][j+1]>=dp[i+1][j]))lines.push('+ '+b[j++]);else lines.push('- '+a[i++]);}setOutput(lines.join('\n'));};
 return <><div className={styles.fields}><label>Original text<textarea rows={7} value={left} onChange={e=>setLeft(e.target.value)}/></label><label>Changed text<textarea rows={7} value={right} onChange={e=>setRight(e.target.value)}/></label></div><button className={styles.primary} type="button" onClick={compare}>Compare lines</button><Output value={output} label="Line difference (±)"/><p className={styles.hint}>Local line-level comparison of the first 200 lines per input. Not a full source-control diff.</p></>;
}
export type ExtraToolId='encoding'|'json'|'url-codec'|'entities'|'jwt'|'hash'|'uuid'|'regex'|'url-inspect'|'http'|'color'|'time'|'diff';
export default function ExtraTools({tool}:{tool:ExtraToolId}){
 switch(tool){
 case 'encoding':return <EncodingSuite/>;
 case 'json':return <JsonTool/>;
 case 'url-codec':return <UrlCodecTool/>;
 case 'entities':return <EntityTool/>;
 case 'jwt':return <JwtTool/>;
 case 'hash':return <HashTool/>;
 case 'uuid':return <UuidTool/>;
 case 'regex':return <RegexTool/>;
 case 'url-inspect':return <UrlInspector/>;
 case 'http':return <HttpTool/>;
 case 'color':return <ColorTool/>;
 case 'time':return <TimeTool/>;
 case 'diff':return <TextCompare/>;
 }
}
