import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './SignInModal.module.css';

function SignInModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }

    return undefined;
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <button
      type="button"
      className={styles.overlay}
      onClick={handleOverlayClick}
      aria-label="모달 닫기"
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="모달 닫기"
        >
          <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div id="modal-title" className={styles.title}>
          로그인 후 이용해 주세요.
        </div>

        <div className={styles.buttonContainer}>
          <Link to="/auth/signin" className={styles.loginButton} onClick={onClose}>
            로그인
          </Link>
          <Link to="/auth/signup" className={styles.signupButton} onClick={onClose}>
            회원가입
          </Link>
        </div>
      </div>
    </button>
  );
}

SignInModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignInModal;
