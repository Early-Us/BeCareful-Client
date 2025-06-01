import { axiosInstance } from '@/api/axiosInstance';
import { CommunityFormData } from '@/components/SignUp/CommunityFunnel/CommunityFunnel';

export const uploadAssociationProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await axiosInstance.post(
    '/association/upload-profile-img',
    formData,
  );
  return data.profileImageUrl;
};

export const registerAssociation = async (formData: CommunityFormData) => {
  const response = await axiosInstance.post('/association/register', formData);
  return response.data;
};
