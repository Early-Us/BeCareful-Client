import { axiosInstance } from '@/api/axiosInstance';
import { GetAssociationListResponse } from '@/types/CommunityAssociation';
import { useQuery } from '@tanstack/react-query';

export const useGetAssociationList = () =>
  useQuery<GetAssociationListResponse>({
    queryKey: ['associationList'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/association/list');
      return data;
    },
  });
