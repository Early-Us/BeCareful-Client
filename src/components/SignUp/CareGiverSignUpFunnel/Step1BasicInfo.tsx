import { Button } from '@/components/common/Button/Button';
import { AgreeCard } from '@/components/SignUp/CareGiverSignUpFunnel/common/AgreeCard';
import { NameInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/NameInput';
import { PhoneNumberInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/PhoneNumberInput';
import { ResidentIdInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/ResidentIdInput';
import { AGREE_ITEMS } from '@/constants/signUpAgreeItems';
import { useCaregiverSignUpContext } from '@/contexts/CaregiverSignUpContext';
import { useCaregiverBasicInfoForm } from '@/hooks/SignUp/useCaregiverBasicInfoForm';
import { CheckBox } from '@/components/common/CheckBox/CheckBox';
import { ReactComponent as ChevronRight } from '@/assets/icons/signup/ChevronRight.svg';
import { styled } from 'styled-components';
import { AgreeField } from '@/types/Socialworker/common';

export const Step1BasicInfo = () => {
  const { goToNext } = useCaregiverSignUpContext();
  const {
    formData,
    setFormData,
    isFormValid,
    handleChange,
    handleBirthAndGenderChange,
  } = useCaregiverBasicInfoForm();

  const updateAgreement = (field: AgreeField, value: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAllAgreements = (value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isAgreedToTerms: value,
      isAgreedToCollectPersonalInfo: value,
      isAgreedToReceiveMarketingInfo: value,
    }));
  };

  const isRequiredAgreed = () =>
    formData.isAgreedToTerms && formData.isAgreedToCollectPersonalInfo;

  const isAllAgreed = () =>
    isRequiredAgreed() && formData.isAgreedToReceiveMarketingInfo;

  const toggleAllAgreements = () => {
    updateAllAgreements(!isAllAgreed());
  };

  const isNextEnabled = isFormValid && isRequiredAgreed();

  return (
    <StepWrapper>
      <HeaderSection>
        <Title>담당자 기본 정보를 입력하세요.</Title>
      </HeaderSection>

      <NameInput
        value={formData.realName}
        onChange={handleChange('realName')}
      />

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

      <AgreeWrapper>
        <AgreeCard
          pressed={isAllAgreed()}
          text="전체 동의"
          onClick={toggleAllAgreements}
        />

        <AgreeCheckContainer>
          {AGREE_ITEMS.map(({ key, id, select, guide }) => (
            <AgreeCheck key={id}>
              <CheckBox
                id={id}
                checked={formData[key]}
                onChange={(checked) => updateAgreement(key, checked)}
                borderRadius=""
                label=""
                select={select}
                guide={guide}
              />
              <ChevronRight />
            </AgreeCheck>
          ))}
        </AgreeCheckContainer>
      </AgreeWrapper>

      <ButtonContainer>
        <Button
          onClick={goToNext}
          height="52px"
          variant={isNextEnabled ? 'blue' : 'gray'}
          disabled={!isNextEnabled}
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

const AgreeWrapper = styled.div`
  display: flex;
  height: 218px;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  box-sizing: border-box;
`;

const AgreeCheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const AgreeCheck = styled.div`
  display: flex;
  height: 40px;
  box-sizing: border-box;
  padding: 8px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
