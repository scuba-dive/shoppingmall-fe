import PropTypes from 'prop-types';

import styles from './Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (currentPage > 4) {
      pages.push('prev-ellipsis');
    }

    for (let i = currentPage - 2; i <= currentPage + 2; i += 1) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }
    if (currentPage < totalPages - 3) {
      pages.push('next-ellipsis');
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };
  const pageList = getPageNumbers();

  return (
    <nav className={styles.pagination} aria-label="페이지네이션">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        &lt;
      </button>

      {pageList.map((item) => {
        if (typeof item === 'number') {
          return (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={`${styles.pageButton} ${item === currentPage ? styles.active : ''}`}
            >
              {item}
            </button>
          );
        }
        return (
          <span key={`ellipsis-${item}`} className={styles.ellipsis}>
            ...
          </span>
        );
      })}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        &gt;
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
