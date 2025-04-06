import { Step1InstitutionName } from '@/components/SignUp/InstitutionFunnel/Step1InstitutionName';
import { Step2InstitutionOpen } from '@/components/SignUp/InstitutionFunnel/Step2InstitutionOpen';
import { Step3InstitutionType } from '@/components/SignUp/InstitutionFunnel/Step3InstitutionType';
import { Step4InstitutionContact } from '@/components/SignUp/InstitutionFunnel/Step4InstitutionContact';
import { Step5UploadPhoto } from '@/components/SignUp/InstitutionFunnel/Step5UploadPhoto';
import { Step6InstitutionRegister } from '@/components/SignUp/InstitutionFunnel/Step6InstitutionRegister';
import { useEffect, useState } from 'react';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar'; // ProgressBar import
import { useSignUpContext } from '@/contexts/SignUpContext';

interface InstitutionFunnelProps {
  onDone: () => void;
}

export const InstitutionFunnel = ({ onDone }: InstitutionFunnelProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { setIsInstitutionFunnel } = useSignUpContext();
  const isLastStep = currentStep === 5;

  const goToNext = () => setCurrentStep((prev) => prev + 1);
  const goToPrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    setIsInstitutionFunnel(true);
    return () => setIsInstitutionFunnel(false);
  }, [setIsInstitutionFunnel]);

  const steps = [
    <Step1InstitutionName goToNext={goToNext} goToPrev={goToPrev} />,
    <Step2InstitutionOpen goToNext={goToNext} goToPrev={goToPrev} />,
    <Step3InstitutionType goToNext={goToNext} goToPrev={goToPrev} />,
    <Step4InstitutionContact goToNext={goToNext} goToPrev={goToPrev} />,
    <Step5UploadPhoto goToNext={goToNext} goToPrev={goToPrev} />,
    <Step6InstitutionRegister onComplete={onDone} />,
  ];

  const stepPercents = [20, 40, 60, 80, 100, 100];

  const percent = stepPercents[currentStep];

  return (
    <div>
      {!isLastStep && <ProgressBar percent={percent} />}
      {steps[currentStep]}
    </div>
  );
};
