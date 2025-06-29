import { axiosInstance } from '@/api/axiosInstance';
import { ElderlyRegisterPayload } from '@/types/ElderyRegister';
import { useMutation } from '@tanstack/react-query';

export const useRegisterElderly = () =>
  useMutation({
    mutationFn: async (payload: ElderlyRegisterPayload) => {
      const { data } = await axiosInstance.post('/elderly/register', payload);
      return data;
    },
  });
