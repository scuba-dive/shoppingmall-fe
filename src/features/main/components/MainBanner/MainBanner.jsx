import banner from '@/data/banner';

import styles from './MainBanner.module.css';

function MainBanner() {
  const mainBanner = banner.find((b) => b.name === 'main');

  if (!mainBanner) return null;

  return (
    <section className={styles.mainBanner}>
      <img src={mainBanner.image} alt="메인 배너" />
    </section>
  );
}

export default MainBanner;
