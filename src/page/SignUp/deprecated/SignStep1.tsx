import { StepProps } from '@/types/SignUp';
import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { usePhoneVerification } from '@/hooks/SignUp/usePhoneVerification';
import { useNavigate } from 'react-router-dom';
import { SignUpNameInput } from '@/components/SignUp/deprecated/Step1/SignUpNameInput';
import { SignUpIdInput } from '@/components/SignUp/deprecated/Step1/SingUpIdInput';
import { SignUpPhoneVerificationInput } from '@/components/SignUp/deprecated/Step1/SignUpPhoneVerificationInput';

export const Step1 = ({ formData, setFormData, onNext }: StepProps) => {
  const [genderInput, setGenderInput] = useState('');
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const {
    authNumber,
    setAuthNumber,
    remainingTime,
    showVerificationInput,
    sendAuthNumber,
    verifyAuthNumber,
  } = usePhoneVerification(apiUrl);

  useEffect(() => {
    if (remainingTime === 0) {
      alert('인증번호 유효 시간이 초과되었습니다.');
    }
  }, [remainingTime]);

  useEffect(() => {
    const isValid =
      formData.name.trim() !== '' &&
      formData.birthDate.length === 6 &&
      genderInput.length === 1 &&
      formData.phoneNumber.length >= 10;

    setIsFormValid(isValid);
  }, [formData, genderInput]);

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]{0,1}$/.test(value)) {
      setGenderInput(value);
      if (value === '1' || value === '3') {
        setFormData({ ...formData, gender: 'MALE' });
      } else if (value === '2' || value === '4') {
        setFormData({ ...formData, gender: 'FEMALE' });
      }
    }
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, birthDate: value });
  };

  return (
    <StepWrapper>
      <IconContainer onClick={() => navigate('/signup')}>
        <IconArrowLeft />
      </IconContainer>

      <Header>기본 정보를 입력하세요</Header>

      <SignUpNameInput
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <SignUpIdInput
        birthDate={formData.birthDate}
        genderInput={genderInput}
        onBirthDateChange={handleBirthDateChange}
        onGenderChange={handleGenderChange}
      />

      <SignUpPhoneVerificationInput
        phoneNumber={formData.phoneNumber}
        onPhoneChange={(e) =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
        authNumber={authNumber}
        setAuthNumber={setAuthNumber}
        remainingTime={remainingTime}
        showVerificationInput={showVerificationInput}
        onSendAuth={() => sendAuthNumber(formData.phoneNumber)}
        onVerify={() => verifyAuthNumber(formData.phoneNumber, onNext)}
      />

      <ButtonContainer>
        <button
          className="next-button"
          onClick={() => {
            console.log('현재 입력된 formData:', formData);
            if (onNext) onNext();
          }}
          disabled={!isFormValid}
        >
          다음 단계로 이동
        </button>
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
  margin: 24px 16px auto 16px;
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  gap: 8px;
  align-items: flex-start;
  padding: 16px 20px 0px 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.gray900};
  .highlight {
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.gray500};
  }
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

  .next-button {
    width: 100%;
    height: 52px;
    font-size: 16px;
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.mainBlue};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .next-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
