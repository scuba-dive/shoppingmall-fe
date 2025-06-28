import styles from './StatRanking.module.css';

function StatsRanking() {
  return (
    <section className={styles.section2}>
      <h2>오늘의 상품 판매 순위 (1시간 별 기준)</h2>
      <div className={styles.box}>순위</div>
    </section>
  );
}

export default StatsRanking;
