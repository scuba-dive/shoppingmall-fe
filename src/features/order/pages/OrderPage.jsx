import orders from '@/data/orders';
import OrderSection from '@/features/my/components/OrderSection/OrderSection';

import styles from './OrderPage.module.css';

function OrderPage() {
  return (
    <section className={styles.orderPage}>
      <OrderSection orders={orders} isPreview={false} />
    </section>
  );
}

export default OrderPage;
