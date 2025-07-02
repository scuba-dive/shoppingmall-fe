import { useNavigate } from 'react-router-dom';

import SignInForm from '@/features/auth/components/SignInForm/SignInForm';
import SignInLinks from '@/features/auth/components/SignInLinks/SignInLinks';
import useAuthStore from '@/states/authStore';

import styles from './SignIn.module.css';

function SignIn() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSignIn = async (data) => {
    const success = await login(data);
    if (success) {
      navigate('/');
      return true;
    }
    return false;
  };

  return (
    <main className={styles.signinMain}>
      <section className={styles.signinSection}>
        <h1 className={styles.signinTitle}>로그인</h1>
        <p className={styles.signinDesc}>이메일과 비밀번호를 입력하고 로그인하세요.</p>
        <SignInForm onSubmit={handleSignIn} />
        <SignInLinks />
      </section>
    </main>
  );
}

export default SignIn;
