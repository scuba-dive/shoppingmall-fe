import { Route, Routes } from 'react-router-dom';

import CartPage from '@/features/cart/pages/CartPage';
import DefaultLayout from '@/layouts/DefaultLayouts/DefaultLayout';

function CartRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default CartRouter;
