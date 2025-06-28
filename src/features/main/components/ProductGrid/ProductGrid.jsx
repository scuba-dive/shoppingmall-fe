import { useNavigate } from 'react-router-dom';

import products from '@/data/products';

import styles from './ProductGrid.module.css';

function ProductGrid() {
  const navigate = useNavigate();

  return (
    <section className={styles.productSection}>
      <h2 className={styles.title}>전체 상품</h2>
      <div className={styles.grid}>
        {products.slice(0, 12).map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => navigate(`/product/${product.id}`)}
            className={styles.card}
          >
            <img src={product.image} alt={product.name} className={styles.image} />
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>{`${product.price.toLocaleString()}원`}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
