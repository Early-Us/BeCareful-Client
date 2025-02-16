import { StepProps } from '@/type/SignUp';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { SearchInput } from '@/page/SignUp/SearchInput';

import { useState } from 'react';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';

export const Step6 = ({
  formData,
  setFormData,
  onNext,
  onPrevious,
}: StepProps) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <StepWrapper>
      <IconContainer onClick={onPrevious}>
        <IconArrowLeft />
      </IconContainer>
      <Header>
        현재 거주하시는
        <br />
        주소를 입력하세요
      </Header>

      <CardContainer>
        <SearchInput
          placeholder="도로명, 지번, 건물명 검색"
          onClick={() => setShowInput(true)}
        />
      </CardContainer>

      {showInput && (
        <CardContainer>
          <PlainInputBox
            width="320px"
            state="default"
            placeholder="상세 주소 입력"
            guide=""
          />
        </CardContainer>
      )}

      <ButtonContainer>
        <Button
          variant="blue"
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
  width: 360px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
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
  box-sizing: border-box;

  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 334px 0 20px 0;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 20px 0px 20px;
`;
