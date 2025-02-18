import axios from 'axios';
import { useState } from 'react';
import { Step1 } from '@/page/SignUp/SignStep1';
import { Step2 } from '@/page/SignUp/SignStep2';
import { Step3 } from '@/page/SignUp/SignStep3';
import { Step4 } from '@/page/SignUp/SignStep4';
import { Step5 } from '@/page/SignUp/SignStep5';
import { Step6 } from '@/page/SignUp/SignStep6';
import { Step7 } from '@/page/SignUp/SignStep7';
import { SignUpFormData } from '@/type/SignUp';
import styled from 'styled-components';

const SignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    birthDate: '',
    phoneNumber: '',
    password: '',
    gender: '',
    streetAddress: '',
    detailAddress: '',
    caregiverCertificate: {
      grade: 'FIRST',
      certificateNumber: '',
    },
    socialWorkerCertificate: {
      grade: '',
      certificateNumber: '',
    },
    nursingCareCertificate: {
      grade: '',
      certificateNumber: '',
    },
    isHavingCar: false,
    isAgreedToTerms: false,
    isAgreedToCollectPersonalInfo: false,
    isAgreedToReceiveMarketingInfo: false,
    isCompleteDementiaEducation: false,
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
      name: formData.name,
      birthDate: formData.birthDate,
      gender: formData.gender,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      streetAddress: formData.streetAddress,
      detailAddress: formData.detailAddress,
      caregiverCertificate: formData.caregiverCertificate,
      socialWorkerCertificate: formData.socialWorkerCertificate,
      nursingCareCertificate: formData.nursingCareCertificate,
      isHavingCar: formData.isHavingCar,
      isCompleteDementiaEducation: formData.isCompleteDementiaEducation,
      isAgreedToTerms: formData.isAgreedToTerms,
      isAgreedToCollectPersonalInfo: formData.isAgreedToCollectPersonalInfo,
      isAgreedToReceiveMarketingInfo: formData.isAgreedToReceiveMarketingInfo,
      // profileImageUrl: formData.profileImageUrl,
    };

    const apiUrl = import.meta.env.VITE_APP_API_URL;
    console.log('API URL:', `${apiUrl}/caregiver/signup`);

    try {
      const response = await axios.post(`${apiUrl}/caregiver/signup`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('회원가입 완료:', response.data);
    } catch (error) {
      console.error('signupform 오류:', error);
    }
  };

  return (
    <FormWrapper>
      {currentStep === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      )}
      {currentStep === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      )}
      {currentStep === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      )}
      {currentStep === 4 && (
        <Step4
          formData={formData}
          setFormData={setFormData}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      )}
      {currentStep === 5 && (
        <Step5
          formData={formData}
          setFormData={setFormData}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      )}
      {currentStep === 6 && (
        <Step6
          formData={formData}
          setFormData={setFormData}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      )}
      {currentStep === 7 && (
        <Step7
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onPrevious={handlePreviousStep}
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

export default SignUpForm;
