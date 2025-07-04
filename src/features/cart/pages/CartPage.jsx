import { useEffect, useState } from 'react';

import CartTable from '@/features/cart/components/CartTable';
import fetchCart from '@/services/cartService';

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
  const updateQuantity = (cartItemId, newQty) => {
    // eslint-disable-next-line max-len
    setCartItems(
      (prev) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item)),
      // eslint-disable-next-line function-paren-newline
    );
  };

  const deleteItem = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
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
              <button type="button" className={styles.deleteSelectedButton}>
                삭제하기
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
