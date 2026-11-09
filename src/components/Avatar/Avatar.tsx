import { useEffect, useState, type CSSProperties } from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'large' | 'medium' | 'small';
export type AvatarShape = 'circle' | 'square';
export type AvatarLayout = 'spaced' | 'overlap';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  backgroundColor?: string;
}

export function Avatar({
  src,
  alt = '',
  initials = 'F',
  size = 'medium',
  shape = 'circle',
  backgroundColor,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const visibleInitial = Array.from(initials)[0] ?? '';
  const showImage = Boolean(src) && !imageError;

  useEffect(() => {
    setImageError(false);
  }, [src]);

  return (
    <span
      className={`${styles.avatar} ${styles[size]} ${styles[shape]}`}
      style={backgroundColor ? { '--avatar-background': backgroundColor } as CSSProperties : undefined}
      role="img"
      aria-label={alt || visibleInitial}
    >
      {showImage ? (
        <img src={src} alt="" onError={() => setImageError(true)} />
      ) : (
        visibleInitial
      )}
    </span>
  );
}

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  layout?: AvatarLayout;
  size?: AvatarSize;
  max?: number;
  totalCount?: number;
  'aria-label'?: string;
}

export function AvatarGroup({
  avatars,
  layout = 'spaced',
  size = 'medium',
  max = 3,
  totalCount = avatars.length,
  'aria-label': ariaLabel = 'Avatar group',
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, Math.max(0, Math.floor(max)));
  const remainingCount = Math.max(0, totalCount - visibleAvatars.length);

  return (
    <div className={`${styles.group} ${styles[layout]}`} role="group" aria-label={ariaLabel}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar {...avatar} size={size} key={`${avatar.alt || avatar.initials || 'avatar'}-${index}`} />
      ))}
      {remainingCount > 0 && (
        <span className={`${styles.overflow} ${styles[size]}`} aria-label={`${remainingCount} more`}>
          +{remainingCount}
        </span>
      )}
    </div>
  );
}

export interface AvatarBlockProps {
  avatar?: AvatarProps;
  title: string;
  description: string;
}

export function AvatarBlock({
  avatar = { initials: 'L', alt: 'Luis Oriach', size: 'medium' },
  title,
  description,
}: AvatarBlockProps) {
  return (
    <div className={styles.block}>
      <Avatar {...avatar} size="medium" />
      <div className={styles.blockText}>
        <div className={styles.blockTitle}>{title}</div>
        <div className={styles.blockDescription}>{description}</div>
      </div>
    </div>
  );
}
