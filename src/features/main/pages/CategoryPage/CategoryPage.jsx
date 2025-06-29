// src/features/main/pages/CategoryPage.jsx
import products from '@/data/products';

import styles from './CategoryPage.module.css';

function CategoryPage() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>전체 카테고리</h2>

      {/* 카테고리별 섹션 */}
      {['침대', '테이블', '의자', '수납장', '소품'].map((category) => {
        const filtered = products.filter((p) => p.category === category);
        return (
          <div key={category} className={styles.categoryBlock}>
            <h3 className={styles.categoryName}>{category}</h3>
            <div className={styles.grid}>
              {filtered.map((product) => (
                <div key={product.id} className={styles.card}>
                  <img src={product.image} alt={product.name} className={styles.image} />
                  <p className={styles.name}>{product.name}</p>
                  <p className={styles.price}>{product.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default CategoryPage;
