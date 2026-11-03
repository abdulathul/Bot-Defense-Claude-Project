import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './InputField.module.css';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function InputField({ label, error, id, ...props }: InputFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={styles.field}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        className={styles.input}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && <p id={`${inputId}-error`} className={styles.error}>{error}</p>}
    </div>
  );
}
