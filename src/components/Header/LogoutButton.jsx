import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/services/axiosInstance';
import useAuthStore from '@/states/authStore';

import style from './LogoutButton.module.css';

function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post('/api/users/logout');
      if (res.data?.status === 200) {
        logout();
        navigate('/');
      } else {
        logout();
        navigate('/');
      }
    } catch (error) {
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
