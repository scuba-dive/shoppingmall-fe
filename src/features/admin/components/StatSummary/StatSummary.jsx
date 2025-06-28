import styles from './StatSummary.module.css';

function StatSummary() {
  return (
    <section className={styles.section}>
      <div>
        <h2>오늘의 매출 (1시간 별 기준)</h2>
        <p>12,345,678</p>
      </div>
      <div>
        <h2>오늘의 주문 건 (1시간 별 기준)</h2>
        <p>15건</p>
      </div>
    </section>
  );
}

export default StatSummary;
