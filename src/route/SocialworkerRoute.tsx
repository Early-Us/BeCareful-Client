import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import PointPage from '@/page/Common/PointPage';
import SocialworkerHomePage from '@/page/SocialWorker/Home/SocialworkerHomePage';
import SocialworkerMyRoute from '@/route/SocialworkerMyRoute';

const SocialworkerRoute = () => {
  const location = useLocation();

  const hideTabBarPaths = [
    '/socialworker/my/profile',
    '/socialworker/my/institution',
    '/socialworker/my/association',
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
          <Route path="/" element={<SocialworkerHomePage />} />
          <Route path="/my/*" element={<SocialworkerMyRoute />} />

          <Route path="/point" element={<PointPage />} />
        </Routes>
      </main>

      {!isHideTabBar && <SocialWorkerTabBar />}
    </div>
  );
};

export default SocialworkerRoute;
