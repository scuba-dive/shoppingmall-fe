import { Outlet } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MainBanner from '@/features/main/components/MainBanner/MainBanner';

import styles from './UserLayout.module.css';

function UserLayout() {
  return (
    <div className={styles.container}>
      <Header />
      <MainBanner />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;
