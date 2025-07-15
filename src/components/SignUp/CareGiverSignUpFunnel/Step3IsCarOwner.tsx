import { Button } from '@/components/common/Button/Button';
import { BooleanNoCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/BooleanNoCard';
import { BooleanYesCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/BooleanYesCard';
import { useCaregiverSignUpContext } from '@/contexts/CaregiverSignUpContext';
import { useState } from 'react';
import { styled } from 'styled-components';

export const Step3IsCarOwner = () => {
  const { goToNext, setFormData } = useCaregiverSignUpContext();
  const [selectedCard, setSelectedCard] = useState<'yes' | 'no' | null>(null);
  const handleCardSelect = (cardType: 'yes' | 'no') => {
    setSelectedCard(cardType);
    setFormData((prev) => ({
      ...prev,
      isHavingCar: cardType === 'yes',
    }));
  };

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>차량을 소유하고 계신가요?</Title>
      </HeaderSection>
      <CardContainer>
        <BooleanYesCard
          pressed={selectedCard === 'yes'}
          text="네, 소유하고 있습니다."
          onClick={() => handleCardSelect('yes')}
        />
        <BooleanNoCard
          pressed={selectedCard === 'no'}
          text="아니오, 가지고 있지 않습니다."
          onClick={() => handleCardSelect('no')}
        />
      </CardContainer>
      <ButtonContainer>
        <Button
          onClick={goToNext}
          disabled={!selectedCard}
          variant={selectedCard ? 'blue' : 'gray'}
          height="52px"
        >
          다음 단계로 이동
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
  overflow-y: auto;
  padding-bottom: 112px;
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

  background: ${({ theme }) => theme.colors.white};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
`;
