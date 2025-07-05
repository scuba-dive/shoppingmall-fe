import { Route, Routes } from 'react-router-dom';

import PaymentPage from '@/features/pay/pages/PayPage';
import DefaultLayout from '@/layouts/DefaultLayouts/DefaultLayout';

function PaymentRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<PaymentPage />} />
      </Route>
    </Routes>
  );
}

export default PaymentRouter;
