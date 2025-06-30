import ProductCard from '@/components/Card/ProductCard';
import products from '@/data/products';

import styles from './ProductGrid.module.css';

function ProductGrid() {
  return (
    <section className={styles.productSection}>
      <h2 className={styles.title}>전체 상품</h2>
      <div className={styles.grid}>
        {products.slice(0, 12).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
