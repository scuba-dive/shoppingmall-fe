import PropTypes from 'prop-types';

import styles from './ProfileSection.module.css';

function ProfileSection({ nickname, grade, totalAmount }) {
  return (
    <section className={styles.profileSection}>
      <div className={styles.profileContent}>
        <div className={styles.avatar} />
        <div className={styles.info}>
          <p>
            <strong>{nickname}</strong>님 안녕하세요.
          </p>
          <div>
            <span className={styles.badge}>{grade}</span>
            <span className={styles.amount}>누적 구매금액 :{totalAmount.toLocaleString()}원</span>
          </div>
        </div>
        <button type="button" className={styles.editButton}>
          정보 수정
        </button>
      </div>
    </section>
  );
}

ProfileSection.propTypes = {
  nickname: PropTypes.string.isRequired,
  grade: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default ProfileSection;
