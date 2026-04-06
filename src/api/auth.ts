import { axiosInstance } from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';

export interface PhoneLoginRequest {
  phoneNumber: string;
  password: string;
}

export interface PhoneLoginResponse {
  realName: string;
  nickName: string;
  userType: 'CAREGIVER' | 'SOCIAL_WORKER';
}

export const loginByPhone = async (payload: PhoneLoginRequest) => {
  const { data } = await axiosInstance.post<PhoneLoginResponse>(
    '/auth/login/phone',
    payload,
  );
  return data;
};

export const usePhoneLogin = () =>
  useMutation({
    mutationFn: loginByPhone,
  });
