// components/Cart/CartTable.jsx
import PropTypes from 'prop-types';

import CartRow from './CartRow';
import styles from './CartTable.module.css';

function CartTable({ cartItems, onUpdate, onDelete }) {
  return (
    <table className={styles.cartTable}>
      <thead>
        <tr>
          <th>
            <input type="checkbox" defaultChecked />
          </th>
          <th>상품명</th>
          <th>가격</th>
          <th>색상</th>
          <th>수량</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, idx) => (
          <CartRow key={idx} item={item} index={idx} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}

CartTable.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CartTable;
