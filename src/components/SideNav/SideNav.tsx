import { Link } from 'react-router-dom';
import f5Logo from '../../assets/icons/f5-logo.svg';
import styles from './SideNav.module.css';

export type NavGroup = {
  title: string;
  icon: string;
  items: { label: string; to?: string }[];
  disabled?: boolean;
};

type NavIcon = 'overview' | 'monitor' | 'report' | 'manage' | 'notifications';

function NavIcon({ name }: { name: NavIcon }) {
  const paths: Record<NavIcon, string> = {
    overview: 'M3 4h4v4H3z M9 4h4v4H9z M3 10h4v4H3z M9 10h4v4H9z',
    monitor: 'M2 8h2l2-4 3 8 2-4h3',
    report: 'M3 13V7m4 6V3m4 10V5m3 8V2',
    manage: 'M8 2.5 9.2 4l1.8.4.4 1.8 1.5 1.2-1.5 1.2-.4 1.8-1.8.4L8 12.5l-1.2-1.7-1.8-.4-.4-1.8L3 7.4l1.6-1.2L5 4.4 6.8 4 8 2.5Zm0 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Z',
    notifications: 'M8 2.5a3 3 0 0 0-3 3v2.1c0 1.4-.5 2.4-1.5 3.4h9c-1-1-1.5-2-1.5-3.4V5.5a3 3 0 0 0-3-3ZM6.5 13a1.5 1.5 0 0 0 3 0',
  };

  return (
    <svg className={styles.navIcon} viewBox="0 0 16 16" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function SectionHeading({ icon, children }: { icon: NavIcon; children: string }) {
  return (
    <div className={styles.sectionHeading}>
      <NavIcon name={icon} />
      <span>{children}</span>
    </div>
  );
}

export function SideNav({ active }: { active: string }) {
  return (
    <aside className={styles.sideNav}>
      <Link to="/home" className={styles.brand} aria-label="Distributed Cloud home">
        <img src={f5Logo} alt="" />
      </Link>

      <button type="button" className={styles.serviceSelect}>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3h3v3H3zM10 3h3v3h-3zM3 10h3v3H3zM10 10h3v3h-3z" /></svg>
        <span>Select Service</span>
        <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>

      <div className={styles.product}>
        <h2>Bot &amp; Risk Management</h2>
        <button type="button" className={styles.namespace}>
          <span className={styles.namespaceAvatar}>D</span>
          <span>Default<br />Namespace</span>
          <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
        </button>
      </div>

      <nav className={styles.navigation} aria-label="Bot & Risk Management">
        <section className={styles.navSection}>
          <SectionHeading icon="overview">Overview</SectionHeading>
          <Link
            to="/summary"
            className={`${styles.navItem} ${active === 'Monitor' ? styles.active : ''}`}
            aria-current={active === 'Monitor' ? 'page' : undefined}
          >
            Monitor
          </Link>
        </section>

        <section className={styles.navSection}>
          <SectionHeading icon="report">Report</SectionHeading>
          <div className={styles.subItems}>
            <div className={styles.navItem}>Bad Bot Report</div>
            <div className={styles.navItem}>Protection Coverage Report</div>
            <div className={styles.navItem}>Transactions Usage</div>
            <div className={styles.navItem}>Traffic Analyzer</div>
            <Link
              to="/bot-report"
              className={`${styles.navItem} ${active === 'Known Bot Report' ? styles.active : ''}`}
              aria-current={active === 'Known Bot Report' ? 'page' : undefined}
            >
              Known Bot Report
            </Link>
          </div>
        </section>

        <section className={styles.navSection}>
          <SectionHeading icon="manage">Manage</SectionHeading>
          <div className={styles.subItems}>
            <div className={styles.navItem}>Applications</div>
            <div className={styles.navItem}>Mobile SDKs</div>
            <div className={styles.navItem}>Mobile Base Configurations</div>
            <div className={styles.navItem}>Saved Filters</div>
          </div>
        </section>

        <section className={`${styles.navSection} ${styles.notifications}`}>
          <SectionHeading icon="notifications">Notifications</SectionHeading>
          <div className={`${styles.subItems} ${styles.mutedItems}`}>
            <div className={styles.navItem}>Alerts, Audit Logs</div>
          </div>
        </section>
      </nav>
    </aside>
  );
}
