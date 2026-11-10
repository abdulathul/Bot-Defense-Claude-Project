import { useId } from 'react';
import { Avatar } from '../Avatar/Avatar';
import styles from './CustomerReviewers.module.css';

export interface CustomerReview {
  name: string;
  rating: number;
  text: string;
  avatarSrc?: string;
}

const sampleReviews: CustomerReview[] = [
  {
    name: 'Sofia Martinez',
    rating: 5,
    text: 'Such a lovely experience from start to finish. Everything was easy, and I could not be happier with my purchase.',
    avatarSrc: createPlaceholderAvatar('#f2c6a0', '#533d34', '#6f9fa8'),
  },
  {
    name: 'Ethan Brooks',
    rating: 4,
    text: 'Great quality and thoughtful details. It arrived quickly and was exactly what I was hoping for.',
    avatarSrc: createPlaceholderAvatar('#d9a77d', '#302b28', '#8e9f71'),
  },
  {
    name: 'Priya Shah',
    rating: 5,
    text: 'I have already recommended this to my friends. Friendly service, beautiful presentation, and a wonderful result.',
    avatarSrc: createPlaceholderAvatar('#bd805a', '#25202b', '#a889be'),
  },
];

function createPlaceholderAvatar(skin: string, hair: string, background: string) {
  const illustration = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="${background}"/><path d="M17 96c2-20 13-31 31-31s29 11 31 31" fill="#f2f0ec"/><path d="M25 42c0-20 9-30 24-30s24 10 24 30v10H25z" fill="${hair}"/><ellipse cx="49" cy="45" rx="20" ry="24" fill="${skin}"/><path d="M29 36c2-17 10-25 21-25 14 0 22 11 21 27-6-2-12-7-16-13-7 7-16 11-26 11z" fill="${hair}"/><circle cx="42" cy="45" r="1.5" fill="#302b28"/><circle cx="56" cy="45" r="1.5" fill="#302b28"/><path d="M44 55c3 2 7 2 10 0" fill="none" stroke="#925f4f" stroke-linecap="round" stroke-width="1.5"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(illustration)}`;
}

function StarRating({ rating }: { rating: number }) {
  const filledStars = Number.isFinite(rating)
    ? Math.max(0, Math.min(5, Math.round(rating)))
    : 0;

  return (
    <div
      className={styles.rating}
      role="img"
      aria-label={`${filledStars} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          className={index < filledStars ? styles.filledStar : styles.emptyStar}
          viewBox="0 0 24 24"
          fill={index < filledStars ? 'currentColor' : 'none'}
          aria-hidden="true"
          key={index}
        >
          <path
            d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 2.8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

export function CustomerReviewers({ reviews = sampleReviews }: { reviews?: CustomerReview[] }) {
  const headingId = useId();

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h2 className={styles.heading} id={headingId}>
          What our customers say
        </h2>
        <p className={styles.subheading}>A few kind words from our community</p>
      </header>
      <div className={styles.reviews}>
        {reviews.map((review, index) => (
          <article className={styles.review} key={`${review.name}-${index}`}>
            <div className={styles.reviewHeader}>
              <Avatar
                src={review.avatarSrc}
                alt={`${review.name} avatar`}
                initials={review.name.trim().charAt(0) || '?'}
                size="medium"
              />
              <div className={styles.reviewerDetails}>
                <h3 className={styles.name}>{review.name}</h3>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <p className={styles.text}>{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
