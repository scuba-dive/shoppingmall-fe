import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import axiosInstance from '@/services/axiosInstance';
import useConfirm from '@/utils/useConfirm';

import styles from './OrderInfoModal.module.css';

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

// eslint-disable-next-line object-curly-newline
function OrderInfoModal({ isOpen, onClose, orderId, onOrderStatusChange }) {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirm = useConfirm();

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
          const response = await axiosInstance.get(`/api/users/orders/${orderId}`);
          setOrderData(response.data.data);
        } catch (err) {
          setError(err.response?.data?.message || '주문 정보를 불러오는데 실패했습니다.');
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

  const handleOrderCancel = async () => {
    /* eslint-disable operator-linebreak */
    if (
      !orderData ||
      orderData.orderStatus === 'CANCELED' ||
      orderData.orderStatus === 'COMPLETED' ||
      orderData.orderStatus === 'SHIPPING'
    ) {
      return;
    }
    /* eslint-enable operator-linebreak */

    confirm('정말로 결제를 취소하시겠습니까?', async () => {
      try {
        setLoading(true);
        await axiosInstance.patch(`/api/users/orders/${orderId}/cancel`);
        setOrderData((prev) => ({ ...prev, orderStatus: 'CANCELED' }));
        toast.success('결제가 성공적으로 취소되었습니다.');
        if (onOrderStatusChange) onOrderStatusChange(); // 주문 상태 변경 콜백 호출
      } catch (err) {
        const errorMessage = err.response?.data?.message || '결제 취소에 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        id="order-info-modal"
        aria-modal="true"
        aria-labelledby="order-info-modal-title"
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
                  <span className={styles.value}>
                    {orderData.paymentMethod ? orderData.paymentMethod : '토스'}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>주문 상태</span>
                  <span className={styles.value}>{getOrderStatusText(orderData.orderStatus)}</span>
                </div>
              </div>

              {/* 주문 취소 버튼 */}
              <div className={styles.buttonContainer}>
                {(() => {
                  let cancelBtnText = '결제 취소';
                  let cancelBtnDisabled = false;
                  let cancelBtnOnClick = handleOrderCancel;

                  if (orderData.orderStatus === 'CANCELED') {
                    cancelBtnText = '결제 취소 완료';
                    cancelBtnDisabled = true;
                    cancelBtnOnClick = undefined;
                  } else if (
                    /* eslint-disable-next-line */
                    orderData.orderStatus === 'COMPLETED' ||
                    orderData.orderStatus === 'SHIPPING'
                  ) {
                    cancelBtnText = '결제 취소 불가';
                    cancelBtnDisabled = true;
                    cancelBtnOnClick = undefined;
                  }

                  return (
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={cancelBtnOnClick}
                      disabled={cancelBtnDisabled}
                    >
                      {cancelBtnText}
                    </button>
                  );
                })()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

OrderInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
  onOrderStatusChange: PropTypes.func,
};

OrderInfoModal.defaultProps = { onOrderStatusChange: undefined };

export default OrderInfoModal;
