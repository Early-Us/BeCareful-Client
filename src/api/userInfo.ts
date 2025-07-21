import { axiosInstance } from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export const fetchUserInfo = async (userKey: string) => {
  const { data } = await axiosInstance.get('/auth/user-info', {
    params: { userKey },
  });
  return data;
};

export const useUserInfoQuery = (userKey?: string | null) => {
  return useQuery({
    queryKey: ['userInfo', userKey],
    queryFn: () => fetchUserInfo(userKey!),
    enabled: !!userKey,
    retry: false,
  });
};
