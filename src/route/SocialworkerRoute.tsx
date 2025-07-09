import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import SocialworkerHomePage from '@/page/Socialworker/Home/SocialworkerHomePage';
import PointPage from '@/page/Common/PointPage';
import SocialworkerMyPage from '@/page/Socialworker/MyPage/SocialworkerMyPage';

const SocialworkerRoute = () => {
  const location = useLocation();

  const hideTabBarPaths = [
    '/socialWorker/my/profile',
    '/socialWorker/my/association',
    '/socialWorker/my/institution',
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
          <Route path="/my" element={<SocialworkerMyPage />} />

          <Route path="/point" element={<PointPage />} />
        </Routes>
      </main>

      {!isHideTabBar && <SocialWorkerTabBar />}
    </div>
  );
};

export default SocialworkerRoute;
