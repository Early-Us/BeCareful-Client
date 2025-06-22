import { useGuestInfoQuery } from '@/api/guestInfo';
import { useSignUpContext } from '@/contexts/SignUpContext';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const getGenderCode = (char: string): number => {
  if (char === '1' || char === '3') return 1;
  if (char === '2' || char === '4') return 2;
  return 0;
};

export const useGetGuestInfo = () => {
  const [searchParams] = useSearchParams();
  const guestKey = searchParams.get('guestKey');
  const { data: guestInfo } = useGuestInfoQuery(guestKey);
  const { setFormData } = useSignUpContext();

  useEffect(() => {
    if (!guestInfo) return;
    setFormData((prev) => ({
      ...prev,
      realName: guestInfo.name,
      birthYymmdd: guestInfo.birthYymmdd,
      genderCode: getGenderCode(String(guestInfo.birthGenderCode)),
      phoneNumber: guestInfo.phoneNumber,
      institutionRank: guestInfo.institutionRank,
    }));
  }, [guestInfo, setFormData]);
};
