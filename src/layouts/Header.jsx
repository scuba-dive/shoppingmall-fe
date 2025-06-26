import icon from '@/../public/favicon.svg';
import logo from '@/../public/logo.svg';
import style from './Header.module.css';

function Header() {
  return (
    <header className={style.header}>
      <div className={style.headerLeft}>
        <img src={icon} alt="icon" className={style.headerIcon} />
        <img src={logo} alt="logo" className={style.headerLogo} />
      </div>
      <div className={style.headerRight}>
        <span className={style.loginBtn}>로그인</span>
        <button type="submit" className={style.signupBtn}>
          회원가입
        </button>
      </div>
    </header>
  );
}

export default Header;
