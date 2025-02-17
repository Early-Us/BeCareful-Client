import { TestPage } from '@/page/TestPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/Login/LoginPage';
import HomeMyworkPage from './page/Home/HomeMyworkPage';
import HomePage from './page/Home/HomePage';
import { SignUpPage } from '@/page/SignUp/SignUpPage';
import SignUpForm from '@/page/SignUp/SignUpForm';
import { WorkDetailPage } from '@/page/Works/WorkDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/test" element={<TestPage />} />

      <Route path="/" element={<HomePage />} />
      <Route path="/mywork" element={<HomeMyworkPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup/caregiver" element={<SignUpForm />} />

      <Route path="/work/workdetail" element={<WorkDetailPage />} />
    </Routes>
  );
}

export default App;
