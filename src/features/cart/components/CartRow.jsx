// components/Cart/CartRow.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './CartRow.module.css';

function CartRow({ item, index, onUpdate, onDelete }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (newQty) => {
    if (newQty < 1) return;
    setQuantity(newQty);
    onUpdate(index, newQty);
  };

  return (
    <tr>
      <td>
        <input type="checkbox" defaultChecked />
      </td>
      <td>{item.name}</td>
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
        <button type="button" onClick={() => onDelete(index)} className={styles.deleteButton}>
          제거(피그마에서 추출)
        </button>
      </td>
    </tr>
  );
}

CartRow.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CartRow;
