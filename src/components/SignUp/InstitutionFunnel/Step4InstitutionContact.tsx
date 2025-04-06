import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { useState } from 'react';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';
interface StepProps {
  goToNext: () => void;
  goToPrev: () => void;
}

interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Step4InstitutionContact = (
  { goToNext, goToPrev }: StepProps,
  { value, onChange }: NameInputProps,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [institutionName, setInstitutionName] = useState('');
  return (
    <StepWrapper>
      <IconContainer>
        <IconArrowLeft />
      </IconContainer>
      <HeaderSection>
        <Title>
          소속된 기관의 <br />
          연락처를 입력하세요.
          <span className="highlight"> *</span>
        </Title>
        <SubText>기관 대표 전화번호를 입력해 주세요.</SubText>
      </HeaderSection>
      <SearchContainer>
        <PlainInputBox
          width="100%"
          state="default"
          placeholder="기관 연락처 입력"
          guide=""
          value={value}
          onChange={onChange}
        />
      </SearchContainer>

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

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  flex-direction: column;
`;
