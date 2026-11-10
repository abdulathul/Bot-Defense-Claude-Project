import type { ReactNode } from 'react';
import styles from './UtilitiesPage.module.css';

export type AnnotationVariant = 'outlined' | 'filled' | 'subtle';

export interface AnnotationProps {
  children: ReactNode;
  variant?: AnnotationVariant;
  className?: string;
}

export function Annotation({ children, variant = 'outlined', className = '' }: AnnotationProps) {
  return (
    <span className={`${styles.annotation} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}

export interface NoteProps {
  title: string;
  author?: string;
  date?: string;
  children?: ReactNode;
  variant?: 'detailed' | 'compact';
  className?: string;
}

export function Note({
  title,
  author,
  date,
  children,
  variant = 'detailed',
  className = '',
}: NoteProps) {
  return (
    <aside className={`${styles.note} ${styles[variant]} ${className}`}>
      <div className={styles.noteTitle}>
        <EditIcon />
        <strong>{title}</strong>
      </div>
      {variant === 'detailed' && (
        <>
          {children && <div className={styles.noteBody}>{children}</div>}
          {(author || date) && (
            <div className={styles.noteMeta}>
              <span className={styles.avatar} aria-hidden="true">{author?.slice(0, 1) ?? 'A'}</span>
              <span className={styles.authorDetails}>
                {author && <strong>{author}</strong>}
                {date && <time>{date}</time>}
              </span>
            </div>
          )}
        </>
      )}
    </aside>
  );
}

export interface SlotProps {
  children?: ReactNode;
  className?: string;
}

export function Slot({ children = 'Swap me', className = '' }: SlotProps) {
  return (
    <div className={`${styles.slot} ${className}`}>
      <span>{children}</span>
    </div>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m10.9 2.4 2.7 2.7M2.2 13.8l3.1-.6 7.7-7.7a1.9 1.9 0 0 0-2.7-2.7l-7.7 7.7-.4 3.3Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UtilitiesPage() {
  const annotationVariants: AnnotationVariant[] = ['outlined', 'filled', 'subtle'];

  return (
    <main className={styles.page}>
      <div className={styles.utilityGroups}>
        <section className={styles.group}>
          <h1 className={styles.groupTitle}>Helpers / Annotations</h1>
          <div className={styles.annotationBoard}>
            {annotationVariants.map((variant) => (
              <div className={styles.annotationRow} key={variant}>
                {Array.from({ length: 4 }, (_, index) => (
                  <Annotation key={`${variant}-${index}`} variant={variant}>
                    Label
                  </Annotation>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.group}>
          <h2 className={styles.groupTitle}>Helpers / Notes</h2>
          <div className={styles.noteStack}>
            <Note title="Title" author="Name" date="Date">
              A helpful note can include a short description for context.
            </Note>
            <Note title="Title" variant="compact" />
          </div>
        </section>

        <section className={styles.group}>
          <h2 className={styles.groupTitle}>Slot</h2>
          <Slot />
        </section>
      </div>
    </main>
  );
}
