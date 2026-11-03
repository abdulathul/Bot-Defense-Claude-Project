export type Joiner = 'AND' | 'OR';

export type Value =
  | { type: 'chips'; items: string[] }
  | { type: 'text' | 'select' | 'date' | 'textarea'; text: string }
  | { type: 'boolean'; on: boolean };

// A "row" is one condition. A "group" holds more rows and groups, so groups can nest forever.
export type RowNode = { id: string; kind: 'row'; joiner: Joiner; field: string; operator: string; value: Value; required?: boolean };
export type GroupNode = { id: string; kind: 'group'; joiner: Joiner; children: QueryNode[]; collapsed?: boolean };
export type QueryNode = RowNode | GroupNode;
export type Patch = Partial<Omit<RowNode, 'id' | 'kind'>> & { collapsed?: boolean };
