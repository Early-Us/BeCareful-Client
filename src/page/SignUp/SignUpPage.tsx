import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { useState } from 'react';
import { CareGiverCard } from '@/components/SignUp/CareGiverCard';
import { SocialCard } from '@/components/SignUp/SocialCard';
import { Button } from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
  const [pressed, setPressed] = useState<'caregiver' | 'social' | null>(null);
  const navigate = useNavigate();

  const handleCardClick = (cardType: 'caregiver' | 'social') => {
    setPressed(cardType);
  };

  const handleNextStep = () => {
    if (pressed) {
      if (pressed === 'caregiver') {
        navigate('/signup/caregiver');
      } else if (pressed === 'social') {
        navigate('/signup/social');
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

          <div onClick={() => handleCardClick('social')}>
            <SocialCard pressed={pressed === 'social'} />
          </div>
        </CardContainer>
        <Border />
        <Button
          variant={pressed ? 'blue' : 'disabled'}
          height="52px"
          onClick={handleNextStep}
          disabled={!pressed}
          style={{ margin: '20px 0px' }}
        >
          다음 단계로 이동
        </Button>
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
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 20px;
  flex-direction: column;
  gap: 20px;
`;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-top: 185px;
`;
