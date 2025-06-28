import styles from './AdminStats.module.css';

function AdminStats() {
  return (
    <>
      <h1> 통계 </h1>
      <div className={styles.container}>
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
        <section className={styles.section2}>
          <h2>3일 간 매출 & 주문 수</h2>
          <div className={styles.box}>그래프</div>
        </section>
        <section className={styles.section2}>
          <h2>오늘의 상품 판매 순위 (1시간 별 기준)</h2>
          <div className={styles.box}>순위</div>
        </section>
      </div>
    </>
  );
}

export default AdminStats;
