import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import styles from './CartSection.module.css';

function CartSection({ cartItems }) {
  const displayedItems = cartItems.slice(0, 2);
  const navigate = useNavigate();

  const handleAllView = () => {
    navigate('/cart');
  };

  return (
    <section className={styles.cartSection}>
      <div className={styles.header}>
        <h2>장바구니</h2>
        <button type="button" className={styles.viewAll} onClick={handleAllView}>
          전체 보기
        </button>
      </div>
      {displayedItems.length === 0 ? (
        <p className={styles.emptyText}>장바구니가 비었습니다.</p>
      ) : (
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>색상</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map((item) => (
              <tr key={item.cartItemId}>
                <td>{item.productName}</td>
                <td>{item.price.toLocaleString()}원</td>
                <td>{item.color}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

CartSection.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      cartItemId: PropTypes.number.isRequired,
      productName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default CartSection;
