import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { keyHighlights, professionalExperience, strategicHrSkills } from '../Resume/Resume.config';

type ResumeDesign = {
  name: string;
  description: string;
};

const designs: ResumeDesign[] = [
  { name: 'Swiss Minimalist', description: 'Whitespace, left rule and uppercase labels' },
  { name: 'Executive Navy & Gold', description: 'Executive navy with gold accents' },
  { name: 'Two-Column Editorial', description: 'Dark sidebar and editorial content' },
  { name: 'Modernist Timeline', description: 'Vertical experience timeline' },
  { name: 'Corporate Monochrome', description: 'Black banner and refined typography' },
  { name: 'Scandinavian Light', description: 'Soft beige and rounded structure' },
  { name: 'Bold Geometric', description: 'Modern geometric color blocks' },
  { name: 'ATS-Optimized', description: 'Clear, straightforward resume hierarchy' },
  { name: 'Creative Director HR', description: 'Asymmetric editorial treatment' },
  { name: 'Luxury Serif', description: 'Cream paper and elegant serif headings' },
  { name: 'Infographic Style', description: 'Impact figures and visual indicators' },
  { name: 'Tech HR', description: 'Structured data cards and cool neutrals' },
  { name: 'Global Corporate', description: 'Corporate blue and organized content' },
  { name: 'Compact Impact', description: 'Dense one-page visual format' },
  { name: 'Editorial Magazine', description: 'Magazine-inspired hierarchy' },
  { name: 'Minimal Line Art', description: 'Borders and line-based composition' },
  { name: 'Executive Brief', description: 'Summary-led executive layout' },
  { name: 'Modern Gradient', description: 'Gentle gradient and glass-inspired style' },
  { name: 'Consulting Deck', description: 'Numbered, structured consulting layout' },
  { name: 'Future HR', description: 'Dark mode with electric highlights' },
];

