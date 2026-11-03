import styles from './charts.module.css';

export type RingSeg = { value: number; color: string; offset?: number };

function renderSegments(segs: RingSeg[], r: number, width: number, total: number) {
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return segs.map((segment, i) => {
    const length = (segment.value / total) * circumference;
    const dashOffset = segment.offset ?? offset;
    offset += length;
    return (
      <circle key={i} cx={100} cy={100} r={r} fill="none" stroke={segment.color} strokeWidth={width}
        strokeDasharray={`${length} ${circumference - length}`} strokeDashoffset={-dashOffset} transform="rotate(-90 100 100)" />
    );
  });
}

/** One or two donut rings. Inner segments can be positioned within their parent slice. */
export function RingChart({
  segs,
  value,
  caption,
  innerSegs,
  centerAction,
}: {
  segs: RingSeg[];
  value: string;
  caption: string;
  innerSegs?: RingSeg[];
  centerAction?: { label: string; onClick: () => void } | { label: string; href: string };
}) {
  const total = segs.reduce((sum, segment) => sum + segment.value, 0);
  return (
    <div className={styles.ringContainer}>
      <svg className={styles.ring} viewBox="0 0 200 200" role="img" aria-label={`${value} ${caption}`}>
        {innerSegs && <circle cx="100" cy="100" r="65" fill="none" stroke="var(--color-n200-catskill)" strokeWidth="20" />}
        {innerSegs && renderSegments(innerSegs, 65, 20, total)}
        {renderSegments(segs, 88, 18, total)}
        <text x="100" y="96" textAnchor="middle" fontSize="16" fontWeight="700">{value}</text>
        <text x="100" y="114" textAnchor="middle" fontSize="11">{caption}</text>
      </svg>
      {centerAction && ('href' in centerAction
        ? <a className={styles.ringAction} href={centerAction.href}>{centerAction.label}</a>
        : <button className={styles.ringAction} type="button" onClick={centerAction.onClick}>{centerAction.label}</button>)}
    </div>
  );
}
