import { Routes, Route, Outlet } from 'react-router-dom';
import CaregiverMyPage from '@/page/Caregiver/MyPage/CaregiverMyPage';
import CaregiverEditProfilePage from '@/page/Caregiver/MyPage/CaregiverEditProfilePage';
import CaregiverCareerPage from '@/page/Caregiver/MyPage/CaregiverCareerPage';
import CaregiverApplicationPage from '@/page/Caregiver/MyPage/CaregiverApplicationPage';

const CaregiverMyRoute = () => {
  return (
    <div>
      <Routes>
        <Route index element={<CaregiverMyPage />} />
        <Route path="profile" element={<CaregiverEditProfilePage />} />
        <Route path="career" element={<CaregiverCareerPage />} />
        <Route path="application" element={<CaregiverApplicationPage />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default CaregiverMyRoute;
