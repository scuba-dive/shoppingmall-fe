import { useNavigate } from 'react-router-dom';

import categories from '@/data/categories';

import styles from './CategoryNavBar.module.css';

function CategoryNavBar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav} aria-label="카테고리 네비게이션">
      <ul className={styles.list}>
        {categories.map((cat) => (
          <li key={cat.name} className={styles.item}>
            <button
              type="button"
              onClick={() => navigate(`/category/${cat.name}`)}
              className={styles.button}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryNavBar;
