import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PAGES } from '../utils/seo';

import PortfolioLayout from '../components/PortfolioLayout/PortfolioLayout';
import PortfolioLanding from '../components/PortfolioLanding/PortfolioLanding';
import Navbar from '../components/Navbar/Navbar';

const FOLDER_PORTFOLIO_URL = 'https://jelvan-folder-portfolio-design.pages.dev/';

const Viewport = styled.main`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-height: 420px;
  overflow: hidden;
  position: relative;
`;

const FolderFrame = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #111318;
`;

const StandardView = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  > main {
    height: 100% !important;
    min-height: 0;
  }
`;

const ViewControl = styled.div<{ $inMenu?: boolean }>`
  position: ${({ $inMenu }) => ($inMenu ? 'relative' : 'absolute')};
  z-index: 1200;
  top: ${({ $inMenu }) => ($inMenu ? 'auto' : '17px')};
  right: ${({ $inMenu }) => ($inMenu ? 'auto' : 'max(20px, calc((100vw - 1180px) / 2))')};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;

  @media (max-width: 700px) {
    top: ${({ $inMenu }) => ($inMenu ? 'auto' : '12px')};
    right: ${({ $inMenu }) => ($inMenu ? 'auto' : '12px')};
  }
`;

const ViewTrigger = styled.button`
  pointer-events: auto;
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 13px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 999px;
  color: rgba(255,255,255,.94);
  background: rgba(23,25,30,.38);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 5px 22px rgba(0,0,0,.12);
  font: inherit;
  font-size: 11px;
  font-weight: 650;
  letter-spacing: .02em;
  cursor: pointer;
  transition: background .18s ease, border-color .18s ease;

  &:hover { background: rgba(35,38,45,.72); border-color: rgba(255,255,255,.34); }
  &:focus-visible { outline: 2px solid #f59e0b; outline-offset: 3px; }

  span:first-child {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #f59e0b;
    box-shadow: 0 0 10px rgba(245,158,11,.5);
  }

  @media (max-width: 560px) {
    min-height: 35px;
    padding: 0 11px;
    font-size: 10px;
  }
`;

const ViewPanel = styled.div<{ $open: boolean }>`
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  display: flex;
  gap: 4px;
  margin-top: 7px;
  padding: 5px;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 13px;
  background: rgba(19,21,26,.62);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 12px 34px rgba(0,0,0,.2);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? '0' : '-5px')});
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity .16s ease, transform .16s ease, visibility .16s ease;
`;

const ViewOption = styled.button<{ $active: boolean }>`
  appearance: none;
  border: 0;
  border-radius: 9px;
  padding: 9px 12px;
  color: ${({ $active }) => ($active ? '#17181c' : 'rgba(255,255,255,.78)')};
  background: ${({ $active }) => ($active ? '#f3f4f6' : 'transparent')};
  font: inherit;
  font-size: 11px;
  font-weight: 650;
  white-space: nowrap;
  cursor: pointer;

  &:hover { background: ${({ $active }) => ($active ? '#f3f4f6' : 'rgba(255,255,255,.1)')}; }
  &:focus-visible { outline: 2px solid #f59e0b; outline-offset: 2px; }
`;

const PortfolioLandingPage: NextPage = () => {
  const [view, setView] = useState<'standard' | 'folders'>('folders');
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('jelvan-portfolio-view');
      if (saved === 'folders' || saved === 'standard') setView(saved);
    } catch {
      // The selector remains usable when browser storage is unavailable.
    }
  }, []);

  const changeView = (next: 'standard' | 'folders') => {
    setView(next);
    setPanelOpen(false);
    try {
      window.localStorage.setItem('jelvan-portfolio-view', next);
    } catch {
      // The selected view still changes for this session.
    }
  };

  const viewSwitcher = (inMenu: boolean) => (
    <ViewControl $inMenu={inMenu}>
      <ViewTrigger
        type="button"
        aria-label={`Switch portfolio view; currently ${view === 'folders' ? 'Folder View' : 'Standard'}`}
        aria-expanded={panelOpen}
        aria-controls="portfolio-view-options"
        onClick={() => setPanelOpen((open) => !open)}
      >
        <span aria-hidden="true" />
        <span>Switch view</span>
        <span aria-hidden="true">{panelOpen ? '−' : '⌄'}</span>
      </ViewTrigger>
      <ViewPanel id="portfolio-view-options" $open={panelOpen} role="group" aria-label="Portfolio views">
        <ViewOption type="button" $active={view === 'folders'} aria-pressed={view === 'folders'} onClick={() => changeView('folders')}>
          Folder View
        </ViewOption>
        <ViewOption type="button" $active={view === 'standard'} aria-pressed={view === 'standard'} onClick={() => changeView('standard')}>
          Standard
        </ViewOption>
      </ViewPanel>
    </ViewControl>
  );

  return (
    <PortfolioLayout seo={PAGES.home}>
      <Viewport>
        {view === 'folders' ? (
          <>
            <FolderFrame
              title="Jelvan folder portfolio"
              src={FOLDER_PORTFOLIO_URL}
              loading="eager"
              allow="clipboard-write"
            />
            {viewSwitcher(false)}
          </>
        ) : (
          <StandardView>
            <Navbar isLogoExpanded={true} menuFooter={viewSwitcher(true)} />
            <PortfolioLanding />
          </StandardView>
        )}
      </Viewport>
    </PortfolioLayout>
  );
};

export default PortfolioLandingPage;
