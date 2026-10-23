import React, { useEffect, useMemo, useState } from 'react';
import { saveCollectionZip } from './SvgLibraryExport';
import styles from './SvgHardwareGallery.module.css';

type HardwareAsset = {
  id: string;
  name: string;
  kind: string;
  path: string;
};
const types = [
  { code: 'gpu', label: 'Graphics Cards' },
  { code: 'ram', label: 'Memory / RAM' },
  { code: 'ssd', label: 'Storage / SSD' },
  { code: 'mobo', label: 'Motherboards' },
  { code: 'fan', label: 'Cooling Fans' },
  { code: 'case', label: 'Computer Cases' },
  { code: 'psu', label: 'Power Supplies' },
  { code: 'chip', label: 'Microchips' },
  { code: 'cooler', label: 'CPU Coolers' },
  { code: 'cpu', label: 'Processors / CPU' },
];
const assets: HardwareAsset[] = Array.from({ length: 100 }, (_, index) => {
  const number = String(index + 1).padStart(3, '0');
  const type = types[index % types.length];
  const filename = `pc_component_${number}_${type.code}_premium.svg`;
  return {
    id: number,
    name: `${type.label} · ${number}`,
    kind: type.label,
    path: `/assets/svg-library/pc-components/${type.code}/${filename}`,
  };
});
assets.push({
  id: '100-alt',
  name: 'Processors / CPU · 100 (alternate)',
  kind: 'Processors / CPU',
  path: '/assets/svg-library/pc-components/cpu/pc_component_100_cpu_premium-variant-2.svg',
});
const CHUNK_SIZE = 20;

async function readSvg(asset: HardwareAsset) {
  const response = await fetch(asset.path);
  if (!response.ok) throw new Error('SVG file is unavailable.');
  const svg = await response.text();
  if (!svg.trimStart().startsWith('<svg') || !svg.includes('</svg>')) throw new Error('Invalid SVG file.');
  return svg;
}

export default function SvgHardwareGallery() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(CHUNK_SIZE);
  const [active, setActive] = useState('001');
  const [source, setSource] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  const matches = useMemo(() => assets.filter(asset =>
    (category === 'all' || asset.kind === category) &&
    (asset.name + ' ' + asset.id + ' ' + asset.kind).toLowerCase().includes(search.trim().toLowerCase())
  ), [category, search]);
  const selected = matches.find(asset => asset.id === active) || matches[0];
  const visible = matches.slice(0, limit);

  useEffect(() => {
    if (!open || !selected) return;
    let activeRequest = true;
    setSource('');
    readSvg(selected).then(svg => {
      if (activeRequest) setSource(svg);
    }).catch(() => {
      if (activeRequest) setStatus('SVG source could not be loaded.');
    });
    return () => { activeRequest = false; };
  }, [open, selected?.path]);

  const changeCategory = (value: string) => {
    setCategory(value);
    setLimit(CHUNK_SIZE);
    setStatus('');
  };

  const copy = async () => {
    if (!source) return;
    try {
      await navigator.clipboard.writeText(source);
      setStatus('SVG source copied.');
    } catch {
      setStatus('Clipboard unavailable; select and copy the source text below.');
    }
  };

  const download = () => {
    if (!selected || !source) return;
    const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `jelvan-${selected.id}.svg`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('SVG downloaded.');
  };

  const downloadAll = async () => {
    if (busy) return;
    setBusy(true);
    setStatus('Preparing the 101-piece SVG collection...');
    try {
      const result: { name: string; content: string }[] = [];
      for (let i = 0; i < assets.length; i += 10) {
        const batch = assets.slice(i, i + 10);
        const contents = await Promise.all(batch.map(readSvg));
        for (let j = 0; j < batch.length; j++) {
          result.push({ name: batch[j].path.split('/').pop() || `design-${batch[j].id}.svg`, content: contents[j] });
        }
      }
      saveCollectionZip(result);
      setStatus('101 SVG files packaged and downloaded.');
    } catch {
      setStatus('Could not prepare the archive. Check your connection and retry.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.section} aria-label="PC component SVG collection">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>PREMIUM VECTOR COLLECTION</p>
          <h4>Computer components <span>101 SVGs</span></h4>
          <p>Browse individual hardware designs, copy editable SVG code, or download the collection.</p>
        </div>
        <button type="button" className={styles.toggle} aria-expanded={open} onClick={() => setOpen(value => !value)}>
          {open ? 'Hide collection' : 'Browse 101 designs'}
        </button>
      </div>
      {open && (
        <div className={styles.content}>
          <div className={styles.categories} role="group" aria-label="Hardware design categories">
            <button type="button" aria-pressed={category === 'all'} onClick={() => changeCategory('all')}>
              All <strong>101</strong>
            </button>
            {types.map(group => (
              <button key={group.code} type="button" aria-pressed={category === group.label} onClick={() => changeCategory(group.label)}>
                {group.label} <strong>{group.code === 'cpu' ? 11 : 10}</strong>
              </button>
            ))}
          </div>
          <div className={styles.tools}>
            <label htmlFor="hardware-svg-search">Search PC component designs
              <input id="hardware-svg-search" type="search" value={search} onChange={event => { setSearch(event.target.value); setLimit(CHUNK_SIZE); }}
                placeholder="Search name or number..." />
            </label>
            <button type="button" onClick={() => void downloadAll()} disabled={busy}>
              {busy ? 'Preparing archive...' : 'Download 101 SVGs (.zip)'}
            </button>
          </div>
          <p className={styles.count} role="status">{matches.length} matching designs · {visible.length} shown</p>
          <div className={styles.layout}>
            <div>
              <div className={styles.grid}>
                {visible.map(asset => (
                  <button key={asset.id} type="button" className={styles.tile}
                    aria-pressed={selected?.id === asset.id} onClick={() => { setActive(asset.id); setStatus(''); }}>
                    <img src={asset.path} alt="" loading="lazy" width={100} height={100} />
                    <span>{asset.name}</span>
                  </button>
                ))}
              </div>
              {matches.length === 0 && <p className={styles.empty}>No matching designs. Try another search.</p>}
              {visible.length < matches.length && (
                <button type="button" className={styles.more} onClick={() => setLimit(value => value + CHUNK_SIZE)}>
                  Show more designs ({matches.length - visible.length} remaining)
                </button>
              )}
            </div>
            {selected && (
              <aside className={styles.inspector} aria-label="Selected hardware SVG">
                <img src={selected.path} alt={selected.name} width={180} height={180} />
                <h5>{selected.name}</h5>
                <p>{selected.kind} · 400 × 400 vector</p>
                <div className={styles.actions}>
                  <button type="button" onClick={() => void copy()} disabled={!source}>Copy SVG source</button>
                  <button type="button" onClick={download} disabled={!source}>Download selected .svg</button>
                </div>
                <label htmlFor="hardware-svg-source">Hardware SVG source</label>
                <textarea id="hardware-svg-source" value={source} readOnly rows={6} spellCheck={false} />
                <p className={styles.status} aria-live="polite">{status}</p>
              </aside>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
