import { useSignUpContext } from '@/contexts/SignUpContext';
import { styled } from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { CheckCard } from '@/components/SignUp/SignUpFunnel/CheckCard';

export const Step1SelectRole = () => {
  const { goToNext } = useSignUpContext();
  return (
    <StepWrapper>
      <HeaderSection>
        <Title>
          소속된 기관에서
          <br />
          현재 직급을 알려주세요<span className="highlight"> *</span>
        </Title>
      </HeaderSection>

      <CardContainer>
        <CheckCard pressed text="센터장 입니다." />
        <CheckCard text="대표 입니다." />
        <CheckCard text="사회복지사 입니다." />
      </CardContainer>
      <ButtonContainer>
        <Button onClick={goToNext} height={'52px'}>
          이전
        </Button>
        <Button onClick={goToNext} height={'52px'}>
          다음
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 20px 0 20px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  gap: 8px;
  width: 100%;
`;
