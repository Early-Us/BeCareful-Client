import { NavBar } from '@/components/common/NavBar';
import { SocialTabBar } from '@/components/common/SocialTabBar';
import { ElderlyCard } from '@/components/Elderly/ElderlyCard';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ElderlyPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate('/elderly');
            }}
          >
            어르신 목록
          </NavLeft>
        }
        right={
          <NavRight
            onClick={() => {
              navigate('/elderly/create');
            }}
          >
            등록하기
          </NavRight>
        }
        color=""
      />

      <MainContent>
        <Counting>총 20명</Counting>
        <ElderlyCard
          isMatching={false}
          name="가나다"
          age="65"
          gender="여"
          careLevel="4등급"
          caregiver={2}
        />
        <ElderlyCard
          isMatching={true}
          name="가나다"
          age="70"
          gender="여"
          careLevel="등급없음"
          caregiver={0}
        />
        <ElderlyCard
          isMatching={true}
          name="가나다"
          age="68"
          gender="남"
          careLevel="인지등급"
          caregiver={2}
        />
        <ElderlyCard
          isMatching={false}
          name="가나다"
          age="65"
          gender="여"
          careLevel="2등급"
          caregiver={3}
        />
        <ElderlyCard
          isMatching={true}
          name="가나다"
          age="68"
          gender="남"
          careLevel="5등급"
          caregiver={0}
        />
      </MainContent>
      <SocialTabBar />
    </Container>
  );
};

export default ElderlyPage;

const Container = styled.div`
  margin-bottom: 107px;
`;

const NavLeft = styled.label`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-left: 20px;
`;

const NavRight = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-right: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: auto 20px;
  margin-top: 16px;
`;

const Counting = styled.label`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
