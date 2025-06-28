import { Route, Routes } from 'react-router-dom';

// import CategoriesPage from '@/features/main/pages/CategoriesPage';
import HomePage from '@/features/main/pages/HomePage';
// import ProductListPage from '@/features/main/pages/ProductListPage';
import UserLayout from '@/layouts/UserLayouts/UserLayout';

function MainRouter() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/category/:name" element={<CategoriesPage />} /> */}
        {/* <Route path="/product/:id" element={<ProductListPage />} /> */}
      </Route>
    </Routes>
  );
}

export default MainRouter;
