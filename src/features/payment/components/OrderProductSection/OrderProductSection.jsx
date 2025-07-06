/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { fetchOptionImage } from '@/services/mainService';
import { fetchUserInfo } from '@/services/userService';

import styles from './OrderProductSection.module.css';

function OrderProductSection({ cartItems }) {
  const [userInfo, setUserInfo] = useState(null);
  const [imageMap, setImageMap] = useState({});

  // 사용자 정보 불러오기
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (err) {
        // console.error('사용자 정보 로딩 실패:', err);
      }
    };
    loadUser();
  }, []);

  // 옵션 이미지 불러오기
  useEffect(() => {
    const loadImages = async () => {
      const newImageMap = {};
      const results = await Promise.all(
        cartItems.map((item) =>
          fetchOptionImage(item.productOptionId)
            .then((url) => ({ optionId: item.productOptionId, url }))
            .catch(() => ({ optionId: item.productOptionId, url: null })),
        ),
      );
      results.forEach(({ optionId, url }) => {
        newImageMap[optionId] = url;
      });
      setImageMap(newImageMap);
    };

    if (cartItems.length > 0) loadImages();
  }, [cartItems]);

  if (!userInfo) return <p>사용자 정보를 불러오는 중...</p>;

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2>주문 상품 정보</h2>
        <ul className={styles.productList}>
          {cartItems.map((item) => (
            <li key={item.cartItemId} className={styles.product}>
              <div className={styles.img}>
                {imageMap[item.productOptionId] ? (
                  <img
                    src={imageMap[item.productOptionId]}
                    alt={item.productName}
                    className={styles.imgP}
                  />
                ) : (
                  <div className={styles.imgP}>이미지 없음</div>
                )}
              </div>
              <div>
                <h3 className={styles.name}>{item.productName}</h3>
                <span className={styles.number}>{item.quantity}개</span>
                <p className={styles.money}>{(item.price * item.quantity).toLocaleString()}원</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.content}>
        <h2>주문자 정보</h2>
        <p className={styles.name}>{userInfo.username}</p>
        <p className={styles.info}>{userInfo.phoneNumber}</p>
        <p className={styles.info}>{userInfo.email}</p>
      </div>

      <div className={styles.content}>
        <h2>배송 정보</h2>
        <div className={styles.boxS}>
          <p className={`${styles.name} ${styles.box}`}>{userInfo.username}</p>
          <p className={styles.box}>{userInfo.phoneNumber}</p>
        </div>
        <p className={styles.box}>{userInfo.address}</p>
      </div>
    </section>
  );
}

OrderProductSection.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      cartItemId: PropTypes.number.isRequired,
      productOptionId: PropTypes.number.isRequired,
      productName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default OrderProductSection;
