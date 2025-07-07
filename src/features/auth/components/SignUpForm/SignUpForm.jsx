import { zodResolver } from '@hookform/resolvers/zod';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signUpSchema } from '@/features/auth/schemas/signUpSchema';
import { sendPhoneAuthCode, verifyPhoneAuthCode } from '@/services/phoneService';
import useAuthStore from '@/states/authStore';

import styles from './SignUpForm.module.css';

function SignUpForm({ onSubmit }) {
  const [authCode, setAuthCode] = useState('');
  const [isAuthSent, setIsAuthSent] = useState(false);
  const [isAuthVerified, setIsAuthVerified] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailCheckMsg, setEmailCheckMsg] = useState('');
  const [authMsg, setAuthMsg] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

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
      username: '',
      email: '',
      password: '',
      passwordCheck: '',
      phone: '',
      address: '',
      agreeTerms: false,
    },
  });

  // 인증번호 발송
  const handleSendAuth = async () => {
    setAuthMsg('');
    const phone = watch('phone');
    if (!phone) {
      setError('phone', { message: '휴대폰 번호를 입력해 주세요.' });
      return;
    }
    if (!/^010\d{8}$/.test(phone)) {
      setError('phone', { message: '휴대폰 번호는 010으로 시작하는 11자리 숫자여야 합니다.' });
      return;
    }
    setIsSending(true);
    try {
      const res = await sendPhoneAuthCode(phone);
      if (res.status === 200) {
        setIsAuthSent(true);
        setAuthMsg('인증번호가 발송되었습니다.');
      } else {
        setError('phone', { message: res.message || '인증번호 발송 실패' });
      }
    } catch (e) {
      setError('phone', { message: e.response?.data?.message || '인증번호 발송 실패' });
    } finally {
      setIsSending(false);
    }
  };

  // 인증번호 확인
  const handleVerifyAuth = async () => {
    setAuthMsg('');
    const phone = watch('phone');
    if (!authCode || !/^\d{6}$/.test(authCode)) {
      setAuthMsg('인증번호 6자리를 입력하세요.');
      return;
    }
    setIsVerifying(true);
    try {
      const res = await verifyPhoneAuthCode(phone, authCode);
      if (res.status === 200) {
        setIsAuthVerified(true);
        setAuthMsg('휴대폰 인증이 완료되었습니다.');
      } else {
        setIsAuthVerified(false);
        setAuthMsg(res.message || '인증번호가 일치하지 않습니다.');
      }
    } catch (e) {
      setIsAuthVerified(false);
      setAuthMsg(e.response?.data?.message || '인증번호 확인 실패');
    } finally {
      setIsVerifying(false);
    }
  };

  // 이메일 중복 확인
  const checkEmailDuplicate = useAuthStore((state) => state.checkEmailDuplicate);
  const handleCheckEmail = async () => {
    const email = watch('email');

    // 이메일이 입력되지 않은 경우
    if (!email || !email.trim()) {
      setError('email', { message: '이메일을 입력해 주세요.' });
      setEmailChecked(false);
      setEmailCheckMsg('');
      return;
    }

    // 이메일 형식 검증 오류가 있는 경우
    if (errors.email) {
      setEmailChecked(false);
      setEmailCheckMsg('');
      return;
    }

    // API 요청 전 상태 초기화
    setEmailChecked(false);
    setEmailCheckMsg('');
    setError('email', {});

    // API 요청
    try {
      const result = await checkEmailDuplicate(email.trim());
      // checkEmailDuplicate가 true/false를 반환하는 경우도 방어
      if (result === false) {
        setEmailChecked(false);
        setEmailCheckMsg('이미 사용 중인 이메일입니다.');
        return;
      }
      setEmailChecked(true);
      setEmailCheckMsg('사용 가능한 이메일입니다.');
    } catch (errMsg) {
      setEmailChecked(false);
      setEmailCheckMsg(
        typeof errMsg === 'string' && errMsg ? errMsg : '이미 사용 중인 이메일입니다.',
      );
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data) => {
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

    setIsSubmitting(true);
    const success = await onSubmit(data);
    setIsSubmitting(false);

    if (!success) {
      setError('root', { message: '회원가입에 실패했습니다.' });
    }
  };

  return (
    <form className={styles.signupForm} onSubmit={handleSubmit(handleFormSubmit)}>
      {/* 실명 입력 */}
      <label htmlFor="signup-username" className={styles.signupLabel}>
        이름
        <input
          id="signup-username"
          type="text"
          placeholder="사용자 찾기에 사용됩니다."
          className={styles.signupInput}
          {...register('username')} // eslint-disable-line react/jsx-props-no-spreading
          required
        />
        {errors.username && (
          <div style={{ color: 'red', fontSize: 14 }}>{errors.username.message}</div>
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
            disabled={emailChecked}
            onChange={() => {
              // 이메일이 변경되면 중복 확인 상태 초기화
              setEmailChecked(false);
              setEmailCheckMsg('');
              // 기존 API 에러 메시지도 클리어
              if (emailCheckMsg && !emailChecked) {
                setError('email', {});
              }
            }}
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
        {errors.email && <div style={{ color: 'red', fontSize: 14 }}>{errors.email.message}</div>}
      </label>
      {/* 비밀번호 */}
      <label htmlFor="signup-password" className={styles.signupLabel}>
        비밀번호
        <input
          id="signup-password"
          type="password"
          placeholder="********"
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
          placeholder="********"
          className={styles.signupInput}
          {...register('passwordCheck')} // eslint-disable-line react/jsx-props-no-spreading
          required
        />
        {errors.passwordCheck && (
          <div style={{ color: 'red', fontSize: 14 }}>{errors.passwordCheck.message}</div>
        )}
      </label>
      {/* 주소 */}
      <label htmlFor="signup-address" className={styles.signupLabel}>
        주소
        <input
          id="signup-address"
          type="text"
          placeholder="주소를 입력해 주세요"
          className={styles.signupInput}
          {...register('address')} // eslint-disable-line react/jsx-props-no-spreading
          required
        />
        {errors.address && (
          <div style={{ color: 'red', fontSize: 14 }}>{errors.address.message}</div>
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
            ref={register('phone').ref}
            name={register('phone').name}
            onChange={register('phone').onChange}
            onBlur={register('phone').onBlur}
            required
            style={{ flex: 1 }}
            disabled={isAuthVerified}
          />
          <button
            type="button"
            onClick={handleSendAuth}
            disabled={isAuthSent || isAuthVerified || isSending}
            className={styles.signupTestBtn}
          >
            {(() => {
              if (isAuthVerified) return '인증 완료';
              if (isSending) return '발송중...';
              if (isAuthSent) return '인증 대기중';
              return '인증번호 발송';
            })()}
          </button>
        </div>
        {errors.phone && <div style={{ color: 'red', fontSize: 14 }}>{errors.phone.message}</div>}
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
              onChange={(e) => setAuthCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              required
              style={{ flex: 1 }}
              disabled={isVerifying}
            />
            <button
              type="button"
              className={styles.signupTestBtn}
              onClick={handleVerifyAuth}
              disabled={isVerifying}
            >
              {isVerifying ? '확인중...' : '인증 확인'}
            </button>
          </div>
          {authMsg && (
            <div style={{ color: isAuthVerified ? 'green' : 'red', fontSize: 14, marginTop: 4 }}>
              {authMsg}
            </div>
          )}
        </label>
      )}
      {/* 이용약관 동의 체크박스 */}
      <div className={styles.signupTermsRow}>
        <label htmlFor="agree-terms" className={styles.agreeTerms}>
          <input
            id="agree-terms"
            type="checkbox"
            {...register('agreeTerms')} // eslint-disable-line react/jsx-props-no-spreading
            required
            className={styles.agreeTermsCheckbox}
          />
          이용약관에 동의합니다(필수)
        </label>
        {errors.agreeTerms && (
          <div style={{ color: 'red', fontSize: 14 }}>{errors.agreeTerms.message}</div>
        )}
      </div>
      {errors.root && <div className={styles.signupError}>{errors.root.message}</div>}
      <button type="submit" className={styles.signupBtn} disabled={isSubmitting}>
        {isSubmitting ? '이메일 발송 중...' : '회원가입'}
      </button>
    </form>
  );
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
