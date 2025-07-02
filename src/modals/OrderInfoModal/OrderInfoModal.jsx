import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import styles from './OrderInfoModal.module.css';

const response = {
  status: 200,
  message: '주문 상세 조회 성공',
  data: {
    orderId: 4,
    orderNumber: '20250625-000004',
    orderedAt: '2025-06-25T15:00:00',
    userName: '홍길동',
    shippingAddress: {
      recipient: '홍길동',
      phone: '010-1234-5678',
      zipcode: '06236',
      address1: '서울 강남구 테헤란로 123',
      address2: '101동 1001호',
    },
    orderStatus: 'COMPLETED',
    paymentMethod: 'CHEETOS',
    totalAmount: 1097000,
    orderItems: [
      {
        productName: '머찐의자',
        option: '빨간색',
        quantity: 2,
        price: 399000,
        totalPrice: 798000,
      },
      {
        productName: '귀여운책상',
        option: '파란색',
        quantity: 1,
        price: 299000,
        totalPrice: 299000,
      },
    ],
    totalCount: 3,
  },
};

function OrderInfoModal({ isOpen, onClose, orderId }) {
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
          // const response = await fetch(`/api/users/me/orders/${orderId}`);
          // if (!response.ok) {
          //   throw new Error('주문 정보를 불러오는데 실패했습니다.');
          // }
          // const data = await response.json();

          // 실제 API 호출 대신 하드코딩된 response 사용
          setOrderData(response.data);
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
                  <span className={styles.value}>
                    {`${orderData.shippingAddress.address1} ${orderData.shippingAddress.address2 || ''}`.trim()}
                  </span>
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
                  <span className={styles.value}>{orderData.paymentMethod}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>주문 상태</span>
                  <span className={styles.value}>{orderData.orderStatus}</span>
                </div>
              </div>

              {/* 주문 취소 버튼 */}
              <div className={styles.buttonContainer}>
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

OrderInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
};

export default OrderInfoModal;
