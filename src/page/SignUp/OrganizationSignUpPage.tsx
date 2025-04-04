import { SignUpFunnel } from '@/components/SignUp/SignUpFunnel/SignUpFunnel';
import { SignUpProvider } from '@/contexts/SignUpContext';

export const OrganizationSignUpPage = () => {
  return (
    <SignUpProvider>
      <SignUpFunnel />
    </SignUpProvider>
  );
};
