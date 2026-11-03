import type { Joiner } from './types';
import styles from './queryBuilder.module.css';

export function LogicalOperator({ value, onChange }: { value: Joiner; onChange: (v: Joiner) => void }) {
  return (
    <div className={styles.operator}>
      <div className={styles.toggle} role="group" aria-label="Logical operator">
        {(['AND', 'OR'] as const).map((o) => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)}>{o}</button>
        ))}
      </div>
    </div>
  );
}
