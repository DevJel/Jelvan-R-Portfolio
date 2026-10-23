/**
 * Dependency-free ZIP (STORE method) for distributing the full original
 * SVG collection. Runs only on explicit user click; no server upload.
 */
type ExportFile = { name: string; content: string };
const encoder = new TextEncoder();
const crc32 = (bytes: Uint8Array): number => {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i=0; i<8; i++) crc = crc >>> 1 ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
};
const u16 = (view: DataView, offset: number, value: number) => view.setUint16(offset,value,true);
const u32 = (view: DataView, offset: number, value: number) => view.setUint32(offset,value >>> 0,true);

export function saveCollectionZip(files: ExportFile[]): void {
  if (files.length > 65535) throw new Error('Too many files to export.');
  const local: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let position = 0;
  let centralSize = 0;
  for (const file of files) {
    const name = encoder.encode(file.name);
    const bytes = encoder.encode(file.content);
    const checksum = crc32(bytes);
    const head = new Uint8Array(30+name.length);
    const hd = new DataView(head.buffer);
    u32(hd,0,0x04034b50); u16(hd,4,20);
    u16(hd,6,0x0800); u16(hd,8,0); // UTF-8, no compression
    u16(hd,10,0); u16(hd,12,0);
    u32(hd,14,checksum); u32(hd,18,bytes.length); u32(hd,22,bytes.length);
    u16(hd,26,name.length); u16(hd,28,0);
    head.set(name,30);
    local.push(head,bytes);

    const directory = new Uint8Array(46+name.length);
    const d = new DataView(directory.buffer);
    u32(d,0,0x02014b50); u16(d,4,20); u16(d,6,20);
    u16(d,8,0x0800); u16(d,10,0); u16(d,12,0); u16(d,14,0);
    u32(d,16,checksum); u32(d,20,bytes.length); u32(d,24,bytes.length);
    u16(d,28,name.length); u16(d,30,0); u16(d,32,0);
    u16(d,34,0); u16(d,36,0); u32(d,38,0);
    u32(d,42,position);
    directory.set(name,46);
    central.push(directory);
    centralSize += directory.length;
    position += head.length+bytes.length;
  }
  const end = new Uint8Array(22);
  const e = new DataView(end.buffer);
  u32(e,0,0x06054b50);
  u16(e,4,0);u16(e,6,0);u16(e,8,files.length);u16(e,10,files.length);
  u32(e,12,centralSize);u32(e,16,position);u16(e,20,0);
  const url = URL.createObjectURL(new Blob([...local,...central,end],{type:'application/zip'}));
  const anchor = document.createElement('a');
  anchor.href=url;
  anchor.download='jelvan-original-svg-collection-'+files.length+'.zip';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(()=>URL.revokeObjectURL(url),1000);
}
