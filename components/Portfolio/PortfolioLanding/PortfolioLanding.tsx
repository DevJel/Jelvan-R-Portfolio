import styles from './PortfolioLanding.module.css';

const skills = ['Next.js', 'TypeScript', 'System Design', 'Automation', 'Cloud', 'Product'];

export default function PortfolioLanding() {
  return (
    <section className={styles.heroWrap}>
      <div className={styles.heroText}>
        <span className={styles.eyebrow}>Full-stack software developer</span>
        <h1>Designing reliable digital systems with a sharp product lens.</h1>
        <p>
          I’m Jelvan Baloaloa Ricolcol — a full-stack engineer, HR practitioner, and automation specialist
          helping businesses turn complex operations into elegant user experiences.
        </p>

        <div className={styles.ctaRow}>
          <a href="/projects" className={styles.primaryAction}>View Projects</a>
          <a href="/contact" className={styles.secondaryAction}>Let’s Connect</a>
        </div>

        <div className={styles.skillRow}>
          {skills.map((skill) => (
            <span key={skill} className={styles.skillPill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className={styles.heroCard}>
        <div className={styles.cardHeader}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>

        <div className={styles.cardBody}>
          <div className={styles.statBlock}>
            <span className={styles.statLabel}>Experience</span>
            <strong>6+ years</strong>
          </div>

          <div className={styles.statBlock}>
            <span className={styles.statLabel}>Focus</span>
            <strong>Product + Systems</strong>
          </div>

          <div className={styles.statBlock}>
            <span className={styles.statLabel}>Core stack</span>
            <strong>Next.js • TypeScript</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
