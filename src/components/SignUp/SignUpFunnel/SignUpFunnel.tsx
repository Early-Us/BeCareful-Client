import { Step1SelectRole } from '@/components/SignUp/SignUpFunnel/Step1SelectRole';
import { Step2ProfileType } from '@/components/SignUp/SignUpFunnel/Step2ProfileType';
import { Step3InstitutionName } from '@/components/SignUp/SignUpFunnel/Step3InstitutionName';

import { Step4BasicInfo } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo';
import { Step5AcceptTerms } from '@/components/SignUp/SignUpFunnel/Step5AcceptTerms';
import { Step6SignUpComplete } from '@/components/SignUp/SignUpFunnel/Step6SignUpComplete';
import { useSignUpContext } from '@/contexts/SignUpContext';

const steps = [
  Step1SelectRole,
  Step2ProfileType,
  Step3InstitutionName,
  Step4BasicInfo,
  Step5AcceptTerms,
  Step6SignUpComplete,
];

export const SignUpFunnel = () => {
  const { currentStep } = useSignUpContext();
  const StepComponent = steps[currentStep];
  return <StepComponent />;
};
