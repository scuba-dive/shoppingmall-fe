import { Route, Routes } from 'react-router-dom';

import MyPage from '@/features/my/pages/MyPage/MyPage';
import DefaultLayout from '@/layouts/DefaultLayouts/DefaultLayout';

function MyRouter() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default MyRouter;
