import { Route, Routes } from 'react-router-dom';
import CommunitySplashPage from '@/page/CommunitySplashPage';
import { CommunityCreatePage } from '@/page/Community/CommunityCreatePage';
import { CommunitySignUpPage } from '@/page/SignUp/CommunitySignUpPage';
import { CommunityJoinPage } from '@/page/Community/CommunityJoinPage';
import CommunityJoinSelectRolePage from '@/page/Community/CommunityJoinSelectRolePage';
import CommunityPage from '@/page/Community/CommunityPage';
import CommunityPostPage from '@/page/Community/CommunityPostPage';
import CommunitySearchPage from '@/page/Community/CommunitySearchPage';
import CommunityAssociationInfoPage from '@/page/Community/Association/CommunityAssociationInfoPage';
import CommunityAssociationEditPage from '@/page/Community/Association/CommunityAssociationEditPage';
import CommunityMembersPage from '@/page/Community/Association/CommunityMembersPage';
import CommnunityMemberDetailPage from '@/page/Community/Association/CommunityMemberDetailPage';

const CommunityRoute = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <main>
        <Routes>
          <Route path="/splash" element={<CommunitySplashPage />} />

          <Route path="/create" element={<CommunityCreatePage />} />
          <Route path="/signup" element={<CommunitySignUpPage />} />
          <Route path="/members/new" element={<CommunityJoinPage />} />
          <Route path="/:id/preview" element={<CommunityPage previewMode />} />
          <Route
            path="/join/:id/role"
            element={<CommunityJoinSelectRolePage />}
          />

          <Route index element={<CommunityPage />} />
          <Route path="/:postId" element={<CommunityPostPage />} />
          <Route path="/search" element={<CommunitySearchPage />} />

          <Route path="/:associationId">
            <Route path="info" element={<CommunityAssociationInfoPage />} />
            <Route path="edit" element={<CommunityAssociationEditPage />} />
            <Route path="members" element={<CommunityMembersPage />} />
            <Route
              path="members/:memberId"
              element={<CommnunityMemberDetailPage />}
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default CommunityRoute;
