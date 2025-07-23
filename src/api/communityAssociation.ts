import { axiosInstance } from '@/api/axiosInstance';
import {
  JoinRequestsResponse,
  MemberDetailResponse,
  MembersOverviewResponse,
  MembersResponse,
} from '@/types/Community/association';
import {
  GetAssociationListResponse,
  JoinAssociationRequest,
} from '@/types/CommunityAssociation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

// 회원관리 탭 목록(협회 회원 + 가입 신청자 요약)
export const useMembersOverview = () => {
  return useQuery<MembersOverviewResponse, Error>({
    queryKey: ['membersOverview'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/members/overview');
      return response.data;
    },
  });
};

// 협회 회원 목록 조회
export const useMembers = () => {
  return useQuery<MembersResponse, Error>({
    queryKey: ['members'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/members');
      return response.data;
    },
  });
};

// 협회 회원 상세 정보 조회
export const useMembersDetail = (memberId: number) => {
  return useQuery<MemberDetailResponse, Error>({
    queryKey: ['memberDetail'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/association/members/${memberId}`,
      );
      return response.data;
    },
  });
};

// 협회 가입 신청 목록 보기
export const useJoinRequest = () => {
  return useQuery<JoinRequestsResponse, Error>({
    queryKey: ['joinRequest'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/join-requests');
      return response.data;
    },
  });
};

// 협회 가입 신청 승인
export const useJoinRequestAccept = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/association/join-requests/${id}/accept`,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('useJoinRequestAccept - 가입 요청 승인 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['requestAccept', id],
      });
    },
    onError: (error) => {
      console.error('useJoinRequestAccept - 가입 요청 승인 실패:', error);
    },
  });
};

// 협회 가입 신청 거절
export const useJoinRequestReject = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/association/join-requests/${id}/reject`,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('useJoinRequestReject - 가입 요청 거절 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['requestReject', id],
      });
    },
    onError: (error) => {
      console.error('useJoinRequestReject - 가입 요청 거절 실패:', error);
    },
  });
};

// 협회 회원 강제 탈퇴
export const useMemberExpel = (memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/association/members/${memberId}/expel`,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('useMemberExpel - 회원 강제 탈퇴 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['memberDetail', memberId],
      });
      queryClient.invalidateQueries({
        queryKey: ['membersOverview'],
      });
      queryClient.invalidateQueries({
        queryKey: ['members'],
      });
    },
    onError: (error) => {
      console.error('useMemberExpel - 회원 강제 탈퇴 실패:', error);
    },
  });
};
