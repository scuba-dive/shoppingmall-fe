import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Pagination from '@/components/Pagination/Pagination';
import OrderInfoModal from '@/modals/OrderInfoModal/OrderInfoModal';

import styles from './OrderSection.module.css';

const ORDER_STATUS_MAP = {
  PAYMENT_COMPLETED: '결제 완료',
  CANCELED: '결제 취소',
  CREATED: '배송 준비 중',
  SHIPPING: '배송 중',
  COMPLETED: '배송 완료',
};

export default function OrderSection({
  orders, //
  isPreview,
  showTitle = true,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  let displayedOrders = [];
  if (Array.isArray(orders)) {
    displayedOrders = isPreview ? orders.slice(0, 2) : orders;
  }

  const handlePreviewAll = () => {
    navigate('/order');
  };

  const handleViewClick = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <section className={styles.orderSection}>
      <div className={styles.header}>
        {showTitle && <h2>내 주문 내역</h2>}{' '}
        {isPreview && (
          <button type="button" className={styles.viewAll} onClick={handlePreviewAll}>
            전체 보기
          </button>
        )}
      </div>

      {displayedOrders.length === 0 ? (
        <p className={styles.emptyText}>주문 내역이 없습니다.</p>
      ) : (
        <>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>주문일자</th>
                <th>주문번호</th>
                <th>수량</th>
                <th>결제금액</th>
                <th>상태</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderedAt?.slice(0, 10).replace(/-/g, '.')}</td>
                  <td>{order.orderNumber}</td>
                  <td>{order.totalQuantity}</td>
                  <td>{order.totalAmount.toLocaleString()}</td>
                  <td>{ORDER_STATUS_MAP[order.orderStatus] || order.orderStatus}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.viewButton}
                      onClick={() => handleViewClick(order.orderId)}
                    >
                      조회
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isPreview && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}

      {isModalOpen && selectedOrderId && (
        <OrderInfoModal isOpen={isModalOpen} onClose={handleCloseModal} orderId={selectedOrderId} />
      )}
    </section>
  );
}

OrderSection.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.number.isRequired,
      orderNumber: PropTypes.string.isRequired,
      orderedAt: PropTypes.string.isRequired,
      totalQuantity: PropTypes.number.isRequired,
      totalAmount: PropTypes.number.isRequired,
      orderStatus: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isPreview: PropTypes.bool,
  showTitle: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};
OrderSection.defaultProps = {
  isPreview: true,
  showTitle: true,
  currentPage: 1,
  totalPages: 1,
  onPageChange: () => {},
};
