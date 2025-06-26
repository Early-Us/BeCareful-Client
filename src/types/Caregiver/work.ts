import { CareType, Recruitment, WorkApplication, WorkDay } from './common';

/* 요양보호사 일자리 화면 */
// 일자리 신청 정보 조회 응답
export type WorkApplicationResponse = WorkApplication;

// 일자리 신청 정보 등록/수정 요청
export type WorkApplicationRequest = WorkApplication;

// 매칭 공고 리스트 조회 응답
export type MatchingListResponse = Recruitment[];

export interface ElderlyInfo {
  name: string;
  address: string;
  gender: 'MALE' | 'FEMALE';
  age: number;
  hasInmate: boolean;
  hasPet: boolean;
  profileImageUrl: string;
  careLevel: string;
}

export interface InstitutionInfo {
  name: string;
  address: string;
}

export interface CareInfo {
  careType: CareType;
  detailCareTypes: string[];
}

export interface RecruitmentDetailInfo {
  title: string;
  workDays: WorkDay[];
  workStartTime: string;
  workEndTime: string;
  workSalaryType: 'HOUR' | 'MONTH' | 'YEAR';
  workSalaryAmount: number;
  description: string;
  careInfoList: CareInfo[];
}

// 매칭 공고 상세 조회 응답
export interface MatchingRecruitmentResponse {
  recruitmentInfo: RecruitmentDetailInfo;
  elderlyInfo: ElderlyInfo;
  institutionInfo: InstitutionInfo;
  isHotRecruitment: boolean;
  isHourlySalaryTop: boolean;
  matchRate: number;
}

export type MediationType = 'TIME' | 'DAY' | 'PAY';

// 근무 조건 조율 요청
export interface MatchingRecruitmentMediateRequest {
  mediationTypes: MediationType[];
  mediationDescription: string;
}
