import type { ReactNode } from 'react';
import styles from './Breadcrumbs.module.css';

export type BreadcrumbSeparator = 'chevron' | 'slash';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  showHomeIcon?: boolean;
  ariaLabel?: string;
  className?: string;
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m2 7 6-5 6 5v6.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 14V9h4v5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m6 3 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BreadcrumbLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return <a className={styles.link} href={href}>{children}</a>;
}

export function Breadcrumbs({
  items,
  separator = 'chevron',
  showHomeIcon = false,
  ariaLabel = 'Breadcrumb',
  className = '',
}: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav className={`${styles.breadcrumbs} ${className}`} aria-label={ariaLabel}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          const content = (
            <>
              {showHomeIcon && index === 0 && (
                <span className={styles.homeIcon}><HomeIcon /></span>
              )}
              <span className={styles.label}>{item.label}</span>
            </>
          );

          return (
            <li className={styles.item} key={`${item.label}-${index}`}>
              {current ? (
                <span className={styles.current} aria-current="page">{content}</span>
              ) : item.href ? (
                <BreadcrumbLink href={item.href}>{content}</BreadcrumbLink>
              ) : (
                <span className={styles.unlinked}>{content}</span>
              )}
              {!current && (
                <span className={styles.separator} aria-hidden="true">
                  {separator === 'chevron' ? <Chevron /> : '/'}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
