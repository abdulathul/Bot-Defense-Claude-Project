import type { HTMLAttributes } from 'react';
import styles from './ButtonGroup.module.css';

type ButtonGroupProps = HTMLAttributes<HTMLDivElement> & {
  alignment?: 'justify' | 'start' | 'end' | 'center' | 'stack';
};

export function ButtonGroup({
  alignment = 'justify',
  className = '',
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={`${styles.group} ${styles[alignment]} ${className}`.trim()}
      {...props}
    />
  );
}
