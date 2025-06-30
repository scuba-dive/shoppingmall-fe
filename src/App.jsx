import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from '@/pages/AdminPage';
import MainPage from '@/pages/MainPage';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        <Route path="/*" element={<MainPage />} />
        <Route path="admin/*" element={<AdminPage />} />

        <Route path="my/*" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
