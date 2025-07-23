import { axiosInstance } from '@/api/axiosInstance';
import { CaregiverSignUpFormData } from '@/types/CareGiverSignUp';
import { useMutation } from '@tanstack/react-query';

export const useUploadCareGiverProfileImage = () =>
  useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axiosInstance.post(
        '/caregiver/upload-profile-img',
        formData,
      );
      return data.profileImageUrl as string;
    },
  });

export const useRegisterCaregiver = () =>
  useMutation({
    mutationFn: async (formData: CaregiverSignUpFormData) => {
      const { data } = await axiosInstance.post('/caregiver/signup', formData);
      return data.institutionId as number;
    },
  });
