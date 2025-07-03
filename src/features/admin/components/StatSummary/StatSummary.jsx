import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { fetchTodaySummary } from '@/services/adminStatsApi';

import styles from './StatSummary.module.css';

function StatSummary({ onTimestampLoaded }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const getSummary = async () => {
      try {
        const data = await fetchTodaySummary();
        setSummary(data);
        if (onTimestampLoaded) {
          onTimestampLoaded(data.timestamp); // 부모로 전달
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('정보 불러오기 실패:', err);
      }
    };
    getSummary();
  }, [onTimestampLoaded]);

  if (!summary) return <p>로딩 중...</p>;

  const { totalSales, totalOrders } = summary;

  return (
    <section className={styles.section}>
      <div>
        <h2>오늘의 매출 (1시간 별 기준)</h2>
        <p>
          <span>{totalSales.toLocaleString()}</span>
          <span>원</span>
        </p>
      </div>
      <div>
        <h2>오늘의 주문 건(1시간 별 기준)</h2>
        <p>
          <span>{totalOrders}</span>
          <span>건</span>
        </p>
      </div>
    </section>
  );
}

StatSummary.propTypes = {
  onTimestampLoaded: PropTypes.func,
};

StatSummary.defaultProps = {
  onTimestampLoaded: () => {},
};

export default StatSummary;
