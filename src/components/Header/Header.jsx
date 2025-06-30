import { Link } from 'react-router-dom';

import logo from '@/assets//logo.svg';
import icon from '@/assets/favicon.svg';
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
        {user ? (
          <>
            <Link to="/cart" className={style.cartBtn}>
              장바구니
            </Link>
            <Link to="/mypage" className={style.myPageBtn}>
              마이페이지
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/signin" className={style.loginBtn}>
              로그인
            </Link>
            <Link to="/signup" className={style.signupBtn}>
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
