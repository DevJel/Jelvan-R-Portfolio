import React, { useState } from 'react';
import styles from './SvgLibrary.module.css';
import { additionalSvgAssets } from './SvgLibraryCollection';
import { saveCollectionZip } from './SvgLibraryExport';

type SvgAsset = {
  id: string;
  name: string;
  kind: string;
  description: string;
  drawing: (ink: string, accent: string) => string;
};

/**
 * An original Jelvan Elements collection. All SVG geometry is authored for
 * this project; no icon packs, copied paths, external images or scripts.
 */
const originalAssets: SvgAsset[] = [
  {
    id: 'orbit-nodes',
    name: 'Orbit Nodes',
    kind: 'Symbol',
    description: 'A precise orbital mark with four connected satellite points.',
    drawing: (a, b) => `
      <circle cx="60" cy="60" r="38" fill="none" stroke="${a}" stroke-width="3"/>
      <circle cx="60" cy="60" r="22" fill="none" stroke="${b}" stroke-width="8" stroke-dasharray="27 17" transform="rotate(-32 60 60)"/>
      <path d="M60 12v25m0 46v25M12 60h25m46 0h25" fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="12" r="6" fill="${b}"/><circle cx="108" cy="60" r="6" fill="${b}"/>
      <circle cx="60" cy="108" r="6" fill="${a}"/><circle cx="12" cy="60" r="6" fill="${a}"/>
      <circle cx="60" cy="60" r="9" fill="${a}"/>
    `,
  },
  {
    id: 'prism-fold',
    name: 'Prism Fold',
    kind: 'Geometric',
    description: 'A folded polygon emblem with crisp architectural layers.',
    drawing: (a, b) => `
      <path d="M60 12 107 38v44L60 108 13 82V38Z" fill="none" stroke="${a}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M60 12v49l47-23M60 61 13 38m47 23v47" fill="none" stroke="${a}" stroke-width="3" stroke-linejoin="round"/>
      <path d="m60 61 47-23v44l-47 26Z" fill="${b}" opacity=".85"/>
      <path d="m13 38 47 23v47L13 82Z" fill="${a}" opacity=".12"/>
      <circle cx="60" cy="61" r="6" fill="${a}"/>
    `,
  },
  {
    id: 'signal-bloom',
    name: 'Signal Bloom',
    kind: 'Decorative',
    description: 'Eight radiating petals around a small signal core.',
    drawing: (a, b) => `
      <g fill="none" stroke="${a}" stroke-width="3.5" stroke-linecap="round">
        <path d="M60 49C43 33 49 15 60 10c11 5 17 23 0 39Z"/>
        <path d="M71 52C72 29 90 20 101 24c4 11-5 29-28 30Z"/>
        <path d="M71 64c16-17 34-11 39 0-5 11-23 17-39 0Z"/>
        <path d="M68 74c23 1 32 19 28 30-11 4-29-5-30-28Z"/>
        <path d="M60 71c17 16 11 34 0 39-11-5-17-23 0-39Z"/>
        <path d="M49 68c-1 23-19 32-30 28-4-11 5-29 28-30Z"/>
        <path d="M49 60c-16 17-34 11-39 0 5-11 23-17 39 0Z"/>
        <path d="M52 49C29 48 20 30 24 19c11-4 29 5 30 28Z"/>
      </g>
      <circle cx="60" cy="60" r="14" fill="${b}"/><circle cx="60" cy="60" r="5" fill="${a}"/>
    `,
  },
  {
    id: 'code-current',
    name: 'Code Current',
    kind: 'Developer',
    description: 'A custom code bracket crest intersected by a flowing pulse.',
    drawing: (a, b) => `
      <path d="M43 24 13 60l30 36M77 24l30 36-30 36" fill="none" stroke="${a}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M69 18 49 102" fill="none" stroke="${b}" stroke-width="6" stroke-linecap="round"/>
      <path d="M27 60h22l8-13 11 26 8-13h17" fill="none" stroke="${a}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="57" cy="47" r="4.5" fill="${b}"/>
    `,
  },
  {
    id: 'axis-star',
    name: 'Axis Star',
    kind: 'Geometric',
    description: 'An eight-axis navigator built from nested angular geometry.',
    drawing: (a, b) => `
      <path d="M60 8 70 42 95 25 78 50l34 10-34 10 17 25-25-17-10 34-10-34-25 17 17-25L8 60l34-10-17-25 25 17Z" fill="none" stroke="${a}" stroke-width="3" stroke-linejoin="round"/>
      <path d="m60 31 29 29-29 29-29-29Z" fill="${b}" opacity=".85"/>
      <path d="M60 31v58M31 60h58" stroke="${a}" stroke-width="3"/>
      <circle cx="60" cy="60" r="9" fill="${a}"/>
    `,
  },
  {
    id: 'frame-flux',
    name: 'Frame Flux',
    kind: 'UI Element',
    description: 'Offset interface frames with two accent rails and a focal point.',
    drawing: (a, b) => `
      <rect x="13" y="18" width="71" height="71" rx="12" fill="none" stroke="${a}" stroke-width="4"/>
      <rect x="36" y="32" width="71" height="71" rx="12" fill="none" stroke="${b}" stroke-width="4"/>
      <path d="M25 43h35M25 54h23M60 78h35" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round"/>
      <path d="M72 43h23" fill="none" stroke="${b}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="84" cy="89" r="8" fill="${a}"/>
    `,
  },
  {
    id: 'link-field',
    name: 'Link Field',
    kind: 'Network',
    description: 'A balanced node-and-link diagram for connected systems.',
    drawing: (a, b) => `
      <path d="M23 32 60 14l37 18v52L60 106 23 84V32Zm0 0 37 35 37-35M23 84l37-17 37 17M60 14v53m0 0v39" fill="none" stroke="${a}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="23" cy="32" r="8" fill="${b}"/><circle cx="97" cy="32" r="8" fill="${b}"/>
      <circle cx="60" cy="14" r="7" fill="${a}"/><circle cx="60" cy="106" r="7" fill="${a}"/>
      <circle cx="23" cy="84" r="7" fill="${a}"/><circle cx="97" cy="84" r="7" fill="${a}"/>
      <circle cx="60" cy="67" r="10" fill="${b}" stroke="${a}" stroke-width="3"/>
    `,
  },
  {
    id: 'wave-beacon',
    name: 'Wave Beacon',
    kind: 'Decorative',
    description: 'A layered ribbon signal capped with a tilted diamond.',
    drawing: (a, b) => `
      <path d="M12 75c16-24 32-24 48 0s32 24 48 0M12 91c16-24 32-24 48 0s32 24 48 0" fill="none" stroke="${a}" stroke-width="5" stroke-linecap="round"/>
      <path d="M60 11 85 36 60 61 35 36Z" fill="${b}" stroke="${a}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M60 11v50M35 36h50" fill="none" stroke="${a}" stroke-width="2.5"/>
      <circle cx="60" cy="36" r="7" fill="${a}"/>
    `,
  },
];

