import PropTypes from 'prop-types';
import React from 'react';

import styles from './PaymentResult.module.css'; // 아래 스타일 참고

function PaymentResult({ isSuccess, onHomeClick, onCheckOrder }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isSuccess ? '결제 완료' : '결제 실패'}</h2>
      <hr className={styles.divider} />
      <div className={styles.contentBox}>
        <p className={styles.message}>
          {isSuccess ? '결제가 완료 되었습니다.' : '결제가 실패 되었습니다.'}
        </p>
        <div className={styles.buttonGroup}>
          {isSuccess && (
            <>
              <button type="button" className={styles.primaryButton} onClick={onHomeClick}>
                홈페이지
              </button>
              <button type="button" className={styles.secondaryButton} onClick={onCheckOrder}>
                결제 내역 확인
              </button>
            </>
          )}
          {!isSuccess && (
            <button type="button" className={styles.primaryButton} onClick={onHomeClick}>
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

PaymentResult.propTypes = {
  isSuccess: PropTypes.bool.isRequired,
  onHomeClick: PropTypes.func.isRequired,
  onCheckOrder: PropTypes.func,
};

PaymentResult.defaultProps = {
  onCheckOrder: () => {},
};

export default PaymentResult;
