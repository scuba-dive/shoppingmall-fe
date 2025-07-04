import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Pagination from '@/components/Pagination/Pagination';
import AdminOrderInfoModal from '@/modals/AdminOrderInfoModal/AdminOrderInfoModal';
import { fetchAdminOrders } from '@/services/adminOrderApi';

import Table from '../../components/Table/Table';
import styles from './AdminOrder.module.css';

const columns = [
  { key: 'date', label: '주문일자' },
  { key: 'number', label: '주문번호' },
  { key: 'quantity', label: '상품수량' },
  { key: 'price', label: '결제금액' },
  { key: 'status', label: '주문상태' },
  { key: 'check', label: '조회' },
];

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

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toISOString().slice(0, 10).replace(/-/g, '.');
}

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await fetchAdminOrders(currentPage - 1, 10);
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('주문 목록 불러오기 실패:', err);
    }

    fetchOrders();
  }, [currentPage]);

  const handleOpenModal = useCallback((orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
    fetchOrders();
    toast.dismiss('confirm-toast');
  }, [fetchOrders]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const renderOrderRow = useCallback(
    (row) => (
      <tr key={row.orderId}>
        <td>{formatDate(row.orderedAt)}</td>
        <td>{row.orderNumber}</td>
        <td>{row.totalQuantity}</td>
        <td>{row.totalAmount.toLocaleString()}</td>
        <td>{getOrderStatusText(row.orderStatus)}</td>
        <td>
          <button
            type="button"
            className={styles.button}
            onClick={() => handleOpenModal(row.orderId)}
          >
            조회
          </button>
        </td>
      </tr>
    ),
    [handleOpenModal],
  );

  return (
    <>
      <h1> 주문 관리 </h1>
      <Table columns={columns} data={orders} renderRow={renderOrderRow} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {isModalOpen && selectedOrderId && (
        <AdminOrderInfoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          orderId={selectedOrderId}
        />
      )}
    </>
  );
}

export default AdminOrder;
