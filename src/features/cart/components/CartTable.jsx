import PropTypes from 'prop-types';

import CartRow from '@/features/cart/components/CartRow';

import styles from './CartTable.module.css';

function CartTable({
  cartItems, //
  onUpdate,
  onDelete,
  checkedItems,
  onItemCheck,
  onAllCheck,
}) {
  const isAllChecked = checkedItems.length === cartItems.length;

  return (
    <table className={styles.cartTable}>
      <thead>
        <tr>
          <th>
            <input type="checkbox" checked={isAllChecked} onChange={onAllCheck} />
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
            onCheck={onItemCheck}
          />
        ))}
      </tbody>
    </table>
  );
}

CartTable.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      cartItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // Add other item properties as needed, e.g.:
      // name: PropTypes.string.isRequired,
      // price: PropTypes.number.isRequired,
      // color: PropTypes.string,
      // quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  checkedItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
  onItemCheck: PropTypes.func.isRequired,
  onAllCheck: PropTypes.func.isRequired,
};

export default CartTable;
