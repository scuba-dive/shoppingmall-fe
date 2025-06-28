import PropTypes from 'prop-types';

import Header from '@/components/Header/Header';
import MainBanner from '@/features/main/MainBanner';

import styles from './UserLayout.module.css';

function UserLayout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <MainBanner />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserLayout;