const assets: SvgAsset[] = [...originalAssets, ...additionalSvgAssets];
const categories = Array.from(new Set(assets.map(asset => asset.kind))).sort();
const PAGE_SIZE = 24;

const validColor = (value: string): string =>
  /^#[a-f\d]{6}$/i.test(value) ? value : '#172b4d';

/**
 * Attribution is embedded in every copied, standalone and ZIP-exported SVG.
 * The branded definition ID is a functional rendering dependency: removing
 * or renaming it without updating the matching <use> reference hides the art.
 * SVG is an open editable format, so this is not cryptographic DRM.
 * A different instance scope prevents <use> collisions between previews.
 */
const renderSvg = (asset: SvgAsset, ink: string, accent: string, instance: string = 'public'): string => {
  const artworkId = 'jelvan-original-' + asset.id + '-' + instance;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none" role="img" aria-label="${asset.name}" data-creator="Jelvan B. Ricolcol" data-brand="Jelvan Elements">
  <!-- Original SVG artwork by Jelvan B. Ricolcol (Jelvan Elements). Please retain creator credit. https://portfolio.jelvan.pro/tools -->
  <title>${asset.name} — Original Jelvan Elements SVG by Jelvan B. Ricolcol</title>
  <desc>Original vector design by Jelvan B. Ricolcol for Jelvan Elements. Creator: https://portfolio.jelvan.pro/tools. Please retain attribution when copying or modifying.</desc>
  <metadata>Creator: Jelvan B. Ricolcol | Brand: Jelvan Elements | Source: https://portfolio.jelvan.pro/tools | Attribution requested.</metadata>
  <defs><g id="${artworkId}">${asset.drawing(validColor(ink), validColor(accent))}</g></defs>
  <use href="#${artworkId}"/>
</svg>`;
};

function saveSvg(svg: string, name: string) {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `jelvan-${name}.svg`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function SvgLibrary() {
  const [selected, setSelected] = useState(assets[0].id);
  const [ink, setInk] = useState('#172b4d');
  const [accent, setAccent] = useState('#f48120');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [shown, setShown] = useState(PAGE_SIZE);
  const search = query.trim().toLowerCase();
  const matches = assets.filter(asset =>
    (category === 'all' || asset.kind === category) &&
    (asset.name + ' ' + asset.kind + ' ' + asset.description).toLowerCase().includes(search));
  const visible = matches.slice(0, shown);
  const current = matches.find(asset => asset.id === selected) || matches[0] || assets[0];
  const currentSvg = renderSvg(current, ink, accent, 'public');

  const copySvg = async (asset: SvgAsset) => {
    setSelected(asset.id);
    try {
      await navigator.clipboard.writeText(renderSvg(asset, ink, accent));
      setMessage(`${asset.name} SVG copied to clipboard.`);
    } catch {
      setMessage('Clipboard unavailable. Select the SVG source below and copy it manually.');
    }
  };

  const saveAll = () => {
    saveCollectionZip(assets.map(asset => ({
      name: 'jelvan-' + asset.id + '.svg',
      content: renderSvg(asset, ink, accent),
    })));
    setMessage('Full library downloaded as ' + assets.length + ' editable SVG files.');
  };
  const changeSearch = (value: string) => { setQuery(value); setShown(PAGE_SIZE); setMessage(''); };
  const changeCategory = (value: string) => { setCategory(value); setShown(PAGE_SIZE); setMessage(''); };

  return (
    <div className={styles.library}>
      <div className={styles.intro}>
        <div>
          <p className={styles.kicker}>JELVAN ELEMENTS / ORIGINAL VECTOR COLLECTION</p>
          <h3>Own the details. Copy the vectors.</h3>
          <p>{assets.length} original symbols and interface elements made for this portfolio. Free to copy, recolor or download as editable SVG files. Creator attribution is included in every file.</p>
        </div>
        <div className={styles.controls}>
          <div className={styles.palette}>
            <label>Primary color<input aria-label="SVG primary color" type="color" value={ink} onChange={event => { setInk(event.target.value); setMessage(''); }} /></label>
            <label>Accent color<input aria-label="SVG accent color" type="color" value={accent} onChange={event => { setAccent(event.target.value); setMessage(''); }} /></label>
          </div>
          <button className={styles.downloadAll} type="button" onClick={saveAll}>Download all {assets.length} SVGs (.zip)</button>
        </div>
      </div>
      <div className={styles.filters}>
        <label htmlFor="svg-library-search">Search designs
          <input id="svg-library-search" type="search" value={query} onChange={event => changeSearch(event.target.value)} placeholder="Search by name or style..." autoComplete="off" />
        </label>
        <label htmlFor="svg-library-category">Collection
          <select id="svg-library-category" value={category} onChange={event => changeCategory(event.target.value)}>
            <option value="all">All collections</option>
            {categories.map(group => <option key={group} value={group}>{group}</option>)}
          </select>
        </label>
        <p className={styles.count} role="status">{matches.length} designs found · Showing {visible.length}</p>
      </div>
      <div className={styles.layout}>
        <div className={styles.gallery}>
        <div className={styles.collection} aria-label="Original SVG designs">
          {visible.map(asset => (
            <div key={asset.id} className={`${styles.tile} ${current.id === asset.id ? styles.activeTile : ''}`}>
              <button type="button" className={styles.previewButton} aria-label={`Preview ${asset.name}`} aria-pressed={current.id === asset.id} onClick={() => { setSelected(asset.id); setMessage(''); }}>
                <span className={styles.art} aria-hidden="true" dangerouslySetInnerHTML={{ __html: renderSvg(asset, ink, accent, 'gallery') }} />
                <span className={styles.assetName}>{asset.name}</span>
                <span className={styles.assetKind}>{asset.kind}</span>
              </button>
              <button className={styles.quickCopy} type="button" onClick={() => void copySvg(asset)} aria-label={`Copy SVG for ${asset.name}`}>Copy SVG</button>
            </div>
          ))}
        </div>
        {matches.length === 0 ? <p className={styles.empty}>No SVG designs match this search. Try another name or collection.</p> : null}
        {visible.length < matches.length ?
          <button className={styles.showMore} type="button" onClick={() => setShown(count => count + PAGE_SIZE)}>
            Show more SVG designs ({matches.length - visible.length} remaining)
          </button> : null}
        </div>
        <section className={styles.inspector} aria-label="SVG source and download">
          <div className={styles.inspectorArt} aria-hidden="true" dangerouslySetInnerHTML={{ __html: renderSvg(current, ink, accent, 'inspector') }} />
          <p className={styles.assetKind}>{current.kind} · 120 × 120 · transparent</p>
          <h4>{current.name}</h4>
          <p>{current.description}</p>
          <div className={styles.actions}>
            <button type="button" onClick={() => void copySvg(current)}>Copy SVG code</button>
            <button type="button" onClick={() => saveSvg(currentSvg, current.id)}>Download .svg</button>
          </div>
          <p className={styles.status} role="status" aria-live="polite">{message}</p>
          <label className={styles.sourceLabel} htmlFor="original-svg-source">Editable SVG source</label>
          <textarea id="original-svg-source" aria-label="Original SVG source" value={currentSvg} readOnly spellCheck={false} rows={6} />
          <p className={styles.legal}>Original artwork by Jelvan B. Ricolcol for Jelvan Elements. Copying and customization are welcome; please retain the embedded creator credit. Each SVG uses a branded definition reference to render its artwork. Editing both matching references can bypass this protection because SVG is an open format.</p>
        </section>
      </div>
    </div>
  );
}
