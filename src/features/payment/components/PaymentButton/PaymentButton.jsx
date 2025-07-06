import { loadTossPayments } from '@tosspayments/payment-sdk';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { requestTossPayment } from '@/services/orderService';

import styles from './PaymentButton.module.css';

const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY;

function PaymentButton({ cartId, cartItemIds }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!cartItemIds.length) {
      toast.warn('선택된 상품이 없습니다.');
      return;
    }

    try {
      setLoading(true);

      const { orderId, amount, orderName, customerName } = await requestTossPayment({
        cartId,
        cartItemIds,
      });

      // Toss SDK 로드 후 결제창 띄우기
      const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);

      tossPayments.requestPayment('카드', {
        amount,
        orderId,
        orderName,
        customerName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('결제 요청 에러:', error.response?.data || error);
      toast.error('결제 요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.content}>
      <div className={styles.box}>
        <p>구매 조건 확인 및 결제 진행에 동의</p>
        <button type="button" className={styles.button} onClick={handlePayment} disabled={loading}>
          {loading ? '처리 중...' : '결제하기'}
        </button>
      </div>
    </section>
  );
}

PaymentButton.propTypes = {
  cartId: PropTypes.number.isRequired,
  cartItemIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PaymentButton;
