import CommunityPost from '@/components/Community/CommunityPost';
import { SignUpProvider } from '@/contexts/SignUpContext';
import { ApplyDetailPage } from '@/page/Apply/ApplyDetailPage';
import { ApplyPage } from '@/page/Apply/ApplyPage';
import ChatListCaregiver from '@/page/Chat/ChatListCaregiver';
import ChatListPage from '@/page/Chat/ChatListPage';
import ChatRoomPage from '@/page/Chat/ChatRoomPage';
import { CommunityCreatePage } from '@/page/Community/CommunityCreatePage';
import { CommunityJoinPage } from '@/page/Community/CommunityJoinPage';
import CommunityJoinSelectRolePage from '@/page/Community/CommunityJoinSelectRolePage';
import CommunityPage from '@/page/Community/CommunityPage';
import CommunitySplashPage from '@/page/CommunitySplashPage';
import ElderlyPage from '@/page/Elderly/ElderlyPage';
import ElderlyRegisterPage from '@/page/Elderly/ElderlyRegisterPage';
import { ErrorPage } from '@/page/Error/ErrorPage';
import SocialHomePage from '@/page/HomeSocial/SocialHomePage';
import { CareGiverInfoPage } from '@/page/Matching/CareGiverInfoPage';
import { MatchingInformationPage } from '@/page/Matching/MatchingInformationPage';
import MatchingStatus from '@/page/Matching/MatchingStatus';
import { RegisterMatchingElderPage } from '@/page/Matching/RegisterMatchingElderPage';
import { OnboardingPage } from '@/page/Onboarding/OnboardingPage';
import { CommunitySignUpPage } from '@/page/SignUp/CommunitySignUpPage';
import { InstitutionSignUpPage } from '@/page/SignUp/InstitutionSignUpPage';
import { SignUpPage } from '@/page/SignUp/SignUpPage';
import { SocialWorkerMatchingPage } from '@/page/SocialWorkerMatching/SocialWorkerMatchingPage';
import SplashPage from '@/page/SplashPage';
import { TestPage } from '@/page/TestPage';
import { WorkDetailPage } from '@/page/Works/WorkDetailPage';
import { WorkMainPage } from '@/page/Works/WorkMainPage';
import { Route, Routes } from 'react-router-dom';
import CaregiverRoute from './route/CaregiverRoute';

function App() {
  return (
    <Routes>
      <Route path="/splash/community" element={<CommunitySplashPage />} />

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

      <Route path="/work" element={<WorkMainPage />} />
      <Route path="/apply" element={<ApplyPage />} />
      <Route path="/work/:recruitmentId" element={<WorkDetailPage />} />
      <Route path="/workdetail" element={<WorkDetailPage />} />

      <Route path="/apply" element={<ApplyPage />} />
      <Route path="/apply/:recruitmentId" element={<ApplyDetailPage />} />

      {/* 커뮤니티 */}
      <Route path="/community" element={<CommunityPage />} />
      <Route
        path="/community/:id/preview"
        element={<CommunityPage previewMode />}
      />
      <Route
        path="/community/join/:id/role"
        element={<CommunityJoinSelectRolePage />}
      />
      <Route path="/community/:postId" element={<CommunityPost />} />
      <Route path="/community/create" element={<CommunityCreatePage />} />
      <Route path="/community/members/new" element={<CommunityJoinPage />} />
      <Route path="/community/signup" element={<CommunitySignUpPage />} />

      {/*기관 관리자 */}
      <Route path="/home/social" element={<SocialHomePage />} />
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

      {/* 테스트, 에러 페이지 */}
      <Route path="/test" element={<TestPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
