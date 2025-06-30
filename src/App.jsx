import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import AdminPage from '@/pages/AdminPage';
import MainPage from '@/pages/MainPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="admin/*" element={<AdminPage />} />       
      </Routes>
    </Router>
  );
}

export default App;
