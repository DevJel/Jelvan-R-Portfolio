import styles from './HighlightedProjects.module.css';

const projects = [
  {
    title: 'Enterprise Workflow Platform',
    tag: 'Product systems',
    description:
      'Built a structured operations interface that improved visibility across recurring internal processes and automated handoff steps.',
  },
  {
    title: 'Client Experience Dashboard',
    tag: 'UX + data',
    description:
      'Designed and implemented a dashboard for business stakeholders to track service metrics, customer activity, and operational KPIs.',
  },
  {
    title: 'Automation Engine',
    tag: 'Automation',
    description:
      'Created logic-driven automations to reduce repetitive work and streamline business communication flows with better reporting.',
  },
];

export default function HighlightedProjects() {
  return (
    <section className={styles.sectionShell}>
      <div className={styles.headerBlock}>
        <span className={styles.kicker}>Projects</span>
        <h2>Selected work that blends utility, clarity, and scale.</h2>
      </div>

      <div className={styles.grid}>
        {projects.map((project) => (
          <article key={project.title} className={styles.card}>
            <span className={styles.tag}>{project.tag}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
