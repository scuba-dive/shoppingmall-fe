import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import OrderCancelModal from '@/modals/OrderCancelModal/OrderCancelModal';

import OrderProductSection from '../components/OrderProductSection/OrderProductSection';
import PaymentAmountSection from '../components/PaymentAmountSection/PaymentAmountSection';
import PaymentButton from '../components/PaymentButton/PaymentButton';
import styles from './PaymentPage.module.css';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartId, cartItems } = location.state || { cartId: null, cartItems: [] };
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const cartItemIds = cartItems.map((item) => item.cartItemId);

  useEffect(() => {
    if (cartId === null || !Array.isArray(cartItems) || cartItems.length === 0) {
      toast.warning('결제할 상품 정보가 없습니다.');
      navigate('/cart');
    }
  }, [cartId, cartItems, navigate]);

  const handleBackClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = () => {
    setIsCancelModalOpen(false);
    navigate('/cart');
  };

  const handleCancelClose = () => {
    setIsCancelModalOpen(false);
  };
  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className={styles.header}>
        <h1>결제하기</h1>
        <button type="button" onClick={handleBackClick}>
          &lt; 뒤로 가기
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.orderSection}>
          <OrderProductSection cartItems={cartItems} />
        </div>
        <div className={styles.paymentSection}>
          <PaymentAmountSection cartItems={cartItems} />
          <PaymentButton cartId={cartId} cartItemIds={cartItemIds} />
        </div>
      </div>

      <OrderCancelModal
        isOpen={isCancelModalOpen}
        onClose={handleCancelClose}
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
}

export default PaymentPage;
