import styles from './Resume.module.css';

const experience = [
  {
    title: 'Full-Stack Developer',
    meta: 'Operava Global Solutions · 2022 — Present',
    summary:
      'Leading product and technical execution across web application development, operational automation, and stakeholder-facing systems.',
  },
  {
    title: 'HR & Operations Specialist',
    meta: 'Operations & workforce systems · 2019 — 2022',
    summary:
      'Built data-informed processes that improved hiring workflows, internal coordination, and platform-driven service delivery.',
  },
];

const skills = ['TypeScript', 'Next.js', 'Automation', 'Business Process Design', 'Cloud workflows', 'Analytics'];

export default function Resume() {
  return (
    <section className={styles.sectionShell}>
      <div className={styles.headerBlock}>
        <span className={styles.kicker}>Résumé</span>
        <h2>Engineering experience built around useful systems.</h2>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.panel}>
          {experience.map((item) => (
            <div key={item.title} className={styles.entry}>
              <h3>{item.title}</h3>
              <div className={styles.meta}>{item.meta}</div>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>

        <div className={styles.panel}>
          <h3>Capabilities</h3>
          <div className={styles.skillWrap}>
            {skills.map((skill) => (
              <span key={skill} className={styles.skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
