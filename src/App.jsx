import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from '@/pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="admin/*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
