import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/services/axiosInstance';

import styles from './CategorySection.module.css';

function CategorySection() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/api/users/categories')
      .then((res) => {
        setCategories(res.data.data); // ← CategoryResponse[]
      })
      .catch((err) => console.error(err));
  }, []);

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
            <img src={cat.imageUrl} alt={cat.name} />
            <p>{cat.name}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
