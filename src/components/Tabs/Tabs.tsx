import { forwardRef, useId, useRef, useState, type ButtonHTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import styles from './Tabs.module.css';

export type TabState = 'inactive' | 'active' | 'hover';

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> {
  label: string;
  state?: TabState;
  onClick?: () => void;
}

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeTabId?: string;
  defaultActiveTabId?: string;
  onChange?: (tabId: string) => void;
  ariaLabel?: string;
  className?: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({
  label,
  state = 'inactive',
  className = '',
  ...buttonProps
}, ref) {
  const classes = [styles.tab, styles[state], className].filter(Boolean).join(' ');

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={classes}
      type="button"
      role="tab"
      aria-selected={state === 'active'}
    >
      {label}
    </button>
  );
});

function getNextEnabledIndex(items: TabItem[], currentIndex: number, direction: 1 | -1) {
  for (let offset = 1; offset <= items.length; offset += 1) {
    const index = (currentIndex + direction * offset + items.length) % items.length;
    if (!items[index].disabled) return index;
  }

  return currentIndex;
}

function getLastEnabledIndex(items: TabItem[]) {
  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (!items[index].disabled) return index;
  }

  return -1;
}

export function Tabs({
  items,
  activeTabId,
  defaultActiveTabId,
  onChange,
  ariaLabel = 'Tabs',
  className = '',
}: TabsProps) {
  const generatedId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [uncontrolledActiveId, setUncontrolledActiveId] = useState(
    () => defaultActiveTabId ?? items.find((item) => !item.disabled)?.id ?? '',
  );
  const isControlled = activeTabId !== undefined;
  const selectedId = isControlled ? activeTabId : uncontrolledActiveId;
  const selectedIndex = items.findIndex((item) => item.id === selectedId);

  if (items.length === 0) {
    throw new RangeError('Tabs requires at least one tab item.');
  }

  if (items.some((item) => !item.id.trim())) {
    throw new RangeError('Each tab item must have a non-empty id.');
  }

  if (new Set(items.map((item) => item.id)).size !== items.length) {
    throw new RangeError('Tab item ids must be unique.');
  }

  if (selectedIndex < 0 || items[selectedIndex].disabled) {
    throw new RangeError('The selected tab id must match an enabled tab item.');
  }

  const selectTab = (tabId: string) => {
    if (!isControlled) setUncontrolledActiveId(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    let targetIndex = selectedIndex;

    if (event.key === 'ArrowRight') {
      targetIndex = getNextEnabledIndex(items, selectedIndex, 1);
    } else if (event.key === 'ArrowLeft') {
      targetIndex = getNextEnabledIndex(items, selectedIndex, -1);
    } else if (event.key === 'Home') {
      targetIndex = items.findIndex((item) => !item.disabled);
    } else if (event.key === 'End') {
      targetIndex = getLastEnabledIndex(items);
    } else {
      return;
    }

    event.preventDefault();
    const nextItem = items[targetIndex];
    if (nextItem) {
      selectTab(nextItem.id);
      tabRefs.current[targetIndex]?.focus();
    }
  };

  return (
    <div className={`${styles.tabs} ${className}`}>
      <div className={styles.tabList} role="tablist" aria-label={ariaLabel}>
        {items.map((item, index) => {
          const tabId = `${generatedId}-tab-${index}`;
          const panelId = `${generatedId}-panel-${index}`;
          const selected = item.id === selectedId;

          return (
            <Tab
              key={item.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={tabId}
              label={item.label}
              state={selected ? 'active' : 'inactive'}
              disabled={item.disabled}
              tabIndex={selected ? 0 : -1}
              aria-controls={panelId}
              onClick={() => selectTab(item.id)}
              onKeyDown={handleKeyDown}
            />
          );
        })}
      </div>
      <div
        className={styles.tabPanel}
        id={`${generatedId}-panel-${selectedIndex}`}
        role="tabpanel"
        aria-labelledby={`${generatedId}-tab-${selectedIndex}`}
        tabIndex={0}
      >
        {items[selectedIndex].content}
      </div>
    </div>
  );
}
