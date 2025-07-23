import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/api/axiosInstance';

export const fetchGuestInfo = async (guestKey: string) => {
  const { data } = await axiosInstance.get('/auth/guest-info', {
    params: { guestKey },
  });
  return data;
};

export const useGuestInfoQuery = (guestKey?: string | null) => {
  return useQuery({
    queryKey: ['guestInfo', guestKey],
    queryFn: () => fetchGuestInfo(guestKey!),
    enabled: !!guestKey,
    retry: false,
  });
};
