import { useNavigate } from 'react-router-dom';

import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';
import CategoryPreviewSection from '@/features/main/components/CategoryPreviewSection/CategoryPreviewSection';

import styles from './CategoriesPage.module.css';

function CategoriesPage() {
  const navigate = useNavigate();
  return (
    <div>
      <CategoryNavBar />
      <div className={styles.breadcrumb}>
        <button type="button" className={styles.link} onClick={() => navigate('/')}>
          홈
        </button>
        <span className={styles.separator}> &gt; </span>
        <span>카테고리</span>
      </div>
      <CategoryPreviewSection />
    </div>
  );
}

export default CategoriesPage;
