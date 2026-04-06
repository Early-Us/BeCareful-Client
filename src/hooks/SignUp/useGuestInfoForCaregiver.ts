import { useCaregiverSignUpContext } from '@/contexts/KakaoCaregiverSignUpContext';
import { useGetGuestInfoBase } from '@/hooks/SignUp/useGetGuestInfoBase';
import { getGenderCode } from '@/utils/format/text';

export const useGetGuestInfoForCaregiver = () => {
  return useGetGuestInfoBase(useCaregiverSignUpContext, (guest) => ({
    realName: guest.name,
    birthYymmdd: guest.birthYymmdd,
    genderCode: getGenderCode(String(guest.birthGenderCode)),
    phoneNumber: guest.phoneNumber,
  }));
};
