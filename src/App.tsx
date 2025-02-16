import { TestPage } from '@/page/TestPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/Login/LoginPage';
import HomeMyworkPage from './page/Home/HomeMyworkPage';
import HomePage from './page/Home/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/mywork" element={<HomeMyworkPage />} />
    </Routes>
  );
}

export default App;
