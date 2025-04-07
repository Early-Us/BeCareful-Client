import { SignUpFunnel } from '@/components/SignUp/SignUpFunnel/SignUpFunnel';
import { SignUpProvider } from '@/contexts/SignUpContext';

export const InstitutionSignUpPage = () => {
  return (
    <SignUpProvider>
      <SignUpFunnel />
    </SignUpProvider>
  );
};
