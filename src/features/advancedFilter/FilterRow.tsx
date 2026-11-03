import { useState } from 'react';
import { AssetIcon } from '../../components/AssetIcon/AssetIcon';
import type { Patch, RowNode, Value } from './types';
import styles from './queryBuilder.module.css';

const FIELDS = ['Known Bot', 'Bad Reason', 'Region', 'App Name', 'Infra Type', 'Date Range', 'Header', 'IP Address'];
const OPERATORS = ['In', 'Between'];
const INFRA = ['F5 On-Premises', 'Cloud', 'Hybrid'];

function Chips({ items, onChange, label }: { items: string[]; onChange: (items: string[]) => void; label: string }) {
  const [draft, setDraft] = useState('');
  return (
    <div className={styles.control + ' ' + styles.chips}>
      {items.map((c) => <span key={c} className={styles.chip}>{c}</span>)}
      <input aria-label={label} value={draft} onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && draft.trim()) { onChange([...items, draft.trim()]); setDraft(''); }
          if (e.key === 'Backspace' && !draft) onChange(items.slice(0, -1));
        }} />
    </div>
  );
}

function ValueInput({ row, onChange, error }: { row: RowNode; onChange: (v: Value) => void; error: boolean }) {
  const v = row.value;
  const label = `${row.field} value`;
  const cls = `${styles.control} ${error ? styles.invalid : ''}`;
  switch (v.type) {
    case 'chips': return <Chips items={v.items} label={label} onChange={(items) => onChange({ type: 'chips', items })} />;
    case 'select': return (
      <select aria-label={label} className={cls} value={v.text} onChange={(e) => onChange({ ...v, text: e.target.value })}>
        {INFRA.map((o) => <option key={o}>{o}</option>)}
      </select>);
    case 'textarea': return <textarea aria-label={label} className={`${cls} ${styles.textarea}`} value={v.text} onChange={(e) => onChange({ ...v, text: e.target.value })} />;
    case 'boolean': return (
      <div className={styles.radios} role="radiogroup" aria-label={label}>
        {[true, false].map((on) => (
          <label key={String(on)}><input type="radio" name={row.id} checked={v.on === on} onChange={() => onChange({ type: 'boolean', on })} />{on ? 'True' : 'False'}</label>
        ))}
      </div>);
    default: return <input aria-label={label} className={cls} value={v.text} placeholder={v.type === 'date' ? 'MM/DD/YYYY - MM/DD/YYYY' : ''}
      onChange={(e) => onChange({ ...v, text: e.target.value })} aria-invalid={error || undefined} />;
  }
}

export function FilterRow({ row, onUpdate, onRemove }: { row: RowNode; onUpdate: (id: string, p: Patch) => void; onRemove: (id: string) => void }) {
  const empty = row.value.type === 'chips' ? row.value.items.length === 0 : row.value.type !== 'boolean' && !row.value.text;
  const error = Boolean(row.required && empty);
  return (
    <div className={styles.row}>
      <span className={styles.drag}><AssetIcon name="drag" size={10} /></span>
      <select aria-label="Field" className={styles.control} value={row.field} onChange={(e) => onUpdate(row.id, { field: e.target.value })}>
        {FIELDS.map((f) => <option key={f}>{f}</option>)}
      </select>
      <select aria-label="Operator" className={styles.control} value={row.operator} onChange={(e) => onUpdate(row.id, { operator: e.target.value })}>
        {OPERATORS.map((o) => <option key={o}>{o}</option>)}
      </select>
      <div className={styles.valueCell}>
        <ValueInput row={row} error={error} onChange={(value) => onUpdate(row.id, { value })} />
        {error && <p className={styles.error} role="alert">This field is required</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" aria-label="Delete condition" onClick={() => onRemove(row.id)}><AssetIcon name="trash" size={16} /></button>
        <button type="button" aria-label="More actions"><AssetIcon name="more" size={16} /></button>
      </div>
    </div>
  );
}
