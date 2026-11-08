import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PAGES } from '../utils/seo';

import PortfolioLayout from '../components/PortfolioLayout/PortfolioLayout';
import PortfolioLanding from '../components/PortfolioLanding/PortfolioLanding';
import Navbar from '../components/Navbar/Navbar';

const FOLDER_PORTFOLIO_URL = 'https://jelvan-folder-portfolio-design.pages.dev/';

const ViewBar = styled.header`
  position: relative;
  z-index: 1000;
  width: 100%;
  min-height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 20px;
  background: #111318;
  border-bottom: 1px solid rgba(255,255,255,.09);
  color: #f5f5f5;
  box-sizing: border-box;

  @media (max-width: 560px) {
    min-height: 58px;
    padding: 8px 10px;
  }
`;

const BarInner = styled.div`
  width: min(100%, 1180px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  @media (max-width: 560px) {
    gap: 8px;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  strong {
    font-size: 12px;
    letter-spacing: .13em;
    font-weight: 750;
    white-space: nowrap;
  }

  span {
    color: #9297a2;
    font-size: 10px;
    white-space: nowrap;
  }

  @media (max-width: 560px) {
    strong { font-size: 10px; letter-spacing: .08em; }
    span { display: none; }
  }
`;

const Switch = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 4px;
  border: 1px solid rgba(255,255,255,.13);
  border-radius: 999px;
  background: #1b1e25;
  flex-shrink: 0;
`;

const SwitchButton = styled.button<{ $active: boolean }>`
  appearance: none;
  border: 0;
  border-radius: 999px;
  padding: 9px 15px;
  background: ${({ $active }) => ($active ? '#f4f4f5' : 'transparent')};
  color: ${({ $active }) => ($active ? '#15161a' : '#b9bdc7')};
  font: inherit;
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
  white-space: nowrap;
  transition: background .18s ease, color .18s ease;

  &:hover { color: ${({ $active }) => ($active ? '#15161a' : '#fff')}; }
  &:focus-visible { outline: 2px solid #f59e0b; outline-offset: 2px; }

  @media (max-width: 560px) {
    padding: 9px 11px;
    font-size: 11px;
  }
`;

const Viewport = styled.main`
  width: 100%;
  height: calc(100vh - 62px);
  height: calc(100dvh - 62px);
  min-height: 420px;
  overflow: hidden;
  position: relative;

  @media (max-width: 560px) {
    height: calc(100vh - 58px);
    height: calc(100dvh - 58px);
  }
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

const PortfolioLandingPage: NextPage = () => {
  const [view, setView] = useState<'standard' | 'folders'>('standard');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('jelvan-portfolio-view');
      if (saved === 'folders' || saved === 'standard') setView(saved);
    } catch {
      // The switch remains usable when browser storage is unavailable.
    }
  }, []);

  const changeView = (next: 'standard' | 'folders') => {
    setView(next);
    try {
      window.localStorage.setItem('jelvan-portfolio-view', next);
    } catch {
      // The selected view still changes for this session.
    }
  };

  return (
    <PortfolioLayout seo={PAGES.home}>
      <ViewBar aria-label="Portfolio view selector">
        <BarInner>
          <Brand>
            <strong>JELVAN R.</strong>
            <span>Choose your portfolio view</span>
          </Brand>
          <Switch role="group" aria-label="Choose portfolio layout">
            <SwitchButton
              type="button"
              $active={view === 'standard'}
              aria-pressed={view === 'standard'}
              onClick={() => changeView('standard')}
            >
              Standard
            </SwitchButton>
            <SwitchButton
              type="button"
              $active={view === 'folders'}
              aria-pressed={view === 'folders'}
              onClick={() => changeView('folders')}
            >
              Folder View
            </SwitchButton>
          </Switch>
        </BarInner>
      </ViewBar>
      <Viewport>
        {view === 'folders' ? (
          <FolderFrame
            title="Jelvan folder portfolio"
            src={FOLDER_PORTFOLIO_URL}
            loading="lazy"
            allow="clipboard-write"
          />
        ) : (
          <StandardView>
            <Navbar isLogoExpanded={true} />
            <PortfolioLanding />
          </StandardView>
        )}
      </Viewport>
    </PortfolioLayout>
  );
};

export default PortfolioLandingPage;
