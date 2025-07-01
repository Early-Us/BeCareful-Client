import { axiosInstance } from '@/api/axiosInstance';
import { ElderlyRegisterPayload } from '@/types/Elderly';
import { useMutation } from '@tanstack/react-query';

export const useRegisterElderly = () =>
  useMutation({
    mutationFn: async (payload: ElderlyRegisterPayload) => {
      const { data } = await axiosInstance.post('/elderly/register', payload);
      return data;
    },
  });

export const useUploadElderlyProfileImage = () =>
  useMutation({
    mutationFn: async ({
      file,
      institutionId,
    }: {
      file: File;
      institutionId: string;
    }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('institutionId', institutionId);
      const { data } = await axiosInstance.post(
        '/elderly/upload-profile-img',
        formData,
      );
      return data.profileImageUrl as string;
    },
  });
