import { useEffect, useState } from 'react';

import styles from './StatSummary.module.css';

function StatSummary() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchMockTodayStats = async () => {
      const mockData = {
        total_sales: 12345678,
        total_orders: 35,
      };
      setData(mockData);
    };

    fetchMockTodayStats();
  }, []);

  if (!data) return <p>로딩 중...</p>;

  return (
    <section className={styles.section}>
      <div>
        <h2>오늘의 매출 (1시간 별 기준)</h2>
        <p>
          <span>{data.total_sales.toLocaleString()}</span>
          <span>원</span>
        </p>
      </div>
      <div>
        <h2>오늘의 주문 건(1시간 별 기준)</h2>
        <p>
          <span>{data.total_orders}</span>
          <span>건</span>
        </p>
      </div>
    </section>
  );
}

export default StatSummary;
