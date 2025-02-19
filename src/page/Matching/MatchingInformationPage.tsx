import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export const MatchingInformationPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <TopContainer>
        <IconContainer onClick={() => navigate('/matching')}>
          <IconArrowLeft />
        </IconContainer>
        정보
        <HideIconContainer />
      </TopContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 24px 16px auto 16px;
`;
const TopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const HideIconContainer = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
