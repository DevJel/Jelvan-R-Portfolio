import React from 'react';
import Navbar from '../Navbar/Navbar';
import SvgLibrary from './SvgLibrary';
import DeveloperSectionsTabs from './DeveloperSectionsTabs';
import styles from './DevTools.module.css';
import pageStyles from './SvgLibraryPage.module.css';

export default function SvgLibraryPage() {
  return (
    <div className={styles.root}>
      <Navbar isLogoExpanded />
      <main className={styles.main}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>JELVAN ELEMENTS / ORIGINAL VECTOR DESIGNS</span>
          <h1>SVG Library<span>.</span></h1>
          <p>Explore, recolor, copy and download original SVG artwork.</p>
          <span className={styles.local}>208 vector designs · 108 original symbols + 100 PC component illustrations</span>
        </header>
        <DeveloperSectionsTabs current="svg" />
        <section className={`${styles.panel} ${pageStyles.svgPanel}`} aria-label="SVG Library workspace">
          <div className={`${styles.content} ${pageStyles.svgContent}`}>
            <SvgLibrary />
          </div>
        </section>
        <footer className={styles.footer}>Developed and Designed by Jelvan® <span>2026</span></footer>
      </main>
    </div>
  );
}
