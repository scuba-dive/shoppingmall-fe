import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li>
            <Link to="/" className={styles.menuItem}>
              상품 관리
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.menuItem}>
              주문 관리
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.menuItem}>
              사용자 관리
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.menuItem}>
              통계
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
