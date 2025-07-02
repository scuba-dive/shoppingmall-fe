import PropTypes from 'prop-types';

import ProductCard from '@/components/Card/ProductCard';

import styles from './ProductGrid.module.css';

function ProductGrid({
  title,
  showSort = false,
  onSortChange,
  products = [],
  lastElementRef, //
}) {
  return (
    <section className={styles.productSection}>
      {(title || showSort) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {showSort && (
            <div className={styles.sortWrapper}>
              <select className={styles.sortSelect} defaultValue="latest" onChange={onSortChange}>
                <option value="latest">최신 순</option>
                <option value="price-low">낮은 가격 순</option>
                <option value="price-high">높은 가격 순</option>
              </select>
            </div>
          )}
        </div>
      )}
      <div className={styles.grid}>
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <div key={product.id} ref={isLast ? lastElementRef : null}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

ProductGrid.propTypes = {
  title: PropTypes.string,
  showSort: PropTypes.bool,
  onSortChange: PropTypes.func,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string,
    }),
  ),
  lastElementRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

ProductGrid.defaultProps = {
  title: '',
  showSort: false,
  onSortChange: () => {},
  products: [],
  lastElementRef: null,
};

export default ProductGrid;
