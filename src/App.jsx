import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from '@/pages/MainPage';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        <Route path="/*" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
