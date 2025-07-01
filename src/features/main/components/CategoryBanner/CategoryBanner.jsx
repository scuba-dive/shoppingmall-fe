import { useLocation, useParams } from 'react-router-dom';

import bannerData from '@/data/banner';
import products from '@/data/products';

import styles from './CategoryBanner.module.css';

function CategoryBanner() {
  const { category, id } = useParams();
  const location = useLocation();

  const { pathname } = location;

  // 현재 경로 기반으로 페이지 유형 판단
  const isCategoryPage = pathname === '/category' || pathname.startsWith('/category/');
  const isProductPage = pathname.startsWith('/product/');

  // 배너 이름 결정
  let bannerName = '카테고리';

  if (isCategoryPage) {
    bannerName = category ?? '카테고리';
  } else if (isProductPage && id) {
    const product = products.find((p) => String(p.id) === id);
    if (product) {
      bannerName = product.category;
    }
  }

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
