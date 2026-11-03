import { Fragment } from 'react';
import { AssetIcon } from '../../components/AssetIcon/AssetIcon';
import { FilterRow } from './FilterRow';
import { LogicalOperator } from './LogicalOperator';
import type { Patch, QueryNode } from './types';
import styles from './queryBuilder.module.css';

type Props = { nodes: QueryNode[]; onUpdate: (id: string, p: Patch) => void; onRemove: (id: string) => void };

export function QueryGroup({ nodes, onUpdate, onRemove }: Props) {
  return (
    <div>
      {nodes.map((node, i) => (
        <Fragment key={node.id}>
          {i > 0 && <LogicalOperator value={node.joiner} onChange={(joiner) => onUpdate(node.id, { joiner })} />}
          {node.kind === 'row' ? (
            <FilterRow row={node} onUpdate={onUpdate} onRemove={onRemove} />
          ) : (
            <div className={styles.groupWrap}>
              <div className={styles.group}>
                <button type="button" className={styles.collapse} aria-expanded={!node.collapsed}
                  aria-label={node.collapsed ? 'Expand group' : 'Collapse group'}
                  onClick={() => onUpdate(node.id, { collapsed: !node.collapsed })}>
                  <AssetIcon name={node.collapsed ? 'angle-down' : 'angle-up'} size={16} />
                </button>
                {node.collapsed
                  ? <p className={styles.summary}>{node.children.length} conditions</p>
                  : <QueryGroup nodes={node.children} onUpdate={onUpdate} onRemove={onRemove} />}
              </div>
              <button type="button" className={styles.trash} aria-label="Delete group" onClick={() => onRemove(node.id)}><AssetIcon name="trash" size={16} /></button>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
