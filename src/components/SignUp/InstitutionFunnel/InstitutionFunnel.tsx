import { Step1InstitutionName } from '@/components/SignUp/InstitutionFunnel/Step1InstitutionName';
import { Step2InstitutionType } from '@/components/SignUp/InstitutionFunnel/Step2InstitutionType';
import { Step3ContactInfo } from '@/components/SignUp/InstitutionFunnel/Step3ContactInfo';
import { Step4UploadPhoto } from '@/components/SignUp/InstitutionFunnel/Step4UploadPhoto';
import { Step5InstitutionRegister } from '@/components/SignUp/InstitutionFunnel/Step5InstitutionRegister';
import { useState } from 'react';

interface InstitutionFunnelProps {
  onDone: () => void;
}

export const InstitutionFunnel = ({ onDone }: InstitutionFunnelProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNext = () => setCurrentStep((prev) => prev + 1);
  const goToPrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const steps = [
    <Step1InstitutionName goToNext={goToNext} goToPrev={goToPrev} />,
    <Step2InstitutionType goToNext={goToNext} goToPrev={goToPrev} />,
    <Step3ContactInfo goToNext={goToNext} goToPrev={goToPrev} />,
    <Step4UploadPhoto goToNext={goToNext} goToPrev={goToPrev} />,
    <Step5InstitutionRegister onComplete={onDone} goToPrev={goToPrev} />,
  ];

  return <div>{steps[currentStep]}</div>;
};
