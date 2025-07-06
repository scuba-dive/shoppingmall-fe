import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { requestTossPayment } from '@/services/orderService';

import styles from './PaymentButton.module.css';

function PaymentButton({ cartItemIds }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!cartItemIds.length) {
      toast.warn('선택된 상품이 없습니다.');
      return;
    }

    try {
      setLoading(true);
      const paymentUrl = await requestTossPayment({ cartItemIds });
      toast.success('결제 페이지로 이동합니다.');
      setTimeout(() => {
        window.location.href = paymentUrl;
      }, 1000);
    } catch (error) {
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
  cartItemIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PaymentButton;
