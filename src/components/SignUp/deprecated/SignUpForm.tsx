import styled from 'styled-components';
import { Step1 } from '@/page/SignUp/deprecated/SignStep1';
import { Step2 } from '@/page/SignUp/deprecated/SignStep2';
import { Step3 } from '@/page/SignUp/deprecated/SignStep3';
import { Step4 } from '@/page/SignUp/deprecated/SignStep4';
import { Step5 } from '@/page/SignUp/deprecated/SignStep5';
import { Step6 } from '@/page/SignUp/deprecated/SignStep6';
import { Step7 } from '@/page/SignUp/deprecated/SignStep7';
import { useSignUpStep } from '@/hooks/useSignUpStep';

const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];

export const SignUpForm = () => {
  const { formData, setFormData, currentStep, goNext, goPrev, submitForm } =
    useSignUpStep();

  const StepComponent = steps[currentStep - 1];
  const isLastStep = currentStep === steps.length;

  return (
    <FormWrapper>
      <StepComponent
        formData={formData}
        setFormData={setFormData}
        onNext={goNext}
        onPrevious={goPrev}
        onSubmit={isLastStep ? submitForm : undefined}
      />
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
