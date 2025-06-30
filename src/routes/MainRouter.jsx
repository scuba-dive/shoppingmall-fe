import { Route, Routes } from 'react-router-dom';

import CategoryPage from '@/features/main/pages/CategoriesPage/CategoriesPage';
import HomePage from '@/features/main/pages/HomePage/HomePage';
// import ProductListPage from '@/features/main/pages/ProductListPage';
import UserLayout from '@/layouts/UserLayouts/UserLayout';

function MainRouter() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        {/* <Route path="/category/:name" element={<CategoriesPage />} /> */}
        {/* <Route path="/product/:id" element={<ProductListPage />} /> */}
      </Route>
    </Routes>
  );
}

export default MainRouter;
