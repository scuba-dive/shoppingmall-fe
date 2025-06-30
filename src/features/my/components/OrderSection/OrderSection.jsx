import PropTypes from 'prop-types';

import styles from './OrderSection.module.css';

export default function OrderSection({ orders }) {
  const displayedOrders = orders.slice(0, 2);
  return (
    <section className={styles.orderSection}>
      <div className={styles.header}>
        <h2>내 주문 내역</h2>
        <button type="button" className={styles.viewAll}>
          전체 보기
        </button>
      </div>
      {orders.length === 0 ? (
        <p className={styles.emptyText}>주문 내역이 없습니다.</p>
      ) : (
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>주문일자</th>
              <th>주문번호</th>
              <th>수량</th>
              <th>결제금액</th>
              <th>상태</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order, idx) => (
              <tr key={`${order.date}/${order.orderNumber}`}>
                <td>{order.date}</td>
                <td>{order.orderNumber}</td>
                <td>{order.quantity}</td>
                <td>{order.amount.toLocaleString()}</td>
                <td>{order.status}</td>
                <td>
                  <button type="button" className={styles.viewButton}>
                    조회
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

OrderSection.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.string).isRequired,
};
