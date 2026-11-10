import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Chip.module.css';

export type ChipType = 'assist' | 'filter' | 'input' | 'suggestion';
export type ChipState = 'default' | 'hover' | 'selected' | 'disabled';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  type?: ChipType;
  state?: ChipState;
  label: string;
  hasIconStart?: boolean;
  iconStart?: ReactNode;
  hasIconEnd?: boolean;
  iconEnd?: ReactNode;
  onRemove?: () => void;
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 2.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m3 8 3.2 3.2L13 4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m4 4 8 8m0-8-8 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Chip({
  type = 'assist',
  state = 'default',
  label,
  hasIconStart = false,
  iconStart,
  hasIconEnd = false,
  iconEnd,
  onRemove,
  className = '',
  onClick,
  ...buttonProps
}: ChipProps) {
  const isDisabled = state === 'disabled' || buttonProps.disabled;
  const startIcon = hasIconStart
    ? iconStart ??
      (type === 'filter' && state === 'selected' ? (
        <CheckIcon />
      ) : type === 'assist' ? (
        <StarIcon />
      ) : null)
    : null;
  const endIcon = hasIconEnd ? iconEnd ?? (type === 'input' ? <CloseIcon /> : null) : null;
  const classes = [
    styles.chip,
    styles[type],
    state === 'hover' && styles.hover,
    state === 'selected' && styles.selected,
    isDisabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const chip = (
    <button
      {...buttonProps}
      className={classes}
      type="button"
      disabled={isDisabled}
      aria-pressed={type === 'filter' ? state === 'selected' : undefined}
      onClick={isDisabled ? undefined : onClick}
    >
      {startIcon && <span className={styles.icon}>{startIcon}</span>}
      <span className={styles.label}>{label}</span>
      {endIcon && !onRemove && <span className={styles.icon}>{endIcon}</span>}
    </button>
  );

  if (!onRemove) return chip;

  return (
    <span className={styles.removable}>
      {chip}
      <button
        className={`${styles.remove} ${styles[type]} ${state === 'selected' ? styles.selected : ''}`}
        type="button"
        aria-label={`Remove ${label}`}
        disabled={isDisabled}
        onClick={onRemove}
      >
        {iconEnd ?? <CloseIcon />}
      </button>
    </span>
  );
}
