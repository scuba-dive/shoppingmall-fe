import { Outlet, useLocation } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import CategoryBanner from '@/features/main/components/CategoryBanner/CategoryBanner';
import MainBanner from '@/features/main/components/MainBanner/MainBanner';

import styles from './UserLayout.module.css';

function UserLayout() {
  const location = useLocation();

  const { pathname } = location;

  const isCategoryListPage = pathname === '/category';
  const isCategoryDetailPage = pathname.startsWith('/category/');
  const isProductDetailPage = pathname.startsWith('/product/');

  let banner = null;
  if (isCategoryListPage || isCategoryDetailPage || isProductDetailPage) {
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
