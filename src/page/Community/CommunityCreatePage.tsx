import { ReactComponent as Logo } from '@/assets/icons/Logo.svg';
import { ReactComponent as Chat } from '@/assets/icons/Chat.svg';

import { NavBar } from '@/components/common/NavBar/NavBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { SocialTabBar } from '@/components/common/TabBarSocial';
import { getTodayDate } from '@/utils/getTodayDate';
import { HomeMainContent } from '@/components/Home/HomeMainContent';
import { useRecoilValue } from 'recoil';
import { currentUserInfo } from '@/recoil/currentUserInfo';

export const CommunityCreatePage = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(currentUserInfo);

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate('/caregiver'); //TODO
            }}
          >
            <Logo />
          </NavLeft>
        }
        right={
          <NavRight onClick={() => navigate('/chatlist/caregiver')}>
            <Chat />
          </NavRight>
        }
        color="blue"
      />
      <MainWrapper>
        <LabelWrapper>
          <Name>
            {user.nickName}님
            <br />
            협회 커뮤니티를 둘러보세요.
          </Name>

          <DateLabel>{getTodayDate()}</DateLabel>
        </LabelWrapper>
      </MainWrapper>
      <HomeMainContent />
      <SocialTabBar />
    </Container>
  );
};

const Container = styled.div`
  background: #f2f3f7;
  height: 100vh;
  margin-bottom: 57px;
`;

const NavLeft = styled.div`
  width: 84px;
  height: 32px;
  padding-left: 20px;
  cursor: pointer;
`;

const NavRight = styled.div`
  width: 28px;
  height: 28px;
  padding-right: 20px;
  cursor: pointer;
`;

const MainWrapper = styled.div`
  background: ${({ theme }) => theme.colors.mainBlue};
  height: 188px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

const Name = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.title1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const DateLabel = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
