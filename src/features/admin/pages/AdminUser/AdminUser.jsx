import { useEffect, useState } from 'react';

import Pagination from '@/components/Pagination/Pagination';
import { fetchAdminUsers, updateUserStatus } from '@/services/adminUserApi';

import Table from '../../components/Table/Table';
import styles from './AdminUser.module.css';

const columns = [
  { key: 'createdAt', label: '가입일' },
  { key: 'last_login_at', label: '마지막 접속일' },
  { key: 'email', label: '이메일' },
  { key: 'nickname', label: '닉네임' },
  { key: 'totalPayment', label: '역대 결제금액' },
  { key: 'grade', label: '등급' },
  { key: 'status', label: '휴면 상태' },
];

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toISOString().slice(0, 10).replace(/-/g, '.');
}

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleStatusToggle = async (id) => {
    try {
      await updateUserStatus(id);
      // eslint-disable-next-line no-alert
      alert('상태가 변경되었습니다.');

      const updated = await fetchAdminUsers(currentPage - 1, 10);
      setUsers(updated.content);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('상태 변경 실패:', err);
      // eslint-disable-next-line no-alert
      alert('상태 변경 실패');
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAdminUsers(currentPage - 1, 10);
        setUsers(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('사용자 목록 불러오기 실패:', err);
      }
    };
    getUsers();
  }, [currentPage]);

  function renderUserRow(user) {
    return (
      <tr key={user.id}>
        <td>{formatDate(user.createdAt)}</td>
        <td>{formatDate(user.lastLoginAt)}</td>
        <td>{user.email}</td>
        <td>{user.nickname}</td>
        <td>{user.totalPaid.toLocaleString()}</td>
        <td>
          <span className={`${styles.badge} ${styles[user.grade.toLowerCase()]}`}>
            {user.grade}
          </span>
        </td>
        <td>
          <button type="button" onClick={() => handleStatusToggle(user.id)}>
            {user.status === 'ACTIVE' ? '활성' : '휴면'}
          </button>
        </td>
      </tr>
    );
  }

  return (
    <>
      <h1> 사용자 관리 </h1>
      <Table
        columns={columns}
        data={users}
        renderRow={(user) => renderUserRow(user, handleStatusToggle)}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
}

export default AdminUser;
