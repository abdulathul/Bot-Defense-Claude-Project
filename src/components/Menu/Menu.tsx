import { useId, useRef, useState } from 'react';
import type { FocusEventHandler, KeyboardEvent, ReactNode } from 'react';
import styles from './Menu.module.css';

export interface MenuItemData {
  label: string;
  description?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface MenuProps {
  items: MenuItemData[];
  header?: ReactNode;
  separatorAfter?: number[];
  ariaLabel?: string;
  className?: string;
  onSelect?: (item: MenuItemData) => void;
}

export interface MenuItemProps {
  label: string;
  description?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
  active?: boolean;
  tabIndex?: number;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onClick?: () => void;
}

export interface MenuHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface MenuHeadingProps {
  children: ReactNode;
  className?: string;
}

export function MenuHeader({ children, className = '' }: MenuHeaderProps) {
  return <div className={`${styles.header} ${className}`}>{children}</div>;
}

export function MenuHeading({ children, className = '' }: MenuHeadingProps) {
  return <div className={`${styles.heading} ${className}`}>{children}</div>;
}

export function MenuSeparator() {
  return <div className={styles.separator} role="separator" />;
}

export function MenuItem({
  label,
  description,
  icon,
  trailing,
  disabled = false,
  active = false,
  tabIndex = 0,
  onFocus,
  onClick,
}: MenuItemProps) {
  return (
    <button
      className={`${styles.item} ${active ? styles.active : ''}`}
      type="button"
      role="menuitem"
      disabled={disabled}
      tabIndex={disabled ? -1 : tabIndex}
      onFocus={onFocus}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.itemText}>
        <span className={styles.itemLabel}>{label}</span>
        {description && <span className={styles.description}>{description}</span>}
      </span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </button>
  );
}

export function Menu({
  items,
  header,
  separatorAfter = [],
  ariaLabel = 'Menu',
  className = '',
  onSelect,
}: MenuProps) {
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(() => items.findIndex((item) => !item.disabled));
  const enabledIndexes = items.flatMap((item, index) => item.disabled ? [] : [index]);

  function focusItem(index: number) {
    if (enabledIndexes.length === 0) return;
    const enabledIndex = (index + enabledIndexes.length) % enabledIndexes.length;
    const targetIndex = enabledIndexes[enabledIndex];
    setFocusedIndex(targetIndex);
    menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')[targetIndex]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentEnabledIndex = enabledIndexes.indexOf(focusedIndex);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusItem(currentEnabledIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusItem(currentEnabledIndex - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusItem(enabledIndexes.length - 1);
    }
  }

  return (
    <div
      id={menuId}
      ref={menuRef}
      className={`${styles.menu} ${className}`}
      role="menu"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      {header && <MenuHeader>{header}</MenuHeader>}
      <div className={styles.items}>
        {items.flatMap((item, index) => {
          const menuItem = (
            <MenuItem
              key={`${item.label}-${index}`}
              {...item}
              tabIndex={index === focusedIndex ? 0 : -1}
              onFocus={() => setFocusedIndex(index)}
              onClick={() => {
                if (item.disabled) return;
                item.onSelect?.();
                onSelect?.(item);
              }}
            />
          );
          return separatorAfter.includes(index)
            ? [menuItem, <MenuSeparator key={`separator-${index}`} />]
            : [menuItem];
        })}
      </div>
    </div>
  );
}
