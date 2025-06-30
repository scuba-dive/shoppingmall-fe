import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from '@/pages/AdminPage';
import MainPage from '@/pages/MainPage';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

import CartPage from './pages/CartPage';
import MyPage from './pages/MyPage';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        <Route path="/*" element={<MainPage />} />
        <Route path="admin/*" element={<AdminPage />} />

        <Route path="mypage/*" element={<MyPage />} />

        <Route path="order/*" element={<OrderPage />} />
        <Route path="cart/*" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
