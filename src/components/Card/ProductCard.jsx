import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import styles from './ProductCard.module.css';

function ProductCard({
  id, // 아이디
  name, // 이름
  price, // 가격
  image, // 사진 린트가 날 가만히 두지 않아요.
}) {
  const navigate = useNavigate();

  return (
    <button type="button" className={styles.card} onClick={() => navigate(`/product/${id}`)}>
      <img src={image} alt={name} className={styles.image} />
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{price.toLocaleString()}</p>
    </button>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default ProductCard;
