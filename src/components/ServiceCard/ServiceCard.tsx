import { Link } from 'react-router-dom';
import { AssetIcon } from '../AssetIcon/AssetIcon';
import type { AssetIconName } from '../AssetIcon/AssetIcon';
import { Badge } from '../Badge/Badge';
import styles from './ServiceCard.module.css';

export type BadgeData = { label: string; variant?: 'default' | 'new' | 'unavailable' };
type Props = {
  title: string;
  description?: string; // big cards have one; the small "More Workspaces" cards don't
  icon: AssetIconName;
  badges?: BadgeData[];
  locked?: boolean;
  compact?: boolean;
  to?: string;
};

export function ServiceCard({ title, description, icon, badges = [], locked, compact, to = '#' }: Props) {
  return (
    <Link to={to} className={`${styles.card} ${compact ? styles.compact : ''}`}>
      {(badges.length > 0 || locked) && (
        <div className={styles.meta}>
          {badges.map((b) => <Badge key={b.label} {...b} />)}
          {locked && <AssetIcon name="lock" size={12} />}
        </div>
      )}
      <AssetIcon name={icon} />
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
    </Link>
  );
}
