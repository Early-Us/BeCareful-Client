import { axiosInstance } from '@/api/axiosInstance';

export const sendSmsAuthNumber = async (phoneNumber: string) => {
  await axiosInstance.post('/sms/send-auth-number', { phoneNumber });
};

export const authenticateSmsAuthNumber = async (
  phoneNumber: string,
  authNumber: string,
) => {
  await axiosInstance.post('/sms/authenticate-number', {
    phoneNumber,
    authNumber,
  });
};
