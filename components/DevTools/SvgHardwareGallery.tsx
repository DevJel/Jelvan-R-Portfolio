import React, { useEffect, useMemo, useState } from 'react';
import { saveCollectionZip } from './SvgLibraryExport';
import shared from './SvgLibrary.module.css';
import styles from './SvgHardwareGallery.module.css';

type HardwareAsset = { id: string; name: string; kind: string; path: string; category: string };
const groups = [
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
] as const;
const assets: HardwareAsset[] = Array.from({ length: 100 }, (_, index) => {
  const id = String(index + 1).padStart(3, '0');
  const group = groups[index % groups.length];
  return {
    id,
    name: group.label + ' · ' + id,
    kind: group.label,
    category: group.code,
    path: '/assets/svg-library/pc-components/' + group.code + '/pc_component_' + id + '_' + group.code + '_premium.svg',
  };
});
assets.push({
  id: '100-alt',
  name: 'Processors / CPU · 100 (alternate composition)',
  kind: 'Processors / CPU',
  category: 'cpu',
  path: '/assets/svg-library/pc-components/cpu/pc_component_100_cpu_premium-variant-2.svg',
});
const PAGE_SIZE = 24;

async function getSvg(asset: HardwareAsset): Promise<string> {
  const response = await fetch(asset.path);
  if (!response.ok) throw new Error('This SVG could not be loaded.');
  const markup = await response.text();
  if (!markup.trimStart().startsWith('<svg') || !markup.includes('</svg>')) {
    throw new Error('The downloaded file is not a complete SVG.');
  }
  return markup;
}

