import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './CartRow.module.css';

function CartRow({
  item, //
  onUpdate, //
  onDelete, //
}) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (newQty) => {
    if (newQty < 1) return;
    setQuantity(newQty);
    onUpdate(item.cartItemId, newQty);
  };

  return (
    <tr>
      <td>
        <input type="checkbox" defaultChecked />
      </td>
      <td>{item.productName}</td>
      <td>{item.price.toLocaleString()}</td>
      <td>{item.color}</td>
      <td>
        <button
          type="button"
          onClick={() => handleChange(quantity - 1)}
          className={styles.qtyButton}
        >
          -
        </button>
        <span className={styles.qty}>{quantity}</span>
        <button
          type="button"
          onClick={() => handleChange(quantity + 1)}
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
        >
          제거
        </button>
      </td>
    </tr>
  );
}

CartRow.propTypes = {
  item: PropTypes.shape({
    cartItemId: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CartRow;
