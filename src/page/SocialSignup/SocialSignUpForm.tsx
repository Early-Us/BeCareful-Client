import { SocialStep1 } from '@/page/SocialSignup/SocialSignStep1';
import { SocialStep2 } from '@/page/SocialSignup/SocialSignStep2';
import { SocialStep3 } from '@/page/SocialSignup/SocialSignStep3';
import { SocialStep4 } from '@/page/SocialSignup/SocialSignStep4';
import { SocialStep5 } from '@/page/SocialSignup/SocialSignStep5';
import { SocialStep6 } from '@/page/SocialSignup/SocialSignStep6';
import { SocialStep7 } from '@/page/SocialSignup/SocialSignStep7';
import { SocialSignUpFormData } from '@/type/SocialSignUp';
import axios from 'axios';
import { useState } from 'react';

import { styled } from 'styled-components';

const SocialSignUpForm = () => {
  const [formSocialData, setFormSocialData] = useState<SocialSignUpFormData>({
    name: '',
    birthDate: '',
    gender: '',
    phoneNumber: '',
    password: '',
    institutionId: '',
    rank: '',
    isAgreedToTerms: false,
    isAgreedToCollectPersonalInfo: false,
    isAgreedToReceiveMarketingInfo: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      name: formSocialData.name,
      birthDate: formSocialData.birthDate,
      gender: formSocialData.gender,
      phoneNumber: formSocialData.phoneNumber,
      password: formSocialData.password,
      institutionId: formSocialData.institutionId,
      rank: formSocialData.rank,
      isAgreedToTerms: formSocialData.isAgreedToTerms,
      isAgreedToCollectPersonalInfo:
        formSocialData.isAgreedToCollectPersonalInfo,
      isAgreedToReceiveMarketingInfo:
        formSocialData.isAgreedToReceiveMarketingInfo,
    };
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    try {
      const response = await axios.post(
        `${apiUrl}/socialworker/signup`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('회원가입 완료:', response.data);
    } catch (error) {
      console.error('signupform 오류:', error);
    }
  };

  return (
    <FormWrapper>
      {currentStep === 1 && (
        <SocialStep1
          formSocialData={formSocialData}
          setFormSocialData={setFormSocialData}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 2 && (
        <SocialStep2
          formSocialData={formSocialData}
          setFormSocialData={setFormSocialData}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 3 && (
        <SocialStep3
          formSocialData={formSocialData}
          setFormSocialData={setFormSocialData}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 4 && (
        <SocialStep4
          formSocialData={formSocialData}
          setFormSocialData={setFormSocialData}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 5 && (
        <SocialStep5
          formSocialData={formSocialData}
          setFormSocialData={setFormSocialData}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 6 && (
        <SocialStep6
          formSocialData={formSocialData}
          setFormSocialData={setFormSocialData}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 7 && (
        <SocialStep7
          formSocialData={formSocialData}
          setFormSocialData={setFormSocialData}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
          onSubmit={handleSubmit}
        />
      )}
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 24px 16px auto 16px;
`;

export default SocialSignUpForm;
