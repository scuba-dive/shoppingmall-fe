import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { fetchOrderDetail } from '@/services/adminOrderApi';

import styles from './AdminOrderInfoModal.module.css';

const ORDER_STATUS_MAP = {
  PAYMENT_COMPLETED: '결제 완료',
  CANCELED: '결제 취소',
  CREATED: '배송 준비 중',
  SHIPPING: '배송 중',
  COMPLETED: '배송 완료',
};

function getOrderStatusText(status) {
  return ORDER_STATUS_MAP[status] || status;
}

function AdminOrderInfoModal({ isOpen, onClose, orderId }) {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (isOpen && orderId) {
      const fetchOrderData = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchOrderDetail(orderId);
          setOrderData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchOrderData();
    }
  }, [isOpen, orderId]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOrderCancel = () => {
    // 주문 취소
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        id="admin-order-info-modal"
        aria-modal="true"
        aria-labelledby="admin-order-info-modal-title"
      >
        {/* 닫기 버튼 */}
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

        {/* 모달 콘텐츠 */}
        <div className={styles.content}>
          {loading && (
            <div className={styles.loading}>
              <p>주문 정보를 불러오는 중...</p>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          )}

          {orderData && (
            <>
              <div className={styles.orderInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>주문 일자</span>
                  <span className={styles.value}>
                    {new Date(orderData.orderedAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>주문 번호</span>
                  <span className={styles.value}>{orderData.orderNumber}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>구매자</span>
                  <span className={styles.value}>{orderData.userName}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>배송지</span>
                  <span className={styles.value}>{orderData.address}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>주문 상품</span>
                  <span className={styles.value}>
                    {/* eslint-disable indent */}
                    {orderData.orderItems
                      .map((item) => `${item.productName} ${item.quantity}개`)
                      .join(', ')}
                    {/* eslint-enable indent */}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>총 결제 금액</span>
                  <span className={styles.value}>{orderData.totalAmount?.toLocaleString()}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>결제 수단</span>
                  <span className={styles.value}>토스</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>주문 상태</span>
                  <span className={styles.value}>{getOrderStatusText(orderData.orderStatus)}</span>
                </div>
              </div>

              {/* 주문 수정 버튼 */}
              <div className={styles.buttonContainer}>
                <button type="button" className={styles.updateButton}>
                  배송 상태 변경
                </button>
                <button type="button" className={styles.cancelButton} onClick={handleOrderCancel}>
                  주문 취소
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

AdminOrderInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
};

export default AdminOrderInfoModal;
