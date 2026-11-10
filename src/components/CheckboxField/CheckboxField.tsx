import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './CheckboxField.module.css';

export type CheckboxFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  description?: string;
  error?: string;
};

export function CheckboxField({ label, description, error, id, ...props }: CheckboxFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = error ? `${inputId}-error` : description ? `${inputId}-description` : undefined;

  return (
    <div className={styles.wrapper}>
      <label className={styles.field} htmlFor={inputId}>
        <input
          id={inputId}
          type="checkbox"
          className={styles.box}
          aria-invalid={error ? true : undefined}
          aria-describedby={descriptionId}
          {...props}
        />
        <span className={styles.text}>
          <span>{label}</span>
          {description && <span className={styles.description}>{description}</span>}
        </span>
      </label>
      {error && <p id={`${inputId}-error`} className={styles.error}>{error}</p>}
    </div>
  );
}
