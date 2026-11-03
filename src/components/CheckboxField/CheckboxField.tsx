import type { InputHTMLAttributes } from 'react';
import styles from './CheckboxField.module.css';

type CheckboxFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: string };

export function CheckboxField({ label, ...props }: CheckboxFieldProps) {
  return (
    <label className={styles.field}>
      <input type="checkbox" className={styles.box} {...props} />
      {label}
    </label>
  );
}
