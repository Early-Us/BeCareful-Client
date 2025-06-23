import { useState } from 'react';
import { SignUpFormData } from '@/types/SignUp';
import axios from 'axios';

export const useSignUpStep = () => {
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

  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goPrev = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const submitForm = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    try {
      const response = await axios.post(
        `${apiUrl}/caregiver/signup`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      console.log('회원가입 완료:', response.data);
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return {
    formData,
    setFormData,
    currentStep,
    goNext,
    goPrev,
    submitForm,
  };
};
