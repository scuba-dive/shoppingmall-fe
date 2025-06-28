// src/routes/Router.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '@/pages/MainPage';

// import CategoryPage from '../pages/CategoryPage';
// import ProductListPage from '../pages/ProductListPage';
// import ProductDetailPage from '../pages/ProductDetailPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:categoryName" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
