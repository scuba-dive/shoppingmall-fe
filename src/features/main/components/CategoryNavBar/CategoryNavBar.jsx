import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import categories from '@/data/categories';
import useMediaQuery from '@/hooks/useMediaQuery';

import styles from './CategoryNavBar.module.css';

function CategoryNavBar() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 1075px)');

  return (
    <nav className={styles.nav} aria-label="카테고리 네비게이션">
      {isMobile ? (
        <Swiper
          slidesPerView="auto"
          spaceBetween={120}
          slidesOffsetBefore={5}
          slidesOffsetAfter={5}
          className={styles.swiper}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.name} className={styles.slide}>
              <button
                type="button"
                onClick={() => navigate(`/category/${cat.name}`)}
                className={styles.button}
              >
                {cat.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ul className={styles.list}>
          {categories.map((cat) => (
            <li key={cat.name} className={styles.item}>
              <button
                type="button"
                onClick={() => navigate(`/category/${cat.name}`)}
                className={styles.button}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default CategoryNavBar;
