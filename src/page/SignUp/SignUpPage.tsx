import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { useState } from 'react';
import { CareGiverCard } from '@/components/SignUp/CareGiverCard';

import { Button } from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { InstitutionCard } from '@/components/SignUp/InstitutionCard';

export const SignUpPage = () => {
  const [pressed, setPressed] = useState<'caregiver' | 'institution' | null>(
    null,
  );
  const navigate = useNavigate();

  const handleCardClick = (cardType: 'caregiver' | 'institution') => {
    setPressed(cardType);
  };

  const handleNextStep = () => {
    if (pressed) {
      if (pressed === 'caregiver') {
        navigate('/signup/caregiver');
      } else if (pressed === 'institution') {
        navigate('/signup/institution');
      }
    }
  };

  return (
    <FormWrapper>
      <SignUpPageContainer>
        <IconContainer>
          <IconArrowLeft onClick={() => navigate('/login')} />
        </IconContainer>
        <Header>
          환영합니다!
          <div>
            <span className="highlight">회원 유형을 선택</span>
            <span>하세요</span>
          </div>
        </Header>
        <CardContainer>
          <div onClick={() => handleCardClick('caregiver')}>
            <CareGiverCard pressed={pressed === 'caregiver'} />
          </div>

          <div onClick={() => handleCardClick('institution')}>
            <InstitutionCard pressed={pressed === 'institution'} />
          </div>
        </CardContainer>
        <ButtonContainer>
          <Button
            variant={pressed ? 'blue' : 'disabled'}
            height="52px"
            onClick={handleNextStep}
            disabled={!pressed}
          >
            다음 단계로 이동
          </Button>
        </ButtonContainer>
      </SignUpPageContainer>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 24px 16px auto 16px;
`;

const SignUpPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  height: 56px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 16px 20px 0px 0px;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray900};

  .highlight {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: stretchs;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 20px;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
  margin-top: 185px;
`;
