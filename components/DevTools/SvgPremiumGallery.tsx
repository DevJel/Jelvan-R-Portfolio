import React, { useEffect, useMemo, useState } from 'react';
import collection from './PremiumSvgCatalog.json';
import { saveCollectionZip } from './SvgLibraryExport';
import shared from './SvgLibrary.module.css';
import styles from './SvgPremiumGallery.module.css';

type PremiumAsset = {
  slug: string;
  name: string;
  category: string;
  animated: boolean;
};
const assets: PremiumAsset[] = collection;
const categories = Array.from(new Set(assets.map(asset => asset.category)));
const PAGE_SIZE = 24;

const assetPath = (asset: PremiumAsset, motion: boolean): string =>
  '/assets/svg-library/premium/' + asset.category.toLowerCase() + '/' +
  asset.slug + (asset.animated && !motion ? '-still' : '') + '.svg';

async function fetchSource(path: string) {
  const response = await fetch(path);
  if (!response.ok) throw new Error('SVG unavailable');
  const source = await response.text();
  if (!source.trimStart().startsWith('<svg') || !source.includes('</svg>')) {
    throw new Error('Invalid SVG source');
  }
  return source;
}

function saveSingleSvg(source: string, name: string) {
  const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'jelvan-' + name + '.svg';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function SvgPremiumGallery() {
  const [category, setCategory] = useState('all');
  const [motionFilter, setMotionFilter] = useState<'all' | 'animated' | 'static'>('all');
  const [search, setSearch] = useState('');
  const [shown, setShown] = useState(PAGE_SIZE);
  const [active, setActive] = useState(assets[0].slug);
  const [playMotion, setPlayMotion] = useState(false);
  const [loadedPath, setLoadedPath] = useState('');
  const [source, setSource] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPlayMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const matches = useMemo(() => assets.filter(asset =>
    (category === 'all' || asset.category === category) &&
    (motionFilter === 'all' || (motionFilter === 'animated' ? asset.animated : !asset.animated)) &&
    (asset.name + ' ' + asset.category + ' ' + asset.slug).toLowerCase().includes(search.toLowerCase().trim())
  ), [category, motionFilter, search]);
  const visible = matches.slice(0, shown);
  const selected = matches.find(asset => asset.slug === active) || matches[0];
  const selectedPath = selected ? assetPath(selected, playMotion) : '';
  const selectedSource = selectedPath === loadedPath ? source : '';

  useEffect(() => {
    if (!selectedPath) return;
    let live = true;
    setLoadedPath('');
    setSource('');
    fetchSource(selectedPath).then(value => {
      if (live) { setSource(value); setLoadedPath(selectedPath); }
    }).catch(() => {
      if (live) setMessage('Could not load this design. Select another icon.');
    });
    return () => { live = false; };
  }, [selectedPath]);

  const changeCategory = (value: string) => {
    setCategory(value);
    setShown(PAGE_SIZE);
    setMessage('');
  };

  const copyIcon = async (asset: PremiumAsset) => {
    setActive(asset.slug);
    const path = assetPath(asset, playMotion);
    const sourcePromise = fetchSource(path);
    try {
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
        // Start clipboard access inside the click event rather than after fetch resolves.
        await navigator.clipboard.write([
          new ClipboardItem({ 'text/plain': sourcePromise.then(value => new Blob([value], { type: 'text/plain' })) }),
        ]);
      } else {
        await navigator.clipboard.writeText(await sourcePromise);
      }
      const markup = await sourcePromise;
      setSource(markup);
      setLoadedPath(path);
      setMessage(asset.name + ' copied. Paste the complete vector markup into HTML or an SVG editor.');
    } catch {
      try {
        setSource(await sourcePromise);
        setLoadedPath(path);
        setMessage('Clipboard unavailable. Select and copy the SVG source in the inspector.');
      } catch {
        setMessage('Unable to load this icon. Please retry.');
      }
    }
  };

  const downloadIcon = async (asset: PremiumAsset) => {
    setActive(asset.slug);
    const path = assetPath(asset, playMotion);
    try {
      const markup = await fetchSource(path);
      setSource(markup);
      setLoadedPath(path);
      saveSingleSvg(markup, asset.slug + (asset.animated && !playMotion ? '-still' : ''));
      setMessage(asset.name + ' downloaded.');
    } catch {
      setMessage('Unable to download this icon. Please retry.');
    }
  };

  const downloadAll = async () => {
    if (busy) return;
    setBusy(true);
    setMessage('Preparing 48 premium icons and 24 optional still versions...');
    try {
      const paths = assets.flatMap(asset => [
        { name: asset.category.toLowerCase() + '/' + asset.slug + '.svg', path: assetPath(asset, true) },
        ...(asset.animated ? [{
          name: asset.category.toLowerCase() + '/' + asset.slug + '-still.svg',
          path: assetPath(asset, false),
        }] : []),
      ]);
      const files: { name: string; content: string }[] = [];
      for (let i = 0; i < paths.length; i += 12) {
        const batch = paths.slice(i, i + 12);
        const contents = await Promise.all(batch.map(file => fetchSource(file.path)));
        batch.forEach((file, index) => files.push({ name: file.name, content: contents[index] }));
      }
      saveCollectionZip(files);
      setMessage('72 SVG files downloaded: 48 premium designs, with still alternatives for the 24 animations.');
    } catch {
      setMessage('Could not prepare the ZIP. Check your connection and retry.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="premium-svg-title">
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>JELVAN ELEMENTS / ICON STUDIO</p>
          <h4 id="premium-svg-title">Premium icons & motion <span>48 designs</span></h4>
          <p>48 distinct illustrations in eight creative collections · 24 with subtle, reduced-motion-aware animation.</p>
        </div>
        <div className={styles.headControls}>
          <button type="button" aria-pressed={playMotion} onClick={() => setPlayMotion(value => !value)}>
            {playMotion ? 'Pause motion' : 'Play motion'}
          </button>
          <button type="button" onClick={() => void downloadAll()} disabled={busy}>
            {busy ? 'Preparing ZIP...' : 'Download full premium pack (.zip)'}
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.categories} role="group" aria-label="Premium icon categories">
          <button type="button" aria-pressed={category === 'all'} onClick={() => changeCategory('all')}>
            All icons <strong>{assets.length}</strong>
          </button>
          {categories.map(group => (
            <button key={group} type="button" aria-pressed={category === group} onClick={() => changeCategory(group)}>
              {group} <strong>{assets.filter(asset => asset.category === group).length}</strong>
            </button>
          ))}
        </div>
        <div className={styles.filters}>
          <label htmlFor="premium-svg-search">Search premium icons
            <input id="premium-svg-search" type="search" value={search}
              onChange={event => { setSearch(event.target.value); setShown(PAGE_SIZE); }}
              placeholder="Search by name or collection..." />
          </label>
          <label htmlFor="premium-svg-type">Artwork type
            <select id="premium-svg-type" value={motionFilter} onChange={event => {
              setMotionFilter(event.target.value as 'all' | 'animated' | 'static');
              setShown(PAGE_SIZE);
            }}>
              <option value="all">All designs (48)</option>
              <option value="animated">Animated (24)</option>
              <option value="static">Static (24)</option>
            </select>
          </label>
        </div>
        <p className={styles.count} role="status">{matches.length} premium icons found · Showing {visible.length}</p>
        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={[shared.collection, styles.grid].join(' ')} aria-label="Premium SVG designs">
              {visible.map(asset => (
                <div key={asset.slug} className={[
                  shared.tile, styles.tile, selected?.slug === asset.slug ? shared.activeTile : '',
                ].join(' ')}>
                  <button type="button" className={shared.previewButton}
                    aria-label={'Preview premium icon ' + asset.name}
                    aria-pressed={selected?.slug === asset.slug}
                    onClick={() => { setActive(asset.slug); setMessage(''); }}>
                    <span className={shared.art}>
                      <img className={styles.iconPreview} src={assetPath(asset, playMotion)} alt="" loading="lazy" width={80} height={80} />
                    </span>
                    <span className={shared.assetName}>{asset.name}</span>
                    <span className={shared.assetKind}>{asset.category} · {asset.animated ? 'Motion' : 'Static'}</span>
                  </button>
                  <div className={styles.tileActions}>
                    <button type="button" className={shared.quickCopy} aria-label={'Copy premium SVG for ' + asset.name}
                      onClick={() => void copyIcon(asset)}>Copy SVG</button>
                    <button type="button" className={shared.quickCopy} aria-label={'Download premium SVG for ' + asset.name}
                      onClick={() => void downloadIcon(asset)}>Download</button>
                  </div>
                </div>
              ))}
            </div>
            {visible.length < matches.length && <button type="button" className={styles.more}
              onClick={() => setShown(value => value + PAGE_SIZE)}>
              Show more premium icons ({matches.length - visible.length} remaining)
            </button>}
            {matches.length === 0 && <p className={styles.empty}>No icons match this search. Try a different term or category.</p>}
          </div>
          <aside className={[shared.inspector, styles.inspector].join(' ')} aria-label="Premium SVG inspector">
            {selected ? <>
              <div className={shared.inspectorArt}>
                <img className={styles.inspectorPreview} src={selectedPath} alt={selected.name} width={122} height={122} />
              </div>
              <p className={shared.assetKind}>{selected.category} · 120 × 120 · {selected.animated ? 'Animated SVG' : 'Static SVG'}</p>
              <h4>{selected.name}</h4>
              <p>Fully editable vector markup. Motion variants contain CSS only, never JavaScript.</p>
              <div className={shared.actions}>
                <button type="button" onClick={() => void copyIcon(selected)} disabled={!selectedSource}>Copy SVG source</button>
                <button type="button" onClick={() => void downloadIcon(selected)}>Download .svg</button>
              </div>
              <p className={styles.status} role="status" aria-live="polite">{message}</p>
              <label className={shared.sourceLabel} htmlFor="premium-svg-source">SVG markup · copy and paste</label>
              <textarea id="premium-svg-source" aria-label="Premium SVG source" value={selectedSource}
                readOnly rows={7} spellCheck={false} />
              <p className={styles.note}>Animation pauses automatically when your system requests reduced motion. The ZIP includes motion and still variants.</p>
            </> : <p>Select a design to inspect it.</p>}
          </aside>
        </div>
      </div>
    </section>
  );
}
