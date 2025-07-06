import { axiosInstance } from '@/api/axiosInstance';
import { ElderlyListItem, ElderlyRegisterPayload } from '@/types/Elderly';
import { ElderData } from '@/types/Matching';

import { useMutation, useQuery } from '@tanstack/react-query';

export const useRegisterElderly = () =>
  useMutation({
    mutationFn: async (payload: ElderlyRegisterPayload) => {
      const { data } = await axiosInstance.post('/elderly/register', payload);
      return data;
    },
  });

export const useUploadElderlyProfileImage = () =>
  useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axiosInstance.post(
        '/elderly/upload-profile-img',
        formData,
      );
      return data.profileImageUrl as string;
    },
  });

export const useElderlyList = () =>
  useQuery({
    queryKey: ['elderlyList'],
    queryFn: async (): Promise<ElderData[]> => {
      const { data } =
        await axiosInstance.get<ElderlyListItem[]>('/elderly/list');

      return data.map((elder) => ({
        ...elder,
        imageUrl: elder.profileImageUrl,
      }));
    },
  });
