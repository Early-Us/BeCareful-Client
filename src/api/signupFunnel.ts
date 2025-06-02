import { axiosInstance } from '@/api/axiosInstance';

export interface SignUpPayload {
  nursingInstitutionId: number;
  realName: string;
  nickName: string;
  birthYymmdd: string;
  genderCode: number;
  phoneNumber: string;
  institutionRank:
    | 'CENTER_DIRECTOR'
    | 'REPRESENTATIVE'
    | 'SOCIAL_WORKER'
    | 'none';
  isAgreedToTerms: boolean;
  isAgreedToCollectPersonalInfo: boolean;
  isAgreedToReceiveMarketingInfo: boolean;
}

export const signUpMember = async (payload: SignUpPayload) => {
  const { data } = await axiosInstance.post('/social/worker/signup', payload);
  return data;
};

export const searchInstitution = async (name: string) => {
  const { data } = await axiosInstance.get(
    '/nursingInstitution/for-guest/search',
    {
      params: { nursingInstitutionName: name },
    },
  );
  return data.nursingInstitutionSimpleInfoList;
};
