import { useSignUpContext } from '@/contexts/SignUpContext';
import { styled } from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import { CheckCard } from '@/components/SignUp/SignUpFunnel/CheckCard';
import { useNavigate } from 'react-router-dom';

export const Step1SelectRole = () => {
  const { goToNext, setStep, formData, setFormData } = useSignUpContext();
  const handleRoleChange = (selectedRole: string) => {
    setFormData((prev) => ({ ...prev, institutionRole: selectedRole }));

    if (selectedRole === '사회복지사') {
      setStep(2);
    }
  };

  const navigate = useNavigate();
  const goToPrev = () => {
    navigate(-1);
  };

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
        <CheckCard
          pressed={formData.institutionRole === '센터장'}
          text="센터장 입니다."
          onClick={() => handleRoleChange('센터장')}
        />
        <CheckCard
          pressed={formData.institutionRole === '대표'}
          text="대표 입니다."
          onClick={() => handleRoleChange('대표')}
        />
        <CheckCard
          pressed={formData.institutionRole === '사회복지사'}
          text="사회복지사 입니다."
          onClick={() => handleRoleChange('사회복지사')}
        />
      </CardContainer>
      <ButtonContainer>
        <Button onClick={goToPrev} height={'52px'} variant="blue2">
          이전
        </Button>
        <Button
          onClick={goToNext}
          disabled={!formData.institutionRole}
          variant={formData.institutionRole ? 'blue' : 'gray'}
          height="52px"
        >
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
