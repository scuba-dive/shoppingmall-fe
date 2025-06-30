import { Route, Routes } from 'react-router-dom';

import OrderPage from '@/features/order/pages/OrderPage';
import DefaultLayout from '@/layouts/DefaultLayouts/DefaultLayout';

function OrderRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<OrderPage />} />
      </Route>
    </Routes>
  );
}

export default OrderRouter;
