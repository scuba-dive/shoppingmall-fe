import { useEffect, useState } from 'react';

import carts from '@/data/cart';
import orders from '@/data/orders';
import { fetchUserInfo } from '@/services/userService';

import CartSection from '../../components/CartSection/CartSection';
import OrderSection from '../../components/OrderSection/OrderSection';
import ProfileSection from '../../components/ProfileSection/ProfileSection';
import styles from './MyPage.module.css';

function MyPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUser(data);
      } catch (err) {
        setUser({ error: '유저 정보 조회 실패' });
      }
    };

    loadUserInfo();
  }, []);
  if (!user) return <div>로딩 중...</div>;
  if (user && user.error) return <div>{user.error}</div>;
  if (!user) return <div>로딩 중...</div>;

  return (
    <div className={styles.container}>
      <h1>마이페이지</h1>
      <ProfileSection
        nickname={user.nickname}
        grade={user.grade}
        totalAmount={user.totalPaid}
        imagePath={user.imagePath}
      />
      <CartSection cartItems={carts} />
      <OrderSection orders={orders} />
    </div>
  );
}

export default MyPage;
