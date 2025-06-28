import StatsCharts from '../../components/StatChart/StatChart';
import StatsRanking from '../../components/StatRanking/StatRanking';
import StatSummary from '../../components/StatSummary/StatSummary';
import styles from './AdminStats.module.css';

function AdminStats() {
  return (
    <>
      <h1> 통계 </h1>
      <div className={styles.container}>
        <StatSummary />
        <StatsCharts />
        <StatsRanking />
      </div>
    </>
  );
}

export default AdminStats;
