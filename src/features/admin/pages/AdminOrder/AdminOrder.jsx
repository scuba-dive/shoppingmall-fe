import { useState } from 'react';

import Pagination from '@/components/Pagination/Pagination';
import AdminLayout from '@/layouts/AdminLayouts/AdminLayout';

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

const sampleData = [
  {
    orderId: 4,
    orderNumber: '20250625-000004',
    orderStatus: 'COMPLETED',
    totalCount: 5,
    totalAmount: 1097000,
    orderedAt: '2025-06-25T15:00:00',
    paidAt: '2025-06-25T15:05:00',
  },
  {
    orderId: 3,
    orderNumber: '20250620-000003',
    orderStatus: 'CANCELLED',
    totalCount: 1,
    totalAmount: 45000,
    orderedAt: '2025-06-20T11:40:00',
    paidAt: null,
  },
];
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 10).replace(/-/g, '.');
}
function renderOrderRow(row) {
  return (
    <tr key={row.orderId}>
      <td>{formatDate(row.orderedAt)}</td>
      <td>{row.orderNumber}</td>
      <td>{row.totalCount}</td>
      <td>{row.totalAmount.toLocaleString()}</td>
      <td>{row.orderStatus}</td>
      <td>
        <button type="button" className={styles.button}>
          조회
        </button>
      </td>
    </tr>
  );
}

function AdminOrder() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // 임시 설정
  return (
    <AdminLayout>
      <h1> 주문 관리 </h1>
      <Table columns={columns} data={sampleData} renderRow={renderOrderRow} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </AdminLayout>
  );
}

export default AdminOrder;
