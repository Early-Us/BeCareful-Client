import { axiosInstance } from '@/api/axiosInstance';

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
