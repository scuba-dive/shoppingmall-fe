import { Route, Routes } from 'react-router-dom';

import DefaultLayout from '@/layouts/DefaultLayouts/DefaultLayout';

function CartRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" />
      </Route>
    </Routes>
  );
}

export default CartRouter;
