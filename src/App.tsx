import { TestPage } from '@/page/TestPage';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/Login/LoginPage';
import HomeMyworkPage from './page/Home/HomeMyworkPage';
import HomePage from './page/Home/HomePage';

import MyPage from './page/MyPage/MyPage';
import SplashPage from './page/SplashPage';
import EditProfile from './page/MyPage/EditProfile';
import CreateCareer from './page/MyPage/CreateCareer';
import CreateApplication from './page/MyPage/CreateApplication';
import EditCareer from './page/MyPage/EditCareer';
import EditApplication from './page/MyPage/EditApplication';
import { WorkDetailPage } from '@/page/Works/WorkDetailPage';
import { WorkMainPage } from '@/page/Works/WorkMainPage';
import { ApplyPage } from '@/page/Apply/ApplyPage';

import SocialHomePage from './page/HomeSocial/SocialHomePage';
import { MatchingApplyPage } from '@/page/Matching/MatchingApplyPage';
import { MatchingElderPage } from '@/page/Matching/MatchingElderPage';
import { MatchingInformationPage } from '@/page/Matching/MatchingInformationPage';
import { ApplyDetailPage } from '@/page/Apply/ApplyDetailPage';
import { CareGiverInfoPage } from '@/page/Matching/CareGiverInfoPage';
import ElderlyPage from './page/Elderly/ElderlyPage';
import EdlerlyCreatePage from './page/Elderly/ElderlyCreatePage';
import ChatListPage from './page/Chat/ChatListPage';
import ChatRoomPage from './page/Chat/ChatRoomPage';
import MatchingStatus from './page/Matching/MatchingStatus';
import ChatListCaregiver from './page/Chat/ChatListCaregiver';
import { InstitutionSignUpPage } from '@/page/SignUp/InstitutionSignUpPage';
import { SignUpPage } from '@/page/SignUp/SignUpPage';
import CommunityPage from './page/Community/CommunityPage';
import { OnboardingPage } from '@/page/Onboarding/OnboardingPage';

function App() {
  return (
    <Routes>
      <Route path="/test" element={<TestPage />} />

      <Route path="/" element={<SplashPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup/institution" element={<InstitutionSignUpPage />} />

      <Route path="/home/caregiver" element={<HomePage />} />
      <Route path="/mywork" element={<HomeMyworkPage />} />

      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/profile" element={<EditProfile />} />
      <Route path="/career/create" element={<CreateCareer />} />
      <Route path="/career/edit" element={<EditCareer />} />
      <Route path="/application/create" element={<CreateApplication />} />
      <Route path="/application/edit" element={<EditApplication />} />

      <Route path="/work" element={<WorkMainPage />} />
      <Route path="/apply" element={<ApplyPage />} />

      <Route path="/work/:recruitmentId" element={<WorkDetailPage />} />
      <Route path="/workdetail" element={<WorkDetailPage />} />
      <Route path="/apply/:recruitmentId" element={<ApplyDetailPage />} />

      <Route path="/home/social" element={<SocialHomePage />} />

      <Route path="/elderly" element={<ElderlyPage />} />
      <Route path="/elderly/create" element={<EdlerlyCreatePage />} />

      <Route path="/matching" element={<MatchingApplyPage />} />
      <Route path="/matching/elder-apply" element={<MatchingElderPage />} />
      <Route
        path="/matching/info/:recruitmentId"
        element={<MatchingInformationPage />}
      />
      <Route
        path="/matching/:recruitmentId/caregiver/:caregiverId"
        element={<CareGiverInfoPage />}
      />
      <Route path="/matching/caregiver" element={<CareGiverInfoPage />} />
      <Route path="/matching/dashboard" element={<MatchingStatus />} />

      <Route path="/chatList/social" element={<ChatListPage />} />
      <Route path="/chatList/caregiver" element={<ChatListCaregiver />} />
      <Route path="/chatroom/:matchingId" element={<ChatRoomPage />} />

      <Route path="/community" element={<CommunityPage />} />
    </Routes>
  );
}

export default App;
