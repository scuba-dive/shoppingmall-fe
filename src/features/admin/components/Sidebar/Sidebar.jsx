import { Link } from 'react-router-dom';

import styles from './Sidebar.module.css';

const menuItem = [
  { to: '/admin', label: '상품 관리' },
  { to: '/admin/orders', label: '주문 관리' },
  { to: '/admin/users', label: '사용자 관리' },
  { to: '/admin/stats', label: '통계' },
];

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          {menuItem.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className={styles.menuItem}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
