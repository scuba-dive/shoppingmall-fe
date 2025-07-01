import PropTypes from 'prop-types';

import styles from './AddToCartButton.module.css';

function AddToCartButton({ onClick }) {
  return (
    <button type="button" className={styles.addToCart} onClick={onClick}>
      장바구니 담기
    </button>
  );
}

AddToCartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddToCartButton;
