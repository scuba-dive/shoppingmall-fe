import PropTypes from 'prop-types';

import ProductCard from '@/components/Card/ProductCard';

import styles from './ProductGrid.module.css';

function ProductGrid({ title, products }) {
  return (
    <section className={styles.productSection}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.grid}>
        {products.map((product) => (
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
ProductGrid.propTypes = {
  title: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string,
    }),
  ).isRequired,
};

ProductGrid.defaultProps = {
  title: '',
};

export default ProductGrid;
