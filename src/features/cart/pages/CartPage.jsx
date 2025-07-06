/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import CartTable from '@/features/cart/components/CartTable';
import {
  clearCart, //
  deleteCartItem,
  fetchCart,
  updateCartItem,
} from '@/services/cartService';

import styles from './CartPage.module.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const navigate = useNavigate();

  const handleItemCheck = (id) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const handleAllCheck = () => {
    if (checkedItems.length === cartItems.length) {
      setCheckedItems([]);
    } else {
      setCheckedItems(cartItems.map((item) => item.cartItemId));
    }
  };

  const selectedItems = cartItems.filter((item) => checkedItems.includes(item.cartItemId));

  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (selectedItems.length === 0) {
      toast.warning('결제할 상품을 선택해주세요.');
      return;
    }

    // console.log('[navigate] cartId:', cartId, 'selectedItems:', selectedItems); // 🔍 디버깅용

    navigate('/payment', {
      state: {
        cartId,
        cartItems: selectedItems,
      },
    });
  };

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCart();
        setCartItems(cartData.items);
        setCartId(cartData.cartId);
        setCheckedItems(cartData.items.map((item) => item.cartItemId));
      } catch (error) {
        toast.error('장바구니 정보를 불러오지 못했습니다.');
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
    } catch {
      toast.error('수량 변경에 실패했습니다.');
    }
  };

  const deleteItem = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
      setCheckedItems((prev) => prev.filter((id) => id !== cartItemId));
    } catch {
      toast.error('상품 삭제에 실패했습니다.');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCartItems([]);
      setCheckedItems([]);
    } catch {
      toast.error('장바구니를 비우는 데 실패했습니다.');
    }
  };

  return (
    <section className={styles.cartPage}>
      <ToastContainer position="top-center" autoClose={2000} />
      <h1>장바구니</h1>

      {cartItems.length === 0 ? (
        <p className={styles.emptyText}>장바구니가 비었습니다.</p>
      ) : (
        <>
          <CartTable
            cartItems={cartItems}
            onUpdate={updateQuantity}
            onDelete={deleteItem}
            checkedItems={checkedItems}
            onItemCheck={handleItemCheck}
            onAllCheck={handleAllCheck}
          />

          <div className={styles.summaryBox}>
            <div className={styles.summaryRow}>
              <span>선택된 상품 수</span>
              <strong>{totalQuantity}개</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>선택된 상품 금액</span>
              <strong>{totalPrice.toLocaleString()}원</strong>
            </div>
            <div className={styles.buttonBox}>
              <button type="button" className={styles.payButton} onClick={handlePayment}>
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
