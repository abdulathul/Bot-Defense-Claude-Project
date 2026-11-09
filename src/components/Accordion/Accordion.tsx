import { useId, useState, type ReactNode } from 'react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number | null;
}

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={styles.chevron}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={expanded ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Accordion({ items, defaultOpenIndex = null }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const accordionId = useId();

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const expanded = openIndex === index;
        const triggerId = `${accordionId}-trigger-${index}`;
        const panelId = `${accordionId}-panel-${index}`;

        return (
          <section
            className={`${styles.item} ${expanded ? styles.expanded : ''}`}
            key={index}
          >
            <h3 className={styles.heading}>
              <button
                className={styles.trigger}
                id={triggerId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenIndex(expanded ? null : index)}
              >
                <span className={styles.title}>{item.title}</span>
                <Chevron expanded={expanded} />
              </button>
            </h3>
            <div
              className={styles.panel}
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!expanded}
            >
              {item.content}
            </div>
          </section>
        );
      })}
    </div>
  );
}
