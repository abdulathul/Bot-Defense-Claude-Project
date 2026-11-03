import styles from './charts.module.css';

export type HRow = { label: string; a: number; b: number };

export function HBars({ rows, max, colorA, colorB }: { rows: HRow[]; max: number; colorA: string; colorB: string }) {
  const ticks = Array.from({ length: 8 }, (_, i) => Math.round(((i * max) / 7) / 50) * 50);
  return (
    <div>
      {rows.map((r) => (
        <div key={r.label} className={styles.hrow}>
          <span>{r.label}</span>
          <div className={styles.bars}>
            <div style={{ width: `${(r.a / max) * 100}%`, background: colorA }} />
            <div style={{ width: `${(r.b / max) * 100}%`, background: colorB }} />
          </div>
        </div>
      ))}
      <div className={styles.axis}>{ticks.map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  );
}
