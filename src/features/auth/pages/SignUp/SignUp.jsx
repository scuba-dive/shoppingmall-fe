import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import SignUpForm from '@/features/auth/components/SignUpForm/SignUpForm';
import SignUpLinks from '@/features/auth/components/SignUpLinks/SignUpLinks';
import useAuthStore from '@/states/authStore';

import styles from './SignUp.module.css';

function SignUp() {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);

  const handleSignUp = async (data) => {
    const signupBody = {
      email: data.email,
      password: data.password,
      passwordCheck: data.passwordCheck,
      username: data.username,
      phoneNumber: data.phone,
      address: data.address,
    };

    try {
      const success = await signup(signupBody);
      if (success) {
        toast.success('회원가입에 성공했습니다. 로그인해주세요.');
        navigate('/auth/signin', { replace: true });
        return true;
      }
      toast.error('회원가입에 실패했습니다.');
      return false;
    } catch (err) {
      toast.warning('회원가입 중 오류가 발생했습니다.');
      return false;
    }
  };

  return (
    <main className={styles.signupMain}>
      <section className={styles.signupSection}>
        <h1 className={styles.signupTitle}>회원가입</h1>
        <p className={styles.signupDesc}>쇼핑몰 회원가입을 위해 정보를 입력해 주세요!</p>
        <SignUpForm onSubmit={handleSignUp} />
        <SignUpLinks />
      </section>
    </main>
  );
}

export default SignUp;
