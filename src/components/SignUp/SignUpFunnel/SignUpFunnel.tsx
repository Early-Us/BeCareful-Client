import { Step1SelectRole } from '@/components/SignUp/SignUpFunnel/Step1SelectRole';
import { Step2OrganizationName } from '@/components/SignUp/SignUpFunnel/Step2OrganizationName';
import { Step3BasicInfo } from '@/components/SignUp/SignUpFunnel/Step3BasicInfo';
import { Step4AcceptTerms } from '@/components/SignUp/SignUpFunnel/Step4AcceptTerms';
import { Step5SignUpComplete } from '@/components/SignUp/SignUpFunnel/Step5SignUpComplete';
import { useSignUpContext } from '@/contexts/SignUpContext';

const steps = [
  Step1SelectRole,
  Step2OrganizationName,
  Step3BasicInfo,
  Step4AcceptTerms,
  Step5SignUpComplete,
];

export const SignUpFunnel = () => {
  const { currentStep } = useSignUpContext();
  const StepComponent = steps[currentStep];
  return <StepComponent />;
};
