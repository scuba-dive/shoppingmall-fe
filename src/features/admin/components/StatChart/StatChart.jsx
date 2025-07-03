import { useEffect, useState } from 'react';
import {
  Bar, //
  ComposedChart, //
  Line, //
  ResponsiveContainer, //
  Tooltip, //
  XAxis, //
  YAxis, //
} from 'recharts';

import { fetchRecentStats } from '@/services/adminStatsApi';

import styles from './StatChart.module.css';

function StatsChart() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const stats = await fetchRecentStats();

        const formatted = stats.map((item) => ({
          name: item.date.slice(5),
          sales: item.sales,
          orders: item.orders,
        }));

        setData(formatted);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('최근 3일 통계 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    getChartData();
  }, []);

  if (isLoading) return <p>차트 로딩 중...</p>;

  return (
    <section className={styles.section}>
      <h2>3일 간 매출 & 주문 수</h2>
      {/* 그래프 처음 써뵈서 공부 하면서 하는 즁.. 틀린게 있을 수도.. */}
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            {/* X축: 날짜 */}
            <XAxis dataKey="name" />

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
                if (name === '매출') return [`${value.toLocaleString()}원`, name];
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

export default StatsChart;
