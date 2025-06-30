import { Outlet } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import styles from './DefaultLayout.module.css';

function DefaultLayout() {
  return (
    <div>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
