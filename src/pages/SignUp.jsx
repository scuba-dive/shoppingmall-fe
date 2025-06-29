import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import Header from '@/components/Header/Header';
import useAuthStore from '@/states/authStore';

import styles from './SignUp.module.css';

const signUpSchema = z.object({
  nickname: z.string().min(2, '이름은 2자 이상 입력해 주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(4, '비밀번호는 4자 이상이어야 합니다.'),
  passwordCheck: z.string().min(4, '비밀번호 확인은 4자 이상이어야 합니다.'),
  phone: z.string().min(10, '휴대폰 번호를 올바르게 입력해 주세요.'),
  agreeTerms: z.literal(true, { errorMap: () => ({ message: '이용약관에 동의해 주세요.' }) }),
});

function SignUp() {
  //   const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const [authCode, setAuthCode] = useState('');
  const [isAuthSent, setIsAuthSent] = useState(false);
  const [isAuthVerified, setIsAuthVerified] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailCheckMsg, setEmailCheckMsg] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordCheck: '',
      phone: '',
      agreeTerms: false,
    },
  });

  // 인증번호 발송
  const handleSendAuth = () => {
    if (!watch('phone')) {
      setError('phone', { message: '휴대폰 번호를 입력해 주세요.' });
      return;
    }
    setIsAuthSent(true);
  };

  // 인증번호 확인
  const handleVerifyAuth = () => {
    // 임시로 인증번호를 123456으로 설정했습니다!
    if (authCode === '123456') {
      setIsAuthVerified(true);
    } else {
      setError('root', { message: '인증번호가 올바르지 않습니다.' });
    }
  };

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    if (!watch('email')) {
      setError('email', { message: '이메일을 입력해 주세요.' });
      setEmailChecked(false);
      setEmailCheckMsg('');
      return;
    }
    setEmailChecked(true);
    setEmailCheckMsg('사용 가능한 이메일입니다.');
  };

  const onSubmit = async (data) => {
    if (!emailChecked) {
      setError('email', { message: '이메일 중복 확인을 해주세요.' });
      return;
    }
    if (data.password !== data.passwordCheck) {
      setError('passwordCheck', { message: '비밀번호가 일치하지 않습니다.' });
      return;
    }
    if (!isAuthVerified) {
      setError('root', { message: '휴대폰 인증을 완료해 주세요.' });
      return;
    }

    // 회원가입 request body
    const signupBody = {
      username: data.nickname,
      email: data.email,
      password: data.password,
      passwordCheck: data.passwordCheck,
      phoneNumber: data.phone,
    };

    try {
      // 실제 API 호출
      // const res = await axios.post('/api/auth/signup', signupBody);
      // const user = res.data?.data;
      // setUser(user);
      // navigate('/');

      // 임의로 성공 처리
      // eslint-disable-next-line no-alert
      alert('회원가입에 성공했습니다. 로그인해주세요.');
      navigate('/signin');
    } catch (err) {
      setError('root', { message: err?.response?.data?.message || '회원가입에 실패했습니다.' });
    }
  };

  return (
    <>
      <Header />
      <main className={styles.signupMain}>
        <section className={styles.signupSection}>
          <h1 className={styles.signupTitle}>회원가입</h1>
          <p className={styles.signupDesc}>쇼핑몰 회원가입을 위해 정보를 입력해 주세요!</p>
          <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
            {/* 실명 입력 */}
            <label htmlFor="signup-nickname" className={styles.signupLabel}>
              이름
              <input
                id="signup-nickname"
                type="text"
                placeholder="사용자 찾기에 사용됩니다."
                className={styles.signupInput}
                {...register('nickname')} // eslint-disable-line react/jsx-props-no-spreading
                required
              />
              {errors.nickname && (
                <div style={{ color: 'red', fontSize: 14 }}>{errors.nickname.message}</div>
              )}
            </label>
            {/* 이메일 및 중복 확인 */}
            <label htmlFor="signup-email" className={styles.signupLabel}>
              이메일
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="user@user.com"
                  className={styles.signupInput}
                  {...register('email')} // eslint-disable-line react/jsx-props-no-spreading
                  required
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className={styles.signupTestBtn}
                  onClick={handleCheckEmail}
                  disabled={emailChecked}
                >
                  {emailChecked ? '중복 확인 완료' : '중복 확인'}
                </button>
              </div>
              {emailCheckMsg && (
                <div style={{ color: emailChecked ? 'green' : 'red', fontSize: 14, marginTop: 4 }}>
                  {emailCheckMsg}
                </div>
              )}
              {errors.email && (
                <div style={{ color: 'red', fontSize: 14 }}>{errors.email.message}</div>
              )}
            </label>
            {/* 비밀번호 */}
            <label htmlFor="signup-password" className={styles.signupLabel}>
              비밀번호
              <input
                id="signup-password"
                type="password"
                placeholder="****"
                className={styles.signupInput}
                {...register('password')} // eslint-disable-line react/jsx-props-no-spreading
                required
              />
              {errors.password && (
                <div style={{ color: 'red', fontSize: 14 }}>{errors.password.message}</div>
              )}
            </label>
            {/* 비밀번호 확인 */}
            <label htmlFor="signup-password-check" className={styles.signupLabel}>
              비밀번호 확인
              <input
                id="signup-password-check"
                type="password"
                placeholder="****"
                className={styles.signupInput}
                {...register('passwordCheck')} // eslint-disable-line react/jsx-props-no-spreading
                required
              />
              {errors.passwordCheck && (
                <div style={{ color: 'red', fontSize: 14 }}>{errors.passwordCheck.message}</div>
              )}
            </label>
            {/* 휴대폰 번호 입력 및 인증 */}
            <label htmlFor="signup-phone" className={styles.signupLabel}>
              휴대폰 번호
              <div className={styles.signupPhoneRow}>
                <input
                  id="signup-phone"
                  type="tel"
                  placeholder="01012345678"
                  className={styles.signupInput}
                  {...register('phone')} // eslint-disable-line react/jsx-props-no-spreading
                  required
                  style={{ flex: 1 }}
                  disabled={isAuthVerified}
                />
                <button
                  type="button"
                  onClick={handleSendAuth}
                  disabled={isAuthSent || isAuthVerified}
                  className={styles.signupTestBtn}
                >
                  {isAuthVerified && '인증 완료'}
                  {!isAuthVerified && isAuthSent && '인증 대기중'}
                  {!isAuthVerified && !isAuthSent && '인증번호 발송'}
                </button>
              </div>
              {errors.phone && (
                <div style={{ color: 'red', fontSize: 14 }}>{errors.phone.message}</div>
              )}
            </label>
            {/* 인증번호 입력 */}
            {isAuthSent && !isAuthVerified && (
              <label htmlFor="signup-authcode" className={styles.signupLabel}>
                인증번호 입력
                <div className={styles.signupAuthRow}>
                  <input
                    id="signup-authcode"
                    type="text"
                    placeholder="인증번호 6자리"
                    className={styles.signupInput}
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    required
                    style={{ flex: 1 }}
                  />
                  <button type="button" className={styles.signupTestBtn} onClick={handleVerifyAuth}>
                    인증 확인
                  </button>
                </div>
              </label>
            )}
            {/* 이용약관 동의 체크박스 */}
            <div className={styles.signupTermsRow}>
              <label htmlFor="agree-terms" style={{ fontWeight: 500, fontSize: 16 }}>
                <input
                  id="agree-terms"
                  type="checkbox"
                  {...register('agreeTerms')} // eslint-disable-line react/jsx-props-no-spreading
                  required
                  style={{ marginRight: 8 }}
                />
                이용약관에 동의합니다(필수)
              </label>
              {errors.agreeTerms && (
                <div style={{ color: 'red', fontSize: 14 }}>{errors.agreeTerms.message}</div>
              )}
            </div>
            {errors.root && <div className={styles.signupError}>{errors.root.message}</div>}
            <button type="submit" className={styles.signupBtn}>
              회원가입
            </button>
          </form>
          <div className={styles.signupLinks}>
            <Link to="/signin" className={styles.signupLinkBtn}>
              회원이신가요? 로그인
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default SignUp;
