import type { ReactNode } from 'react';
import { AssetIcon } from '../AssetIcon/AssetIcon';
import type { AssetIconName } from '../AssetIcon/AssetIcon';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: 'stroke' | 'default';
  layout?: 'horizontal' | 'vertical';
  media?: ReactNode;
  mediaType?: 'icon' | 'image';
  action?: ReactNode;
  titleIcon?: AssetIconName;
}

export function Card({
  title,
  children,
  className = '',
  variant = 'stroke',
  layout = 'vertical',
  media,
  mediaType = 'icon',
  action,
  titleIcon = 'info',
}: CardProps) {
  const classes = [
    styles.card,
    variant === 'default' && styles.default,
    media && styles.withMedia,
    layout === 'horizontal' && styles.horizontal,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes}>
      {media ? (
        <div className={`${styles.content} ${mediaType === 'image' ? styles.imageContent : ''}`}>
          <div className={`${styles.media} ${mediaType === 'image' ? styles.imageMedia : styles.iconMedia}`}>
            {media}
          </div>
          <div className={styles.copy}>
            {title && <h2 className={styles.designTitle}>{title}</h2>}
            <div className={styles.designBody}>{children}</div>
            {action && <div className={styles.action}>{action}</div>}
          </div>
        </div>
      ) : (
        <>
          {title && <h2 className={styles.title}>{title} <AssetIcon name={titleIcon} size={14} /></h2>}
          {children}
          {action && <div className={styles.action}>{action}</div>}
        </>
      )}
    </section>
  );
}
