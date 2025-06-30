import { useEffect, useState } from 'react';

import Table from '../Table/Table';
import styles from './StatRanking.module.css';

const columns = [
  { key: 'rank', label: '순위' },
  { key: 'product_name', label: '상품명' },
  { key: 'total_quantity', label: '판매량' },
];

function renderProductRow(row) {
  return (
    <tr key={row.rank}>
      <td>{row.rank}</td>
      <td>{row.product_name}</td>
      <td>{row.total_quantity}</td>
    </tr>
  );
}

function StatsRanking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const mockData = [
      { rank: 1, product_name: '머찐 의자', total_quantity: 30 },
      { rank: 2, product_name: '간지나는 조명', total_quantity: 28 },
      { rank: 3, product_name: '삐까뻔쩍 거울', total_quantity: 21 },
      { rank: 4, product_name: '센스있는 쇼파', total_quantity: 14 },
      { rank: 5, product_name: '언제잤니 침대', total_quantity: 9 },
    ];

    setData(mockData);
  }, []);

  return (
    <section className={styles.section2}>
      <h2>오늘의 상품 판매 순위 (1시간 별 기준)</h2>
      <div className={styles.table}>
        <Table columns={columns} data={data} renderRow={renderProductRow} />
      </div>
    </section>
  );
}

export default StatsRanking;
