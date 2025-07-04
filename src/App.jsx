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

function App() {
  return (
    <>
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
