import { CareGiverSignUpFunnel } from '@/components/SignUp/CareGiverSignUpFunnel/CaregiverSignUpFunnel';
import { useGetGuestInfoForCaregiver } from '@/hooks/SignUp/useGuestInfoForCaregiver';

export const CareGiverSignUpPage = () => {
  useGetGuestInfoForCaregiver();
  return <CareGiverSignUpFunnel />;
};
