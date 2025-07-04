import { Link } from 'react-router-dom';

import logo from '@/assets//logo.svg';
import icon from '@/assets/favicon.svg';
import userImage from '@/assets/user-image.png';
import useAuthStore from '@/states/authStore';

import style from './Header.module.css';
import LogoutButton from './LogoutButton';

function Header() {
  const { user } = useAuthStore();

  return (
    <header className={style.header}>
      <div className={style.headerLeft}>
        <Link to="/">
          <img src={icon} alt="icon" className={style.headerIcon} />
        </Link>
        <Link to="/">
          <img src={logo} alt="logo" className={style.headerLogo} />
        </Link>
      </div>
      <div className={style.headerRight}>
        {user && user.role === 'ADMIN' && <span className={style.adminBadge}>관리자 모드</span>}
        {user ? (
          <div className={style.userDropdown}>
            <div className={style.userProfile}>
              <span className={style.userNickname}>{user.nickname} 님</span>
              <img
                src={user.imagePath || userImage}
                alt="사용자 프로필"
                className={style.userImage}
              />
            </div>
            <div className={style.dropdownMenu}>
              <div className={style.userInfo}>
                <div className={style.userName}>{user.username}</div>
                <div className={style.userEmail}>{user.email}</div>
              </div>
              {user.role === 'USER' && (
                <>
                  <Link to="/cart" className={style.dropdownItem}>
                    장바구니
                  </Link>
                  <Link to="/mypage" className={style.dropdownItem}>
                    마이페이지
                  </Link>
                </>
              )}
              <LogoutButton />
            </div>
          </div>
        ) : (
          <>
            <Link to="/auth/signin" className={style.loginBtn}>
              로그인
            </Link>
            <Link to="/auth/signup" className={style.signupBtn}>
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
