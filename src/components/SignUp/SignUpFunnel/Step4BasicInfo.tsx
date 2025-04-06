import { useSignUpContext } from '@/contexts/SignUpContext';
import { styled } from 'styled-components';
import { Button } from '@/components/common/Button/Button';
import { NameInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/NameInput';
import { NicknameInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/NicknameInput';
import { PhoneNumberInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/PhoneNumberInput';
import { ResidentIdInput } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo/ResidentIdInput';
import { useNicknameValidation } from '@/hooks/useNicknameValidation';

export const Step4BasicInfo = () => {
  const { goToNext, goToPrev, formData, setFormData } = useSignUpContext();
  const { message, state, checkNickname, resetMessage } =
    useNicknameValidation();

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (field === 'nickname') {
        resetMessage();
      }
    };

  const handleCheckDuplicate = () => {
    checkNickname(formData.nickname);
  };

  const isFormValid =
    formData.name.trim() &&
    formData.nickname.trim() &&
    formData.birthDate.trim() &&
    formData.residentId.trim() &&
    formData.phoneNumber.trim();

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>담당자 기본 정보를 입력하세요.</Title>
      </HeaderSection>

      <NameInput value={formData.name} onChange={handleChange('name')} />
      <NicknameInput
        value={formData.nickname}
        onChange={handleChange('nickname')}
        onCheckDuplicate={handleCheckDuplicate}
      />
      {message && (
        <ValidationMessage state={state}>{message}</ValidationMessage>
      )}
      <ResidentIdInput
        birthDate={formData.birthDate}
        genderInput={formData.residentId}
        onBirthDateChange={handleChange('birthDate')}
        onGenderChange={handleChange('residentId')}
      />
      <PhoneNumberInput
        value={formData.phoneNumber}
        onChange={handleChange('phoneNumber')} //TODO: api 연결하면 수정불가로 바뀜
      />

      <ButtonContainer>
        <Button onClick={goToPrev} height="52px">
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

const ValidationMessage = styled.p<{ state: 'default' | 'error' }>`
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
