// src/pages/OrderPage/OrderPage.jsx
import { useEffect, useState } from 'react';

import OrderSection from '@/features/my/components/OrderSection/OrderSection';
import { fetchOrders } from '@/services/orderService';

import styles from './OrderPage.module.css';

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        // console.error('주문 목록 불러오기 실패:', err);
      }
    };

    loadOrders();
  }, []);

  return (
    <section className={styles.orderPage}>
      <OrderSection orders={orders} isPreview={false} />
    </section>
  );
}

export default OrderPage;
