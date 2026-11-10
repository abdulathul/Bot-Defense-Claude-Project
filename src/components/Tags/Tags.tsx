import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Tags.module.css';

export type TagTone = 'brand' | 'danger' | 'positive' | 'warning' | 'neutral';
export type TagHierarchy = 'primary' | 'secondary';
export type TagVisualState = 'default' | 'hover';

export interface TagProps {
  label: string;
  tone?: TagTone;
  hierarchy?: TagHierarchy;
  state?: TagVisualState;
  onRemove?: () => void;
  removeLabel?: string;
  className?: string;
}

export interface TagToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onChange'> {
  label: string;
  selected?: boolean;
  onChange?: (selected: boolean) => void;
}

export interface TagToggleItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TagToggleGroupProps {
  items: TagToggleItem[];
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onChange?: (selectedIds: string[]) => void;
  ariaLabel?: string;
  className?: string;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="m3 3 6 6m0-6L3 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="m2.5 6.2 2.2 2.2 4.8-4.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Tag({
  label,
  tone = 'brand',
  hierarchy = 'primary',
  state = 'default',
  onRemove,
  removeLabel,
  className = '',
}: TagProps) {
  const classes = [
    styles.tag,
    styles[tone],
    styles[hierarchy],
    state === 'hover' && styles.hover,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      <span className={styles.label}>{label}</span>
      {onRemove && (
        <button
          className={styles.remove}
          type="button"
          aria-label={removeLabel ?? `Remove ${label}`}
          onClick={onRemove}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
}

export function TagToggle({
  label,
  selected = false,
  onChange,
  className = '',
  disabled = false,
  ...buttonProps
}: TagToggleProps) {
  const classes = [
    styles.toggle,
    selected ? styles.selected : styles.unselected,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      {...buttonProps}
      className={classes}
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={(event) => {
        buttonProps.onClick?.(event);
        if (!event.defaultPrevented) onChange?.(!selected);
      }}
    >
      {selected && <CheckIcon />}
      <span>{label}</span>
    </button>
  );
}

export function TagToggleGroup({
  items,
  selectedIds,
  defaultSelectedIds = [],
  onChange,
  ariaLabel = 'Tags',
  className = '',
}: TagToggleGroupProps) {
  const [uncontrolledSelectedIds, setUncontrolledSelectedIds] = useState(defaultSelectedIds);
  const isControlled = selectedIds !== undefined;
  const currentSelectedIds = isControlled ? selectedIds : uncontrolledSelectedIds;

  if (new Set(items.map((item) => item.id)).size !== items.length) {
    throw new RangeError('Tag toggle item ids must be unique.');
  }

  const toggleItem = (id: string, selected: boolean) => {
    const nextSelectedIds = selected
      ? [...currentSelectedIds, id]
      : currentSelectedIds.filter((selectedId) => selectedId !== id);

    if (!isControlled) setUncontrolledSelectedIds(nextSelectedIds);
    onChange?.(nextSelectedIds);
  };

  return (
    <div className={`${styles.toggleGroup} ${className}`} role="group" aria-label={ariaLabel}>
      {items.map((item) => (
        <TagToggle
          key={item.id}
          label={item.label}
          selected={currentSelectedIds.includes(item.id)}
          disabled={item.disabled}
          onChange={(selected) => toggleItem(item.id, selected)}
        />
      ))}
    </div>
  );
}

export interface TagListProps {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
}

export function TagList({ children, ariaLabel = 'Tags', className = '' }: TagListProps) {
  return (
    <div className={`${styles.tagList} ${className}`} role="group" aria-label={ariaLabel}>
      {children}
    </div>
  );
}
