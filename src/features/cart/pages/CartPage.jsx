import { useState } from 'react';

import mockCartItems from '@/data/cart';

import CartTable from '../components/CartTable';
import styles from './CartPage.module.css';

function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const updateQuantity = (index, newQty) => {
    setCartItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const deleteItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
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
