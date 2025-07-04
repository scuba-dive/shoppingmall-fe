import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { fetchOrderDetail } from '@/services/adminOrderApi';
import axiosInstance from '@/services/axiosInstance';

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

const STATUS_SEQUENCE = ['PAYMENT_COMPLETED', 'CREATED', 'SHIPPING', 'COMPLETED'];

function AdminOrderInfoModal({ isOpen, onClose, orderId }) {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manualStatus, setManualStatus] = useState('PAYMENT_COMPLETED');

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
      orderData.orderStatus === 'COMPLETED'
    ) {
      return;
    }
    /* eslint-disable operator-linebreak */

    // eslint-disable-next-line no-restricted-globals, no-alert
    const confirmed = confirm('정말로 주문을 취소하시겠습니까?');
    if (!confirmed) return;
    try {
      setLoading(true);
      await axiosInstance.patch(`/api/admin/orders/${orderId}/status`, { status: 'CANCELED' });
      setOrderData((prev) => ({ ...prev, orderStatus: 'CANCELED' }));
    } catch (err) {
      setError(err.response?.data?.message || '주문 취소에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    if (!orderData) return;
    let message = '정말로 배송 상태를 변경하시겠습니까?';
    if (orderData.orderStatus === 'PAYMENT_COMPLETED') {
      message = '배송 준비 중 상태로 변경하시겠습니까?';
    } else if (orderData.orderStatus === 'CREATED') {
      message = '배송 중 상태로 변경하시겠습니까?';
    } else if (orderData.orderStatus === 'SHIPPING') {
      message = '배송 완료 상태로 변경하시겠습니까?';
    }
    // eslint-disable-next-line no-restricted-globals, no-alert
    const confirmed = confirm(message);
    if (!confirmed) return;
    const currentIdx = STATUS_SEQUENCE.indexOf(orderData.orderStatus);
    if (currentIdx === -1 || currentIdx === STATUS_SEQUENCE.length - 1) return;
    const nextStatus = STATUS_SEQUENCE[currentIdx + 1];
    try {
      setLoading(true);
      await axiosInstance.patch(`/api/admin/orders/${orderId}/status`, { status: nextStatus });
      setOrderData((prev) => ({ ...prev, orderStatus: nextStatus }));
    } catch (err) {
      setError(err.response?.data?.message || '배송 상태 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
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

              {/* 상태 수동 변경하는 테스트용 드롭다운 입니당 추후 삭제 예정 */}
              <div className={`${styles.testButtonContainer} ${styles.buttonContainer}`}>
                <select
                  value={manualStatus}
                  onChange={(e) => setManualStatus(e.target.value)}
                  style={{ marginRight: 8, padding: '4px 8px', borderRadius: 4 }}
                  disabled={loading}
                >
                  {Object.keys(ORDER_STATUS_MAP).map((status) => (
                    <option key={status} value={status}>
                      {ORDER_STATUS_MAP[status]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  style={{
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: 4,
                    backgroundColor: '#cfcfcf',
                  }}
                  onClick={async () => {
                    if (!orderData) return;
                    // eslint-disable-next-line no-restricted-globals, no-alert
                    const confirmed = confirm(
                      `${ORDER_STATUS_MAP[manualStatus]} 상태로 직접 변경하시겠습니까?`,
                    );
                    if (!confirmed) return;
                    try {
                      setLoading(true);
                      await axiosInstance.patch(`/api/admin/orders/${orderId}/status`, {
                        status: manualStatus,
                      });
                      setOrderData((prev) => ({ ...prev, orderStatus: manualStatus }));
                    } catch (err) {
                      setError(err.response?.data?.message || '상태 변경에 실패했습니다.');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                >
                  상태 직접 변경
                </button>
              </div>
              {/* 테스트 드롭다운 끝! */}

              {/* 주문 수정 버튼 */}
              <div className={styles.buttonContainer}>
                {orderData.orderStatus !== 'CANCELED' && orderData.orderStatus !== 'COMPLETED' && (
                  <button
                    type="button"
                    className={styles.updateButton}
                    onClick={handleStatusChange}
                  >
                    배송 상태 변경
                  </button>
                )}
                {(() => {
                  let cancelBtnText = '주문 취소';
                  let cancelBtnDisabled = false;
                  let cancelBtnOnClick = handleOrderCancel;
                  if (orderData.orderStatus === 'CANCELED') {
                    cancelBtnText = '주문 취소 완료';
                    cancelBtnDisabled = true;
                    cancelBtnOnClick = undefined;
                  } else if (
                    orderData.orderStatus === 'COMPLETED' ||
                    orderData.orderStatus === 'SHIPPING'
                  ) {
                    cancelBtnText = '주문 취소 불가';
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

AdminOrderInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
};

export default AdminOrderInfoModal;
