import { Step1InstitutionName } from '@/components/SignUp/InstitutionFunnel/Step1InstitutionName';

import { Step4InstitutionContact } from '@/components/SignUp/InstitutionFunnel/Step4InstitutionContact';
import { Step2InstitutionOpen } from '@/components/SignUp/InstitutionFunnel/Step2InstitutionOpen';
import { Step3InstitutionType } from '@/components/SignUp/InstitutionFunnel/Step3InstitutionType';
import { Step5UploadPhoto } from '@/components/SignUp/InstitutionFunnel/Step5UploadPhoto';
import { Step6InstitutionRegister } from '@/components/SignUp/InstitutionFunnel/Step6InstitutionRegister';
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
    <Step2InstitutionOpen goToNext={goToNext} goToPrev={goToPrev} />,
    <Step3InstitutionType goToNext={goToNext} goToPrev={goToPrev} />,
    <Step4InstitutionContact goToNext={goToNext} goToPrev={goToPrev} />,
    <Step5UploadPhoto goToNext={goToNext} goToPrev={goToPrev} />,
    <Step6InstitutionRegister onComplete={onDone} />,
  ];

  return <div>{steps[currentStep]}</div>;
};
