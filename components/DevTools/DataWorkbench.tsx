import React, { useState } from 'react';
import styles from './DevTools.module.css';

function Output({ title, value }: { title: string; value: string }) {
  const [status, setStatus] = useState('');
  return <div className={styles.result}>
    <label>{title}<textarea readOnly spellCheck={false} rows={6} value={value} placeholder="Generated output appears here" /></label>
    <div className={styles.copy}>
      <button type="button" disabled={!value} onClick={async () => {
        try { await navigator.clipboard.writeText(value); setStatus('Copied'); }
        catch { setStatus('Clipboard unavailable. Select and copy the text.'); }
      }}>Copy result</button><span role="status">{status}</span>
    </div>
  </div>;
}
function Issue({error}:{error:string}) { return error ? <p role="alert" className={styles.error}>{error}</p> : null; }
function Toolbar({children}:{children:React.ReactNode}) {return <div className={styles.toolbar}>{children}</div>;}
function sizeGuard(input:string, limit=50000){if(input.length>limit)throw new Error('Input limit is '+limit.toLocaleString()+' characters.');}
function csvRead(input:string):string[][]{
  sizeGuard(input);const rows:string[][]=[];let row:string[]=[],field='',quoted=false,closed=false;
  for(let i=0;i<input.length;i++){const c=input[i];
    if(quoted){if(c==='"'){if(input[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else field+=c;continue;}
    if(c==='"'&&!field&&!closed){quoted=true;continue;}
    if(c==='"')throw new Error('Unexpected quote in CSV field.');
    if(c===','||c==='\n'||c==='\r'){
      row.push(field);field='';closed=false;
      if(c!==','){rows.push(row);row=[];if(c==='\r'&&input[i+1]==='\n')i++;}
      if(rows.length>2001)throw new Error('Maximum 2,000 data rows.');
      continue;
    }
    if(closed)throw new Error('Unexpected characters after closing CSV quote.');
    field+=c;
  }
  if(quoted)throw new Error('Unclosed CSV quote.');
  if(field!==''||row.length>0||closed) {row.push(field);rows.push(row);}
  return rows;
}
function csvField(value:unknown):string{
 const raw=typeof value==='string'?value:value===null||value===undefined?'':typeof value==='object'?JSON.stringify(value):String(value);
 return /[",\r\n]/.test(raw)?'"'+raw.replace(/"/g,'""')+'"':raw;
}
export function CsvWorkbench(){
 const [direction,setDirection]=useState('csv');const [input,setInput]=useState('name,role\nAda,Developer\nLin,"Design, UI"');
 const [output,setOutput]=useState('');const [error,setError]=useState('');
 const change=(v:string)=>{setDirection(v);setInput(v==='csv'?'name,role\nAda,Developer\nLin,"Design, UI"':'[{"name":"Ada","role":"Developer"},{"name":"Lin","role":"Design, UI"}]');setOutput('');setError('');};
 const run=()=>{try{sizeGuard(input);if(direction==='csv'){const rows=csvRead(input);if(rows.length<1)throw new Error('Please provide a CSV header row.');
  const headers=rows[0].map(x=>x.trim());if(headers.some(h=>!h)||new Set(headers).size!==headers.length)throw new Error('CSV headers must be nonempty and unique.');
  const json=rows.slice(1).filter(row=>!(row.length===1&&row[0]==='')).map((row,i)=>{if(row.length!==headers.length)throw new Error('CSV row '+(i+2)+' contains '+row.length+' values; expected '+headers.length+'.');return Object.fromEntries(headers.map((h,j)=>[h,row[j]]));});setOutput(JSON.stringify(json,null,2));
 }else{const values=JSON.parse(input);if(!Array.isArray(values)||values.some(v=>!v||typeof v!=='object'||Array.isArray(v)))throw new Error('Provide a JSON array of objects.');
  const keys=Array.from(new Set(values.flatMap(v=>Object.keys(v))));if(!keys.length)throw new Error('Provide at least one object with properties.');
  setOutput([keys.map(csvField).join(','),...values.map(v=>keys.map(k=>csvField(v[k])).join(','))].join('\r\n'));
 }setError('');}catch(e){setError((e as Error).message);setOutput('');}};
 return <><div className={styles.fields}><label>Conversion<select value={direction} onChange={e=>change(e.target.value)}><option value="csv">CSV to JSON</option><option value="json">JSON to CSV</option></select></label></div>
 <label>Source data<textarea rows={9} spellCheck={false} value={input} onChange={e=>setInput(e.target.value)}/></label>
 <Toolbar><button className={styles.primary} type="button" onClick={run}>Convert data</button></Toolbar><Issue error={error}/><Output title="Converted data" value={output}/>
 <p className={styles.hint}>CSV supports quoted fields, double quotes and line breaks. JSON records retain values; CSV-origin values are text. Review spreadsheet formula injection risks when opening untrusted CSV files.</p></>;
}
function followPath(value:unknown,path:string):unknown{
 let at:unknown=value;const s=path.trim();if(!s.startsWith('$'))throw new Error('Start the JSON path with $.');
 let rest=s.substring(1);
 while(rest){const m=/^(?:\.([A-Za-z_$][\w$]*)|\[(\d+)\]|\["((?:[^"\\]|\\.)*)"\])/.exec(rest);
 if(!m)throw new Error('Unsupported JSON path near: '+rest.slice(0,30));
 const key=m[1]??(m[2]!==undefined?Number(m[2]):JSON.parse('"'+m[3]+'"'));
 if(at===null||typeof at!=='object'||!Object.prototype.hasOwnProperty.call(at,key))throw new Error('Path not found: '+String(key));
 at=(at as Record<string,unknown>)[key as string];rest=rest.slice(m[0].length);
 }return at;
}
export function JsonPathWorkbench(){
 const [source,setSource]=useState('{"user":{"name":"Ada","skills":["React","TypeScript"]}}');
 const [path,setPath]=useState('$.user.skills[1]');const [result,setResult]=useState('');const [error,setError]=useState('');
 const run=()=>{try{sizeGuard(source);const data=JSON.parse(source);const value=followPath(data,path);setResult(JSON.stringify(value,null,2)??'undefined');setError('');}catch(e){setResult('');setError((e as Error).message);}};
 return <><label>JSON document<textarea rows={8} value={source} onChange={e=>setSource(e.target.value)} spellCheck={false}/></label><label>Property path<input value={path} onChange={e=>setPath(e.target.value)} spellCheck={false} placeholder="$.user.skills[0]"/></label><button className={styles.primary} type="button" onClick={run}>Extract value</button><Issue error={error}/><Output title="Extracted JSON value" value={result}/><p className={styles.hint}>Supports object.property, [index], and ["quoted property"] access only. This is a safe path inspector—not a full JSONPath query engine.</p></>;
}
export function QueryWorkbench(){
 const [base,setBase]=useState('https://example.com/search?q=dev&q=tools&page=1');const [data,setData]=useState('{"q":["dev","tools"],"page":"1"}');
 const [output,setOutput]=useState('');const [error,setError]=useState('');
 const parse=()=>{try{const u=new URL(base);if(!['http:','https:'].includes(u.protocol))throw new Error('Use HTTP(S).');const fields:Record<string,string|string[]>=Object.create(null);u.searchParams.forEach((v,k)=>{const existing=fields[k];if(existing===undefined)fields[k]=v;else if(Array.isArray(existing))existing.push(v);else fields[k]=[existing,v];});setData(JSON.stringify(fields,null,2));setOutput('');setError('');}catch(e){setError((e as Error).message);}};
 const build=()=>{try{const u=new URL(base);if(!['http:','https:'].includes(u.protocol))throw new Error('Use HTTP(S).');sizeGuard(data);const fields=JSON.parse(data);if(!fields||Array.isArray(fields)||typeof fields!=='object')throw new Error('Provide a JSON object of query parameters.');u.search='';for(const [key,v] of Object.entries(fields)){for(const item of Array.isArray(v)?v:[v]){if(item!==null&&typeof item!=='object')u.searchParams.append(key,String(item));else if(item!==null)throw new Error('Nested query values are not supported.');}}setOutput(u.toString());setError('');}catch(e){setOutput('');setError((e as Error).message);}};
 return <><label>Absolute URL<input value={base} onChange={e=>setBase(e.target.value)} spellCheck={false}/></label><label>Query parameters as JSON<textarea rows={7} value={data} onChange={e=>setData(e.target.value)} spellCheck={false}/></label><Toolbar><button type="button" onClick={parse}>Read from URL</button><button className={styles.primary} type="button" onClick={build}>Build URL</button></Toolbar><Issue error={error}/><Output title="Generated URL" value={output}/><p className={styles.hint}>Preserves repeated parameter keys as arrays and safely percent-encodes query components. No network request is made.</p></>;
}
function wordsOf(input:string):string[]{return input.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/([a-z0-9])([A-Z])/g,'$1 $2').split(/[^A-Za-z0-9]+/).filter(Boolean).map(s=>s.toLowerCase());}
export function TextCaseWorkbench(){
 const [input,setInput]=useState('Premium Developer Tools');const [mode,setMode]=useState('kebab');const [output,setOutput]=useState('');
 const run=()=>{const words=wordsOf(input);const cap=(s:string)=>s.charAt(0).toUpperCase()+s.slice(1);const formats:Record<string,()=>string>={kebab:()=>words.join('-'),snake:()=>words.join('_'),camel:()=>words.map((w,i)=>i?cap(w):w).join(''),pascal:()=>words.map(cap).join(''),title:()=>words.map(cap).join(' '),constant:()=>words.join('_').toUpperCase(),lower:()=>input.toLowerCase(),upper:()=>input.toUpperCase()};setOutput(formats[mode]());};
 return <><label>Source text<textarea rows={5} value={input} onChange={e=>setInput(e.target.value)}/></label><label>Format<select value={mode} onChange={e=>setMode(e.target.value)}><option value="kebab">kebab-case / URL slug</option><option value="snake">snake_case</option><option value="camel">camelCase</option><option value="pascal">PascalCase</option><option value="title">Title Case</option><option value="constant">CONSTANT_CASE</option><option value="lower">lowercase</option><option value="upper">UPPERCASE</option></select></label><button className={styles.primary} type="button" onClick={run}>Convert text</button><Output title="Converted text" value={output}/><p className={styles.hint}>Identifier formats normalize Latin accents and remove punctuation; for complex scripts, use a dedicated transliteration system.</p></>;
}
export function TextCleaner(){
 const [input,setInput]=useState('  Alpha \nBeta\n\nAlpha\n gamma  ');const [unique,setUnique]=useState(true);const [sort,setSort]=useState(false);const [blanks,setBlanks]=useState(true);const [output,setOutput]=useState('');
 const run=()=>{let rows=input.replace(/\r\n?/g,'\n').split('\n').map(x=>x.trim());if(blanks)rows=rows.filter(Boolean);if(unique)rows=Array.from(new Set(rows));if(sort)rows.sort((a,b)=>a.localeCompare(b));setOutput(rows.join('\n'));};
 return <><label>Source lines<textarea rows={9} value={input} onChange={e=>setInput(e.target.value)}/></label><div className={styles.checks}><label><input type="checkbox" checked={unique} onChange={e=>setUnique(e.target.checked)}/> Remove duplicates</label><label><input type="checkbox" checked={sort} onChange={e=>setSort(e.target.checked)}/> Sort lines</label><label><input type="checkbox" checked={blanks} onChange={e=>setBlanks(e.target.checked)}/> Remove blank lines</label></div><Toolbar><button className={styles.primary} type="button" onClick={run}>Clean lines</button></Toolbar><Output title="Cleaned text" value={output}/><p className={styles.hint}>Trims leading and trailing whitespace per line. All processing happens locally.</p></>;
}
function shellQuote(v:string){return "'"+v.replace(/'/g,"'\\''")+"'";}
export function CurlWorkbench(){
 const [method,setMethod]=useState('GET');const [url,setUrl]=useState('https://api.example.com/v1/items');const [headers,setHeaders]=useState('Accept: application/json');const [body,setBody]=useState('{"hello":"world"}');const [output,setOutput]=useState('');const [error,setError]=useState('');
 const run=()=>{try{const u=new URL(url);if(!['http:','https:'].includes(u.protocol))throw new Error('Only HTTP(S) URLs are supported.');sizeGuard(headers,5000);sizeGuard(body,15000);const lines=headers.split(/\r?\n/).map(h=>h.trim()).filter(Boolean);if(lines.some(h=>!/^[-!#$%&'*+.^_\x60|~\w]+:\s*[^\r\n]*$/.test(h)))throw new Error('Each header must be Name: value on a single line.');let cmd='curl --request '+method+' --url '+shellQuote(url);for(const h of lines)cmd+=' \\\n  --header '+shellQuote(h);if(method!=='GET'&&method!=='HEAD'&&body.trim())cmd+=' \\\n  --data-raw '+shellQuote(body);setOutput(cmd);setError('');}catch(e){setOutput('');setError((e as Error).message);}};
 return <><div className={styles.notice} role="note"><strong>Command builder only</strong><p>No request is sent. Review commands before execution; do not paste real credentials, private API tokens or sensitive request bodies into shared terminals.</p></div><div className={styles.fields}><label>HTTP method<select value={method} onChange={e=>setMethod(e.target.value)}>{['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS'].map(m=><option key={m}>{m}</option>)}</select></label><label>Request URL<input value={url} onChange={e=>setUrl(e.target.value)} spellCheck={false}/></label></div><label>Headers (one per line)<textarea rows={4} value={headers} onChange={e=>setHeaders(e.target.value)} spellCheck={false}/></label><label>Request body<textarea rows={5} value={body} onChange={e=>setBody(e.target.value)} spellCheck={false}/></label><button className={styles.primary} type="button" onClick={run}>Generate cURL</button><Issue error={error}/><Output title="Shell-quoted cURL command" value={output}/></>;
}
export type DataToolId='csv-json'|'json-path'|'query-builder'|'text-case'|'text-cleaner'|'curl';
export default function DataWorkbench({tool}:{tool:DataToolId}){
 switch(tool){case 'csv-json':return <CsvWorkbench/>;case 'json-path':return <JsonPathWorkbench/>;case 'query-builder':return <QueryWorkbench/>;case 'text-case':return <TextCaseWorkbench/>;case 'text-cleaner':return <TextCleaner/>;case 'curl':return <CurlWorkbench/>;}
}
