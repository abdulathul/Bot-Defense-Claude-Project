import { cloneElement, useId, useState, type ReactElement, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  title: string;
  content: ReactNode;
  placement?: TooltipPlacement;
  children: ReactElement<{ className?: string; 'aria-describedby'?: string }>;
  className?: string;
  tooltipClassName?: string;
}

export function Tooltip({
  title,
  content,
  placement = 'top',
  children,
  className = '',
  tooltipClassName = '',
}: TooltipProps) {
  const tooltipId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const classes = [styles.tooltip, styles[placement], tooltipClassName].filter(Boolean).join(' ');
  const wrapperClassName = [styles.wrapper, className].filter(Boolean).join(' ');

  return (
    <span
      className={wrapperClassName}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsVisible(false);
        }
      }}
    >
      {cloneElement(children, {
        className: [styles.trigger, children.props.className].filter(Boolean).join(' '),
        'aria-describedby': isVisible ? tooltipId : undefined,
      })}
      <span
        id={tooltipId}
        role="tooltip"
        className={classes}
        data-visible={isVisible}
        aria-hidden={!isVisible}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.content}>{content}</span>
      </span>
    </span>
  );
}
