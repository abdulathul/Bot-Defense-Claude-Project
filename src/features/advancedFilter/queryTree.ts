import type { GroupNode, Patch, QueryNode, RowNode, Value } from './types';

let counter = 100;
export const newId = () => `n${counter++}`;

// We never change state in place: each helper returns a NEW copy of the tree. React needs that to notice changes.
export function updateNode(nodes: QueryNode[], id: string, patch: Patch): QueryNode[] {
  return nodes.map((node) => {
    const next = node.id === id ? ({ ...node, ...patch } as QueryNode) : node;
    return next.kind === 'group' ? { ...next, children: updateNode(next.children, id, patch) } : next;
  });
}

export function removeNode(nodes: QueryNode[], id: string): QueryNode[] {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) => (n.kind === 'group' ? { ...n, children: removeNode(n.children, id) } : n));
}

export const row = (field: string, operator: string, value: Value, joiner: RowNode['joiner'] = 'AND', required = false): RowNode =>
  ({ id: newId(), kind: 'row', joiner, field, operator, value, required });
export const group = (joiner: GroupNode['joiner'], ...children: QueryNode[]): GroupNode =>
  ({ id: newId(), kind: 'group', joiner, children });

const valueText = (v: Value) =>
  v.type === 'chips' ? `[${v.items.join(', ')}]` : v.type === 'boolean' ? String(v.on) : JSON.stringify(v.text);

/** Turns the tree into the text shown in "Code View" */
export function toExpression(nodes: QueryNode[]): string {
  return nodes
    .map((n, i) => {
      const text = n.kind === 'group' ? `(${toExpression(n.children)})` : `${n.field} ${n.operator.toLowerCase()} ${valueText(n.value)}`;
      return i === 0 ? text : `${n.joiner} ${text}`;
    })
    .join(' ');
}

const chips = (...items: string[]): Value => ({ type: 'chips', items });
const text = (t: string): Value => ({ type: 'text', text: t });

// Starting data, copied from the design
export const initialTree: QueryNode[] = [
  row('Known Bot', 'In', chips('AI Search Engine', 'AI Assistant')),
  row('Bad Reason', 'In', chips('Token Invalid', 'Token Missing')),
  row('Region', 'In', chips('SG', 'USA')),
  group('AND',
    row('App Name', 'In', text('my-application-001')),
    row('Bad Reason', 'In', chips('Token Missing', 'Token Missing 2'), 'OR'),
    group('OR', row('App Name', 'In', text('my-application-001')), row('Bad Reason', 'In', chips('Token Missing', 'Token Missing 2')))),
  group('AND',
    row('App Name', 'In', text('my-application-001')),
    row('Bad Reason', 'In', chips('Token Missing', 'Token Missing 2'), 'OR'),
    group('OR',
      row('App Name', 'In', text('my-application-001')),
      row('Infra Type', 'In', { type: 'select', text: 'F5 On-Premises' }),
      group('OR',
        row('Date Range', 'Between', { type: 'date', text: '07/05/2026 - 07/10/2026' }, 'OR'),
        group('AND',
          row('Known Bot', 'In', { type: 'textarea', text: 'response.header.key = "Foo"' }),
          row('Header', 'In', { type: 'boolean', on: true }, 'OR'),
          row('IP Address', 'In', text(''), 'OR', true))))),
];
