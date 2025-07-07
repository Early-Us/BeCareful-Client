import { axiosInstance } from '@/api/axiosInstance';
import {
  GetAssociationListResponse,
  JoinAssociationRequest,
} from '@/types/CommunityAssociation';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetAssociationList = () =>
  useQuery<GetAssociationListResponse>({
    queryKey: ['associationList'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/association/list');
      return data;
    },
  });

export const useJoinAssociation = () =>
  useMutation({
    mutationFn: async (payload: JoinAssociationRequest) => {
      await axiosInstance.post('/association/join-requests', payload);
    },
  });
