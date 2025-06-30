import { useState } from 'react';

import Pagination from '@/components/Pagination/Pagination';

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

const sampleData = [
  {
    id: 1,
    username: '홍길동',
    nickname: '불타는 수박1',
    email: 'test@example.com',
    phoneNumber: '01012345678',
    role: 'USER',
    status: 'ACTIVE',
    grade: 'GOLD',
    createdAt: '2025-06-07T00:00:00',
    last_login_at: '2025-06-17T00:00:00',
    totalPayment: 32000,
  },
  {
    id: 2,
    username: '김민지',
    nickname: '빛나는 포도4',
    email: 'mjkim@example.com',
    phoneNumber: '01098765432',
    role: 'USER',
    status: 'INACTIVE',
    grade: 'VIP',
    createdAt: '2025-06-10T00:00:00',
    last_login_at: '2025-06-17T00:00:00',
    totalPayment: 64000,
  },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 10).replace(/-/g, '.');
}

function renderUserRow(user) {
  return (
    <tr key={user.id}>
      <td>{formatDate(user.createdAt)}</td>
      <td>{formatDate(user.last_login_at)}</td>
      <td>{user.email}</td>
      <td>{user.nickname}</td>
      <td>{user.totalPayment.toLocaleString()}</td>
      <td>
        <span className={`${styles.badge} ${styles[user.grade.toLowerCase()]}`}>{user.grade}</span>
      </td>
      <td>
        <button type="button">{user.status === 'ACTIVE' ? '활성' : '휴면'}</button>
      </td>
    </tr>
  );
}

function AdminUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  return (
    <>
      <h1> 사용자 관리 </h1>
      <Table columns={columns} data={sampleData} renderRow={renderUserRow} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
}

export default AdminUser;
