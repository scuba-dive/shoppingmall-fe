import PropTypes from 'prop-types';
import { useState } from 'react';

import CartRow from '@/features/cart/components/CartRow';

import styles from './CartTable.module.css';

function CartTable({ cartItems, onUpdate, onDelete }) {
  const [checkedItems, setCheckedItems] = useState(cartItems.map((item) => item.cartItemId));

  const isAllChecked = checkedItems.length === cartItems.length;

  const handleAllCheck = () => {
    if (isAllChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(cartItems.map((item) => item.cartItemId));
    }
  };

  const handleItemCheck = (id) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  return (
    <table className={styles.cartTable}>
      <thead>
        <tr>
          <th>
            <input type="checkbox" checked={isAllChecked} onChange={handleAllCheck} />
          </th>
          <th>상품명</th>
          <th>가격</th>
          <th>색상</th>
          <th>수량</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <CartRow
            key={item.cartItemId}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isChecked={checkedItems.includes(item.cartItemId)}
            onCheck={handleItemCheck}
          />
        ))}
      </tbody>
    </table>
  );
}

CartTable.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      cartItemId: PropTypes.number.isRequired,
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
