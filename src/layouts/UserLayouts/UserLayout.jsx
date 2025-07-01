import { Outlet, useLocation } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import CategoryBanner from '@/features/main/components/CategoryBanner/CategoryBanner';
import MainBanner from '@/features/main/components/MainBanner/MainBanner';

import styles from './UserLayout.module.css';

function UserLayout() {
  const location = useLocation();

  const isCategoriesPage = location.pathname === '/category';
  const isProductListPage = location.pathname.startsWith('/category/');

  let banner = null;
  if (isCategoriesPage) {
    banner = <CategoryBanner />;
  } else if (isProductListPage) {
    banner = <CategoryBanner />;
  } else {
    banner = <MainBanner />;
  }

  return (
    <div className={styles.container}>
      <Header />
      {banner}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;
