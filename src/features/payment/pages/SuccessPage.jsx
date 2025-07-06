import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import axiosInstance from '@/services/axiosInstance';

function SuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amount = params.get('amount');

  // 중복 요청 방지용 ref
  const calledRef = useRef(false);

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      setMessage('잘못된 접근입니다.');
      setLoading(false);
      return;
    }

    // 이미 호출했다면 무시
    if (calledRef.current) return;
    calledRef.current = true;

    axiosInstance
      .post('/api/users/payments/toss/confirm', { paymentKey, orderId, amount })
      .then(() => {
        setMessage('결제가 성공적으로 완료되었습니다!');
      })
      .catch((_) => {
        setMessage('결제 승인에 실패했습니다. 관리자에게 문의하세요.');
      })
      .finally(() => setLoading(false));
  }, [paymentKey, orderId, amount]);

  return (
    <div style={{ padding: 40 }}>
      <h2>결제 결과 안내</h2>
      {loading ? '결제 승인 중...' : message}
      {!loading && (
        <button type="button" onClick={() => navigate('/')}>
          홈으로 이동
        </button>
      )}
    </div>
  );
}

export default SuccessPage;
