import styles from './charts.module.css';

/** columns[i] = stack heights (bottom to top); colors[j] = color of stack j */
export function StackedColumns({ columns, colors, labels, max = 70 }: { columns: number[][]; colors: string[]; labels: string[]; max?: number }) {
  const W = 1000, H = 220, L = 30, colW = (W - L) / columns.length;
  const y = (v: number) => H - (v / max) * H;
  return (
    <svg className={styles.svg} viewBox={`0 0 ${W} ${H + 24}`} role="img" aria-label="Stacked bar chart of categories over time">
      {Array.from({ length: 8 }, (_, i) => i * 10).map((t) => (
        <g key={t}><line x1={L} x2={W} y1={y(t)} y2={y(t)} stroke="#e6e9f3" /><text x={0} y={y(t) + 4}>{t}</text></g>
      ))}
      {columns.map((col, i) => {
        let base = 0;
        return col.map((v, j) => {
          const rect = <rect key={`${i}-${j}`} x={L + i * colW + 4} y={y(base + v)} width={colW - 8} height={(v / max) * H} fill={colors[j]} />;
          base += v;
          return rect;
        });
      })}
      {labels.map((l, i) => <text key={l + i} x={L + i * colW * 2 + colW / 2} y={H + 16} textAnchor="middle">{l}</text>)}
    </svg>
  );
}
