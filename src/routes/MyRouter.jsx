import { Route, Routes } from 'react-router-dom';

import DefaultLayout from '@/layouts/DefaultLayouts/DefaultLayout';

function MyRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/my" />
        <Route path="/my/cart" />
        <Route path="/my/order" />
      </Route>
    </Routes>
  );
}

export default MyRouter;
