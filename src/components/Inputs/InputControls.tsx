import { useId, useState } from 'react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import styles from './InputControls.module.css';

interface FieldTextProps {
  label: string;
  error?: string;
  helperText?: string;
}

interface FieldShellProps extends FieldTextProps {
  id: string;
  children: ReactNode;
}

function FieldShell({ id, label, error, helperText, children }: FieldShellProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      {children}
      {error && <p className={styles.error} id={`${id}-error`}>{error}</p>}
      {!error && helperText && <p className={styles.helper} id={`${id}-description`}>{helperText}</p>}
    </div>
  );
}

function useFieldId(id?: string) {
  const generatedId = useId();
  return id ?? generatedId;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'>, FieldTextProps {
  options: SelectOption[];
  placeholder?: string;
}

export function SelectField({
  label,
  error,
  helperText,
  options,
  placeholder = 'Select an option',
  id,
  className = '',
  ...props
}: SelectFieldProps) {
  const fieldId = useFieldId(id);
  const descriptionId = error ? `${fieldId}-error` : helperText ? `${fieldId}-description` : undefined;

  return (
    <FieldShell id={fieldId} label={label} error={error} helperText={helperText}>
      <span className={styles.selectWrap}>
        <select
          {...props}
          id={fieldId}
          className={`${styles.control} ${styles.select} ${error ? styles.invalid : ''} ${className}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={descriptionId}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronIcon />
      </span>
    </FieldShell>
  );
}

export interface TextareaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'>, FieldTextProps {}

export function TextareaField({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}: TextareaFieldProps) {
  const fieldId = useFieldId(id);
  const descriptionId = error ? `${fieldId}-error` : helperText ? `${fieldId}-description` : undefined;

  return (
    <FieldShell id={fieldId} label={label} error={error} helperText={helperText}>
      <textarea
        {...props}
        id={fieldId}
        className={`${styles.control} ${styles.textarea} ${error ? styles.invalid : ''} ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionId}
      />
    </FieldShell>
  );
}

export interface DatePickerFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, FieldTextProps {}