const Section = styled.section`
  background: linear-gradient(180deg, #fffaf4 0%, #ffffff 100%);
  padding: clamp(4rem, 7vw, 7rem) 0 clamp(5rem, 9vw, 8rem);
  color: #172b4d;
  border-top: 1px solid #f0e5d9;
`;
const Container = styled.div`
  max-width: 1320px;
  padding: 0 clamp(1.1rem, 4.5vw, 4rem);
  margin: auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-end;
  margin-bottom: 1.8rem;
  @media (max-width: 720px) { align-items: flex-start; flex-direction: column; gap: 1.2rem; }
  .eyebrow {
    color: #d96514;
    font-size: 0.8rem;
    letter-spacing: 0.19em;
    font-weight: 700;
    text-transform: uppercase;
  }
  h2 { margin: .6rem 0; font-size: clamp(2rem, 4vw, 3.4rem); letter-spacing: -.045em; line-height: 1.16; }
  p { max-width: 660px; color: #5d6574; line-height: 1.65; font-size: .95rem; }
`;
const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: .65rem;
  flex-shrink: 0;
  .count { font-size: .85rem; font-weight: 700; min-width: 4.5rem; text-align: center; font-variant-numeric: tabular-nums; }
  button {
    width: 44px;
    height: 44px;
    border: 1px solid #172b4d;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: white;
    color: #172b4d;
    cursor: pointer;
    font-size: 1.4rem;
    transition: background .2s, color .2s;
  }
  button:hover:not(:disabled), button:focus-visible { background: #172b4d; color: white; }
  button:focus-visible { outline: 3px solid #f48120; outline-offset: 3px; }
  button:disabled { opacity: .3; cursor: not-allowed; }
`;
const Track = styled.ol`
  display: flex;
  gap: 1.15rem;
  margin: 0;
  padding: .3rem .2rem 1.5rem;
  list-style: none;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: .2rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #dcaa80 #fff1e4;
`;
const Card = styled.li`
  flex: 0 0 min(84vw, 342px);
  scroll-snap-align: start;
  border-radius: 14px;
  border: 1px solid #eadfd4;
  background: #ffffff;
  box-shadow: 0 8px 28px rgba(23, 43, 77, .07);
  padding: .85rem;
  min-width: 0;
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: .75rem;
  min-height: 64px;
  padding: 0 .3rem .8rem;
  .number { background: #172b4d; color: #fff; border-radius: 8px; width: 29px; height: 29px; display: grid; place-items: center; font-size: .74rem; font-weight: 700; flex: 0 0 auto; }
  h3 { font-size: .9rem; line-height: 1.35; margin: 0; }
  p { font-size: .7rem; line-height: 1.45; color: #7b8190; margin: .15rem 0 0; }
`;
const Sheet = styled.div`
  --accent: #f48120;
  --ink: #182437;
  --paper: #ffffff;
  --muted: #64748b;
  aspect-ratio: 210 / 297;
  overflow: hidden;
  background: var(--paper);
  color: var(--ink);
  border: 1px solid rgba(0,0,0,.10);
  padding: 22px 19px;
  font-family: Inter, Arial, sans-serif;
  font-size: 9px;
  line-height: 1.55;
  position: relative;
  .masthead { border-bottom: 2px solid var(--accent); padding-bottom: 12px; margin-bottom: 12px; }
  .kicker { color: var(--accent); font-size: 8px; text-transform: uppercase; letter-spacing: .16em; font-weight: 700; }
  h4 { margin: 4px 0 2px; font-weight: 800; font-size: 23px; line-height: 1.06; letter-spacing: -.045em; }
  .role { font-size: 9px; font-weight: 600; }
  .contact { margin-top: 7px; font-size: 7px; color: var(--muted); }
  .profile { line-height: 1.65; color: var(--muted); margin: 0 0 13px; font-size: 8.5px; }
  .body { display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px; }
  h5 { text-transform: uppercase; letter-spacing: .11em; font-size: 8px; margin: 0 0 7px; padding-bottom: 4px; border-bottom: 1px solid var(--accent); }
  .job { margin-bottom: 9px; padding-left: 8px; border-left: 2px solid var(--accent); }
  .job strong { font-size: 8px; display: block; line-height: 1.3; }
  .job span { display: block; font-size: 7px; color: var(--muted); margin: 2px 0; }
  .job p { margin: 0; font-size: 7px; line-height: 1.5; }
  .skills { list-style: none; padding: 0; margin: 0; }
  .skills li { padding: 4px 0; border-bottom: 1px solid rgba(100,116,139,.14); font-size: 7.4px; }
  .impact { margin: 10px 0 0; padding: 9px; background: color-mix(in srgb, var(--accent) 9%, white); }
  .impact strong { display: block; font-size: 15px; line-height: 1.15; }
  .impact span { font-size: 7px; color: var(--muted); }
  .foot { margin-top: 14px; padding-top: 7px; border-top: 1px solid rgba(100,116,139,.20); text-transform: uppercase; font-size: 6px; letter-spacing: .08em; color: var(--muted); }

  /* Each treatment corresponds to a named layout in the supplied sample set. */
  &[data-design="1"] { border-left: 4px solid #161616; --accent: #111; }
  &[data-design="1"] h4 { text-transform: uppercase; letter-spacing: -.02em; }
  &[data-design="2"] { --paper: #fffcf5; --ink: #0a1931; --accent: #d4af37; }
  &[data-design="2"] .masthead { background: #0a1931; color: white; margin: -22px -19px 16px; padding: 23px 19px 15px; }
  &[data-design="3"] { --accent: #222; }
  &[data-design="3"] .body { grid-template-columns: .9fr 1.4fr; direction: rtl; }
  &[data-design="3"] .body > * { direction: ltr; }
  &[data-design="3"] .side { background: #141414; color: white; padding: 10px; }
  &[data-design="3"] .skills li, &[data-design="3"] .side h5 { color: white; }
  &[data-design="4"] { --accent: #111; }
  &[data-design="4"] .job { border-left: 2px solid #111; padding-left: 11px; position: relative; }
  &[data-design="4"] .job:before { content: ''; background: #111; width: 7px; height: 7px; border-radius: 50%; position: absolute; top: 0; left: -5px; }
  &[data-design="5"] { --accent: #111; --paper: #fafaf8; }
  &[data-design="5"] .masthead { margin: -22px -19px 15px; padding: 22px 19px; background: #111; color: white; }
  &[data-design="5"] h4 { font-family: Georgia, serif; font-weight: 400; }
  &[data-design="6"] { --accent: #9b8065; --paper: #f6f3ee; border-radius: 14px; padding: 28px 20px; }
  &[data-design="6"] .masthead, &[data-design="6"] .impact { border-radius: 12px; background: white; padding: 12px; }
  &[data-design="6"] .job { border-left: 0; padding-left: 0; }
  &[data-design="7"] { --paper: #fff; --accent: #003566; }
  &[data-design="7"]:before { content: ''; position: absolute; width: 110px; height: 110px; background: #ffd60a; right: -38px; top: -42px; border-radius: 30%; }
  &[data-design="7"] .kicker { background: #ffd60a; color: #111; display: inline-block; padding: 2px 5px; }
  &[data-design="7"] .impact { background: #003566; color: white; }
  &[data-design="8"] { --accent: #111; }
  &[data-design="8"] .masthead, &[data-design="8"] h5 { border-color: #111; }
  &[data-design="8"] .job { border: 0; padding-left: 0; }
  &[data-design="8"] .impact { background: #f5f5f5; }
  &[data-design="9"] { --paper: #fffbf5; --accent: #f48120; }
  &[data-design="9"] .profile { padding: 8px; border: 1px solid #111; box-shadow: 4px 4px 0 #111; margin-right: 4px; }
  &[data-design="9"] h4 { font-size: 29px; line-height: .95; }
  &[data-design="10"] { --paper: #fdfaf6; --accent: #b2a187; }
  &[data-design="10"] h4, &[data-design="10"] h5 { font-family: Georgia, serif; font-weight: 400; }
  &[data-design="10"] .masthead { text-align: center; padding-top: 10px; }
  &[data-design="10"] .job { border: 0; padding-left: 0; }
  &[data-design="11"] { --accent: #111; }
  &[data-design="11"] .impact { background: #ffd60a; }
  &[data-design="11"] .skills li:after { content: ''; display: block; background: linear-gradient(90deg, #111 75%, #e8e8e8 75%); height: 3px; margin-top: 3px; }
  &[data-design="12"] { --paper: #f8faff; --accent: #0ea5e9; }
  &[data-design="12"] .job, &[data-design="12"] .side { background: white; border: 1px solid #dbe8f4; border-radius: 7px; padding: 8px; }
  &[data-design="12"] .impact { border-radius: 7px; background: #0f172a; color: white; }
  &[data-design="13"] { --accent: #0f4c75; }
  &[data-design="13"] .masthead { margin: -22px -19px 16px; padding: 22px 19px; color: white; background: #0f4c75; }
  &[data-design="13"] .kicker, &[data-design="13"] .contact { color: #bbe1fa; }
  &[data-design="14"] { --accent: #111; padding: 15px 13px; font-size: 8px; }
  &[data-design="14"] h4 { font-size: 19px; }
  &[data-design="14"] .masthead { margin-bottom: 6px; padding-bottom: 7px; }
  &[data-design="14"] .job { margin-bottom: 5px; }
  &[data-design="14"] .skills li { padding: 2px 0; }
  &[data-design="15"] { --accent: #111; --paper: #fffef9; }
  &[data-design="15"] h4 { font: 400 29px/1 Georgia, serif; }
  &[data-design="15"] .profile::first-letter { float: left; font: 36px/.8 Georgia, serif; padding-right: 4px; }
  &[data-design="15"] .body { gap: 20px; }
  &[data-design="16"] { --accent: #222; outline: 1px solid #222; outline-offset: -9px; padding: 27px; }
  &[data-design="16"] .job { border: 1px dashed #aaa; padding: 5px; }
  &[data-design="17"] { --accent: #172b4d; }
  &[data-design="17"] .impact { background: #172b4d; color: white; }
  &[data-design="17"] .masthead { border-bottom-width: 4px; }
  &[data-design="18"] { --accent: #f48120; --paper: #f9f6ff; }
  &[data-design="18"] .masthead { background: linear-gradient(120deg, #6d28d9, #ec4899); color: white; margin: -22px -19px 15px; padding: 22px 19px; }
  &[data-design="18"] .kicker { color: #fff; }
  &[data-design="18"] .side { background: rgba(255,255,255,.75); border-radius: 9px; padding: 8px; }
  &[data-design="19"] { --accent: #111; --paper: #fcfcf9; }
  &[data-design="19"] h5 { border-bottom: 2px solid #111; }
  &[data-design="19"] .job { border: 0; padding-left: 0; }
  &[data-design="19"] .job:before { content: '01 /'; display: inline-block; font-size: 7px; color: #888; margin-right: 4px; }
  &[data-design="20"] { --paper: #0e0e10; --ink: #f6f6f6; --accent: #a78bfa; --muted: #b8b8cc; border-color: #34303c; }
  &[data-design="20"] .impact { background: #2c2240; }
  &[data-design="20"] .skills li { border-color: #3e3945; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
`;
const Footer = styled.p`
  margin: 1rem .25rem 0;
  color: #697284;
  font-size: .78rem;
  line-height: 1.6;
`;

function ResumeSheet({ designIndex }: { designIndex: number }): JSX.Element {
  const highlights = keyHighlights.slice(0, 2);
  return (
    <Sheet data-design={designIndex + 1} aria-hidden="true">
      <div className="masthead">
        <div className="kicker">Portfolio / Curriculum Vitae</div>
        <h4>Jelvan Ricolcol</h4>
        <div className="role">Strategic HR • Full Stack Software • AI & Digital Transformation</div>
        <div className="contact">Philippines / Malaysia &nbsp; • &nbsp; portfolio.jelvan.pro</div>
      </div>
      <p className="profile">
        Strategic HR and digital transformation professional combining people
        operations, full-stack software development and practical automation.
      </p>
      <div className="body">
        <div className="career">
          <h5>Experience</h5>
          {professionalExperience.slice(0, 3).map((job) => (
            <div className="job" key={job.company}>
              <strong>{job.role}</strong>
              <span>{job.company} • {job.timeFrame}</span>
              <p>{job.shortSummary}</p>
            </div>
          ))}
        </div>
        <div className="side">
          <h5>Expertise</h5>
          <ul className="skills">
            {strategicHrSkills.slice(0, 4).map((skill) => <li key={skill.text}>{skill.text}</li>)}
          </ul>
          <div className="impact">
            <strong>{highlights[0].value}</strong>
            <span>{highlights[0].label}</span>
          </div>
          <div className="impact">
            <strong>{highlights[1].value}</strong>
            <span>{highlights[1].label}</span>
          </div>
        </div>
      </div>
      <div className="foot">Selected resume style • illustrative, non-interactive design preview</div>
    </Sheet>
  );
}

/** In-page, swipeable previews only: deliberately no zoom, modal or focus view. */
const ResumeSamples = (): JSX.Element => {
  const trackRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(index, designs.length - 1));
    const track = trackRef.current;
    const items = track?.children;
    if (!track || !items?.length) return;
    const first = items[0] as HTMLElement;
    const target = items[next] as HTMLElement;
    track.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: 'smooth' });
    setActive(next);
  };

  const syncFromScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    const firstLeft = items[0]?.offsetLeft ?? 0;
    let nearest = 0;
    let distance = Infinity;
    items.forEach((item, index) => {
      const difference = Math.abs(item.offsetLeft - firstLeft - track.scrollLeft);
      if (difference < distance) { nearest = index; distance = difference; }
    });
    setActive(nearest);
  };

  return (
    <Section aria-labelledby="resume-samples-heading" aria-roledescription="carousel">
      <Container>
        <Header>
          <div>
            <div className="eyebrow">Design gallery / 20 styles</div>
            <h2 id="resume-samples-heading">Resume Sample Designs</h2>
            <p>
              Twenty A4-proportion resume concepts based on the supplied design reference,
              using Jelvan’s portfolio details. Browse the previews directly in this carousel.
            </p>
          </div>
          <Controls aria-label="Resume carousel controls">
            <button type="button" aria-label="Previous resume design" disabled={active === 0}
              onClick={() => goTo(active - 1)}>‹</button>
            <span className="count" aria-live="polite">
              {String(active + 1).padStart(2, '0')} / {designs.length}
            </span>
            <button type="button" aria-label="Next resume design" disabled={active === designs.length - 1}
              onClick={() => goTo(active + 1)}>›</button>
          </Controls>
        </Header>
        <Track ref={trackRef} onScroll={syncFromScroll} aria-label="Resume design previews">
          {designs.map((design, index) => (
            <Card key={design.name}>
              <CardHeader>
                <span className="number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{design.name}</h3>
                  <p>{design.description}</p>
                </div>
              </CardHeader>
              <ResumeSheet designIndex={index} />
            </Card>
          ))}
        </Track>
        <Footer>
          Swipe horizontally on touch devices, or use the arrows to browse.
          Previews are intentionally fixed-size; no zoom, lightbox or focus mode.
        </Footer>
      </Container>
    </Section>
  );
};

export default ResumeSamples;
