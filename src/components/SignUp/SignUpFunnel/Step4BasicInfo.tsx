import { useSignUpContext } from '@/contexts/SignUpContext';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { NameInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/NameInput';
import { NicknameInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/NicknameInput';
import { PhoneNumberInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/PhoneNumberInput';
import { ResidentIdInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/ResidentIdInput';
import { useNicknameValidation } from '@/hooks/useNicknameValidation';

const getGenderCode = (char: string): number => {
  if (char === '1' || char === '3') return 1;
  if (char === '2' || char === '4') return 2;
  return 0;
};

export const Step4BasicInfo = () => {
  const { goToNext, goToPrev, formData, setFormData } = useSignUpContext();
  const { message, state, checkNickname, resetMessage } =
    useNicknameValidation();
  const isNicknameValid = state === 'success';

  const handleChange =
    (field: 'realName' | 'nickName' | 'birthYymmdd' | 'phoneNumber') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (field === 'nickName') {
        resetMessage();
      }
    };

  const handleCheckDuplicate = () => {
    checkNickname(formData.nickName);
  };

  const handleBirthAndGenderChange = (
    birthDate: string,
    genderChar: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      birthYymmdd: birthDate,
      genderCode: getGenderCode(genderChar),
    }));
  };

  const isFormValid =
    formData.realName.trim().length > 0 &&
    formData.nickName.trim().length > 0 &&
    formData.birthYymmdd.trim().length === 6 &&
    (formData.genderCode === 1 || formData.genderCode === 2) &&
    formData.phoneNumber.trim().length > 0 &&
    isNicknameValid;

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>담당자 기본 정보를 입력하세요.</Title>
      </HeaderSection>

      <NameInput
        value={formData.realName}
        onChange={handleChange('realName')}
      />
      <NicknameInput
        value={formData.nickName}
        onChange={handleChange('nickName')}
        onCheckDuplicate={handleCheckDuplicate}
      />
      {message && (
        <ValidationMessage state={state}>{message}</ValidationMessage>
      )}
      <ResidentIdInput
        birthDate={formData.birthYymmdd}
        genderInput={
          formData.genderCode > 0 ? formData.genderCode.toString() : ''
        }
        onBirthDateChange={(e) =>
          handleBirthAndGenderChange(
            e.target.value,
            formData.genderCode.toString(),
          )
        }
        onGenderChange={(e) =>
          handleBirthAndGenderChange(formData.birthYymmdd, e.target.value)
        }
      />
      <PhoneNumberInput
        value={formData.phoneNumber}
        onChange={handleChange('phoneNumber')}
      />

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px" variant="blue2">
          이전
        </Button>
        <Button
          onClick={goToNext}
          height="52px"
          variant={isFormValid ? 'blue' : 'gray'}
          disabled={!isFormValid}
        >
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
`;

const ValidationMessage = styled.p<{ state: 'default' | 'error' | 'success' }>`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  margin-top: 8px;
  color: ${({ theme, state }) =>
    state === 'error' ? theme.colors.mainOrange : theme.colors.mainBlue};
`;
