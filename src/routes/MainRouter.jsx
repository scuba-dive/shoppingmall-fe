import { Route, Routes } from 'react-router-dom';

import CategoryPage from '@/features/main/pages/CategoriesPage/CategoriesPage';
import HomePage from '@/features/main/pages/HomePage/HomePage';
import ProductDetailPage from '@/features/main/pages/ProductDetailPage/ProductDetailPage';
import ProductListPage from '@/features/main/pages/ProductListPage/ProductListPage';
import UserLayout from '@/layouts/UserLayouts/UserLayout';

function MainRouter() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:category" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
}

export default MainRouter;
