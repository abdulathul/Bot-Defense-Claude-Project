import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './InputField.module.css';

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

export function InputField({ label, error, helperText, id, className = '', ...props }: InputFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = error ? `${inputId}-error` : helperText ? `${inputId}-description` : undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        className={`${styles.input} ${error ? styles.invalid : ''} ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionId}
        {...props}
      />
      {error && <p id={`${inputId}-error`} className={styles.error}>{error}</p>}
      {!error && helperText && <p id={`${inputId}-description`} className={styles.helper}>{helperText}</p>}
    </div>
  );
}
