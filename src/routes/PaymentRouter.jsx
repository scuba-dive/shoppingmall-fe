import { Route, Routes } from 'react-router-dom';

import PaymentPage from '@/features/payment/pages/PaymentPage';
import PaymentSuccess from '@/features/payment/pages/SuccessPage';
import DefaultLayout from '@/layouts/DefaultLayouts/DefaultLayout';

function PaymentRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<PaymentPage />} />
        <Route path="/success" element={<PaymentSuccess />} />
      </Route>
    </Routes>
  );
}

export default PaymentRouter;
