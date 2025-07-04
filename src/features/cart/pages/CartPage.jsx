/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState } from 'react';

import CartTable from '@/features/cart/components/CartTable';
import {
  clearCart, // 장바우기 비우기
  deleteCartItem,
  fetchCart,
  updateCartItem,
} from '@/services/cartService';

import styles from './CartPage.module.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCart();
        setCartItems(cartData.items);
      } catch (error) {
        // console.error('장바구니 불러오기 실패:', error);
      }
    };

    loadCart();
  }, []);

  const updateQuantity = async (cartItemId, newQty) => {
    try {
      await updateCartItem({ cartItemId, quantity: newQty });

      setCartItems((prev) =>
        prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item)),
      );
    } catch (error) {
      // console.error('수량 변경 실패:', error);
    }
  };

  const deleteItem = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    } catch (error) {
      // console.error('장바구니 항목 삭제 실패:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(); // 서버 요청
      setCartItems([]); // 프론트 상태 비움
    } catch (error) {
      // console.error('장바구니 비우기 실패:', error);
    }
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className={styles.cartPage}>
      <h1>장바구니</h1>
      {cartItems.length === 0 ? (
        <p className={styles.emptyText}>장바구니가 비었습니다.</p>
      ) : (
        <>
          <CartTable cartItems={cartItems} onUpdate={updateQuantity} onDelete={deleteItem} />

          <div className={styles.summaryBox}>
            <div className={styles.summaryRow}>
              <span>총 주문 상품 수</span>
              <strong>{totalQuantity}개</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>총 상품 금액</span>
              <strong>{totalPrice.toLocaleString()}원</strong>
            </div>
            <div className={styles.buttonBox}>
              <button type="button" className={styles.payButton}>
                결제하기
              </button>
              <button
                type="button"
                className={styles.deleteSelectedButton}
                onClick={handleClearCart}
              >
                장바구니 비우기
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
