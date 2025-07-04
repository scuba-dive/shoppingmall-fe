import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import bannerData from '@/data/banner';
import { fetchProductById } from '@/services/mainService';

import styles from './CategoryBanner.module.css';

function CategoryBanner() {
  const { category, id } = useParams();
  const location = useLocation();
  const { pathname } = location;

  const [bannerName, setBannerName] = useState('카테고리');

  useEffect(() => {
    const loadBannerName = async () => {
      if (pathname === '/category' || pathname.startsWith('/category/')) {
        setBannerName(category ?? '카테고리');
      } else if (pathname.startsWith('/product/') && id) {
        try {
          const product = await fetchProductById(id);
          setBannerName(product?.category?.name ?? '카테고리');
        } catch (e) {
          console.error('상품 정보를 불러오지 못했습니다:', e);
          setBannerName('카테고리');
        }
      }
    };

    loadBannerName();
  }, [pathname, category, id]);

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
