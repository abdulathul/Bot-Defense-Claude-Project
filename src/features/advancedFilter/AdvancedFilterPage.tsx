import { useState } from 'react';
import { AssetIcon } from '../../components/AssetIcon/AssetIcon';
import { ConsoleButton } from '../../components/ConsoleButton/ConsoleButton';
import { QueryGroup } from './QueryGroup';
import { group, initialTree, removeNode, row, toExpression, updateNode } from './queryTree';
import type { Patch, QueryNode } from './types';
import styles from './AdvancedFilterPage.module.css';

export function AdvancedFilterPage() {
  const [tree, setTree] = useState<QueryNode[]>(initialTree);
  const [showCode, setShowCode] = useState(false);

  const update = (id: string, patch: Patch) => setTree((nodes) => updateNode(nodes, id, patch));
  const remove = (id: string) => setTree((nodes) => removeNode(nodes, id));
  const emptyRow = () => row('Known Bot', 'In', { type: 'text', text: '' });
  const addQuery = () => setTree((nodes) => [...nodes, emptyRow()]);
  const addGroup = () => setTree((nodes) => [...nodes, group('AND', emptyRow())]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Advanced Filter</h1>
      </header>
      <main className={styles.body}>
        <section className={styles.card} aria-labelledby="query-builder-title">
          <h2 id="query-builder-title" className={styles.h2}>Query Builder</h2>
          <QueryGroup nodes={tree} onUpdate={update} onRemove={remove} />
          <div className={styles.add}>
            <ConsoleButton onClick={addQuery}>
              <span className={styles.buttonIcon} aria-hidden="true">+</span>
              Add Query
            </ConsoleButton>
            <ConsoleButton onClick={addGroup}>
              <svg className={styles.buttonIcon} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <rect x="2.5" y="2.5" width="8" height="8" rx="1" />
                <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
              </svg>
              Add New Group
            </ConsoleButton>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="code-view-title">
          <h2 id="code-view-title" className={styles.h2}>Code View</h2>
          <p className={styles.text}>Preview the auto-generated code output for deployment and query snippet for integration.</p>
          <ConsoleButton onClick={() => setShowCode((visible) => !visible)} aria-expanded={showCode}>
            Generated Preview
          </ConsoleButton>
          {showCode && <pre className={styles.code}>{toExpression(tree)}</pre>}
        </section>

        <section className={styles.disclaimerSection} aria-labelledby="disclaimer-title">
          <h2 id="disclaimer-title" className={styles.disclaimer}>Disclaimer</h2>
          <p className={styles.text}>Applying the Advanced Filter may take a few minutes. Please wait while we process your request.</p>
        </section>
      </main>
      <footer className={styles.footer}>
        <ConsoleButton>Cancel</ConsoleButton>
        <ConsoleButton variant="primary">Apply</ConsoleButton>
      </footer>
    </div>
  );
}
