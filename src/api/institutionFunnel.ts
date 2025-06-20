import { axiosInstance } from '@/api/axiosInstance';
import { InstitutionFormData } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';
import { useMutation } from '@tanstack/react-query';

export const useUploadInstitutionProfileImage = () =>
  useMutation({
    mutationFn: async ({ file, name }: { file: File; name: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('institutionName', name);

      const { data } = await axiosInstance.post(
        '/nursingInstitution/for-guest/upload-profile-img',
        formData,
      );
      return data.profileImageUrl as string;
    },
  });

export const useRegisterInstitution = () =>
  useMutation({
    mutationFn: async (formData: InstitutionFormData) => {
      const { data } = await axiosInstance.post(
        '/nursingInstitution/for-guest/register',
        formData,
      );
      return data.institutionId as number;
    },
  });
