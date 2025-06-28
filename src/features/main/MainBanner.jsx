import bannerImage from '@/../public/banner.svg';

import styles from './MainBanner.module.css';

function MainBanner() {
  return (
    <section className={styles.mainBanner}>
      <img src={bannerImage} alt="메인 배너" />
    </section>
  );
}

export default MainBanner;
