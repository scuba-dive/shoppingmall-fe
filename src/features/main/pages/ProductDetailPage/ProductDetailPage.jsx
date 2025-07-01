import { useState } from 'react';
import { useParams } from 'react-router-dom';

import products from '@/data/products';
import Breadcrumb from '@/features/main/components/Breadcrumb/Breadcrumb';
import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';
import QuantitySelector from '@/features/main/components/QuantitySelector/QuantitySelector';
import StarRating from '@/features/main/components/StarRating/StarRating';

import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || 'blue');

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    // console.log({
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   color: selectedColor,
    //   quantity,
    // });
  };

  return (
    <div className="product-detail">
      <CategoryNavBar />
      <Breadcrumb
        paths={[
          { name: '홈', link: '/' },
          { name: '카테고리', link: '/category' },
          { name: product.category, link: `/category/${product.category}` },
          { name: product.name },
        ]}
      />
      <div className={styles.productContent}>
        <div className={styles.productImage}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.title}>{product.name}</p>
          <p className={styles.price}>{product.price.toLocaleString()}</p>
          {product.rating && (
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          )}
          <p className={styles.description}>{product.description}</p>

          <fieldset className={styles.option}>
            <legend>Color</legend>
            <div className={styles.colorOptions}>
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`${styles.colorCircle} ${styles[color]} ${
                    selectedColor === color ? styles.selected : ''
                  }`}
                  onClick={() => handleColorSelect(color)}
                  aria-label={`${color} color`}
                />
              ))}
            </div>
          </fieldset>

          <QuantitySelector
            value={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onChange={setQuantity}
          />

          <button type="button" className={styles.addToCart} onClick={handleAddToCart}>
            장바구니 담기
          </button>

          <div className={styles.meta}>
            <p>SKU : {product.sku}</p>
            <p>Category : {product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
