import { styled } from 'styled-components';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { SocialStepProps } from '@/type/SocialSignUp';
import { BooleanYesCard } from '@/components/SignUp/BooleanYesCard';
import { BooleanNoCard } from '@/components/SignUp/BooleanNoCard';
import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';

export const SocialStep6 = ({
  formSocialData,
  setFormSocialData,
  onPrevious,
  onNext,
}: SocialStepProps) => {
  console.log(formSocialData, setFormSocialData);

  const [selectedCard, setSelectedCard] = useState<'yes' | 'no' | null>(null);
  const handleCardSelect = (cardType: 'yes' | 'no') => {
    setSelectedCard(cardType);
    setFormSocialData((prev) => ({
      ...prev,
      isHavingCar: cardType === 'yes',
    }));
  };

  return (
    <StepWrapper>
      <IconContainer onClick={onPrevious}>
        <IconArrowLeft />
      </IconContainer>
      <Header>
        소속된 기관에서 <br />
        현재 직급을 알려주세요
      </Header>
      <CardContainer>
        <BooleanYesCard
          pressed={selectedCard === 'yes'}
          text="센터장 입니다."
          onClick={() => handleCardSelect('yes')}
        />
        <BooleanNoCard
          pressed={selectedCard === 'no'}
          text="사회복지사 입니다."
          onClick={() => handleCardSelect('no')}
        />
      </CardContainer>
      <ButtonContainer>
        <Button
          variant={selectedCard ? 'blue' : 'disabled'}
          height="52px"
          onClick={() => {
            if (selectedCard && onNext) {
              console.log('현재 입력된 formData:', formSocialData);
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
  padding: 16px 20px 0px 20px;
  box-sizing: border-box;
  width: 100%;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
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
