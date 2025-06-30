import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="DeepDive Studios 로고" />
          <p>나에게 딱 맞는 가구 추천</p>
        </div>

        <div className={styles.info}>
          <strong>(주) 숨참고 스쿠버 다이브 온라인 플랫폼</strong>
          <p>상호명: 주식회사 숨참고 스쿠버 다이브 대표자명: 정원용</p>
          <p>경기도 성남시 분당구 판교로 242 PDC A동 9층</p>
          <p>사업자등록번호: 123-45-78910 통신판매업 신고번호: 제123-판교로-4567</p>
          <p>개인정보 보호책임자: 김구름</p>
        </div>

        <div className={styles.cs}>
          <h3>고객센터</h3>
          <p className={styles.phone}>1234-5678</p>
          <p>
            상담시간 : 오전 9시 ~ 오후 5시 30분
            <br />
            (주말 및 공휴일 휴무)
          </p>
        </div>
      </div>
    </footer>
  );
}
