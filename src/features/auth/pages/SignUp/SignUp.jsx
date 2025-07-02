import { useNavigate } from 'react-router-dom';

import SignUpForm from '@/features/auth/components/SignUpForm/SignUpForm';
import SignUpLinks from '@/features/auth/components/SignUpLinks/SignUpLinks';

import styles from './SignUp.module.css';

function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (_data) => {
    try {
      // 회원가입 request body
      // const signupBody = {
      //   username: data.nickname,
      //   email: data.email,
      //   password: data.password,
      //   passwordCheck: data.passwordCheck,
      //   phoneNumber: data.phone,
      // };

      // 실제 API 호출
      // const res = await axios.post('/api/auth/signup', signupBody);
      // const user = res.data?.data;
      // setUser(user);
      // navigate('/');

      // 임의로 성공 처리
      // eslint-disable-next-line no-alert
      alert('회원가입에 성공했습니다. 로그인해주세요.');
      navigate('/signin');
      return true;
    } catch (err) {
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
