import PropTypes from 'prop-types';

import styles from './Table.module.css';

function Table({ columns, data, renderRow }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((row) => renderRow(row))}</tbody>
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  /* eslint-disable react/forbid-prop-types */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* eslint-enable react/forbid-prop-types */
  renderRow: PropTypes.func.isRequired,
};

export default Table;
