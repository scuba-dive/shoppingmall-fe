import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import styles from './Breadcrumb.module.css';

function Breadcrumb({ paths }) {
  const navigate = useNavigate();

  return (
    <div className={styles.breadcrumb}>
      {paths.map((path, index) => (
        <span key={path.name} className={styles.item}>
          {path.link ? (
            <button type="button" className={styles.link} onClick={() => navigate(path.link)}>
              {path.name}
            </button>
          ) : (
            <span>{path.name}</span>
          )}
          {index < paths.length - 1 && <span className={styles.separator}> &gt; </span>}
        </span>
      ))}
    </div>
  );
}
Breadcrumb.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string,
    }),
  ).isRequired,
};

export default Breadcrumb;
