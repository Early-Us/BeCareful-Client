import CaregiverTabBar from '@/components/Caregiver/CaregiverTabBar';
import CaregiverHomePage from '@/page/Caregiver/CaregiverHomePage';
import CaregiverMyworkPage from '@/page/Caregiver/CaregiverMyworkPage';
import { Route, Routes, useLocation } from 'react-router-dom';

const CaregiverLayout = () => {
  const location = useLocation();

  const hideTabBarPaths = ['/caregiver/mywork'];
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
          {/* <Route path="jobs" element={<CaregiverJobListPage />} />
          <Route
            path="applications"
            element={<CaregiverApplicationStatusPage />}
          />
          <Route path="profile" element={<CaregiverProfilePage />} /> */}
        </Routes>
        {/* <Outlet /> 중첩 라우트가 있다면 사용 (예: /profile/edit) */}
      </main>

      {!isHideTabBar && <CaregiverTabBar />}
    </div>
  );
};

export default CaregiverLayout;
