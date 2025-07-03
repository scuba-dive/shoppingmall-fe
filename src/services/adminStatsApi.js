import axiosInstance from './axiosInstance';

// 오늘의 매출 및 주문 수
export const fetchTodaySummary = async () => {
  const res = await axiosInstance.get('/api/admin/stats/today');
  return res.data.data;
};

// 최근 3일 간 매출 및 주문 수
export const fetchRecentStats = async () => {
  const res = await axiosInstance.get('/api/admin/stats/recent');
  return res.data.data.salesStats;
};

// 오늘의 상품 판매 순위
export const fetchRankingStats = async () => {
  const res = await axiosInstance.get('/api/admin/stats/top-products');
  return res.data.data.quantityRankings;
};