export function DatePickerField({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}: DatePickerFieldProps) {
  const fieldId = useFieldId(id);
  const descriptionId = error ? `${fieldId}-error` : helperText ? `${fieldId}-description` : undefined;

  return (
    <FieldShell id={fieldId} label={label} error={error} helperText={helperText}>
      <input
        {...props}
        id={fieldId}
        type="date"
        className={`${styles.control} ${styles.date} ${error ? styles.invalid : ''} ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={descriptionId}
      />
    </FieldShell>
  );
}

export interface DateInputFieldProps {
  label: string;
  name?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  onChange?: (value: string) => void;
}

function splitDate(value?: string) {
  if (!value) return ['', '', ''];
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? [match[3], match[2], match[1]] : ['', '', ''];
}

function getISODate(day: string, month: string, year: string) {
  if (day.length !== 2 || month.length !== 2 || year.length !== 4) return '';

  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const valid =
    date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day);
  return valid ? `${year}-${month}-${day}` : '';
}

export function DateInputField({
  label,
  name,
  defaultValue = '',
  disabled = false,
  error,
  helperText,
  onChange,
}: DateInputFieldProps) {
  const fieldId = useFieldId();
  const [segments, setSegments] = useState(() => splitDate(defaultValue));
  const [dateValue, setDateValue] = useState(() => {
    const [day, month, year] = splitDate(defaultValue);
    return getISODate(day, month, year);
  });
  const descriptionId = error ? `${fieldId}-error` : helperText ? `${fieldId}-description` : undefined;

  function updateSegment(index: number, input: string) {
    const digits = input.replace(/\D/g, '').slice(0, index === 2 ? 4 : 2);
    const next = [...segments];
    next[index] = digits;
    setSegments(next);

    const [day, month, year] = next;
    const isoDate = getISODate(day, month, year);
    setDateValue(isoDate);
    onChange?.(isoDate);
  }

  return (
    <div className={styles.field}>
      <span className={styles.label} id={`${fieldId}-label`}>{label}</span>
      <div
        className={`${styles.dateSegments} ${error ? styles.invalid : ''} ${disabled ? styles.disabled : ''}`}
        role="group"
        aria-labelledby={`${fieldId}-label`}
        aria-describedby={descriptionId}
      >
        {(['DD', 'MM', 'YYYY'] as const).map((part, index) => (
          <input
            key={part}
            className={styles.segment}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder={part}
            aria-label={`${label} ${part}`}
            value={segments[index]}
            disabled={disabled}
            onChange={(event) => updateSegment(index, event.target.value)}
          />
        ))}
      </div>
      {name && <input type="hidden" name={name} value={dateValue} />}
      {error && <p className={styles.error} id={`${fieldId}-error`}>{error}</p>}
      {!error && helperText && <p className={styles.helper} id={`${fieldId}-description`}>{helperText}</p>}
    </div>
  );
}

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, FieldTextProps {}

export function SearchField({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}: SearchFieldProps) {
  const fieldId = useFieldId(id);
  const descriptionId = error ? `${fieldId}-error` : helperText ? `${fieldId}-description` : undefined;

  return (
    <FieldShell id={fieldId} label={label} error={error} helperText={helperText}>
      <span className={styles.searchWrap}>
        <input
          {...props}
          id={fieldId}
          type="search"
          className={`${styles.control} ${styles.search} ${error ? styles.invalid : ''} ${className}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={descriptionId}
        />
        <SearchIcon />
      </span>
    </FieldShell>
  );
}

export interface SliderFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, FieldTextProps {
  description?: string;
}

export function SliderField({
  label,
  description,
  id,
  className = '',
  ...props
}: SliderFieldProps) {
  const fieldId = useFieldId(id);
  const descriptionId = description ? `${fieldId}-description` : undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>{label}</label>
      <input {...props} id={fieldId} type="range" className={`${styles.range} ${className}`} />
      {description && <p className={styles.helper} id={descriptionId}>{description}</p>}
    </div>
  );
}

export interface SwitchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
}

export function SwitchField({ label, description, id, ...props }: SwitchFieldProps) {
  const fieldId = useFieldId(id);

  return (
    <label className={styles.switchField} htmlFor={fieldId}>
      <input {...props} id={fieldId} type="checkbox" className={styles.switchInput} role="switch" />
      <span className={styles.switchTrack} aria-hidden="true"><span className={styles.switchThumb} /></span>
      <span className={styles.choiceText}>
        <span>{label}</span>
        {description && <span className={styles.helper}>{description}</span>}
      </span>
    </label>
  );
}

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioFieldProps {
  label: string;
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  onChange?: (value: string) => void;
}

export function RadioField({
  label,
  name,
  options,
  value,
  defaultValue,
  disabled = false,
  error,
  helperText,
  onChange,
}: RadioFieldProps) {
  const fieldId = useFieldId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const selectedValue = value ?? internalValue;
  const descriptionId = error ? `${fieldId}-error` : helperText ? `${fieldId}-description` : undefined;

  return (
    <fieldset className={styles.choiceGroup} aria-describedby={descriptionId}>
      <legend className={styles.label}>{label}</legend>
      {options.map((option, index) => {
        const optionId = `${fieldId}-${index}`;
        return (
          <label className={styles.choice} key={option.value} htmlFor={optionId}>
            <input
              id={optionId}
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              disabled={disabled || option.disabled}
              onChange={() => {
                setInternalValue(option.value);
                onChange?.(option.value);
              }}
            />
            <span className={styles.choiceText}>
              <span>{option.label}</span>
              {option.description && <span className={styles.helper}>{option.description}</span>}
            </span>
          </label>
        );
      })}
      {error && <p className={styles.error} id={`${fieldId}-error`}>{error}</p>}
      {!error && helperText && <p className={styles.helper} id={`${fieldId}-description`}>{helperText}</p>}
    </fieldset>
  );
}

function ChevronIcon() {
  return (
    <svg className={styles.chevron} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className={styles.searchIcon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="m10.25 10.25 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
