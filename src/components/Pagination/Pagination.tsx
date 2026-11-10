import type { ButtonHTMLAttributes } from 'react';
import styles from './Pagination.module.css';

export type PaginationPageState = 'default' | 'hover' | 'current' | 'currentHover';
export type PaginationControlState = 'default' | 'hover' | 'disabled';
export type PaginationDirection = 'previous' | 'next';
export type PaginationItem = number | 'ellipsis';

export interface PaginationPageButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  page: number;
  state?: PaginationPageState;
  onClick?: (page: number) => void;
}

export interface PaginationDirectionButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  direction: PaginationDirection;
  state?: PaginationControlState;
  onClick?: () => void;
}

export interface PaginationListProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  ariaLabel?: string;
  className?: string;
}

export interface PaginationProps extends PaginationListProps {
  previousLabel?: string;
  nextLabel?: string;
}

function ArrowIcon({ direction }: { direction: PaginationDirection }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {direction === 'previous' ? (
        <path d="M10 3.5 5.5 8l4.5 4.5M6 8h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="m6 3.5 4.5 4.5L6 12.5M10 8H3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function getPageItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
}

export function PaginationPageButton({
  page,
  state,
  onClick,
  className = '',
  ...buttonProps
}: PaginationPageButtonProps) {
  const resolvedState = state ?? 'default';
  const classes = [styles.pageButton, styles[resolvedState], className].filter(Boolean).join(' ');

  return (
    <button
      {...buttonProps}
      className={classes}
      type="button"
      aria-current={resolvedState === 'current' || resolvedState === 'currentHover' ? 'page' : undefined}
      onClick={() => onClick?.(page)}
    >
      {page}
    </button>
  );
}

export function PaginationDirectionButton({
  direction,
  state = 'default',
  onClick,
  className = '',
  ...buttonProps
}: PaginationDirectionButtonProps) {
  const disabled = state === 'disabled' || buttonProps.disabled;
  const classes = [
    styles.directionButton,
    styles[direction],
    styles[state],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      {...buttonProps}
      className={classes}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {direction === 'previous' && <ArrowIcon direction={direction} />}
      <span>{direction === 'previous' ? 'Previous' : 'Next'}</span>
      {direction === 'next' && <ArrowIcon direction={direction} />}
    </button>
  );
}

export function PaginationList({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel = 'Pagination pages',
  className = '',
}: PaginationListProps) {
  if (!Number.isInteger(totalPages) || totalPages < 1) {
    throw new RangeError('Pagination totalPages must be a positive integer.');
  }

  if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    throw new RangeError('Pagination currentPage must be an integer within the total page range.');
  }

  const items = getPageItems(currentPage, totalPages);

  return (
    <ol className={`${styles.pageList} ${className}`} aria-label={ariaLabel}>
      {items.map((item, index) => (
        <li key={item === 'ellipsis' ? `ellipsis-${index}` : item} className={styles.pageListItem}>
          {item === 'ellipsis' ? (
            <span className={styles.ellipsis} aria-hidden="true">…</span>
          ) : (
            <PaginationPageButton
              page={item}
              state={item === currentPage ? 'current' : 'default'}
              aria-label={`Page ${item}`}
              onClick={onPageChange}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel = 'Pagination',
  previousLabel = 'Previous',
  nextLabel = 'Next',
  className = '',
}: PaginationProps) {
  if (!Number.isInteger(totalPages) || totalPages < 1) {
    throw new RangeError('Pagination totalPages must be a positive integer.');
  }

  if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    throw new RangeError('Pagination currentPage must be an integer within the total page range.');
  }

  const previousDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label={ariaLabel}>
      <PaginationDirectionButton
        direction="previous"
        aria-label={previousLabel}
        state={previousDisabled ? 'disabled' : 'default'}
        onClick={() => onPageChange?.(currentPage - 1)}
      />
      <PaginationList
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <PaginationDirectionButton
        direction="next"
        aria-label={nextLabel}
        state={nextDisabled ? 'disabled' : 'default'}
        onClick={() => onPageChange?.(currentPage + 1)}
      />
    </nav>
  );
}