function saveSvg(markup: string, filename: string) {
  const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function SvgHardwareGallery() {
  const [open, setOpen] = useState(true);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(PAGE_SIZE);
  const [active, setActive] = useState('001');
  const [source, setSource] = useState('');
  const [loadedPath, setLoadedPath] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const matches = useMemo(() => assets.filter(asset =>
    (category === 'all' || asset.category === category) &&
    (asset.name + ' ' + asset.kind + ' ' + asset.id).toLowerCase().includes(query.trim().toLowerCase())
  ), [category, query]);
  const selected = matches.find(asset => asset.id === active) || matches[0];
  const visible = matches.slice(0, shown);
  const selectedSource = selected?.path === loadedPath ? source : '';

  useEffect(() => {
    if (!open || !selected) return;
    let live = true;
    setLoadedPath('');
    setSource('');
    getSvg(selected).then(svg => {
      if (live) { setSource(svg); setLoadedPath(selected.path); }
    }).catch(() => {
      if (live) setMessage('Could not load this vector. Try another design.');
    });
    return () => { live = false; };
  }, [open, selected?.path]);

  const selectCategory = (value: string) => {
    setCategory(value);
    setShown(PAGE_SIZE);
    setMessage('');
  };

  const copyAsset = async (asset: HardwareAsset) => {
    setActive(asset.id);
    setMessage('');
    try {
      const svg = await getSvg(asset);
      setSource(svg);
      setLoadedPath(asset.path);
      if (!navigator.clipboard?.writeText) {
        setMessage('Clipboard access unavailable. Select and copy the SVG source from the inspector.');
        return;
      }
      // Plain-text writes avoid Chromium's inconsistent Promise-backed ClipboardItem serialization.
      await navigator.clipboard.writeText(svg);
      setMessage(asset.name + ' copied as complete, editable SVG markup. Paste into an HTML file or SVG editor.');
    } catch {
      setMessage('This SVG could not be copied. Check clipboard permission and retry.');
    }
  };

  const downloadAsset = async (asset: HardwareAsset) => {
    setActive(asset.id);
    try {
      const svg = await getSvg(asset);
      setSource(svg);
      setLoadedPath(asset.path);
      saveSvg(svg, 'jelvan-' + asset.path.split('/').pop());
      setMessage(asset.name + ' downloaded.');
    } catch {
      setMessage('This SVG is currently unavailable for download.');
    }
  };

  const downloadAll = async () => {
    if (busy) return;
    setBusy(true);
    setMessage('Preparing 101 individual SVG files...');
    try {
      const files: { name: string; content: string }[] = [];
      for (let i = 0; i < assets.length; i += 10) {
        const batch = assets.slice(i, i + 10);
        const contents = await Promise.all(batch.map(getSvg));
        for (let j = 0; j < batch.length; j++) {
          files.push({ name: batch[j].category + '/' + batch[j].path.split('/').pop(), content: contents[j] });
        }
      }
      saveCollectionZip(files);
      setMessage('The complete hardware library downloaded as a ZIP with category folders.');
    } catch {
      setMessage('Could not prepare the archive. Check your connection and retry.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.section} aria-label="PC component SVG collection">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>JELVAN ELEMENTS / TECHNICAL ARTWORK</p>
          <h4>Hardware design collection <span>101 vectors</span></h4>
          <p>Different compositions, consistent styling. Preview, copy and paste SVG code, or download individual designs.</p>
        </div>
        <button className={styles.toggle} type="button" aria-expanded={open} onClick={() => setOpen(value => !value)}>
          {open ? 'Collapse collection' : 'Browse 101 designs'}
        </button>
      </div>
      {open && <div className={styles.content}>
        <div className={styles.categories} role="group" aria-label="Hardware design categories">
          <button type="button" aria-pressed={category === 'all'} onClick={() => selectCategory('all')}>
            All designs <strong>{assets.length}</strong>
          </button>
          {groups.map(group => (
            <button type="button" key={group.code} aria-pressed={category === group.code}
              onClick={() => selectCategory(group.code)}>
              {group.label} <strong>{assets.filter(item => item.category === group.code).length}</strong>
            </button>
          ))}
        </div>
        <div className={styles.tools}>
          <label htmlFor="hardware-svg-search">Search hardware designs
            <input id="hardware-svg-search" type="search" value={query}
              onChange={event => { setQuery(event.target.value); setShown(PAGE_SIZE); }}
              placeholder="Search category or design number..." />
          </label>
          <button type="button" onClick={() => void downloadAll()} disabled={busy}>
            {busy ? 'Preparing ZIP...' : 'Download all 101 SVGs (.zip)'}
          </button>
        </div>
        <p className={styles.count} role="status">{matches.length} hardware designs found · Showing {visible.length}</p>
        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={[shared.collection, styles.grid].join(' ')} aria-label="Hardware SVG designs">
              {visible.map(asset => (
                <div key={asset.id} className={[shared.tile, styles.tile, selected?.id === asset.id ? shared.activeTile : ''].join(' ')}>
                  <button type="button" className={shared.previewButton} aria-label={'Preview hardware design ' + asset.name}
                    aria-pressed={selected?.id === asset.id}
                    onClick={() => { setActive(asset.id); setMessage(''); }}>
                    <span className={shared.art}><img className={styles.previewImage} src={asset.path} alt="" loading="lazy" width={80} height={80} /></span>
                    <span className={shared.assetName}>{asset.name}</span>
                    <span className={shared.assetKind}>{asset.kind}</span>
                  </button>
                  <div className={styles.tileActions}>
                    <button type="button" className={shared.quickCopy} aria-label={'Copy hardware SVG for ' + asset.name}
                      onClick={() => void copyAsset(asset)}>Copy SVG</button>
                    <button type="button" className={shared.quickCopy} aria-label={'Download hardware SVG for ' + asset.name}
                      onClick={() => void downloadAsset(asset)}>Download</button>
                  </div>
                </div>
              ))}
            </div>
            {matches.length === 0 && <p className={styles.empty}>No designs match this search. Try another category or number.</p>}
            {visible.length < matches.length && <button className={styles.more} type="button"
              onClick={() => setShown(value => value + PAGE_SIZE)}>
              Show more hardware designs ({matches.length - visible.length} remaining)
            </button>}
          </div>
          <aside className={[shared.inspector, styles.inspector].join(' ')} aria-label="Selected hardware SVG">
            {selected ? <>
              <div className={shared.inspectorArt}>
                <img className={styles.inspectorImage} src={selected.path} alt={selected.name} width={122} height={122} />
              </div>
              <p className={shared.assetKind}>{selected.kind} · 400 × 400 · editable</p>
              <h4>{selected.name}</h4>
              <p>Copy this self-contained SVG into HTML, another project or an SVG editor.</p>
              <div className={shared.actions}>
                <button type="button" disabled={!selectedSource} onClick={() => void copyAsset(selected)}>Copy selected SVG</button>
                <button type="button" onClick={() => void downloadAsset(selected)}>Download hardware .svg</button>
              </div>
              <p className={styles.status} role="status" aria-live="polite">{message}</p>
              <label className={shared.sourceLabel} htmlFor="hardware-svg-source">Hardware SVG source · select to copy and paste</label>
              <textarea id="hardware-svg-source" aria-label="Hardware SVG source" value={selectedSource} readOnly spellCheck={false} rows={7} />
            </> : <p>No artwork available in this category.</p>}
          </aside>
        </div>
      </div>}
    </section>
  );
}
