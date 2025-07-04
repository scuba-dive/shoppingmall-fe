import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { updateProductState } from '@/services/adminProductApi';

import styles from './AdminProductSoldOutModal.module.css';
// 린트가 너무 울어대서 대문자로만 바꿨는데 변경사항 없다고 저장이 안되어 추가하는 주석 멘트
function AdminProductQuantityModal({
  isOpen, //
  onClose, //
  productId, //
  currentStatus, //
  onStatusChanged, //
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }

    return undefined;
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    try {
      await updateProductState(productId);
      // eslint-disable-next-line no-alert
      alert('상품 상태가 변경되었습니다.');

      if (onStatusChanged) {
        await onStatusChanged();
      }

      onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('상품 상태 변경 실패:', err);
      // eslint-disable-next-line no-alert
      alert('상품 상태 변경 실패');
    }
  };

  const isCurrentlySoldOut = currentStatus === 'SOLD_OUT';

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        id="admin-product-quantity-modal"
        aria-modal="true"
        aria-labelledby="admin-product-quantity-modal-title"
        aria-describedby="admin-product-quantity-modal-desc"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="모달 닫기"
        >
          <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.content}>
          <div id="admin-product-quantity-modal-title" className={styles.title}>
            {isCurrentlySoldOut
              ? '해당 상품을 다시 판매 처리 하시겠습니까?'
              : '해당 상품을 품절 처리하시겠습니까?'}
          </div>

          <div id="admin-product-quantity-modal-desc" className={styles.description}>
            수량은 자동으로 변경되지 않습니다.
          </div>

          <div className={styles.buttonContainer}>
            <button type="button" className={styles.confirmButton} onClick={handleConfirm}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminProductQuantityModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  productId: PropTypes.number.isRequired,
  currentStatus: PropTypes.string.isRequired,
  onStatusChanged: PropTypes.func.isRequired,
};

export default AdminProductQuantityModal;
