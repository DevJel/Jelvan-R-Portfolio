import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.sectionShell}>
      <div className={styles.headerBlock}>
        <span className={styles.kicker}>Contact</span>
        <h2>Let’s build something thoughtful and effective.</h2>
      </div>

      <div className={styles.card}>
        <p>
          Whether it’s product strategy, engineering execution, or automation design, I’m open to work that
          creates clear value and strong user experience.
        </p>

        <div className={styles.contactList}>
          <a href="mailto:jelvan.r.colcol@gmail.com">jelvan.r.colcol@gmail.com</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/jelvan-operava" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </section>
  );
}
