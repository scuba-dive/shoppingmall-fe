import styles from './StatChart.module.css';

function StatsCharts() {
  return (
    <section className={styles.section2}>
      <h2>3일 간 매출 & 주문 수</h2>
      <div className={styles.box}>그래프</div>
    </section>
  );
}

export default StatsCharts;
