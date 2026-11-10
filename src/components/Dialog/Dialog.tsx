import { useEffect, useId, useRef, type ReactNode } from 'react';
import styles from './Dialog.module.css';

export type DialogTheme = 'light' | 'dark';

export interface DialogBodyProps {
  title: string;
  description: ReactNode;
  actions?: ReactNode;
  theme?: DialogTheme;
  onClose?: () => void;
  closeButtonLabel?: string;
  titleId?: string;
}

export interface DialogProps extends DialogBodyProps {
  open: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
  className?: string;
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

export function DialogBody({
  title,
  description,
  actions,
  theme = 'light',
  onClose,
  closeButtonLabel = 'Close dialog',
  titleId,
}: DialogBodyProps) {
  const generatedTitleId = useId();
  const resolvedTitleId = titleId ?? generatedTitleId;

  return (
    <section className={`${styles.body} ${styles[theme]}`} aria-labelledby={resolvedTitleId}>
      {onClose && (
        <button
          className={styles.close}
          type="button"
          aria-label={closeButtonLabel}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      )}
      <h2 className={styles.title} id={resolvedTitleId}>{title}</h2>
      <div className={styles.description}>{description}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </section>
  );
}

export function Dialog({
  open,
  onClose,
  closeOnBackdropClick = true,
  className = '',
  ...bodyProps
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${className}`}
      aria-modal="true"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) onClose();
      }}
    >
      <DialogBody {...bodyProps} onClose={onClose} titleId={titleId} />
    </dialog>
  );
}
