import { useEffect, useState } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import styles from './StatChart.module.css';

function StatsCharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const mockData = [
      // api가 명시가 되어 있지 않아 임시로 제작
      { date: '2025-06-24', sales: 1200000, orders: 32 },
      { date: '2025-06-25', sales: 1000000, orders: 30 },
      { date: '2025-06-26', sales: 1500000, orders: 35 },
    ];

    setData(mockData);
  }, []);

  return (
    <section className={styles.section}>
      <h2>3일 간 매출 & 주문 수</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 40,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />

          {/* X축: 날짜 */}
          <XAxis dataKey="date" />

          {/* 왼쪽 Y축: 매출 */}
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={[0, 'auto']}
            tickFormatter={(value) => `${(value / 10000).toLocaleString()}만 원`}
          />

          {/* 오른쪽 Y축: 주문 건수 */}
          <YAxis yAxisId="right" orientation="right" />

          <Tooltip
            formatter={(value, name) => {
              if (name === '매출') return [`₩${value.toLocaleString()}`, name];
              return [`${value}건`, name];
            }}
          />

          {/* 막대: 주문 건수 */}
          <Bar dataKey="orders" yAxisId="right" name="주문 건수" fill="#8884d8" barSize={30} />

          {/* 선: 매출 */}
          <Line dataKey="sales" yAxisId="left" name="매출" stroke="#ff7300" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
}

export default StatsCharts;
