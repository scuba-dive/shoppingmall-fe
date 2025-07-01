import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '@/states/authStore';

import style from './LogoutButton.module.css';

function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/logout');
      // 200
      if (res.data?.status === 200) {
        logout();
        navigate('/');
      } else {
        // 401
        logout(); // 실패하더라도 상태는 초기화
        navigate('/');
      }
    } catch (error) {
      // 기타 오류
      logout();
      navigate('/');
    }
  };

  return (
    <button type="button" className={style.logoutBtn} onClick={handleLogout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
