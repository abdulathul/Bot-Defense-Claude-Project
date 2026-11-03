import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  /** URL of a 16px icon shown before the label */
  icon?: string;
};

export function Button({ variant = 'primary', icon, children, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {icon && <img src={icon} alt="" width={16} height={16} />}
      {children}
    </button>
  );
}
