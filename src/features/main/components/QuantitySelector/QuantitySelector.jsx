import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import styles from './QuantitySelector.module.css';

function QuantitySelector({
  value, //
  stock,
  onIncrease,
  onDecrease,
  onChange,
  disabled,
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setInputValue(newValue);
    }
  };

  const handleBlur = () => {
    let numericValue = parseInt(inputValue, 10);
    if (Number.isNaN(numericValue) || numericValue < 1) {
      numericValue = 1;
    }
    if (stock === 0) {
      numericValue = 0;
    } else if (numericValue > stock) {
      numericValue = stock;
    }
    setInputValue(numericValue);
    onChange(numericValue);
  };

  const isDecreaseDisabled = disabled || value <= 1 || stock === 0;
  const isIncreaseDisabled = disabled || value >= stock || stock === 0;
  const isInputDisabled = disabled || stock === 0;

  return (
    <div className={styles.quantityWrapper}>
      <button type="button" onClick={onDecrease} disabled={isDecreaseDisabled}>
        −
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputMode="numeric"
        pattern="\d*"
        disabled={isInputDisabled}
      />
      <button type="button" onClick={onIncrease} disabled={isIncreaseDisabled}>
        +
      </button>
    </div>
  );
}

QuantitySelector.propTypes = {
  value: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool, // 추가
};

QuantitySelector.defaultProps = {
  disabled: false,
};

export default QuantitySelector;
