import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'brand' | 'primary' | 'neutral' | 'subtle' | 'secondary';
  size?: 'medium' | 'small';
  fullWidth?: boolean;
  /** URL of a 16px icon shown before the label */
  icon?: string;
};

export function Button({
  variant = 'brand',
  size = 'medium',
  fullWidth = true,
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...props}>
      {icon && <img src={icon} alt="" width={16} height={16} />}
      {children}
    </button>
  );
}
