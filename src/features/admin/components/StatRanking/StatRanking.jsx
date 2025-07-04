import { useCallback, useEffect, useState } from 'react';

import { fetchRankingStats } from '@/services/adminStatsApi';

import Table from '../Table/Table';
import styles from './StatRanking.module.css';

const columns = [
  { key: 'rank', label: '순위' },
  { key: 'product_name', label: '상품명' },
  { key: 'total_quantity', label: '판매량' },
];

function StatsRanking() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRankingData = async () => {
      try {
        setIsLoading(true);
        const stats = await fetchRankingStats();

        const top5 = stats.sort((a, b) => a.rank - b.rank).slice(0, 5);
        setData(top5);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('정보 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    getRankingData();
  }, []);

  const renderProductRow = useCallback(
    (row) => (
      <tr key={row.rank}>
        <td>{row.rank}</td>
        <td>{row.productName}</td>
        <td>{row.totalQuantity}</td>
      </tr>
    ),
    [],
  );
  if (isLoading) return <p>순위 로딩 중...</p>;

  if (!data || data.length === 0) {
    return (
      <section className={styles.section2}>
        <h2>오늘의 상품 판매 순위 TOP 5 (1시간 별 기준)</h2>
        <p>표시할 데이터가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className={styles.section2}>
      <h2>오늘의 상품 판매 순위 TOP 5 (1시간 별 기준)</h2>
      <div className={styles.table}>
        <Table columns={columns} data={data} renderRow={renderProductRow} />
      </div>
    </section>
  );
}

export default StatsRanking;
