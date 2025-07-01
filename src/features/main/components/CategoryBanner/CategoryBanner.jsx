import { useLocation, useParams } from 'react-router-dom';

import bannerData from '@/data/banner';

import styles from './CategoryBanner.module.css';

function CategoryBanner() {
  const { category } = useParams();
  const location = useLocation();

  const isCategoryPage = location.pathname === '/category';

  const bannerName = isCategoryPage ? '카테고리' : category;
  const currentBanner = bannerData.find((b) => b.name === bannerName);

  if (!currentBanner) return null;

  return (
    <div className={styles.banner}>
      <img src={currentBanner.image} alt={bannerName} className={styles.bannerImage} />
      <h1 className={styles.bannerTitle}>{bannerName}</h1>
    </div>
  );
}

export default CategoryBanner;
