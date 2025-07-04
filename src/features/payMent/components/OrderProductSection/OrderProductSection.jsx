import styles from './OrderProductSection.module.css';

function OrderProductSection() {
  const productData = [
    {
      products: [
        {
          productId: 10,
          name: '머찐 의자',
          imageUrl: '이미지url1',
          quantity: 2,
          price: 64000,
        },
        {
          productId: 15,
          name: '언제 잤니 침대',
          imageUrl: '이미지url2',
          quantity: 1,
          price: 82000,
        },
      ],
      id: 1,
      username: '김구름',
      phonenumber: '01012341234',
      email: 'user@user.com',
      receive: {
        name: '김구름',
        phonenumber: '01012341234',
        address: '경기도 구름시...',
      },
    },
  ];

  const {
    products, //
    username, //
    phonenumber, //
    email, //
    receive, //
  } = productData[0];

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2>주문 상품 정보</h2>
        <ul className={styles.productList}>
          {products.map((item) => (
            <li key={item.productId} className={styles.product}>
              <div className={styles.img}>
                <div className={styles.imgP}> </div>
              </div>
              <div>
                <h3 className={styles.name}>{item.name}</h3>
                <span className={styles.number}>{item.quantity}개</span>
                <p className={styles.money}>{item.price.toLocaleString()}원</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        <h2>주문자 정보</h2>
        <p className={styles.name}>{username}</p>
        <p className={styles.info}>{phonenumber}</p>
        <p className={styles.info}>{email}</p>
      </div>
      <div className={styles.content}>
        <h2>배송 정보</h2>
        <div className={styles.boxS}>
          <p className={`${styles.name} ${styles.box}`}>{receive.name}</p>
          <p className={styles.box}>{receive.phonenumber}</p>
        </div>
        <p className={styles.box}>{receive.address}</p>
      </div>
    </section>
  );
}

export default OrderProductSection;
