import { SignUpFunnel } from '@/components/SignUp/SocialWorkerSignUpFunnel/SignUpFunnel';
import { useGetGuestInfo } from '@/hooks/SignUp/useGetGuestInfo';

export const InstitutionSignUpPage = () => {
  useGetGuestInfo();
  return (
    <>
      <SignUpFunnel />
    </>
  );
};
