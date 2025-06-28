import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainRouter from '@/routes/MainRouter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
