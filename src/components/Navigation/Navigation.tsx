import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Navigation.module.css';

export type NavigationState = 'default' | 'hover' | 'active';
export type NavigationOrientation = 'row' | 'column';
export type NavigationButtonSize = 'small' | 'medium';

interface NavigationLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  icon?: ReactNode;
  state?: NavigationState;
  orientation?: NavigationOrientation;
}

export interface NavigationButtonProps extends NavigationLinkProps {
  size?: NavigationButtonSize;
}

export interface NavigationPillProps extends NavigationLinkProps {}

export interface NavigationItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  state?: NavigationState;
  disabled?: boolean;
}

export interface NavigationButtonListProps {
  items: NavigationItem[];
  size?: NavigationButtonSize;
  orientation?: NavigationOrientation;
  ariaLabel?: string;
  className?: string;
}

export interface NavigationPillListProps {
  items: NavigationItem[];
  orientation?: NavigationOrientation;
  ariaLabel?: string;
  className?: string;
}

function NavigationLink({
  label,
  icon,
  state = 'default',
  orientation = 'column',
  className = '',
  href = '#',
  ...anchorProps
}: NavigationLinkProps) {
  const classes = [
    styles.link,
    styles[state],
    styles[orientation],
    className,
  ].filter(Boolean).join(' ');

  return (
    <a
      {...anchorProps}
      href={href}
      className={classes}
      aria-current={state === 'active' ? 'page' : anchorProps['aria-current']}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{label}</span>
    </a>
  );
}

export function NavigationButton({
  size = 'medium',
  ...props
}: NavigationButtonProps) {
  return <NavigationLink {...props} className={`${styles.button} ${styles[size]} ${props.className ?? ''}`} />;
}

export function NavigationPill(props: NavigationPillProps) {
  return <NavigationLink {...props} className={`${styles.pill} ${props.className ?? ''}`} />;
}

function NavigationList({
  items,
  orientation = 'row',
  ariaLabel,
  className = '',
  renderItem,
}: {
  items: NavigationItem[];
  orientation?: NavigationOrientation;
  ariaLabel: string;
  className?: string;
  renderItem: (item: NavigationItem, index: number) => ReactNode;
}) {
  return (
    <nav
      className={`${styles.list} ${styles[orientation]} ${className}`}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => renderItem(item, index))}
    </nav>
  );
}

export function NavigationButtonList({
  items,
  size = 'medium',
  orientation = 'row',
  ariaLabel = 'Navigation buttons',
  className,
}: NavigationButtonListProps) {
  return (
    <NavigationList
      items={items}
      orientation={orientation}
      ariaLabel={ariaLabel}
      className={className}
      renderItem={(item, index) => (
        <NavigationButton
          key={`${item.label}-${index}`}
          label={item.label}
          href={item.href}
          icon={item.icon}
          size={size}
          orientation={orientation}
          state={item.state}
          aria-disabled={item.disabled || undefined}
          tabIndex={item.disabled ? -1 : undefined}
          onClick={item.disabled ? (event) => event.preventDefault() : undefined}
        />
      )}
    />
  );
}

export function NavigationPillList({
  items,
  orientation = 'row',
  ariaLabel = 'Navigation links',
  className,
}: NavigationPillListProps) {
  return (
    <NavigationList
      items={items}
      orientation={orientation}
      ariaLabel={ariaLabel}
      className={className}
      renderItem={(item, index) => (
        <NavigationPill
          key={`${item.label}-${index}`}
          label={item.label}
          href={item.href}
          state={item.state}
          orientation={orientation}
          aria-disabled={item.disabled || undefined}
          tabIndex={item.disabled ? -1 : undefined}
          onClick={item.disabled ? (event) => event.preventDefault() : undefined}
        />
      )}
    />
  );
}
