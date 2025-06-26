import styled from 'styled-components';
import { ReactComponent as Home } from '@/assets/icons/tabbar/Home.svg';
import { ReactComponent as Task } from '@/assets/icons/tabbar/Task.svg';
import { ReactComponent as Recruite } from '@/assets/icons/tabbar/Recuite.svg';
import { ReactComponent as Mypage } from '@/assets/icons/tabbar/Mypage.svg';
import { Link, useLocation } from 'react-router-dom';

export const SocialWorkerTabBar = () => {
  const location = useLocation();

  return (
    <TabBarWrapper>
      <TabBarContentWrapper as={Link} to="/home/caregiver">
        <TabBarIcon isActive={location.pathname === '/home/caregiver'}>
          <Home />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname === '/home/caregiver'}>
          홈
        </TabBarLabel>
      </TabBarContentWrapper>
      <TabBarContentWrapper as={Link} to="/work">
        <TabBarIcon isActive={location.pathname === '/work'}>
          <Task />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname === '/work'}>
          일자리
        </TabBarLabel>
      </TabBarContentWrapper>
      <TabBarContentWrapper as={Link} to="/apply">
        <TabBarIcon isActive={location.pathname === '/apply'}>
          <Recruite />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname === '/apply'}>
          지원현황
        </TabBarLabel>
      </TabBarContentWrapper>
      <TabBarContentWrapper as={Link} to="/mypage">
        <TabBarIcon isActive={location.pathname === '/mypage'}>
          <Mypage />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname === '/mypage'}>
          마이페이지
        </TabBarLabel>
      </TabBarContentWrapper>
    </TabBarWrapper>
  );
};

const TabBarWrapper = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  position: fixed;
  bottom: 0;
  background: ${({ theme }) => theme.colors.white};
`;

const TabBarContentWrapper = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  gap: 2px;
  text-decoration: none;
  cursor: pointer;
`;

const TabBarIcon = styled.div<{ isActive: boolean }>`
  width: 24px;
  height: 24px;
  path {
    fill: ${({ theme, isActive }) =>
      isActive ? theme.colors.mainBlue : theme.colors.gray200};
  }
`;

const TabBarLabel = styled.p<{ isActive: boolean }>`
  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.mainBlue : theme.colors.gray200};
`;
