import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from '@/pages/AdminPage';
import MainPage from '@/pages/MainPage';

import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import MyPage from './pages/MyPage';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="auth/*" element={<AuthPage />} />
        <Route path="admin/*" element={<AdminPage />} />
        <Route path="mypage/*" element={<MyPage />} />
        <Route path="order/*" element={<OrderPage />} />
        <Route path="cart/*" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
