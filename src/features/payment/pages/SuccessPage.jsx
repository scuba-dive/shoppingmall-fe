import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PaymentResult from '@/features/payment/components/PaymentResult/PaymentResult';
import axiosInstance from '@/services/axiosInstance';

function SuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(null);

  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amount = params.get('amount');

  const calledRef = useRef(false);

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      setIsSuccess(false);
      setLoading(false);
      return;
    }
    if (calledRef.current) return;
    calledRef.current = true;

    axiosInstance
      .post('/api/users/payments/toss/confirm', { paymentKey, orderId, amount })
      .then(() => {
        setIsSuccess(true);
      })
      .catch(() => {
        setIsSuccess(false);
      })
      .finally(() => setLoading(false));
  }, [paymentKey, orderId, amount]);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleCheckOrder = () => {
    navigate('/mypage');
  };

  if (loading) return <div style={{ padding: 40 }}>결제 승인 중...</div>;

  return (
    <PaymentResult
      isSuccess={isSuccess}
      onHomeClick={handleHomeClick}
      onCheckOrder={handleCheckOrder}
    />
  );
}

export default SuccessPage;
