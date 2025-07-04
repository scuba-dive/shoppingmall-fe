import OrderProductSection from '../components/OrderProductSection/OrderProductSection';
import PaymentAmountSection from '../components/PaymentAmountSection/PaymentAmountSection';
import PaymentButton from '../components/PaymentButton/PaymentButton';
import styles from './PaymentPage.module.css';

function PayMentPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1> 결제하기 </h1>
        <button type="button"> &lt; 뒤로 가기</button>
      </div>
      <div className={styles.content}>
        <div className={styles.orderSection}>
          <OrderProductSection />
        </div>
        <div className={styles.paymentSection}>
          <PaymentAmountSection />
          <PaymentButton />
        </div>
      </div>
    </div>
  );
}

export default PayMentPage;
