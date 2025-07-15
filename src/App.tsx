import { Route, Routes } from 'react-router-dom';
import SplashPage from '@/page/SplashPage';
import { OnboardingPage } from '@/page/Onboarding/OnboardingPage';
import { SignUpProvider } from '@/contexts/SignUpContext';
import { SignUpPage } from '@/page/SignUp/SignUpPage';
import { InstitutionSignUpPage } from '@/page/SignUp/InstitutionSignUpPage';
import CaregiverRoute from '@/route/CaregiverRoute';
import CommunityRoute from '@/route/CommunityRoute';
import SocialworkerRoute from '@/route/SocialworkerRoute';
import ElderlyPage from '@/page/Elderly/ElderlyPage';
import ElderlyRegisterPage from '@/page/Elderly/ElderlyRegisterPage';
import { SocialWorkerMatchingPage } from '@/page/SocialWorkerMatching/SocialWorkerMatchingPage';
import { RegisterMatchingElderPage } from '@/page/Matching/RegisterMatchingElderPage';
import { MatchingInformationPage } from '@/page/Matching/MatchingInformationPage';
import { CareGiverInfoPage } from '@/page/Matching/CareGiverInfoPage';
import MatchingStatus from '@/page/Matching/MatchingStatus';
import ChatListPage from '@/page/Chat/ChatListPage';
import ChatListCaregiver from '@/page/Chat/ChatListCaregiver';
import ChatRoomPage from '@/page/Chat/ChatRoomPage';
import LandingPage from '@/page/Landing/LandingPage';
import { TestPage } from '@/page/TestPage';
import { ErrorPage } from '@/page/Error/ErrorPage';

function App() {
  return (
    <Routes>
      {/* 초기 - 스플래시, 온보딩, 회원가입 페이지 */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route
        path="/signup"
        element={
          <SignUpProvider>
            <SignUpPage />
          </SignUpProvider>
        }
      />
      <Route
        path="/signup/institution"
        element={
          <SignUpProvider>
            <InstitutionSignUpPage />
          </SignUpProvider>
        }
      />

      {/* 요양보호사 */}
      <Route
        path="/caregiver/*"
        // element={(() => {
        // const user = useRecoilValue(currenUserInfo);
        // if (user.userType === "caregiver") {
        //    return <CaregiverLayout />;
        // }
        // // else if (user.userType === "socialworker") {
        // // return <SocialworkerLayout />;
        // // }
        // })()}
        element={<CaregiverRoute />}
      />

      {/* 커뮤니티 */}
      <Route path="/community/*" element={<CommunityRoute />} />

      {/*기관 관리자 */}
      <Route path="/socialworker/*" element={<SocialworkerRoute />} />

      <Route path="/elderly" element={<ElderlyPage />} />
      <Route path="/elderly/new" element={<ElderlyRegisterPage />} />
      <Route path="/match/social" element={<SocialWorkerMatchingPage />} />
      <Route
        path="/social/matching/new"
        element={<RegisterMatchingElderPage />}
      />
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

      {/* 채팅 - 요양보호사, 사회복지사 */}
      <Route path="/chatList/social" element={<ChatListPage />} />
      <Route path="/caregiver/chatList" element={<ChatListCaregiver />} />
      <Route path="/chatroom/:matchingId" element={<ChatRoomPage />} />

      {/* 협회 랜딩페이지 */}
      <Route path="/landing" element={<LandingPage />} />

      {/* 테스트, 에러 페이지 */}
      <Route path="/test" element={<TestPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
