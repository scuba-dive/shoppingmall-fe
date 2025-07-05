import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AdminPage from '@/pages/AdminPage';
import MainPage from '@/pages/MainPage';

import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import MyPage from './pages/MyPage';
import OrderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import ProtectedAdminRoute from './routes/ProtectedAdminRouter';
import ProtectedUserRoute from './routes/ProtectedUserRouter';

// 원래는 라우터 안에 작성하고 싶었으나.. 우리의 린트가 허용해 주질 않앗어오..ㅜ
const adminElement = (
  <ProtectedAdminRoute allowedRoles={['ADMIN']}>
    <AdminPage />
  </ProtectedAdminRoute>
);

const userElement = (
  <ProtectedUserRoute allowedRoles={['USER', 'ADMIN']}>
    <MyPage />
    <OrderPage />
    <CartPage />
    <PaymentPage />
  </ProtectedUserRoute>
);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<MainPage />} />
          <Route path="auth/*" element={<AuthPage />} />
          <Route path="admin/*" element={adminElement} />
          <Route path="mypage/*" element={userElement} />
          <Route path="order/*" element={userElement} />
          <Route path="cart/*" element={userElement} />
          <Route path="payment/*" element={userElement} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
