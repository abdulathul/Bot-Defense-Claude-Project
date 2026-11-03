import type { ReactNode } from 'react';
import { AssetIcon } from '../AssetIcon/AssetIcon';
import styles from './Card.module.css';

export function Card({ title, children, className = '' }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`${styles.card} ${className}`}>
      {title && <h2 className={styles.title}>{title} <AssetIcon name="info" size={14} /></h2>}
      {children}
    </section>
  );
}
