import CaregiverTabBar from '@/components/Caregiver/CaregiverTabBar';
import CaregiverHomePage from '@/page/Caregiver/CaregiverHomePage';
import { Route, Routes } from 'react-router-dom';

const CaregiverLayout = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <main style={{ flexGrow: 1, paddingBottom: '57px' }}>
        <Routes>
          <Route path="/" element={<CaregiverHomePage />} />
          {/* <Route path="jobs" element={<CaregiverJobListPage />} />
          <Route
            path="applications"
            element={<CaregiverApplicationStatusPage />}
          />
          <Route path="profile" element={<CaregiverProfilePage />} /> */}
        </Routes>
        {/* <Outlet /> 중첩 라우트가 있다면 사용 (예: /profile/edit) */}
      </main>

      <CaregiverTabBar />
    </div>
  );
};

export default CaregiverLayout;
