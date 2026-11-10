import type { CSSProperties, ReactNode } from 'react';
import styles from './Notification.module.css';

export type NotificationVariant = 'success' | 'warning' | 'error' | 'info';

export interface NotificationProps {
  title: string;
  message: ReactNode;
  variant?: NotificationVariant;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
}

export interface ToastProps extends NotificationProps {
  progress?: number;
}

function StatusIcon({ variant }: { variant: NotificationVariant }) {
  if (variant === 'success') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="m6.8 10.1 2.1 2.1 4.4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (variant === 'warning') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8.8 3.8a1.4 1.4 0 0 1 2.4 0l6.1 10.6a1.4 1.4 0 0 1-1.2 2.1H3.9a1.4 1.4 0 0 1-1.2-2.1L8.8 3.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 7.3v4.1m0 2.3h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === 'error') {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="m7.5 7.5 5 5m0-5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v4m0-6h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type NotificationContentProps = Omit<NotificationProps, 'variant'> & {
  variant: NotificationVariant;
  children?: ReactNode;
};

function NotificationContent({
  title,
  message,
  variant,
  actionLabel,
  onAction,
  onClose,
  className,
  children,
}: NotificationContentProps) {
  const classes = [
    styles.notification,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <section
      className={classes}
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      aria-live={variant === 'error' || variant === 'warning' ? 'assertive' : 'polite'}
    >
      <span className={styles.icon}><StatusIcon variant={variant} /></span>
      <div className={styles.content}>
        <strong className={styles.title}>{title}</strong>
        <div className={styles.message}>{message}</div>
        {actionLabel && (
          <button className={styles.action} type="button" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
      {onClose && (
        <button
          className={styles.close}
          type="button"
          aria-label="Close notification"
          onClick={onClose}
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {children}
    </section>
  );
}

export function Notification({
  variant = 'info',
  ...props
}: NotificationProps) {
  return <NotificationContent {...props} variant={variant} />;
}

export function Toast({
  variant = 'success',
  progress,
  ...props
}: ToastProps) {
  const progressStyle = progress === undefined
    ? undefined
    : { width: `${Math.min(100, Math.max(0, progress))}%` } satisfies CSSProperties;

  return (
    <NotificationContent {...props} variant={variant} className={`${styles.toast} ${props.className ?? ''}`}>
      {progress !== undefined && (
        <span className={styles.progressTrack} aria-hidden="true">
          <span className={styles.progress} style={progressStyle} />
        </span>
      )}
    </NotificationContent>
  );
}
