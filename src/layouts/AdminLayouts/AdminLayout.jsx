import PropTypes from 'prop-types';

import Header from '@/components/Header/Header';
import Sidebar from '@/features/admin/components/Sidebar/Sidebar';

import styles from './AdminLayout.module.css';

function AdminLayout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentArea}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
