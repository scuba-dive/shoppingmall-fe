import { useEffect, useState } from 'react';

import OrderInfoModal from '@/modals/OrderInfoModal/OrderInfoModal';
import { fetchCart } from '@/services/cartService';
import { fetchOrders } from '@/services/orderService';
import { fetchUserInfo } from '@/services/userService';

import CartSection from '../../components/CartSection/CartSection';
import OrderSection from '../../components/OrderSection/OrderSection';
import ProfileSection from '../../components/ProfileSection/ProfileSection';
import styles from './MyPage.module.css';

function MyPage() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, cartData, orderData] = await Promise.all([
          fetchUserInfo(),
          fetchCart(),
          fetchOrders(0, 2),
        ]);
        setUser(userData);
        setCartItems(cartData.items.slice(0, 2));
        setOrders(orderData.orders);
      } catch (err) {
        // console.error('데이터 불러오기 실패', err);
      }
    };

    loadData();
  }, []);

  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

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
      <CartSection cartItems={cartItems} />
      <OrderSection orders={orders} isPreview onViewOrder={handleViewOrder} />

      {isModalOpen && selectedOrderId && (
        <OrderInfoModal isOpen={isModalOpen} onClose={handleCloseModal} orderId={selectedOrderId} />
      )}
    </div>
  );
}

export default MyPage;
