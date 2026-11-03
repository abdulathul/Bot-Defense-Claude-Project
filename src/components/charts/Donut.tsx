type Seg = { value: number; color: string };

// A ring is a circle whose outline is cut into dashes; each dash is one slice
function Ring({ r, width, segs }: { r: number; width: number; segs: Seg[] }) {
  const C = 2 * Math.PI * r;
  const total = segs.reduce((s, x) => s + x.value, 0);
  let offset = 0;
  return (
    <>
      {segs.map((s, i) => {
        const len = (s.value / total) * C;
        const el = <circle key={i} r={r} cx={90} cy={90} fill="none" stroke={s.color} strokeWidth={width}
          strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} transform="rotate(-90 90 90)" />;
        offset += len;
        return el;
      })}
    </>
  );
}

export function Donut({ outer, inner, center }: { outer: Seg[]; inner: Seg[]; center: string }) {
  return (
    <svg viewBox="0 0 180 180" width={180} height={180} role="img" aria-label={`Donut chart, total ${center}`}>
      <Ring r={78} width={18} segs={outer} />
      <Ring r={58} width={18} segs={inner} />
      <text x="90" y="95" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f1e57">{center}</text>
    </svg>
  );
}
