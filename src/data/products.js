import bed from '@/assets/product-bed.png';
import bed2 from '@/assets/product-bed2.png';
import chair from '@/assets/product-chair.png';
import chair2 from '@/assets/product-chair2.png';
import chair3 from '@/assets/product-chair3.png';
import desk from '@/assets/product-desk.png';
import desk2 from '@/assets/product-desk2.png';
import pot from '@/assets/product-pot.png';
import sofa from '@/assets/product-sofa.png';
import sofa2 from '@/assets/product-sofa2.png';
import table from '@/assets/product-table.png';
import vase from '@/assets/product-vase.png';

const products = [
  // 침대
  {
    id: 1,
    name: '언제 잤니 침대',
    price: 99000,
    image: bed,
    category: '침대',
  },
  {
    id: 2,
    name: '눕고 싶어 침대',
    price: 55000,
    image: bed2,
    category: '침대',
  },
  {
    id: 3,
    name: '포근한 침대',
    price: 88000,
    image: bed,
    category: '침대',
  },
  {
    id: 4,
    name: '숙면 침대',
    price: 97000,
    image: bed2,
    category: '침대',
  },
  {
    id: 5,
    name: '미니멀 침대',
    price: 73000,
    image: bed,
    category: '침대',
  },
  {
    id: 6,
    name: '아늑한 침대',
    price: 92000,
    image: bed2,
    category: '침대',
  },
  {
    id: 7,
    name: '편안한 침대',
    price: 81000,
    image: bed,
    category: '침대',
  },
  {
    id: 8,
    name: '심플 침대',
    price: 69000,
    image: bed2,
    category: '침대',
  },

  // 의자
  {
    id: 9,
    name: '머찐 의자',
    price: 32000,
    image: chair,
    category: '의자',
  },
  {
    id: 10,
    name: '쿠션말고 의자',
    price: 12000,
    image: chair3,
    category: '의자',
  },
  {
    id: 11,
    name: '심플 의자',
    price: 34000,
    image: chair2,
    category: '의자',
  },
  {
    id: 12,
    name: '디자인 의자',
    price: 37000,
    image: chair,
    category: '의자',
  },
  {
    id: 13,
    name: '컬러풀 의자',
    price: 28000,
    image: chair3,
    category: '의자',
  },
  {
    id: 14,
    name: '목재 의자',
    price: 31000,
    image: chair2,
    category: '의자',
  },
  {
    id: 15,
    name: '편한 의자',
    price: 39000,
    image: chair,
    category: '의자',
  },
  {
    id: 16,
    name: '현대 의자',
    price: 36000,
    image: chair2,
    category: '의자',
  },

  // 🪑 테이블
  {
    id: 17,
    name: '반들반들 책상',
    price: 41000,
    image: desk,
    category: '테이블',
  },
  {
    id: 18,
    name: '모던 테이블',
    price: 76000,
    image: table,
    category: '테이블',
  },
  {
    id: 19,
    name: '슬림 테이블',
    price: 58000,
    image: desk,
    category: '테이블',
  },
  {
    id: 20,
    name: '원형 테이블',
    price: 62000,
    image: table,
    category: '테이블',
  },
  {
    id: 21,
    name: '고급 테이블',
    price: 67000,
    image: desk2,
    category: '테이블',
  },
  {
    id: 22,
    name: '컴팩트 테이블',
    price: 43000,
    image: desk,
    category: '테이블',
  },
  {
    id: 23,
    name: '화이트 테이블',
    price: 57000,
    image: table,
    category: '테이블',
  },
  {
    id: 24,
    name: '심플 테이블',
    price: 60000,
    image: desk2,
    category: '테이블',
  },

  // 수납장
  {
    id: 25,
    name: '서랍장인척 책상',
    price: 62000,
    image: desk2,
    category: '수납장',
  },
  {
    id: 26,
    name: '미니 수납장',
    price: 47000,
    image: desk2,
    category: '수납장',
  },
  {
    id: 27,
    name: '화이트 수납장',
    price: 55000,
    image: desk2,
    category: '수납장',
  },
  {
    id: 28,
    name: '4단 수납장',
    price: 68000,
    image: desk2,
    category: '수납장',
  },
  {
    id: 29,
    name: '심플 수납장',
    price: 52000,
    image: desk2,
    category: '수납장',
  },
  {
    id: 30,
    name: '모던 수납장',
    price: 61000,
    image: desk2,
    category: '수납장',
  },
  {
    id: 31,
    name: '투톤 수납장',
    price: 58000,
    image: desk2,
    category: '수납장',
  },
  {
    id: 32,
    name: '목재 수납장',
    price: 59000,
    image: desk2,
    category: '수납장',
  },

  // 소품
  {
    id: 33,
    name: '센스있는 쇼파',
    price: 82000,
    image: sofa,
    category: '소품',
  },
  {
    id: 34,
    name: '빤딱 꽃병',
    price: 14000,
    image: vase,
    category: '소품',
  },
  {
    id: 35,
    name: '꽃병인척 화분',
    price: 9000,
    image: pot,
    category: '소품',
  },
  {
    id: 36,
    name: '조명말고 소파',
    price: 27000,
    image: sofa2,
    category: '소품',
  },
  {
    id: 37,
    name: '미니 조명',
    price: 15000,
    image: vase,
    category: '소품',
  },
  {
    id: 38,
    name: '빈티지 장식',
    price: 17000,
    image: pot,
    category: '소품',
  },
  {
    id: 39,
    name: '벽걸이 소품',
    price: 22000,
    image: vase,
    category: '소품',
  },
  {
    id: 40,
    name: '쿠션',
    price: 13000,
    image: sofa2,
    category: '소품',
  },
];

export default products;
