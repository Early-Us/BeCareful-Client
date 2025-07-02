import CaregiverTabBar from '@/components/Caregiver/CaregiverTabBar';
import CaregiverHomePage from '@/page/Caregiver/Home/CaregiverHomePage';
import CaregiverMyworkPage from '@/page/Caregiver/Home/CaregiverMyworkPage';
import CaregiverPointPage from '@/page/Caregiver/CaregiverPointPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import CaregiverMyRoute from './CaregiverMyRoute';

const CaregiverRoute = () => {
  const location = useLocation();

  const hideTabBarPaths = [
    '/caregiver/mywork',
    '/caregiver/point',
    '/caregiver/my/profile',
    '/caregiver/my/career',
    '/caregiver/my/application',
  ];
  const isHideTabBar = hideTabBarPaths.includes(location.pathname);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <main
        style={{ flexGrow: 1, paddingBottom: isHideTabBar ? '0px' : '57px' }}
      >
        <Routes>
          <Route path="/" element={<CaregiverHomePage />} />
          <Route path="/mywork" element={<CaregiverMyworkPage />} />
          <Route path="/my/*" element={<CaregiverMyRoute />} />

          <Route path="/point" element={<CaregiverPointPage />} />
        </Routes>
      </main>

      {!isHideTabBar && <CaregiverTabBar />}
    </div>
  );
};

export default CaregiverRoute;
