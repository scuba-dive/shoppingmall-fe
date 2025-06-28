import { useNavigate } from 'react-router-dom';

import categories from '@/data/categories';

import styles from './CategorySection.module.css';

function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <button type="button" onClick={() => navigate('/category')} className={styles.titleButton}>
        카테고리
      </button>
      <div className={styles.categoryList}>
        {categories.map((cat) => (
          <button
            key={cat.name}
            type="button"
            className={styles.categoryItem}
            onClick={() => navigate(`/category/${cat.name}`)}
          >
            <img src={cat.image} alt={cat.name} />
            <p>{cat.name}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
