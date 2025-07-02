import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import styles from './AdminProductQuantityModal.module.css';

// eslint-disable-next-line object-curly-newline
function AdminProductQuantityModal({ isOpen, onClose, onConfirm, currQuantity }) {
  const [newQuantity, setNewQuantity] = useState(currQuantity);

  useEffect(() => {
    if (isOpen) {
      setNewQuantity(currQuantity);
    }
  }, [isOpen, currQuantity]);

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

  const handleConfirm = () => {
    onConfirm(newQuantity);
    onClose();
  };

  const handleDecrease = () => {
    if (newQuantity > 0) {
      setNewQuantity(newQuantity - 1);
    }
  };

  const handleIncrease = () => {
    setNewQuantity(newQuantity + 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!Number.isNaN(value) && value >= 0) {
      setNewQuantity(value);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        id="admin-product-quantity-modal"
        aria-modal="true"
        aria-labelledby="admin-product-quantity-modal-title"
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
          <div id="admin-product-quantity-modal-content" className={styles.title}>
            해당 상품의 수량을 변경하시겠습니까?
          </div>

          <div className={styles.quantityContainer}>
            <button
              type="button"
              className={styles.quantityButton}
              onClick={handleDecrease}
              disabled={newQuantity === 1}
            >
              -
            </button>

            <input
              type="number"
              className={styles.quantityInput}
              value={newQuantity}
              onChange={handleInputChange}
              min="0"
            />

            <button type="button" className={styles.quantityButton} onClick={handleIncrease}>
              +
            </button>
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
  onConfirm: PropTypes.func.isRequired,
  currQuantity: PropTypes.number.isRequired,
};

export default AdminProductQuantityModal;
