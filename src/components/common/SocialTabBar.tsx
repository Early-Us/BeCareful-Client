import styled from 'styled-components';
import { ReactComponent as Home } from '@/assets/icons/tabbar/Home.svg';
import { ReactComponent as MatchingIcon } from '@/assets/icons/matching/MatchingIcon.svg';
import { ReactComponent as CurrentMatching } from '@/assets/icons/matching/CurrentMatching.svg';
import { ReactComponent as Mypage } from '@/assets/icons/tabbar/Mypage.svg';
import { useLocation } from 'react-router-dom';

export const SocialTabBar = () => {
  const location = useLocation();

  return (
    <TabBarWrapper>
      <TabBarContentWrapper href="home/social">
        <TabBarIcon isActive={location.pathname == '/home/social'}>
          <Home />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname == 'home/social'}>
          홈
        </TabBarLabel>
      </TabBarContentWrapper>
      <TabBarContentWrapper href="/matching">
        <TabBarIcon isActive={location.pathname == '/matching'}>
          <MatchingIcon />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname == '/matching'}>
          매칭하기
        </TabBarLabel>
      </TabBarContentWrapper>
      <TabBarContentWrapper href="/matching-dashboard">
        <TabBarIcon isActive={location.pathname == '/matching-dashboard'}>
          <CurrentMatching />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname == '/matching-dashboard'}>
          매칭현황
        </TabBarLabel>
      </TabBarContentWrapper>
      <TabBarContentWrapper href="/elderlist">
        <TabBarIcon isActive={location.pathname == '/elderlist'}>
          <Mypage />
        </TabBarIcon>
        <TabBarLabel isActive={location.pathname == '/elderlist'}>
          어르신 목록
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
