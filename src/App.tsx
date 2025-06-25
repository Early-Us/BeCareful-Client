import { Route, Routes } from 'react-router-dom';
import { TestPage } from './page/TestPage';
import { ErrorPage } from './page/Error/ErrorPage';
import LandingPage from './page/Landing/LandingPage';
import CommunitySplashPage from './page/CommunitySplashPage';
import SplashPage from './page/SplashPage';
import { OnboardingPage } from './page/Onboarding/OnboardingPage';
import { SignUpProvider } from './contexts/SignUpContext';
import { SignUpPage } from './page/SignUp/SignUpPage';
import { InstitutionSignUpPage } from './page/SignUp/InstitutionSignUpPage';
import HomeMyworkPage from './page/Home/HomeMyworkPage';
import MyPage from './page/MyPage/MyPage';
import EditProfile from './page/MyPage/EditProfile';
import CreateCareer from './page/MyPage/CreateCareer';
import EditCareer from './page/MyPage/EditCareer';
import CreateApplication from './page/MyPage/CreateApplication';
import EditApplication from './page/MyPage/EditApplication';
import { WorkMainPage } from './page/Works/WorkMainPage';
import { ApplyPage } from './page/Apply/ApplyPage';
import { WorkDetailPage } from './page/Works/WorkDetailPage';
import { ApplyDetailPage } from './page/Apply/ApplyDetailPage';
import CommunityPage from './page/Community/CommunityPage';
import CommunityPost from './components/Community/CommunityPost';
import { CommunityCreatePage } from './page/Community/CommunityCreatePage';
import { CommunitySignUpPage } from './page/SignUp/CommunitySignUpPage';
import SocialHomePage from './page/HomeSocial/SocialHomePage';
import ElderlyPage from './page/Elderly/ElderlyPage';
import EdlerlyCreatePage from './page/Elderly/ElderlyCreatePage';
import { MatchingApplyPage } from './page/Matching/MatchingApplyPage';
import { MatchingElderPage } from './page/Matching/MatchingElderPage';
import { MatchingInformationPage } from './page/Matching/MatchingInformationPage';
import { CareGiverInfoPage } from './page/Matching/CareGiverInfoPage';
import MatchingStatus from './page/Matching/MatchingStatus';
import ChatListPage from './page/Chat/ChatListPage';
import ChatListCaregiver from './page/Chat/ChatListCaregiver';
import ChatRoomPage from './page/Chat/ChatRoomPage';
import CaregiverLayout from './layouts/CaregiverLayout';

function App() {
  return (
    <Routes>
      {/* 협회 관련 - 랜딩 페이지, 커뮤니티 가입 전 로그인 안내 페이지*/}
      <Route path="/landing" element={<LandingPage />} />
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
        element={<CaregiverLayout />}
      />

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

      {/* 커뮤니티 */}
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/:postId" element={<CommunityPost />} />
      <Route path="/community/create" element={<CommunityCreatePage />} />
      <Route path="/home" element={<CommunityCreatePage />} />
      <Route path="/community/signup" element={<CommunitySignUpPage />} />

      {/* 사회복지사 */}
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

      {/* 채팅 - 요양보호사, 사회복지사 */}
      <Route path="/chatList/social" element={<ChatListPage />} />
      <Route path="/chatList/caregiver" element={<ChatListCaregiver />} />
      <Route path="/chatroom/:matchingId" element={<ChatRoomPage />} />

      {/* 테스트, 에러 페이지 */}
      <Route path="/test" element={<TestPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
