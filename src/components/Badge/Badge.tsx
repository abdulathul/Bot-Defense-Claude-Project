import styles from './Badge.module.css';

export function Badge({ label, variant = 'default' }: { label: string; variant?: 'default' | 'new' | 'unavailable' }) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{label}</span>;
}
