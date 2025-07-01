import PropTypes from 'prop-types';
import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

import styles from './StarRating.module.css';

function StarRating({ rating, reviewCount }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i += 1) {
    stars.push(<FaStar key={`full-${i}`} className={styles.icon} />);
  }

  if (hasHalf) {
    stars.push(<FaStarHalfAlt key="half" className={styles.icon} />);
  }

  for (let i = 0; i < emptyStars; i += 1) {
    stars.push(<FaRegStar key={`empty-${i}`} className={styles.icon} />);
  }

  return (
    <div className={styles.starRating}>
      {stars}
      {reviewCount !== undefined && (
        <span className={styles.reviewCount}>{reviewCount}개 리뷰</span>
      )}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
};

StarRating.defaultProps = {
  reviewCount: undefined,
};

export default StarRating;
