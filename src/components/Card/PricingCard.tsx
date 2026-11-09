import type { ReactNode } from 'react';
import styles from './PricingCard.module.css';

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: ReactNode[];
  action: ReactNode;
  variant?: 'light' | 'brand';
  layout?: 'centered' | 'compact';
}

export function PricingCard({
  title,
  price,
  period = '/mo',
  features,
  action,
  variant = 'light',
  layout = 'centered',
}: PricingCardProps) {
  return (
    <article className={`${styles.card} ${styles[variant]} ${styles[layout]}`}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.price}>
          <span className={styles.amount}>{price}</span>
          <span className={styles.period}>{period}</span>
        </p>
      </header>
      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <div className={styles.action}>{action}</div>
    </article>
  );
}
