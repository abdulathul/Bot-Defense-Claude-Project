import { Avatar } from '../Avatar/Avatar';
import styles from './CardVariations.module.css';

function ClockIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 8v8l5 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function Stars() {
  return (
    <div className={styles.stars} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" key={index}>
          <path
            d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 2.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function ImagePlaceholder() {
  return (
    <svg viewBox="0 0 208 240" fill="none" aria-hidden="true">
      <rect width="208" height="240" fill="#e6e6e6" />
      <rect x="44" y="62" width="120" height="116" rx="8" fill="#ededed" />
      <circle cx="130" cy="94" r="14" fill="#e6e6e6" />
      <path d="m59 160 35-38 23 25 15-17 27 30H59Z" fill="#e6e6e6" />
    </svg>
  );
}

export function ProductInfoCard() {
  return (
    <article className={`${styles.card} ${styles.productCard}`}>
      <div className={styles.productImage}>
        <ImagePlaceholder />
      </div>
      <div className={styles.productText}>
        <h2>Text</h2>
        <p className={styles.productPrice}>$0</p>
        <p className={styles.productDescription}>Body text.</p>
      </div>
    </article>
  );
}

export function ReviewCard() {
  return (
    <article className={`${styles.card} ${styles.reviewCard}`}>
      <Stars />
      <div className={styles.reviewText}>
        <h2>Review title</h2>
        <p>Review body</p>
      </div>
      <div className={styles.reviewer}>
        <Avatar initials="L" alt="Reviewer" size="medium" backgroundColor="#80a9cb" />
        <div>
          <p className={styles.reviewerName}>Reviewer name</p>
          <p className={styles.reviewerDate}>Date</p>
        </div>
      </div>
    </article>
  );
}

export function StatsCard() {
  return (
    <article className={`${styles.card} ${styles.statsCard}`}>
      <div className={styles.clock}>
        <ClockIcon />
      </div>
      <p className={styles.statValue}>100</p>
      <p className={styles.statDescription}>Body text</p>
    </article>
  );
}

export function TestimonialCard() {
  return (
    <article className={`${styles.card} ${styles.testimonialCard}`}>
      <blockquote>“Quote”</blockquote>
      <div className={styles.testimonialAuthor}>
        <Avatar initials="L" alt="Testimonial author" size="medium" backgroundColor="#80a9cb" />
        <div>
          <p className={styles.authorTitle}>Title</p>
          <p className={styles.authorDescription}>Description</p>
        </div>
      </div>
    </article>
  );
}

export function CardSlot() {
  return <div className={`${styles.card} ${styles.slot}`} aria-label="Empty card slot" />;
}
