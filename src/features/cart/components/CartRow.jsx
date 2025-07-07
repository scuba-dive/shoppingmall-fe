import { Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

import styles from './CartRow.module.css';

function CartRow({
  item, //
  onUpdate,
  onDelete,
  isChecked,
  onCheck,
}) {
  const handleChange = (newQty) => {
    if (newQty < 1) return;
    onUpdate(item.cartItemId, newQty);
  };

  return (
    <tr>
      <td>
        <input type="checkbox" checked={isChecked} onChange={() => onCheck(item.cartItemId)} />
      </td>
      <td>{item.productName}</td>
      <td>{item.price.toLocaleString()}원</td>
      <td>{item.color}</td>
      <td>
        <button
          type="button"
          onClick={() => handleChange(item.quantity - 1)}
          className={styles.qtyButton}
        >
          -
        </button>
        <span className={styles.qty}>{item.quantity}</span>
        <button
          type="button"
          onClick={() => handleChange(item.quantity + 1)}
          className={styles.qtyButton}
        >
          +
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={() => onDelete(item.cartItemId)}
          className={styles.deleteButton}
          aria-label="장바구니 항목 제거"
        >
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  );
}

CartRow.propTypes = {
  item: PropTypes.shape({
    cartItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default CartRow;
