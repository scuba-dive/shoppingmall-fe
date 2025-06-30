import PropTypes from 'prop-types';

import styles from './CartSection.module.css';

function CartSection({ cartItems }) {
  const displayedItems = cartItems.slice(0, 2);

  return (
    <section className={styles.cartSection}>
      <div className={styles.header}>
        <h2>장바구니</h2>
        <button type="button" className={styles.viewAll}>
          전체 보기
        </button>
      </div>
      {cartItems.length === 0 ? (
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
            {displayedItems.map((item, idx) => (
              <tr key={`${item.name}`}>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}</td>
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
  cartItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CartSection;
