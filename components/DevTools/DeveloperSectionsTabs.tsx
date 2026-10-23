import React from 'react';
import Link from 'next/link';
import styles from './DeveloperSectionsTabs.module.css';

type Section = 'tools' | 'svg';

export default function DeveloperSectionsTabs({ current }: { current: Section }) {
  return (
    <nav className={styles.tabs} aria-label="Developer workspace sections">
      <Link href="/tools" className={current === 'tools' ? styles.active : styles.tab} aria-current={current === 'tools' ? 'page' : undefined}>Dev Tools</Link>
      <Link href="/svg-library" className={current === 'svg' ? styles.active : styles.tab} aria-current={current === 'svg' ? 'page' : undefined}>SVG Library</Link>
    </nav>
  );
}
