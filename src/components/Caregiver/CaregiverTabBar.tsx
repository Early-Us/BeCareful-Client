import styled from 'styled-components';
import { ReactComponent as Home } from '@/assets/icons/tabbar/Home.svg';
import { ReactComponent as Task } from '@/assets/icons/tabbar/Task.svg';
import { ReactComponent as Recruite } from '@/assets/icons/tabbar/Recuite.svg';
import { ReactComponent as Mypage } from '@/assets/icons/tabbar/Mypage.svg';
import { NavLink } from 'react-router-dom';

const CaregiverTabBar = () => {
  return (
    <TabBarWrapper>
      <TabItem to="/caregiver" end>
        {/* 'end' prop은 정확히 일치하는 경로일 때만 active */}
        <Home />
        <span>홈</span>
      </TabItem>
      <TabItem to="/caregiver/task" end>
        <Task />
        <span>일자리</span>
      </TabItem>
      <TabItem to="/caregiver/recruite" end>
        <Recruite />
        <span>지원현황</span>
      </TabItem>
      <TabItem to="/caregiver/mypage" end>
        <Mypage />
        <span>마이페이지</span>
      </TabItem>
    </TabBarWrapper>
  );
};

export default CaregiverTabBar;

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

const TabItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  gap: 2px;
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray200};
  svg {
    path {
      fill: ${({ theme }) => theme.colors.gray200};
    }
  }

  span {
    font-size: 11px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  &.active {
    color: ${({ theme }) => theme.colors.mainBlue};
    svg {
      path {
        fill: ${({ theme }) => theme.colors.mainBlue};
      }
    }
  }
`;
