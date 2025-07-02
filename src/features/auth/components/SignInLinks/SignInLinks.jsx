import { Link } from 'react-router-dom';

import styles from './SignInLinks.module.css';

function SignInLinks() {
  return (
    <div className={styles.signinLinks}>
      <button type="button" className={styles.signinLinkBtn}>
        이메일 & 비밀번호 찾기
      </button>
      <Link to="/signup" className={styles.signinLinkBtn}>
        회원이 아니신가요? 회원가입
      </Link>
    </div>
  );
}

export default SignInLinks;
