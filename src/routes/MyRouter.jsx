import { Route, Routes } from 'react-router-dom';

import MyPage from '@/features/main/pages/MyPage/MyPage';
import DefaultLayout from '@/layouts/DefaultLayouts/DefaultLayout';

function MyRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<MyPage />} />
        <Route path="/cart" />
        <Route path="/order" />
      </Route>
    </Routes>
  );
}

export default MyRouter;
