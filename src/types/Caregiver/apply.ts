import { Recruitment } from './common';
import { MatchingRecruitmentResponse } from './work';

/* 요양보호사 지원 현황 화면 */
export interface MatchingRecruitment {
  recruitmentInfo: Recruitment;
  matchingStatus: '미지원' | '지원' | '합격' | '거절' | '불합격';
}

// 지원 현황 조회 응답
export type MatchingMyRecruitmentResponse = MatchingRecruitment[];

// 지원 현황 상세 조회 응답
export interface MatchingMyRecruitmentDetailResponse {
  recruitmentDetailInfo: MatchingRecruitmentResponse;
  applyDate: string;
}
