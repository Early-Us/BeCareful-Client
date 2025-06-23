import styled from 'styled-components';
import { ReactComponent as Home } from '@/assets/icons/tabbar/Home.svg';
import { ReactComponent as MatchingIcon } from '@/assets/icons/matching/MatchingIcon.svg';
import { ReactComponent as Community } from '@/assets/icons/tabbar/Community.svg';
import { ReactComponent as Mypage } from '@/assets/icons/tabbar/Mypage.svg';
import { Link, useLocation } from 'react-router-dom';

export const SocialTabBar = () => {
  const location = useLocation();

  return (
    <TabBarWrapper>
      <TabBarContentWrapper as={Link} to="/home/social">
        <TabBarIcon isActive={location.pathname === '/home/social'}>
          <Home />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname === '/home/social'}>
          홈
        </TabBarLabel>
      </TabBarContentWrapper>
      <TabBarContentWrapper as={Link} to="/matching">
        <TabBarIcon isActive={location.pathname === '/matching'}>
          <MatchingIcon />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname === '/matching'}>
          매칭하기
        </TabBarLabel>
      </TabBarContentWrapper>
      <TabBarContentWrapper as={Link} to="/community">
        <TabBarIcon isActive={location.pathname === '/community'}>
          <Community />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname === '/community'}>
          커뮤니티
        </TabBarLabel>
      </TabBarContentWrapper>
      <TabBarContentWrapper as={Link} to="/elderly">
        <TabBarIcon isActive={location.pathname === '/elderly'}>
          <Mypage />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname === '/elderly'}>
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
  z-index: 1;
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

  rect,
  circle {
    stroke: ${({ theme, isActive }) =>
      isActive ? theme.colors.mainBlue : theme.colors.gray200};
  }
`;

const TabBarLabel = styled.p<{ isActive: boolean }>`
  font-size: 11px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.mainBlue : theme.colors.gray200};
`;
