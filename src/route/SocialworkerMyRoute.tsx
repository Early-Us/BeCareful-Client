import { API_Association_Rank_Mapping } from '@/constants/associationRank';
import { API_Institution_Rank_Mapping } from '@/constants/institutionRank';
import SocialworkerEditAssociationPage from '@/page/Socialworker/MyPage/SocialworkerEditAssociationPage';
import SocialworkerEditInstituitionPage from '@/page/Socialworker/MyPage/SocialworkerEditInstituitionPage';
import SocialworkerEditProfilePage from '@/page/Socialworker/MyPage/SocialworkerEditProfilePage';
import SocialworkerMyPage from '@/page/Socialworker/MyPage/SocialworkerMyPage';
import { Routes, Route, Outlet } from 'react-router-dom';

const SocialworkerMyRoute = () => {
  return (
    <div>
      <Routes>
        <Route index element={<SocialworkerMyPage />} />
        <Route
          path="profile"
          element={
            <SocialworkerEditProfilePage
              name="김사회"
              nickname="dolbomi2"
              birth="720101"
              genderCode={2}
              phoneNumber="010-2547-2534"
              institution="은파요양원"
              rank={API_Institution_Rank_Mapping['센터장']}
              isAgreedToTerms={true}
              isAgreedToCollectPersonalInfo={true}
              isAgreedToReceiveMarketingInfo={false}
            />
          }
        />
        <Route
          path="institution"
          element={
            <SocialworkerEditInstituitionPage
              institution="은파요양원"
              institutionCode="12345678910"
              year="2007"
              types={['방문 요양', '방문 간호']}
              phoneNumber="02-1234-5678"
            />
          }
        />
        <Route
          path="association"
          element={
            <SocialworkerEditAssociationPage
              association="은파요양원"
              rank={API_Association_Rank_Mapping['회장']}
              isAgreedToTerms={true}
              isAgreedToCollectPersonalInfo={true}
              isAgreedToReceiveMarketingInfo={false}
            />
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
};

export default SocialworkerMyRoute;
