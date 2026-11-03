import type { AnchorHTMLAttributes } from 'react';
import styles from './TextLink.module.css';

export function TextLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={`${styles.link} ${className ?? ''}`} {...props} />;
}
