import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import CaregiverTabBar from '@/components/Caregiver/CaregiverTabBar';
import CaregiverHomePage from '@/page/Caregiver/Home/CaregiverHomePage';
import CaregiverMyworkPage from '@/page/Caregiver/Home/CaregiverMyworkPage';
import PointPage from '@/page/Common/PointPage';
import CaregiverMyRoute from './CaregiverMyRoute';
import CaregiverWorkPage from '@/page/Caregiver/Work/CaregiverWorkPage';
import CaregiverWorkDetailPage from '@/page/Caregiver/Work/CaregiverWorkDetailPage';
import CaregiverApplyPage from '@/page/Caregiver/Apply/CaregiverApplyPage';
import CaregiverApplyDetailPage from '@/page/Caregiver/Apply/CaregiverApplyDetailPage';

const CaregiverRoute = () => {
  const location = useLocation();

  const hideTabBarPaths = [
    '/caregiver/mywork',
    '/caregiver/work/:recruitmentId',
    '/caregiver/apply/:recruitmentId',
    '/caregiver/point',
    '/caregiver/my/profile',
    '/caregiver/my/career',
    '/caregiver/my/application',
  ];
  const shouldHideTabBar = () => {
    return hideTabBarPaths.some((pathPattern) => {
      return matchPath(pathPattern, location.pathname) !== null;
    });
  };
  const isHideTabBar = shouldHideTabBar();

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <main>
        <Routes>
          <Route path="/" element={<CaregiverHomePage />} />
          <Route path="/mywork" element={<CaregiverMyworkPage />} />
          <Route path="/work" element={<CaregiverWorkPage />} />
          <Route
            path="/work/:recruitmentId"
            element={<CaregiverWorkDetailPage />}
          />
          <Route path="/apply" element={<CaregiverApplyPage />} />
          <Route
            path="/apply/:recruitmentId"
            element={<CaregiverApplyDetailPage />}
          />
          <Route path="/my/*" element={<CaregiverMyRoute />} />

          <Route path="/point" element={<PointPage />} />
        </Routes>
      </main>

      {!isHideTabBar && <CaregiverTabBar />}
    </div>
  );
};

export default CaregiverRoute;
