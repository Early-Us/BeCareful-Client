import { axiosInstance } from '@/api/axiosInstance';
import {
  MatchingElderData,
  MatchingRecruitmentPayload,
} from '@/types/Matching.socialWorker';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useRegisterMatchingRecruitment = () =>
  useMutation({
    mutationFn: async (payload: MatchingRecruitmentPayload) => {
      const { data } = await axiosInstance.post(
        '/matching/social-worker/recruitment',
        payload,
      );
      return data;
    },
  });

export const getMatchingRecruitment = async (recruitmentId: string) => {
  const { data } = await axiosInstance.get<MatchingElderData>(
    `/matching/social-worker/recruitment/${recruitmentId}`,
  );
  return data;
};

export const useMatchingRecruitment = (recruitmentId: string) =>
  useQuery({
    queryKey: ['matching-recruitment', recruitmentId],
    queryFn: () => getMatchingRecruitment(recruitmentId),
    enabled: !!recruitmentId,
  });
