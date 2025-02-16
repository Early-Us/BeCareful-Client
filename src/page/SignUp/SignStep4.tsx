import { StepProps } from '@/type/SignUp';
import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { Button } from '@/components/common/Button/Button';
import { BooleanNoCard } from '@/components/common/SignUp/BooleanNoCard';
import { BooleanYesCard } from '@/components/common/SignUp/BooleanYesCard';
import { useState } from 'react';

export const Step4 = ({
  formData,
  setFormData,
  onNext,
  onPrevious,
}: StepProps) => {
  const [selectedCard, setSelectedCard] = useState<'yes' | 'no' | null>(null);
  const handleCardSelect = (cardType: 'yes' | 'no') => {
    setSelectedCard(cardType);
  };
  return (
    <StepWrapper>
      <IconContainer onClick={onPrevious}>
        <IconArrowLeft />
      </IconContainer>
      <Header>차량을 소유하고 계신가요?</Header>
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
          variant={selectedCard ? 'blue' : 'disabled'}
          width="320px"
          height="52px"
          onClick={() => {
            console.log('현재 입력된 formData:', formData);
            if (onNext) onNext();
          }}
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
  justify-content: center;
  align-items: center;
  width: 320px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  align-items: flex-start;
  padding: 16px 20px 0px 20px;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 286px 0 20px 0;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  gap: 8px;
  width: 100%;
`;
