import styles from './charts.module.css';

export type AreaSeries = { key: string; color: string; values: number[] };

/** Stacked area chart: each series sits on top of the ones before it. Hidden series are simply not passed in. */
export function StackedArea({ series, labels, max = 90 }: { series: AreaSeries[]; labels: string[]; max?: number }) {
  const W = 760, H = 220, L = 30;
  const n = series[0]?.values.length ?? 0;
  const x = (i: number) => L + (i * (W - L)) / Math.max(n - 1, 1);
  const y = (v: number) => H - (v / max) * H;
  let base: number[] = Array(n).fill(0);
  const areas = series.map((s) => {
    const top = s.values.map((v, i) => base[i] + v);
    const up = top.map((t, i) => `${i ? 'L' : 'M'}${x(i)},${y(t)}`).join(' ');
    const down = base.map((b, i) => `L${x(i)},${y(b)}`).reverse().join(' ');
    base = top;
    return <path key={s.key} d={`${up} ${down} Z`} fill={s.color} stroke="#fff" strokeWidth={1} />;
  });
  return (
    <svg className={styles.svg} viewBox={`0 0 ${W} ${H + 24}`} role="img" aria-label="Stacked area chart of traffic over time">
      {Array.from({ length: 9 }, (_, i) => i * 10).map((t) => (
        <g key={t}><line x1={L} x2={W} y1={y(t)} y2={y(t)} stroke="#e6e9f3" /><text x={0} y={y(t) + 4}>{t}</text></g>
      ))}
      {areas}
      {labels.map((l, k) => <text key={l} x={x(k * 2)} y={H + 16} textAnchor="middle">{l}</text>)}
    </svg>
  );
}
