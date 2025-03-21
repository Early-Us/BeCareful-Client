import { StepProps } from '@/type/SignUp';
import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { Button } from '@/components/common/Button/Button';
import { BooleanNoCard } from '@/components/SignUp/BooleanNoCard';
import { BooleanYesCard } from '@/components/SignUp/BooleanYesCard';
import { useState } from 'react';

export const Step5 = ({
  formData,
  setFormData,
  onNext,
  onPrevious,
}: StepProps) => {
  const [selectedCard, setSelectedCard] = useState<'yes' | 'no' | null>(null);
  const handleCardSelect = (cardType: 'yes' | 'no') => {
    setSelectedCard(cardType);
    setFormData((prev) => ({
      ...prev,
      isCompleteDementiaEducation: cardType === 'yes',
    }));
  };

  return (
    <StepWrapper>
      <IconContainer onClick={onPrevious}>
        <IconArrowLeft />
      </IconContainer>
      <Header>치매 교육을 이수하셨나요?</Header>
      <CardContainer>
        <BooleanYesCard
          pressed={selectedCard === 'yes'}
          text="네, 이수하였습니다."
          onClick={() => handleCardSelect('yes')}
        />
        <BooleanNoCard
          pressed={selectedCard === 'no'}
          text="아니요, 이수하지 않았습니다."
          onClick={() => handleCardSelect('no')}
        />
      </CardContainer>
      <ButtonContainer>
        <Button
          variant={selectedCard ? 'blue' : 'disabled'}
          height="52px"
          onClick={() => {
            if (selectedCard && onNext) {
              console.log('현재 입력된 formData:', formData);
              onNext();
            }
          }}
          disabled={!selectedCard}
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
  width: 100%;
  margin: 24px 16px auto 16px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px;
  box-sizing: border-box;
  height: 56px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  align-items: flex-start;
  box-sizing: border-box;
  padding: 16px 20px 0px 20px;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
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
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  gap: 8px;
  width: 100%;
`;
