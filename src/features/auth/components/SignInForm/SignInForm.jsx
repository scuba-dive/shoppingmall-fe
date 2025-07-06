import { zodResolver } from '@hookform/resolvers/zod';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { signInSchema } from '@/features/auth/schemas/signInSchema';

import styles from './SignInForm.module.css';

function SignInForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const handleFormSubmit = async (data) => {
    const success = await onSubmit(data);
    if (!success) {
      setError('root', { message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.signinForm}>
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
          {errors.email && <div style={{ color: 'red', fontSize: 14 }}>{errors.email.message}</div>}
        </label>
        <label htmlFor="signin-password" className={styles.signinLabel}>
          비밀번호
          <input
            id="signin-password"
            type="password"
            placeholder="********"
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
    </>
  );
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
