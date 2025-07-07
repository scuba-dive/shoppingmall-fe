import PropTypes from 'prop-types';

import styles from './AddToCartButton.module.css';

function AddToCartButton({ onClick, disabled, children }) {
  return (
    <button type="button" className={styles.addToCart} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

AddToCartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

AddToCartButton.defaultProps = {
  disabled: false,
  children: '장바구니 담기',
};

export default AddToCartButton;
