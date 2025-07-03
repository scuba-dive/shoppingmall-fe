import { useState } from 'react';

import formatKoreanTimestamp from '@/utils/formatDateTime';

import StatsCharts from '../../components/StatChart/StatChart';
import StatsRanking from '../../components/StatRanking/StatRanking';
import StatSummary from '../../components/StatSummary/StatSummary';
import styles from './AdminStats.module.css';

function AdminStats() {
  const [timestamp, setTimestamp] = useState(null);

  return (
    <>
      <div className={styles.header}>
        <h1> 통계 </h1>
        <h2>{timestamp ? `(${formatKoreanTimestamp(timestamp)})` : ''}</h2>
      </div>
      <div className={styles.container}>
        <StatSummary onTimestampLoaded={setTimestamp} />
        <StatsCharts />
        <StatsRanking />
      </div>
    </>
  );
}

export default AdminStats;
