import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './PortfolioLayout.module.css';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export default function PortfolioLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className={styles.pageShell}>
        <header className={styles.topbar}>
          <div className={styles.brandWrap}>
            <div className={styles.brandBadge}>J</div>
            <div>
              <div className={styles.brandName}>Jelvan</div>
              <div className={styles.brandRole}>Engineering & Strategy</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => {
              const active = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? styles.navItemActive : styles.navItem}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <span>Cloudflare-inspired orange theme</span>
          <span>•</span>
          <span>Built around product thinking + systems engineering</span>
        </footer>
      </div>
    </>
  );
}
