import { useSignUpContext } from '@/contexts/SignUpContext';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';

import { useState } from 'react';
import { NameInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/NameInput';
import { NicknameInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/NicknameInput';

import { PhoneNumberInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/PhoneNumberInput';
import { ResidentIdInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/ResidentIdInput';

export const Step4BasicInfo = () => {
  const { goToNext, goToPrev } = useSignUpContext();
  const [name, setName] = useState('');
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleCheckDuplicate = () => {
    if (nickname === 'dolda1') {
      alert('이미 사용 중인 닉네임입니다.');
    } else {
      alert('사용 가능한 닉네임입니다.');
    }
  };

  const [birthDate, setBirthDate] = useState('');
  const [genderInput, setGenderInput] = useState('');

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  const handleGenderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenderInput(e.target.value);
  };

  return (
    <StepWrapper>
      <IconContainer>
        <IconArrowLeft />
      </IconContainer>
      <HeaderSection>
        <Title>담당자 기본 정보를 입력하세요.</Title>
      </HeaderSection>
      <NameInput value={name} onChange={handleChangeName} />
      <NicknameInput
        value={nickname}
        onChange={handleNicknameChange}
        onCheckDuplicate={handleCheckDuplicate}
      />
      <ResidentIdInput
        birthDate={birthDate}
        genderInput={genderInput}
        onBirthDateChange={handleBirthDateChange}
        onGenderChange={handleGenderInputChange}
      />
      <PhoneNumberInput value={name} onChange={handleChangeName} />
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
