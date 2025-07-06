import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './PaymentAmountSection.module.css';

function PaymentAmountSection({ cartItems, onPaymentMethodChange }) {
  const [selectedMethod, setSelectedMethod] = useState('CARD');

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 0;
  const finalAmount = totalPrice + deliveryFee;

  const handleChange = (e) => {
    const method = e.target.value;
    setSelectedMethod(method);
    onPaymentMethodChange(method);
  };

  const paymentOptions = [
    { id: 'paymentMethod-card', value: 'CARD', label: '토스' },
    { id: 'paymentMethod-account-transfer', value: 'ACCOUNT_TRANSFER', label: '치토스' },
    { id: 'paymentMethod-mobile-phone', value: 'MOBILE_PHONE', label: '토오스' },
  ];

  return (
    <section>
      <div className={styles.content}>
        <h2>최종 결제 금액</h2>
        <div>
          <div className={styles.box}>
            <h3>상품 가격</h3>
            <p>{totalPrice.toLocaleString()}원</p>
          </div>
          <div className={styles.box}>
            <h3>배달비</h3>
            <p>{deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString()}원`}</p>
          </div>
          <div className={`${styles.money} ${styles.box}`}>
            <h3>총 주문 금액</h3>
            <p>{finalAmount.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h2>결제 방법</h2>
        <div className={styles.paymentOptions}>
          {paymentOptions.map((option) => (
            <label key={option.id} htmlFor={option.id} className={styles.paymentLabel}>
              <input
                id={option.id}
                type="radio"
                name="paymentMethod"
                value={option.value}
                checked={selectedMethod === option.value}
                onChange={handleChange}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

PaymentAmountSection.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      cartItemId: PropTypes.number.isRequired,
      productName: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onPaymentMethodChange: PropTypes.func.isRequired,
};

export default PaymentAmountSection;
