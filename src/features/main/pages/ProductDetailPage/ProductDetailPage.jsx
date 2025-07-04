import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddToCartButton from '@/features/main/components/AddToCartButton/AddToCartButton';
import Breadcrumb from '@/features/main/components/Breadcrumb/Breadcrumb';
import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';
import QuantitySelector from '@/features/main/components/QuantitySelector/QuantitySelector';
import StarRating from '@/features/main/components/StarRating/StarRating';
import { addToCart } from '@/services/cartService';
import { fetchProductById } from '@/services/mainService';

import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        if (data.options.length > 0) {
          setSelectedOption(data.options[0]);
        }
      } catch (err) {
        // console.error('상품 불러오기 실패:', err);
      }
    };

    loadProduct();
  }, [id]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleColorSelect = (color) => {
    const matched = product.options.find((opt) => opt.color === color);
    if (matched) setSelectedOption(matched);
  };

  const handleAddToCart = async () => {
    try {
      const optionId = selectedOption?.productOptionId || selectedOption?.id;

      if (!optionId) return;

      await addToCart({ productOptionId: optionId, quantity });

      // TODO: 장바구니 성공 모달 표시
    } catch (error) {
      // TODO: 장바구니 실패 모달 표시
    }
  };

  if (!product || !selectedOption) {
    return <div>상품을 불러오는 중입니다...</div>;
  }

  return (
    <div className="product-detail">
      <CategoryNavBar />
      <Breadcrumb
        paths={[
          { name: '홈', link: '/' },
          { name: '카테고리', link: '/category' },
          { name: product.category.name, link: `/category/${product.category.name}` },
          { name: product.productName },
        ]}
      />
      <div className={styles.productContent}>
        <div className={styles.productImage}>
          <img src={selectedOption.images[0]} alt={product.productName} />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.title}>{product.productName}</p>
          <p className={styles.price}>{product.price.toLocaleString()}원</p>
          {product.rating && (
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          )}
          <p className={styles.description}>{product.description}</p>

          <fieldset className={styles.option}>
            <legend>Color</legend>
            <div className={styles.colorOptions}>
              {product.options.map((opt) => (
                <button
                  key={opt.color}
                  type="button"
                  className={`${styles.colorCircle} ${styles[opt.color.toLowerCase()]} ${
                    selectedOption.color === opt.color ? styles.selected : ''
                  }`}
                  onClick={() => handleColorSelect(opt.color)}
                  aria-label={`${opt.color} color`}
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

          <AddToCartButton onClick={handleAddToCart} />

          <hr className={styles.divider} />
          <div className={styles.meta}>
            <p>SKU : {selectedOption.sku}</p>
            <p>Category : {product.category.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
