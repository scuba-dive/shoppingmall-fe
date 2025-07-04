import styles from './PaymentButton.module.css';

function PaymentButton() {
  return (
    <section className={styles.content}>
      <div className={styles.box}>
        <p>구매 조건 확인 및 결제 진행에 동의</p>
        <button type="button" className={styles.button}>
          결제하기
        </button>
      </div>
    </section>
  );
}

export default PaymentButton;
