import { axiosInstance } from '@/api/axiosInstance';
import { InstitutionFormData } from '@/components/SignUp/InstitutionFunnel/InstitutionFunnel';

export const uploadInstitutionProfileImage = async (
  file: File,
  name: string,
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('institutionName', name);

  const { data } = await axiosInstance.post(
    '/nursingInstitution/for-guest/upload-profile-img',
    formData,
  );
  return data.profileImageUrl;
};

export const registerInstitution = async (formData: InstitutionFormData) => {
  const response = await axiosInstance.post(
    '/nursingInstitution/for-guest/register',
    formData,
  );
  return response.data;
};
