import { useSignUpContext } from '@/contexts/SocialWorkerSignUpContext';
import { useGetGuestInfoBase } from '@/hooks/SignUp/useGetGuestInfoBase';

const getGenderCode = (char: string): number => {
  if (char === '1' || char === '3') return 1;
  if (char === '2' || char === '4') return 2;
  return 0;
};

export const useGetGuestInfo = () => {
  return useGetGuestInfoBase(useSignUpContext, (guest) => ({
    realName: guest.name,
    birthYymmdd: guest.birthYymmdd,
    genderCode: getGenderCode(String(guest.birthGenderCode)),
    phoneNumber: guest.phoneNumber,
  }));
};
