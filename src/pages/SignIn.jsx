import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import Header from '@/components/Header/Header';
import useAuthStore from '@/states/authStore';

import styles from './SignIn.module.css';

const signInSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(4, '비밀번호는 4자 이상이어야 합니다.'),
});

function SignIn() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const success = await login(data);
    if (success) {
      navigate('/');
    } else {
      setError('root', { message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }
  };

  return (
    <>
      <Header />
      <main className={styles.signinMain}>
        <section className={styles.signinSection}>
          <h1 className={styles.signinTitle}>로그인</h1>
          <p className={styles.signinDesc}>이메일과 비밀번호를 입력하고 로그인하세요.</p>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.signinForm}>
            <label htmlFor="signin-email" className={styles.signinLabel}>
              이메일
              <input
                id="signin-email"
                type="email"
                placeholder="user@user.com"
                className={styles.signinInput}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('email', { required: true })}
                required
              />
              {errors.email && (
                <div style={{ color: 'red', fontSize: 14 }}>{errors.email.message}</div>
              )}
            </label>
            <label htmlFor="signin-password" className={styles.signinLabel}>
              비밀번호
              <input
                id="signin-password"
                type="password"
                placeholder="****"
                className={styles.signinInput}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('password', { required: true })}
                required
              />
              {errors.password && (
                <div style={{ color: 'red', fontSize: 14 }}>{errors.password.message}</div>
              )}
            </label>
            <button type="submit" className={styles.signinBtn}>
              로그인
            </button>
          </form>
          {(errors.root || errors?.root?.message) && (
            <div style={{ color: 'red', marginTop: '10px' }}>{errors.root?.message}</div>
          )}
          <div className={styles.signinLinks}>
            <button type="button" className={styles.signinLinkBtn}>
              이메일 & 비밀번호 찾기
            </button>
            <Link to="/signup" className={styles.signinLinkBtn}>
              회원이 아니신가요? 회원가입
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default SignIn;
