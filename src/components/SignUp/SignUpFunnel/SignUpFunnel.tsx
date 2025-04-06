import { Step1SelectRole } from '@/components/SignUp/SignUpFunnel/Step1SelectRole';
import { Step2ProfileType } from '@/components/SignUp/SignUpFunnel/Step2ProfileType';
import { Step3InstitutionName } from '@/components/SignUp/SignUpFunnel/Step3InstitutionName';
import { Step4BasicInfo } from '@/components/SignUp/SignUpFunnel/Step4BasicInfo';
import { Step5AcceptTerms } from '@/components/SignUp/SignUpFunnel/Step5AcceptTerms';
import { Step6SignUpComplete } from '@/components/SignUp/SignUpFunnel/Step6SignUpComplete';
import { useSignUpContext } from '@/contexts/SignUpContext';

import { ReactComponent as IconArrowLeft } from '@/assets/icons/IconArrowLeft.svg';
import { ProgressBar } from '@/components/common/ProgressBar/ProgressBar';
import { styled } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  Step1SelectRole,
  Step2ProfileType,
  Step3InstitutionName,
  Step4BasicInfo,
  Step5AcceptTerms,
  Step6SignUpComplete,
];
const stepPercents = [20, 40, 60, 80, 100, 100];

export const SignUpFunnel = () => {
  const { currentStep, isInstitutionFunnel } = useSignUpContext();
  const StepComponent = steps[currentStep];
  const percent = stepPercents[currentStep];
  const isLastStep = currentStep === 5;
  return (
    <div>
      <IconContainer>
        <IconArrowLeft />
      </IconContainer>
      {!isInstitutionFunnel && !isLastStep && <ProgressBar percent={percent} />}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <StepComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  height: 56px;
  width: 100%;
  margin: 24px 0 auto 0;
`;
