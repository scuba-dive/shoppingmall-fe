import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import styles from './QuantitySelector.module.css';

function QuantitySelector({
  value, //
  onIncrease, //
  onDecrease, //
  onChange, //
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
    const numericValue = parseInt(inputValue, 10);
    if (Number.isNaN(numericValue) || numericValue < 1) {
      setInputValue(1);
      onChange(1);
    } else {
      onChange(numericValue);
    }
  };

  return (
    <div className={styles.quantityWrapper}>
      <button type="button" onClick={onDecrease} disabled={value <= 1}>
        −
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputMode="numeric"
        pattern="\d*"
      />
      <button type="button" onClick={onIncrease}>
        +
      </button>
    </div>
  );
}

QuantitySelector.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuantitySelector;
