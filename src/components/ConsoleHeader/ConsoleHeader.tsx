import { AssetIcon } from '../AssetIcon/AssetIcon';
import logo from '../../assets/icons/f5-logo.svg';
import styles from './ConsoleHeader.module.css';

export function ConsoleHeader({ pageTitle = 'Home' }: { pageTitle?: string }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}><img src={logo} alt="F5 Distributed Cloud" width={44} height={44} /></div>
      <div className={styles.title}>
        <span className={styles.product}>Distributed Cloud Console</span>
        <span className={styles.page}>{pageTitle}</span>
      </div>
      <div className={styles.search}>
        <input type="search" placeholder="Search" aria-label="Search" />
        <kbd>Shift + /</kbd>
      </div>
      <nav className={styles.account} aria-label="Account">
        <button type="button" className={styles.support}>
          <AssetIcon name="support-ai-logo" size={24} />
          <span className={styles.supportLabel}>
            <span className={styles.supportIcon}>
              <AssetIcon name="help-buoy" size={24} />
            </span>
            Support
          </span>
          <span className={styles.chevron} aria-hidden="true" />
        </button>
        <div className={styles.profile}>
          <AssetIcon name="avatar" size={34} />
          <span className={styles.chevron} aria-hidden="true" />
        </div>
      </nav>
    </header>
  );
}
