import carts from '@/data/cart';
import orders from '@/data/orders';
import user from '@/data/users';

import CartSection from '../../components/CartSection/CartSection';
import OrderSection from '../../components/OrderSection/OrderSection';
import ProfileSection from '../../components/ProfileSection/ProfileSection';
import styles from './MyPage.module.css';

function MyPage() {
  return (
    <div className={styles.container}>
      <h1>마이페이지</h1>
      <ProfileSection nickname={user.nickname} grade={user.grade} totalAmount={user.totalAmount} />
      <CartSection cartItems={carts} />
      <OrderSection orders={orders} />
    </div>
  );
}

export default MyPage;
