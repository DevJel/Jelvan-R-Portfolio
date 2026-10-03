import styles from './About.module.css';

const highlights = [
  'Over 6 years of hands-on work across product engineering, business process optimization, and automation.',
  'Experienced in building internal tooling, workflow systems, and customer-facing web experiences with measurable impact.',
  'A blend of technical execution and strategic thinking rooted in HR systems, operational analytics, and digital transformation.',
];

const focusAreas = ['Full-stack development', 'Automation', 'Cloud workflows', 'Team enablement'];

export default function About() {
  return (
    <section className={styles.sectionShell}>
      <div className={styles.headerBlock}>
        <span className={styles.kicker}>About</span>
        <h2>Product-minded builder with a systems lens.</h2>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.storyCard}>
          <p>
            I work at the intersection of software engineering and operational transformation. My background spans
            full-stack development, automation engineering, and HR-driven process design, which helps me create
            tools that are not just polished, but genuinely useful in real business environments.
          </p>
          <p>
            I enjoy building thoughtfully designed interfaces, streamlining complex workflows, and connecting cloud
            infrastructure with user-centered experiences that scale gracefully.
          </p>
        </div>

        <div className={styles.focusCard}>
          <h3>Core focus</h3>
          <ul>
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.highlightsWrap}>
        {highlights.map((text) => (
          <div key={text} className={styles.highlightItem}>{text}</div>
        ))}
      </div>
    </section>
  );
}
