import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AddToCartButton from '@/features/main/components/AddToCartButton/AddToCartButton';
import Breadcrumb from '@/features/main/components/Breadcrumb/Breadcrumb';
import CategoryNavBar from '@/features/main/components/CategoryNavBar/CategoryNavBar';
import QuantitySelector from '@/features/main/components/QuantitySelector/QuantitySelector';
import StarRating from '@/features/main/components/StarRating/StarRating';
import CartModal from '@/modals/CartModal/CartModal';
import SignInModal from '@/modals/SignInModal/SignInModal';
import { addToCart } from '@/services/cartService';
import { fetchProductById } from '@/services/mainService';

import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        const firstAvailableOption = data.options.find(
          (opt) => Number(opt.stock) > 0 && opt.status === 'ACTIVE',
        );
        setSelectedOption(firstAvailableOption || data.options[0]);
      } catch (err) {
        // 실패 처리
      }
    };
    loadProduct();
  }, [id]);

  // eslint-disable-next-line operator-linebreak
  const isSoldOut =
    !selectedOption || selectedOption.status !== 'ACTIVE' || Number(selectedOption.stock) === 0;

  // 옵션이 바뀌면 재고 체크 및 수량 보정
  useEffect(() => {
    if (selectedOption) {
      if (isSoldOut) {
        setQuantity(0);
      } else if (quantity > Number(selectedOption.stock)) {
        setQuantity(Number(selectedOption.stock));
        toast.error('재고를 초과한 수량입니다.');
      } else if (quantity < 1) {
        setQuantity(1);
      }
    }
    // eslint-disable-next-line
  }, [selectedOption]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };
  const handleIncrease = () => {
    if (!selectedOption) return;
    if (isSoldOut) return;
    if (quantity < Number(selectedOption.stock)) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error('최대 구매 가능 수량입니다.');
    }
  };

  // 입력 변경(수동 타이핑)
  const handleQuantityChange = (val) => {
    if (!selectedOption) return;
    if (isSoldOut) {
      setQuantity(0);
      return;
    }
    if (val > Number(selectedOption.stock)) {
      setQuantity(Number(selectedOption.stock));
      toast.error('재고를 초과한 수량입니다.');
    } else if (val < 1) {
      setQuantity(1);
    } else {
      setQuantity(val);
    }
  };

  // 색상(옵션) 선택
  const handleColorSelect = (color) => {
    const matched = product.options.find((opt) => opt.color === color);
    if (matched) setSelectedOption(matched);
  };

  // 장바구니
  const handleAddToCart = async () => {
    if (!selectedOption || isSoldOut || quantity <= 0) {
      toast.error('수량을 1개 이상 선택하세요.');
      return;
    }
    try {
      const optionId = selectedOption?.productOptionId || selectedOption?.id;
      if (!optionId) return;

      if (quantity > Number(selectedOption.stock)) {
        toast.error('재고가 부족합니다.');
        return;
      }

      await addToCart({ productOptionId: optionId, quantity });
      setIsCartModalOpen(true);
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        setIsSignInModalOpen(true);
      } else {
        toast.error(error.response?.data?.message || '장바구니 추가에 실패했습니다.');
      }
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
              {product.options.map((opt) => {
                const optSoldOut = opt.status !== 'ACTIVE' || Number(opt.stock) === 0;
                return (
                  <button
                    key={opt.color}
                    type="button"
                    className={[
                      styles.colorCircle,
                      styles[opt.color.toLowerCase()],
                      optSoldOut ? styles.soldOut : '',
                      selectedOption.color === opt.color ? styles.selected : '',
                    ].join(' ')}
                    onClick={() => handleColorSelect(opt.color)}
                    aria-label={`${opt.color} color`}
                    title={optSoldOut ? '품절' : `${opt.stock}개 남음`}
                  />
                );
              })}
            </div>
          </fieldset>
          <QuantitySelector
            value={isSoldOut ? 0 : quantity}
            stock={selectedOption.stock}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onChange={handleQuantityChange}
            disabled={isSoldOut}
          />
          <AddToCartButton onClick={handleAddToCart} disabled={isSoldOut || quantity === 0}>
            {isSoldOut ? '품절' : '장바구니 담기'}
          </AddToCartButton>
          <hr className={styles.divider} />
          <div className={styles.meta}>
            <p>SKU : {selectedOption.sku}</p>
            <p>Category : {product.category.name}</p>
          </div>
        </div>
      </div>
      <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
    </div>
  );
}

export default ProductDetailPage;
