import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import SocialworkerHomePage from '@/page/SocialWorker/Home/SocialworkerHomePage';

const SocialworkerRoute = () => {
  const location = useLocation();

  const hideTabBarPaths = ['/socialWorker/my/profile'];
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
        </Routes>
      </main>

      {!isHideTabBar && <SocialWorkerTabBar />}
    </div>
  );
};

export default SocialworkerRoute;
