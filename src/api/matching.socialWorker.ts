import { axiosInstance } from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';

export interface MatchingRecruitmentPayload {
  elderlyId: number;
  title: string;
  workDays: string[];
  workStartTime: string;
  workEndTime: string;
  careTypes: string[];
  workSalaryType: 'HOUR' | 'DAY' | 'MONTH'; //TODO 연봉 추가
  workSalaryAmount: number;
  description: string;
}

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
