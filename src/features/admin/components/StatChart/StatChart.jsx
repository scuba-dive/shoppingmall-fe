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
      { date: '2025-06-26', sales: 900000, orders: 20 },
    ];

    setData(mockData);
  }, []);

  return (
    <section className={styles.section}>
      <h2>3일 간 매출 & 주문 수</h2>
      {/* 그래프 처음 써뵈서 공부 하면서 하는 즁.. 틀린게 있을 수도.. */}
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            {/* X축: 날짜 */}
            <XAxis dataKey="date" />

            {/* 왼쪽 Y축: 매출 - 너무 길어서 만원 단위로 넣었슴다 */}
            <YAxis
              yAxisId="left"
              orientation="left"
              tickFormatter={(value) => `${(value / 10000).toLocaleString()}만 원`}
            />

            {/* 오른쪽 Y축: 주문 건수 */}
            <YAxis yAxisId="right" orientation="right" />

            <Tooltip
              formatter={(value, name) => {
                if (name === '매출') return [value.toLocaleString(), name];
                return [`${value}건`, name];
              }}
            />

            {/* 막대: 주문 건수 */}
            <Bar dataKey="sales" yAxisId="left" name="매출" fill="#65cade" barSize={35} />

            {/* 선: 매출 */}
            <Line
              dataKey="orders"
              yAxisId="right"
              name="주문 수"
              stroke="#ff9000"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default StatsCharts;
