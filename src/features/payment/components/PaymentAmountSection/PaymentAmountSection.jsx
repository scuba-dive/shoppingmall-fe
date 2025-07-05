import styles from './PaymentAmountSection.module.css';

function PaymentAmountSection() {
  return (
    <section>
      <div className={styles.content}>
        <h2>최종 결제 금액</h2>
        <div>
          <div className={styles.box}>
            <h3>상품 가격</h3>
            <p>146,000</p>
          </div>
          <div className={styles.box}>
            <h3>배달비</h3>
            <p>무료</p>
          </div>
          <div className={`${styles.money} ${styles.box}`}>
            <h3>총 주문 금액</h3>
            <p>146,000</p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h2>결제 방법 </h2>
      </div>
    </section>
  );
}

export default PaymentAmountSection;
