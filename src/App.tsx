import { TestPage } from '@/page/TestPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/Login/LoginPage';
import HomeMyworkPage from './page/Home/HomeMyworkPage';
import HomePage from './page/Home/HomePage';
import { SignUpPage } from '@/page/SignUp/SignUpPage';
import SignUpForm from '@/page/SignUp/SignUpForm';
import MyPage from './page/MyPage/MyPage';
import SplashPage from './page/SplashPage';
import EditProfile from './page/MyPage/EditProfile';
import CreateCareer from './page/MyPage/CreateCareer';
import CreateApplication from './page/MyPage/CreateApplication';
import AreaSelect from './page/MyPage/AreaSelect';

function App() {
  return (
    <Routes>
      <Route path="/test" element={<TestPage />} />

      <Route path="/" element={<SplashPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup/caregiver" element={<SignUpForm />} />

      <Route path="/home" element={<HomePage />} />
      <Route path="/mywork" element={<HomeMyworkPage />} />

      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/profile" element={<EditProfile />} />
      <Route path="/career/create" element={<CreateCareer />} />
      <Route path="/application/create" element={<CreateApplication />} />
      <Route path="/area" element={<AreaSelect />} />
    </Routes>
  );
}

export default App;
