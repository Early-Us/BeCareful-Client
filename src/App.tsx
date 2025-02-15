import SignUp from '@/page/SignUp/SignUp';
import { TestPage } from '@/page/TestPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/Login/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/test" element={<TestPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
