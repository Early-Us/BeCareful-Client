import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { CheckCard } from '@/components/SignUp/SignUpFunnel/CheckCard';

interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}

export const Step3InstitutionType = ({ goToNext, goToPrev }: StepProps) => {
  return (
    <StepWrapper>
      <IconContainer>
        <IconArrowLeft />
      </IconContainer>
      <HeaderSection>
        <Title>
          소속된 기관의 <br />
          시설 유형을 선택하세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>복수 선택이 가능해요.</SubText>
      </HeaderSection>
      <CardContainer>
        <CheckCard pressed text="방문 요양" />
        <CheckCard text="방문 목욕" />
        <CheckCard text="방문 간호" />
        <CheckCard text="주야간 보호" />
        <CheckCard text="단기 보호" />
        <CheckCard text="복지 용구" />
      </CardContainer>

      <ButtonContainer>
        <Button onClick={goToPrev} height={'52px'}>
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
  margin: 24px 0 auto 0;
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

const SubText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray500};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
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
