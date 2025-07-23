import { axiosInstance } from '@/api/axiosInstance';
import { CommunityFormData } from '@/components/SignUp/CommunityFunnel/CommunityFunnel';
import { useMutation } from '@tanstack/react-query';

export const useUploadAssociationProfileImage = () =>
  useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axiosInstance.post(
        '/association/upload-profile-img',
        formData,
      );
      return data.imageUrl as string;
    },
  });

export const useRegisterAssociation = () =>
  useMutation({
    mutationFn: async (formData: CommunityFormData) => {
      const { data } = await axiosInstance.post(
        '/association/create',
        formData,
      );
      return data;
    },
  });
