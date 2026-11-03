import type { ButtonHTMLAttributes } from 'react';
import styles from './ConsoleButton.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' };

export function ConsoleButton({ variant = 'secondary', className = '', ...props }: Props) {
  return <button type="button" className={`${styles.button} ${styles[variant]} ${className}`} {...props} />;
}
