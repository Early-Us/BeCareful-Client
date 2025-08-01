import { Recruitment } from '@/types/Caregiver/common';
import { MatchingRecruitmentResponse } from '@/types/Caregiver/work';

/* 요양보호사 지원 현황 화면 */
interface MatchingRecruitment {
  recruitmentInfo: Recruitment;
  // TODO : 백엔드 타입 확인
  matchingApplicationStatus: '검토중' | '합격' | '거절';
}

// 지원 현황 조회 응답
export type MatchingMyRecruitmentResponse = MatchingRecruitment[];

// 지원 현황 상세 조회 응답
export interface MatchingMyRecruitmentDetailResponse {
  recruitmentDetailInfo: MatchingRecruitmentResponse;
  applyDate: string;
}
