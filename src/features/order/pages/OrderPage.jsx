import { useCallback, useEffect, useState } from 'react';

import OrderSection from '@/features/my/components/OrderSection/OrderSection';
import { fetchOrders } from '@/services/orderService';

import styles from './OrderPage.module.css';

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadOrders = useCallback(async () => {
    try {
      const data = await fetchOrders(page, 10);
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch (err) {
      // console.error('주문 목록 로드 실패:', err);
    }
  }, [page]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <section className={styles.orderPage}>
      <h1>주문 내역</h1>
      <OrderSection
        orders={orders}
        isPreview={false}
        showTitle={false}
        currentPage={page + 1}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p - 1)}
        onOrderStatusChange={loadOrders}
      />
    </section>
  );
}

export default OrderPage;
