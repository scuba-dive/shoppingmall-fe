import { Link } from 'react-router-dom';

import styles from './SignUpLinks.module.css';

function SignUpLinks() {
  return (
    <div className={styles.signupLinks}>
      <Link to="/signin" className={styles.signupLinkBtn}>
        회원이신가요? 로그인
      </Link>
    </div>
  );
}

export default SignUpLinks;
